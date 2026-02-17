import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HashTest.css';

const sections = [
  {
    id: 'overview',
    title: '🌟 Overview',
    content:
      'This is the Overview section. When you click the "Overview" link above, the URL hash updates to #overview and the page smoothly scrolls here. Analytics tools like Gainsight PX, Google Analytics, and Mixpanel can track this hash change as a virtual page view or an event. This is one of the most common uses of URL hash fragments on the web.',
  },
  {
    id: 'pricing',
    title: '💰 Pricing',
    content:
      'Welcome to the Pricing section. Hash-based navigation is commonly used on landing pages to link directly to pricing tables. Notice the URL bar — it now shows #pricing. You can share this URL and anyone opening it will land directly on this section. This helps test deep-linking behavior via hash fragments.',
  },
  {
    id: 'features',
    title: '🚀 Features',
    content:
      'The Features section demonstrates another anchor point. Each section has a unique ID that the hash references. The browser natively supports scrolling to elements by ID when the hash matches. This is useful to test whether your analytics tools correctly capture the hashchange event and attribute it to the right page section.',
  },
  {
    id: 'faq',
    title: '❓ FAQ',
    content:
      'This FAQ section is typically placed near the bottom of a page. Hash navigation allows users to jump directly here from a table of contents or navigation bar. Test question: does your analytics tool fire a new page view event when the hash changes, or does it only track full path changes? This section helps you verify that behavior.',
  },
  {
    id: 'contact',
    title: '📬 Contact',
    content:
      'The Contact section is the final anchor on this page. After navigating through all sections, try using the browser\'s back and forward buttons. Each hash change should create a new history entry, allowing you to navigate backward through the sections you visited. This tests the browser history integration with hash fragments.',
  },
];

const HashSectionsPage = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Scroll to hash on initial load
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = (id) => {
    window.location.hash = id;
  };

  return (
    <div className="hashtest-container">
      <Link to="/hashtest" className="hashtest-back">← Back to Hash Test Suite</Link>
      <h1>📜 Scroll-to-Section Hash Test</h1>
      <h2>Click a section link to update the URL hash and scroll</h2>

      <div className="hash-display-bar">
        <span className="label">Current Hash</span>
        <span className={`hash-value ${!currentHash ? 'empty' : ''}`}>
          {currentHash || '(none)'}
        </span>
      </div>

      <div className="hash-section-nav">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={currentHash === `#${s.id}` ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(s.id);
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {s.title}
          </a>
        ))}
      </div>

      {sections.map((s) => (
        <div key={s.id} id={s.id} className="hash-section">
          <span className="section-id-badge">#{s.id}</span>
          <h3>{s.title}</h3>
          <p>{s.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HashSectionsPage;
