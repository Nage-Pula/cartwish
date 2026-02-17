import React from "react";
import "./ScrollableTabs.css";

const tabs = [
  "All", "OPEN", "IN PROGRESS", "PENDING CONFIRMATION",
  "COMPLETED", "INVOICED", "ORIG. ETA MISSED", "VOID",
  "COMPLETED PROCESSING", "RESOLUTION CODES", "EXTRA 1", "EXTRA 2"
];

const ScrollableTabs = () => {
  return (
    <div className="scrollable-tabs-bar">
      {tabs.map((tab) => (
        <div key={tab} className="scrollable-tab">
          {tab}
        </div>
      ))}
    </div>
  );
};

export default ScrollableTabs;