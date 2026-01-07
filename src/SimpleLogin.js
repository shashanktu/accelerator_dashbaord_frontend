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
      color: '#ffffff',
      backgroundImage: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
    }}>
      <div style={{
        backgroundColor: '#1f2937',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        border: '1px solid #374151',
        textAlign: 'center',
        minWidth: '350px'
      }}>
        <h1 style={{ 
          color: '#10b981', 
          marginBottom: '10px',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>Bots Dashboard</h1>
        <p style={{ 
          color: '#9ca3af', 
          marginBottom: '30px',
          fontSize: '16px'
        }}>Please sign in to access the dashboard</p>
        <button 
          onClick={onLogin}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SimpleLogin;