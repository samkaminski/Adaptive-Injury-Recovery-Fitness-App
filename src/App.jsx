import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthEntry from './screens/AuthEntry';
import EmailSignIn from './screens/EmailSignIn';
import CreateAccount from './screens/CreateAccount';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';

function App() {
  // Temporary state for testing AuthStack vs AppStack toggle (Slice 1)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          /* AppStack */
          <>
            <Route path="/" element={<Home onSignOut={() => setIsAuthenticated(false)} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* AuthStack */
          <>
            <Route
              path="/auth"
              element={
                <AuthEntry
                  onStubSignIn={() => setIsAuthenticated(true)}
                />
              }
            />
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
