function SimpleLogin({ onLogin }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#111827',
      color: '#ffffff'
    }}>
      <h1 style={{ color: '#10b981' }}>Login</h1>
      <p style={{ color: '#9ca3af' }}>Please sign in to access the dashboard</p>
      <button 
        onClick={onLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#10b981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign In
      </button>
    </div>
  );
}

export default SimpleLogin;