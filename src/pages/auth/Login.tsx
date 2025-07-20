import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      // Get user from localStorage since it's just been set
      const storedUser = localStorage.getItem('bhl_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Redirect based on user role
        if (user.role === 'customer') {
          navigate('/customer/dashboard');
        } else if (user.role === 'provider') {
          navigate('/provider/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Blooming Happy Living</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account
            </p>
          </div>
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border border-input rounded-md" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border border-input rounded-md" placeholder="••••••••" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm">
              Demo accounts: <br />
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                customer@example.com
              </code>
              ,
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                provider@example.com
              </code>
              ,
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                admin@example.com
              </code>
              <br />
              Password:{' '}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                password
              </code>
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};