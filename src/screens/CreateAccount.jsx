import { useNavigate } from 'react-router-dom';
import './PlaceholderScreen.css';

function CreateAccount() {
  const navigate = useNavigate();

  return (
    <div className="placeholder-screen">
      <h2>Create Account</h2>
      <p>Placeholder screen — form to be added in a later slice.</p>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default CreateAccount;
