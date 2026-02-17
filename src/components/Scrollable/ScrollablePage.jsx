import React from 'react';
import ScrollableTabs from './ScrollableTabs';
import './ScrollableTabs.css'; // Already created

const ScrollablePage = () => {
  return (
    <div>
      <h2 style={{textAlign:"center", margin: "2rem 0"}}>Scrollable Tabs Demo</h2>
      <ScrollableTabs />
      <div style={{marginTop: "2rem", textAlign: "center", color: "#666"}}>
        {/* You can add more content below if you want */}
        Scroll this tab bar horizontally on desktop to test mapping and overlay behavior.<br />
        On smaller screens, tabs convert to vertical layout.
      </div>
    </div>
  );
}

export default ScrollablePage;