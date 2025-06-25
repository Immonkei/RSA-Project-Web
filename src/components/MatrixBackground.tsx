
import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const columnCount = Math.floor(window.innerWidth / 20); // Spacing between columns
    
    // Clear any existing columns
    container.innerHTML = '';
    
    // Create matrix columns
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column animate-matrix';
      
      // Randomize column properties
      column.style.left = `${i * 20}px`;
      column.style.animationDuration = `${10 + Math.random() * 15}s`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      // Generate random characters for the column
      const length = 15 + Math.floor(Math.random() * 25);
      let content = '';
      for (let j = 0; j < length; j++) {
        // Mix of numbers, letters and symbols for the matrix effect
        const char = Math.random() > 0.5 
          ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) // numbers
          : String.fromCharCode(33 + Math.floor(Math.random() * 94)); // symbols and letters
        content += char + '<br />';
      }
      
      column.innerHTML = content;
      container.appendChild(column);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        // Clear and regenerate on window resize
        container.innerHTML = '';
        const newColumnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < newColumnCount; i++) {
          const column = document.createElement('div');
          column.className = 'matrix-column animate-matrix';
          column.style.left = `${i * 20}px`;
          column.style.animationDuration = `${10 + Math.random() * 15}s`;
          column.style.animationDelay = `${Math.random() * 5}s`;
          
          const length = 15 + Math.floor(Math.random() * 25);
          let content = '';
          for (let j = 0; j < length; j++) {
            const char = Math.random() > 0.5 
              ? String.fromCharCode(48 + Math.floor(Math.random() * 10))
              : String.fromCharCode(33 + Math.floor(Math.random() * 94));
            content += char + '<br />';
          }
          
          column.innerHTML = content;
          container.appendChild(column);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="matrix-background"></div>;
};

export default MatrixBackground;
