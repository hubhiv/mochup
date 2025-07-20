import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Check URL parameters for role and referrals
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const providerParam = params.get('provider_id');
    const boardParam = params.get('board_id');
    // If provider_id is in URL, this is likely a provider invitation
    if (providerParam) {
      setRole('provider');
    }
  }, [location.search]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await register(email, password, role);
      // Redirect based on role
      if (role === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/provider/dashboard');
      }
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Blooming Happy Living</h1>
            <p className="text-muted-foreground mt-2">Create your account</p>
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
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-2 border border-input rounded-md" placeholder="••••••••" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  I am registering as a
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <button type="button" onClick={() => setRole('customer')} className={`py-2 px-4 border rounded-md transition-colors ${role === 'customer' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-input'}`}>
                    Customer
                  </button>
                  <button type="button" onClick={() => setRole('provider')} className={`py-2 px-4 border rounded-md transition-colors ${role === 'provider' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-input'}`}>
                    Provider
                  </button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};