import { useAuth } from '../context/AuthContext';
import './PlaceholderScreen.css';

function Home() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="placeholder-screen">
      <h2>You&apos;re signed in</h2>
      <p>Placeholder home screen.</p>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default Home;
