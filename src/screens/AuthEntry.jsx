import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthEntry.css';

function AuthEntry() {
  const navigate = useNavigate();
  const { signInAsGuest, isFirebaseConfigured } = useAuth();
  const [guestLoading, setGuestLoading] = useState(false);
  const [guestError, setGuestError] = useState(null);

  const handleSignInWithEmail = () => navigate('/auth/sign-in');
  const handleCreateAccount = () => navigate('/auth/create-account');
  const handleForgotPassword = () => navigate('/auth/forgot-password');
  const handleContinueWithGoogle = () => {}; // Not implemented yet

  const handleContinueAsGuest = async () => {
    setGuestError(null);
    setGuestLoading(true);
    try {
      await signInAsGuest();
    } catch (err) {
      setGuestError(err.message || 'Could not sign in as guest. Please try again.');
    } finally {
      setGuestLoading(false);
    }
  };

  const handleGetStarted = () => {}; // Stub

  return (
    <div className="auth-entry">
      <div className="auth-entry__content">
        {/* Logo */}
        <div className="auth-entry__logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="var(--color-primary-green)" />
            <path
              d="M12 28 L18 24 L24 28 L30 22 L36 26"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="auth-entry__title">RehabFit</h1>
        <p className="auth-entry__subtitle">
          Sign in to save plans and track recovery safely.
        </p>

        {!isFirebaseConfigured && (
          <p className="auth-entry__notice">Firebase is not configured yet.</p>
        )}
        {/* Auth actions */}
        <div className="auth-entry__actions">
          <button
            type="button"
            className="auth-entry__btn auth-entry__btn--secondary"
            onClick={handleContinueWithGoogle}
            disabled={!isFirebaseConfigured}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="auth-entry__btn auth-entry__btn--secondary"
            onClick={handleSignInWithEmail}
          >
            Sign in with email
          </button>
        </div>

        {/* Secondary links */}
        <div className="auth-entry__links">
          <button
            type="button"
            className="auth-entry__link"
            onClick={handleCreateAccount}
          >
            Create account
          </button>
          <span className="auth-entry__links-sep">·</span>
          <button
            type="button"
            className="auth-entry__link"
            onClick={handleForgotPassword}
          >
            Forgot password
          </button>
        </div>
      </div>

      {/* Bottom CTA area */}
      <div className="auth-entry__footer">
        {guestError && (
          <p className="auth-entry__error" role="alert">
            {guestError}
          </p>
        )}
        <button
          type="button"
          className="auth-entry__btn auth-entry__btn--primary"
          onClick={handleGetStarted}
        >
          Get Started →
        </button>
        <button
          type="button"
          className="auth-entry__guest"
          onClick={handleContinueAsGuest}
          disabled={guestLoading || !isFirebaseConfigured}
        >
          {guestLoading ? 'Signing in…' : 'Continue as Guest'}
        </button>
      </div>
    </div>
  );
}

export default AuthEntry;
