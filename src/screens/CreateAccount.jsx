import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PlaceholderScreen.css';

function CreateAccount() {
  const navigate = useNavigate();
  const { createAccountWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createAccountWithEmail(email, password);
      // on success auth state will change and routing will switch
    } catch (err) {
      setError(err.message || 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placeholder-screen">
      <h2>Create Account</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</button>
          <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
