import './PlaceholderScreen.css';

function Home({ onSignOut }) {
  const handleSignOut = () => {
    if (onSignOut) onSignOut(); // Stub: toggle to AuthStack for testing
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
