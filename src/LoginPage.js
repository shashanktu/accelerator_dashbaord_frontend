import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).then(() => {
      window.history.pushState({}, '', '/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }).catch(e => {
      console.error(e);
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Login</h1>
      <p>Please sign in with your Active Directory account</p>
      <button 
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign in with Microsoft
      </button>
    </div>
  );
}

export default LoginPage;