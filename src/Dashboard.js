import { useState, useEffect } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState('bots');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000'}/applications`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const getApplicationsByType = (type) => {
    return applications
      .filter(app => app.type === type)
      .map(app => ({
        id: app.id || app.applicationName,
        title: app.displayName,
        description: app.description || getDefaultDescription(app.applicationName, app.type),
        link1: `/${app.applicationName}`,
        link2: `/manage?bot=${app.applicationName}`
      }));
  };

  const getDefaultDescription = (name, type) => {
    const descriptions = {
      resumeanalyzer: "AI-powered tool for analyzing and scoring resumes with detailed feedback",
      chatbot: "Intelligent conversational bot for customer support and engagement",
      supportbot: "Automated support assistant for handling common customer queries",
      salesbot: "Lead qualification and sales assistance bot for converting prospects",
      faqbot: "Knowledge base bot for answering frequently asked questions",
      voicebot: "Voice-enabled conversational AI with speech recognition and synthesis",
      aiassistant: "Advanced AI assistant powered by OpenAI for complex task automation",
      l2technical: "Level 2 technical support automation and escalation management",
      tagaccelerator: "Technical Advisory Group accelerator for rapid solution deployment",
      analyticsengine: "Comprehensive data analytics platform with ML and BI capabilities",
      workflowautomation: "Business process automation with Logic Apps and serverless functions",
      integrationhub: "Centralized API management and system integration platform"
    };
    return descriptions[name] || `${type} application for enterprise solutions`;
  };

  const botsData = getApplicationsByType('bot');
  const acceleratorsData = getApplicationsByType('accelerator');
  const tscSolutionsData = getApplicationsByType('tsc-solution');

  const cardStyle = {
    border: '1px solid #374151',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#1f2937',
    boxShadow: '0 2px 4px rgba(16,185,129,0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: 'translateY(0)',
    color: '#ffffff'
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(16,185,129,0.2)',
    backgroundColor: '#374151',
    borderColor: '#10b981'
  };

  const linkStyle = {
    display: 'inline-block',
    margin: '5px 10px',
    padding: '8px 16px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const renderCards = (data) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '20px'
    }}>
      {data.map(item => (
        <div 
          key={item.id} 
          style={hoveredCard === item.id ? cardHoverStyle : cardStyle}
          onMouseEnter={() => setHoveredCard(item.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={{ color: '#10b981', marginBottom: '10px' }}>{item.title}</h3>
          <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '15px', lineHeight: '1.4' }}>{item.description}</p>
          <div>
            <a href={item.link1} target="_blank" rel="noopener noreferrer" style={linkStyle}>View</a>
            <a href={item.link2} style={linkStyle}>Dashboard</a>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#111827', color: '#ffffff', minHeight: '100vh' }}>
        <h1 style={{ color: '#10b981' }}>Dashboard</h1>
        <p style={{ color: '#10b981' }}>Loading applications...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#111827', color: '#ffffff', minHeight: '100vh' }}>
      <h1 style={{ color: '#10b981' }}>Dashboard</h1>
      
      <div style={{ marginTop: '30px' }}>
        <div style={{ borderBottom: '1px solid #374151' }}>
          <button
            onClick={() => setActiveTab('bots')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'bots' ? '#10b981' : 'transparent',
              color: activeTab === 'bots' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '4px 4px 0 0'
            }}
          >
            Bots
          </button>
          <button
            onClick={() => setActiveTab('accelerators')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'accelerators' ? '#10b981' : 'transparent',
              color: activeTab === 'accelerators' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '4px 4px 0 0'
            }}
          >
            Accelerators
          </button>
          <button
            onClick={() => setActiveTab('tsc-solutions')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'tsc-solutions' ? '#10b981' : 'transparent',
              color: activeTab === 'tsc-solutions' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0'
            }}
          >
            TSC - Solutions
          </button>
        </div>
        
        {activeTab === 'bots' && renderCards(botsData)}
        {activeTab === 'accelerators' && renderCards(acceleratorsData)}
        {activeTab === 'tsc-solutions' && renderCards(tscSolutionsData)}
      </div>
    </div>
  );
}

export default Dashboard;