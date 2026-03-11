import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInAnonymously,
} from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Enable a developer fallback so the app can be used without a real
  // Firebase project. Set VITE_FAKE_AUTH=true in your .env to enable.
  const useFakeAuth = import.meta.env.VITE_FAKE_AUTH === 'true';

  useEffect(() => {
    if (!auth && useFakeAuth) {
      // read persisted fake user (if any)
      const stored = localStorage.getItem('fakeAuthUser');
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    if (auth) await firebaseSignOut(auth);
    else if (useFakeAuth) {
      localStorage.removeItem('fakeAuthUser');
      setUser(null);
    }
  };

  const signInAsGuest = async () => {
    if (auth) {
      await signInAnonymously(auth);
      return;
    }

    if (useFakeAuth) {
      // create a simple fake anonymous user and persist it locally
      const fakeUser = { uid: `guest_${Date.now()}`, isAnonymous: true };
      localStorage.setItem('fakeAuthUser', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return;
    }

    throw new Error('Firebase is not configured');
  };

  const signInWithEmail = async (email, password) => {
    if (auth) {
      return await signInWithEmailAndPassword(auth, email, password);
    }

    if (useFakeAuth) {
      const fakeUser = { uid: `user_${Date.now()}`, email };
      localStorage.setItem('fakeAuthUser', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return fakeUser;
    }

    throw new Error('Firebase is not configured');
  };

  const createAccountWithEmail = async (email, password) => {
    if (auth) {
      return await createUserWithEmailAndPassword(auth, email, password);
    }

    if (useFakeAuth) {
      const fakeUser = { uid: `user_${Date.now()}`, email };
      localStorage.setItem('fakeAuthUser', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return fakeUser;
    }

    throw new Error('Firebase is not configured');
  };

  const sendPasswordReset = async (email) => {
    if (auth) {
      return await sendPasswordResetEmail(auth, email);
    }

    if (useFakeAuth) {
      // noop in fake auth
      return;
    }

    throw new Error('Firebase is not configured');
  };

  const value = {
    user,
    loading,
    signOut,
    signInAsGuest,
    // expose a combined flag so UI can enable guest flow in dev
    isFirebaseConfigured: isFirebaseConfigured || useFakeAuth,
    // email/password helpers
    signInWithEmail,
    createAccountWithEmail,
    sendPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
