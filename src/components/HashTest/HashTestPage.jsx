import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HashTest.css';

const HashTestPage = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const pages = [
    {
      emoji: '📜',
      title: 'Scroll-to-Section',
      desc: 'Test hash-based anchor navigation. Click links to scroll to sections and watch the URL hash update in real-time.',
      route: '/hashtest/sections',
      hashExample: '#overview, #pricing, #features',
    },
    {
      emoji: '📑',
      title: 'Tab Switching',
      desc: 'Switch between tabs using URL hash fragments. Supports deep-linking and browser back/forward navigation.',
      route: '/hashtest/tabs',
      hashExample: '#tab-dashboard, #tab-analytics',
    },
    {
      emoji: '🔧',
      title: 'Key-Value Params',
      desc: 'Build and parse complex hash parameters with key=value pairs. Test encoding, special characters, and presets.',
      route: '/hashtest/params',
      hashExample: '#key1=val1&key2=val2',
    },
  ];

  const referencePatterns = [
    { pattern: '#section-id', use: 'Scroll to element', example: 'page.html#contact' },
    { pattern: '#/route/path', use: 'Hash-based routing', example: 'app.html#/dashboard' },
    { pattern: '#key=value', use: 'Single parameter', example: 'page.html#tab=settings' },
    { pattern: '#k1=v1&k2=v2', use: 'Multiple parameters', example: 'page.html#lang=en&theme=dark' },
    { pattern: '#!fragment', use: 'Hashbang (AJAX crawl)', example: 'app.html#!/products/123' },
    { pattern: '#encoded%20val', use: 'URL-encoded values', example: 'page.html#q=hello%20world' },
  ];

  return (
    <div className="hashtest-container">
      <h1>🔗 Hash Parameter Test Suite</h1>
      <h2>Test URL hash (#) behaviors for support analysis</h2>

      <div className="hash-display-bar">
        <span className="label">Current Hash</span>
        <span className={`hash-value ${!currentHash ? 'empty' : ''}`}>
          {currentHash || '(none — no hash in URL)'}
        </span>
      </div>

      <div className="hashtest-links">
        {pages.map((page) => (
          <Link to={page.route} key={page.route} className="hashtest-link-card">
            <span className="card-emoji">{page.emoji}</span>
            <div className="card-title">{page.title}</div>
            <div className="card-desc">{page.desc}</div>
            <span className="card-route">{page.hashExample}</span>
          </Link>
        ))}
      </div>

      <div className="hashtest-card">
        <h3>📖 Hash Pattern Reference</h3>
        <table className="hash-ref-table">
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Use Case</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {referencePatterns.map((row) => (
              <tr key={row.pattern}>
                <td><code>{row.pattern}</code></td>
                <td>{row.use}</td>
                <td><code>{row.example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HashTestPage;
