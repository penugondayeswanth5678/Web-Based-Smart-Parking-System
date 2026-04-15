
import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Dashboard } from './components/Dashboard';
import { AuthMode, UserProfile } from './types';

const App: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Initialize
  useEffect(() => {
    // Check for "Remember Me" session
    const savedUser = localStorage.getItem('parkflow_session');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setAuthMode('dashboard');
      } catch (e) {
        localStorage.removeItem('parkflow_session');
      }
    }
  }, []);

  const handleToggleMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const handleLoginSuccess = (user: UserProfile, remember: boolean) => {
    setCurrentUser(user);
    if (remember) {
      localStorage.setItem('parkflow_session', JSON.stringify(user));
    }
    setAuthMode('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('parkflow_session');
    setCurrentUser(null);
    setAuthMode('login');
  };

  if (authMode === 'dashboard' && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden font-sans bg-slate-50">
      {/* Left Side: Illustration / Branding */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        
        <div className="relative z-10 text-white max-w-md">
          <div className="mb-10 inline-flex items-center space-x-3">
            <div className="p-3 bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-3xl font-bold tracking-tight">Smart Parking</span>
          </div>

          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Seamless parking for the <span className="text-indigo-400">modern driver.</span>
          </h1>
          
          <ul className="space-y-6 text-slate-300">
            <li className="flex items-start space-x-4">
              <div className="p-1 bg-indigo-500/20 rounded-lg text-indigo-400 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Instant Reservations</h4>
                <p className="text-sm opacity-80">Book spots in crowded areas up to 48 hours in advance.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="p-1 bg-indigo-500/20 rounded-lg text-indigo-400 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Secure Verification</h4>
                <p className="text-sm opacity-80">Your vehicle and identity are protected with multi-layered security.</p>
              </div>
            </li>
          </ul>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <p className="text-sm italic opacity-70">"Finally, I can drive into the city without the stress of where to leave my car. Smart Parking changed my commute."</p>
            <div className="mt-4 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400"></div>
              <span className="text-xs font-semibold">— Sarah Jenkins, City Planner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-xl py-8">
          {authMode === 'login' && (
            <LoginForm 
              onToggleMode={() => handleToggleMode('register')} 
              onForgotPassword={() => handleToggleMode('forgot-password')}
              onSuccess={handleLoginSuccess}
            />
          )}
          {authMode === 'register' && (
            <RegisterForm onToggleMode={() => handleToggleMode('login')} />
          )}
          {authMode === 'forgot-password' && (
            <ForgotPasswordForm onToggleMode={() => handleToggleMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
