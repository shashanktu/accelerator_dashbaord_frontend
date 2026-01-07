import { useState, useEffect } from "react";

function Manage() {
  const [activeTab, setActiveTab] = useState('devops');
  const [infrastructureTab, setInfrastructureTab] = useState('development');
  const [data, setData] = useState({
    healthCheck: null,
    devops: null,
    infrastructure: null
  });
  const [loading, setLoading] = useState(false);
  const [currentBot, setCurrentBot] = useState('resume-analyzer');

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const botType = urlParams.get('bot') || 'resume-analyzer';
    setCurrentBot(botType);
  }, []);



  const runHealthCheck = async () => {
    setIsRunning(true);
    try {
      const backendUrl = `${process.env.REACT_APP_BACKEND_URL || 'https://accelerator-management-backend.vercel.app'}/devops/${currentBot}`;
      console.log(`Running health check: ${backendUrl}`);
      
      const response = await fetch(backendUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log('Health check data received:', jsonData);
      setData(prev => ({ ...prev, healthCheck: jsonData }));
    } catch (error) {
      console.error('Error running health check:', error);
      setData(prev => ({ ...prev, healthCheck: { 
        error: 'Failed to run health check',
        message: error.message
      }}));
    }
    setIsRunning(false);
  };

  const renderComponentTiles = (components) => {
    if (!components || typeof components !== 'object') return null;
    
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px',
        marginTop: '15px'
      }}>
        {Object.entries(components).map(([componentName, componentData]) => (
          <div key={componentName} style={{
            backgroundColor: '#374151',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 2px 4px rgba(16,185,129,0.1)',
            overflow: 'hidden',
            minWidth: 0
          }}>
            <h4 style={{
              color: '#10b981',
              margin: '0 0 10px 0',
              fontSize: '16px',
              textTransform: 'capitalize'
            }}>
              {componentName.replace(/([A-Z])/g, ' $1')}
            </h4>
            {typeof componentData === 'object' ? (
              Object.entries(componentData).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '5px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '12px' }}>
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span style={{ 
                    color: '#ffffff', 
                    marginLeft: '5px', 
                    fontSize: '14px',
                    wordBreak: 'break-all',
                    overflowWrap: 'break-word',
                    display: 'block',
                    marginTop: '2px'
                  }}>
                    {renderValue(value)}
                  </span>
                </div>
              ))
            ) : (
              <span style={{ color: '#ffffff' }}>{String(componentData)}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const getCicdHref = (key, value, cicdData) => {
    switch (key) {
      case 'repositoryUrl':
      case 'buildPipelineUrl':
      case 'releasePipelineUrl':
        return value;
      case 'buildPipeline':
        return cicdData.buildPipelineUrl || '#';
      case 'releasePipeline':
        return cicdData.releasePipelineUrl || '#';
      default:
        return '#';
    }
  };

  const renderValue = (value) => {
    if (typeof value === 'string' && isUrl(value)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{
          color: '#10b981',
          textDecoration: 'underline'
        }}>
          {value}
        </a>
      );
    }
    return String(value);
  };



  const renderGridCards = (data) => {
    if (!data || typeof data !== 'object') return null;
    
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {Object.entries(data).filter(([key]) => key !== 'id' && key !== 'applicationName' && key !== 'repositoryUrl').map(([key, value]) => (
          <div key={key} style={{
            backgroundColor: '#374151',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(16,185,129,0.1)',
            overflow: 'hidden',
            minWidth: 0
          }}>
            <h4 style={{
              color: '#10b981',
              margin: '0 0 15px 0',
              fontSize: '18px',
              textTransform: 'capitalize',
              borderBottom: '1px solid #10b981',
              paddingBottom: '8px'
            }}>
              {key.replace(/([A-Z])/g, ' $1')}
            </h4>
            {typeof value === 'object' && value !== null ? (
              Array.isArray(value) ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px'
                }}>
                  {value.map((item, index) => (
                    <div key={index} style={{
                      backgroundColor: '#1f2937',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid #4b5563'
                    }}>
                      {typeof item === 'object' ? (
                        Object.entries(item).filter(([k]) => k !== 'id').map(([k, v]) => (
                          <div key={k} style={{ marginBottom: '6px' }}>
                            <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>
                              {k.replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div style={{ color: '#ffffff', fontSize: '12px', fontWeight: '500' }}>
                              {String(v)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span style={{ color: '#ffffff', fontSize: '12px' }}>{String(item)}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                Object.entries(value).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: '12px' }}>
                    <h5 style={{ color: '#10b981', fontSize: '14px', margin: '0 0 8px 0', textTransform: 'capitalize' }}>
                      {k.replace(/([A-Z])/g, ' $1')}
                    </h5>
                    {k === 'components' && typeof v === 'object' && v !== null ? (
                      renderComponentTiles(v)
                    ) : k === 'cicdPipeline' && typeof v === 'object' && v !== null ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '8px'
                      }}>
                        <div style={{
                          backgroundColor: '#1f2937',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #4b5563',
                          overflow: 'hidden',
                          minWidth: 0
                        }}>
                          <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>Repository URL</div>
                          <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>
                            {typeof v.repositoryUrl === 'string' && isUrl(v.repositoryUrl) ? (
                              <a
                                href={v.repositoryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#10b981',
                                  textDecoration: 'underline',
                                  fontWeight: '500',
                                  fontSize: '13px',
                                  wordBreak: 'break-all',
                                  cursor: 'pointer'
                                }}
                              >
                                {v.repositoryUrl}
                              </a>
                            ) : (
                              String(v.repositoryUrl || 'N/A')
                            )}
                          </div>
                        </div>
                        {Object.entries(v).filter(([subKey]) => subKey !== 'id').map(([subKey, subValue]) => (
                          <div key={subKey} style={{
                            backgroundColor: '#1f2937',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #4b5563'
                          }}>
                            <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>
                              {subKey.replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>
                              {typeof subValue === 'string' && isUrl(subValue) ? (
                                <a
                                  href={subValue}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#10b981',
                                    textDecoration: 'underline',
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    wordBreak: 'break-all',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {subValue}
                                </a>
                              ) : (
                                String(subValue)
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : typeof v === 'object' && v !== null ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '8px'
                      }}>
                        {Object.entries(v).filter(([subKey]) => subKey !== 'id').map(([subKey, subValue]) => (
                          <div key={subKey} style={{
                            backgroundColor: '#1f2937',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #4b5563'
                          }}>
                            <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>
                              {subKey.replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div style={{ 
                              color: '#ffffff', 
                              fontSize: '13px', 
                              fontWeight: '500',
                              wordBreak: 'break-all',
                              overflowWrap: 'break-word',
                              maxWidth: '100%'
                            }}>
                              {renderValue(subValue)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#ffffff', fontWeight: '500' }}>{renderValue(v)}</span>
                    )}
                  </div>
                ))
              )
            ) : (
              <span style={{ color: '#ffffff' }}>{String(value)}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const fetchAzureData = async (type) => {
    setLoading(true);
    try {
      const backendUrl = `${process.env.REACT_APP_BACKEND_URL || 'https://accelerator-management-backend.vercel.app'}/${type}/${currentBot}`;
      console.log(`Fetching: ${backendUrl}`);
      
      const response = await fetch(backendUrl);
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log(`${type} data received:`, jsonData);
      
      setData(prev => ({ ...prev, [type]: jsonData }));
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setData(prev => ({ ...prev, [type]: { 
        error: `Failed to load data for ${currentBot}`,
        message: error.message || 'Python backend server not running on port 8000'
      }}));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'devops' && !data.devops) {
      fetchAzureData('devops');
    } else if (activeTab === 'infrastructure' && !data.infrastructure) {
      fetchAzureData('infrastructure');
    }
  }, [activeTab, data]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#111827', color: '#ffffff', minHeight: '100vh' }}>
      <h1 style={{ color: '#10b981' }}>Manage</h1>
      
      <div style={{ marginTop: '30px' }}>
        <div style={{ borderBottom: '1px solid #374151' }}>
          <button
            onClick={() => setActiveTab('devops')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'devops' ? '#10b981' : 'transparent',
              color: activeTab === 'devops' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '4px 4px 0 0'
            }}
          >
            DevOps
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'infrastructure' ? '#10b981' : 'transparent',
              color: activeTab === 'infrastructure' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0'
            }}
          >
            Infrastructure
          </button>
             <button
            onClick={() => setActiveTab('health-check')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === 'health-check' ? '#10b981' : 'transparent',
              color: activeTab === 'health-check' ? '#ffffff' : '#9ca3af',
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '4px 4px 0 0'
            }}
          >
            Health Check
          </button>
       
        </div>
        
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1f2937', borderRadius: '4px', border: '1px solid #374151' }}>
          {loading && <p style={{ color: '#10b981' }}>Loading data from Python backend...</p>}
          
          {activeTab === 'health-check' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#10b981', textAlign: 'center', flex: 1 }}>Health Check - {currentBot.charAt(0).toUpperCase() + currentBot.slice(1)}</h3>
                <button
                  onClick={runHealthCheck}
                  disabled={isRunning}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isRunning ? '#374151' : '#10b981',
                    color: isRunning ? '#9ca3af' : '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {isRunning ? 'Running...' : 'Run Health Check'}
                </button>
              </div>
              {data.healthCheck ? (
                renderGridCards(data.healthCheck)
              ) : (
                <p style={{ color: '#9ca3af' }}>Click "Run Health Check" to fetch real-time data from Python backend.</p>
              )}
            </div>
          )}
          
          {activeTab === 'devops' && (
            <div>
              <h3 style={{ color: '#10b981', textAlign: 'center' }}>DevOps - {currentBot.charAt(0).toUpperCase() + currentBot.slice(1)}</h3>
              {data.devops ? (
                renderGridCards(data.devops)
              ) : (
                <p style={{ color: '#9ca3af' }}>Manage deployment pipelines and CI/CD processes.</p>
              )}
            </div>
          )}
          
          {activeTab === 'infrastructure' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#10b981', textAlign: 'center', flex: 1 }}>Infrastructure - {currentBot.charAt(0).toUpperCase() + currentBot.slice(1)}</h3>
                <div>
                  <button
                    onClick={() => console.log('Starting infrastructure...')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginRight: '10px'
                    }}
                  >
                    Start
                  </button>
                  <button
                    onClick={() => console.log('Stopping infrastructure...')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Stop
                  </button>
                </div>
              </div>
              {data.infrastructure ? (
                <div>
                  {data.infrastructure.environments && Object.keys(data.infrastructure.environments).length > 1 ? (
                    <div style={{ borderBottom: '1px solid #374151', marginBottom: '20px' }}>
                      {Object.keys(data.infrastructure.environments).map(env => (
                        <button
                          key={env}
                          onClick={() => setInfrastructureTab(env)}
                          style={{
                            padding: '8px 16px',
                            border: 'none',
                            backgroundColor: infrastructureTab === env ? '#10b981' : 'transparent',
                            color: infrastructureTab === env ? '#ffffff' : '#9ca3af',
                            cursor: 'pointer',
                            marginRight: '10px',
                            borderRadius: '4px 4px 0 0',
                            textTransform: 'capitalize'
                          }}
                        >
                          {env}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ borderBottom: '1px solid #374151', marginBottom: '20px' }}>
                      {Object.keys(data.infrastructure.environments).map(env => (
                        <button
                          key={env}
                          onClick={() => setInfrastructureTab(env)}
                          style={{
                            padding: '8px 16px',
                            border: 'none',
                            backgroundColor: infrastructureTab === env ? '#10b981' : 'transparent',
                            color: infrastructureTab === env ? '#ffffff' : '#9ca3af',
                            cursor: 'pointer',
                            marginRight: '10px',
                            borderRadius: '4px 4px 0 0',
                            textTransform: 'capitalize'
                          }}
                        >
                          {env}
                        </button>
                      ))}
                    </div>
                  )}
                  {data.infrastructure.environments && data.infrastructure.environments[infrastructureTab] ? (
                    renderComponentTiles(data.infrastructure.environments[infrastructureTab].components || {})
                  ) : (
                    renderGridCards(data.infrastructure)
                  )}
                </div>
              ) : (
                <p style={{ color: '#9ca3af' }}>Configure and monitor infrastructure resources.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manage;