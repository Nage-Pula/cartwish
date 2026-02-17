import React, { useEffect, useRef } from "react";

const IFrameParentPage = () => {
  const iframeRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (iframeRef.current) {
        const scrollTop = window.scrollY || window.pageYOffset;
        iframeRef.current.contentWindow.postMessage({ scrollTop }, "*");
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleSidebarScroll = (event) => {
    if (iframeRef.current) {
        const scrollTop = event.currentTarget.scrollTop; // Get the scrollTop from the sidebar
        iframeRef.current.contentWindow.postMessage({ scrollTop }, "*"); // Send it to the iframe
    }
};
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Side Navigation Bar */}
      <nav 
    style={{ 
        width: '200px', 
        background: '#f0f0f0', 
        padding: '20px',
        height: '100vh', /* Full height */
        overflowY: 'auto' /* Allow scrolling */
    }}
    onScroll={handleSidebarScroll} // Add this to enable scroll syncing
>
      
        <h3>Navigation</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="#section1">Section 1</a></li>
          <li><a href="#section2">Section 2</a></li>
          <li><a href="#section3">Section 3</a></li>
          <li><a href="#section4">Section 4</a></li>
        </ul>
        
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: "100px", background: "#ececec", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0 }}>Scroll Down To See the Iframe</h2>
        </header>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <iframe
            ref={iframeRef}
            src="s"
            title="PX Iframe Demo"
            style={{
              width: "100%", // Full width
              height: "100%", // Occupy full height within here
              border: "none", // Remove borders
              background: "white",
              overflow:"hidden",
            }}
          />
        </div>

        <footer style={{ height: "100px", background: "#ececec", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ margin: 0 }}>Footer Content Here</h3>
        </footer>
      </div>
    </div>
  );
};

export default IFrameParentPage;

