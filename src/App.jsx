import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthEntry from './screens/AuthEntry';
import EmailSignIn from './screens/EmailSignIn';
import CreateAccount from './screens/CreateAccount';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-mint-bg)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-light-gray)',
      }}>
        Loading…
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          /* AppStack */
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* AuthStack */
          <>
            <Route path="/auth" element={<AuthEntry />} />
            <Route path="/auth/sign-in" element={<EmailSignIn />} />
            <Route path="/auth/create-account" element={<CreateAccount />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
