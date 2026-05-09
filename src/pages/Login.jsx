import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, Sparkles, Heart, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Floating icons */}
        <Heart className="absolute top-20 left-20 text-white/20 animate-float" size={40} />
        <Heart className="absolute bottom-20 right-20 text-white/20 animate-float delay-1000" size={30} />
        <Shield className="absolute top-40 right-40 text-white/20 animate-float delay-500" size={35} />
      </div>

      <div className="relative w-full max-w-md p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-4">
            <Activity className="text-white" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DigiMed</h1>
          <p className="text-blue-100">AI-Powered Hospital Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 group-hover:text-white transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white placeholder-white/60 transition-all"
                  placeholder="admin@digimed.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 group-hover:text-white transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white placeholder-white/60 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              ) : (
                <>
                  Sign In <Sparkles size={18} />
                </>
              )}
            </button>

            <div className="text-center text-sm text-blue-100">
              <p>Demo Credentials</p>
              <p className="font-mono text-xs mt-2 bg-white/10 inline-block px-3 py-1 rounded-full">
                any@email.com / any password
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200 text-sm">
          <p>© 2026 DigiMed. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;