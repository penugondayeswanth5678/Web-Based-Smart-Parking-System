
import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;
const DB_FILE = path.resolve("database.json");

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    users: [
      {
        fullName: 'Sushma Dussa',
        email: 'dussasushma2@gmail.com',
        password: 'sushma123',
        phone: '9876543210',
        dob: '2000-01-01',
        vehicle: { plateNumber: 'TS-09-SF-1234', type: 'Car' },
        isVerified: true,
        documents: { licenseUrl: '#', govIdUrl: '#' },
        role: 'user'
      },
      {
        fullName: 'System Admin',
        email: 'admin@smartparking.com',
        password: 'admin123',
        phone: '0000000000',
        dob: '1990-01-01',
        vehicle: { plateNumber: 'ADMIN-01', type: 'Other' },
        isVerified: true,
        documents: { licenseUrl: '#', govIdUrl: '#' },
        role: 'admin'
      }
    ],
    bookings: []
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

app.use(express.json());
app.use(cors());

// Helper to read/write DB
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
const writeDB = (data: any) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// API Routes
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/register", (req, res) => {
  const userData = req.body;
  const db = readDB();
  
  if (db.users.find((u: any) => u.email === userData.email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  
  db.users.push(userData);
  writeDB(db);
  res.status(201).json({ message: "User registered successfully" });
});

app.get("/api/bookings", (req, res) => {
  const { email } = req.query;
  const db = readDB();
  const userBookings = db.bookings.filter((b: any) => b.userEmail === email);
  res.json(userBookings);
});

app.post("/api/bookings", (req, res) => {
  const booking = req.body;
  const db = readDB();
  db.bookings.push(booking);
  writeDB(db);
  res.status(201).json(booking);
});

app.get("/api/admin/stats", (req, res) => {
  const db = readDB();
  res.json({
    users: db.users,
    bookings: db.bookings
  });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
