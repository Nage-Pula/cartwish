import React from 'react';

const IFrameComponent = ({ src, title, width, height }) => {
  return (
    <iframe
      src="/iFrame/index.html"
      title="iFrame"
      width={600}
      height={400}
      style={{ border: 10, borderColor: 'black', borderStyle: 'solid' }}
    />
  );
};

export default IFrameComponent;