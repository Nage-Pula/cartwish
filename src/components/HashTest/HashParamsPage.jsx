import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HashTest.css';

const presets = [
  { label: 'UTM Campaign', hash: '#utm_source=email&utm_medium=newsletter&utm_campaign=spring_sale' },
  { label: 'User Prefs', hash: '#theme=dark&lang=en&sidebar=collapsed' },
  { label: 'Filter State', hash: '#category=electronics&sort=price_asc&page=2' },
  { label: 'Debug Mode', hash: '#debug=true&verbose=1&env=staging' },
  { label: 'Special Chars', hash: '#q=hello%20world&name=John%26Jane&path=%2Fhome%2Fuser' },
  { label: 'Empty Value', hash: '#key1=&key2=value2&key3=' },
];

const parseHash = (hash) => {
  const cleanHash = hash.replace(/^#/, '');
  if (!cleanHash) return [];
  return cleanHash.split('&').map((pair) => {
    const eqIndex = pair.indexOf('=');
    if (eqIndex === -1) return { key: decodeURIComponent(pair), value: '' };
    return {
      key: decodeURIComponent(pair.substring(0, eqIndex)),
      value: decodeURIComponent(pair.substring(eqIndex + 1)),
    };
  });
};

const buildHash = (params) => {
  if (params.length === 0) return '';
  return '#' + params.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
};

const HashParamsPage = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [params, setParams] = useState(parseHash(window.location.hash));
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash);
      setParams(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const updateHash = (newParams) => {
    const hash = buildHash(newParams);
    window.location.hash = hash.replace('#', '') || ' ';
    if (!hash) {
      // Remove the hash entirely
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setCurrentHash('');
      setParams([]);
    }
  };

  const addParam = () => {
    if (!newKey.trim()) return;
    const updated = [...params, { key: newKey.trim(), value: newValue }];
    setParams(updated);
    updateHash(updated);
    setNewKey('');
    setNewValue('');
  };

  const removeParam = (index) => {
    const updated = params.filter((_, i) => i !== index);
    setParams(updated);
    updateHash(updated);
  };

  const clearAll = () => {
    setParams([]);
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setCurrentHash('');
  };

  const applyPreset = (hash) => {
    window.location.hash = hash.replace('#', '');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addParam();
  };

  return (
    <div className="hashtest-container">
      <Link to="/hashtest" className="hashtest-back">← Back to Hash Test Suite</Link>
      <h1>🔧 Key-Value Hash Parameters</h1>
      <h2>Build, parse, and manipulate hash parameters in real-time</h2>

      <div className="hash-display-bar">
        <span className="label">Current Hash</span>
        <span className={`hash-value ${!currentHash ? 'empty' : ''}`}>
          {currentHash || '(none)'}
        </span>
      </div>

      {/* Presets */}
      <div className="hashtest-card">
        <h3>⚡ Quick Presets</h3>
        <p style={{ marginBottom: '1rem' }}>Click a preset to instantly set the hash to a common pattern:</p>
        <div className="hash-presets">
          {presets.map((preset) => (
            <button
              key={preset.label}
              className="hash-btn hash-btn-secondary"
              onClick={() => applyPreset(preset.hash)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Parameter Form */}
      <div className="hashtest-card">
        <h3>➕ Add Parameter</h3>
        <div className="hash-form-row">
          <input
            type="text"
            className="hash-input"
            placeholder="Key (e.g. utm_source)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            className="hash-input"
            placeholder="Value (e.g. email)"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="hash-btn hash-btn-primary" onClick={addParam}>
            Add
          </button>
          <button className="hash-btn hash-btn-danger" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>

      {/* Parsed Parameters Table */}
      <div className="hashtest-card">
        <h3>📋 Parsed Hash Parameters ({params.length})</h3>
        {params.length === 0 ? (
          <div className="hash-empty">No hash parameters set. Add parameters above or use a preset.</div>
        ) : (
          <table className="hash-kv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Key</th>
                <th>Value</th>
                <th>Encoded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {params.map((p, i) => (
                <tr key={i}>
                  <td style={{ color: '#555' }}>{i + 1}</td>
                  <td style={{ color: '#6457f9' }}>{p.key}</td>
                  <td>{p.value || <span style={{ color: '#555', fontStyle: 'italic' }}>(empty)</span>}</td>
                  <td style={{ color: '#43bf47', fontSize: '0.8rem' }}>
                    {encodeURIComponent(p.key)}={encodeURIComponent(p.value)}
                  </td>
                  <td>
                    <button className="remove-btn" onClick={() => removeParam(i)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HashParamsPage;
