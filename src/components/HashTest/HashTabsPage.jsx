import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HashTest.css';

const tabs = [
  {
    id: 'tab-dashboard',
    label: '📊 Dashboard',
    title: 'Dashboard Panel',
    content:
      'This is the Dashboard tab. The URL hash is now #tab-dashboard. Try copying this full URL and opening it in a new browser tab — the Dashboard tab should be pre-selected automatically. This tests deep-linking support via hash fragments. Analytics tools should track this as a distinct page state or virtual page view.',
  },
  {
    id: 'tab-analytics',
    label: '📈 Analytics',
    title: 'Analytics Panel',
    content:
      'Welcome to the Analytics tab. The hash has changed to #tab-analytics. Each tab switch creates a new browser history entry, so pressing the Back button should return you to the previous tab. This is a common pattern in single-page applications (SPAs) and is useful for testing whether your tracking tools fire events on hash changes.',
  },
  {
    id: 'tab-settings',
    label: '⚙️ Settings',
    title: 'Settings Panel',
    content:
      'You are now on the Settings tab with hash #tab-settings. This tab demonstrates how UI state can be entirely driven by the URL hash. If you refresh the page, the Settings tab should remain selected because the component reads the hash on mount. This is an important test case for session replay tools and URL-based state management.',
  },
  {
    id: 'tab-notifications',
    label: '🔔 Notifications',
    title: 'Notifications Panel',
    content:
      'The Notifications tab (#tab-notifications) shows how additional tabs can be added to the hash-driven system. Notice that the tab bar, the URL hash, and the displayed content are all synchronized. Try rapidly switching between tabs — all transitions should be smooth and the hash should update instantly without any page reload.',
  },
];

const HashTabsPage = () => {
  const getTabFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return tabs.find((t) => t.id === hash) ? hash : tabs[0].id;
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const matchedTab = tabs.find((t) => t.id === hash);
      if (matchedTab) {
        setActiveTab(matchedTab.id);
      }
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const switchTab = (tabId) => {
    window.location.hash = tabId;
    setActiveTab(tabId);
  };

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className="hashtest-container">
      <Link to="/hashtest" className="hashtest-back">← Back to Hash Test Suite</Link>
      <h1>📑 Tab Switching via Hash</h1>
      <h2>Each tab is driven by the URL hash fragment</h2>

      <div className="hash-display-bar">
        <span className="label">Current Hash</span>
        <span className={`hash-value ${!currentHash ? 'empty' : ''}`}>
          {currentHash || '(none)'}
        </span>
      </div>

      <div className="hash-tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`hash-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="hash-tab-content">
        {activeTabData && (
          <>
            <h3>{activeTabData.title}</h3>
            <p>{activeTabData.content}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="section-id-badge">#{activeTabData.id}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HashTabsPage;
