import React from 'react';

function HomePage() {
    // Define the updated smaller, cuter ASCII art book
    const cuteAsciiBookArt = `
   _______
  /       \\
 /  O   O  \\
            |     ^     |
            |   \\___/   |   ~*~*~*
            \\_______/      *~*~*
            |     |      ~*~*~*
            |     |     *~*~*~*
            |     |    
 /       \\
/_________\\
   Thank you for
 visiting our library!
    `;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {/* Display the updated ASCII art book inside a <pre> tag to preserve formatting */}
            <pre style={{
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '18px',
                whiteSpace: 'pre-wrap',  // Allow wrapping while preserving whitespace
                wordWrap: 'break-word',  // Ensure it breaks lines instead of overflowing
                textAlign: 'center',
                margin: '0 auto',
                maxWidth: '80%',  // Adjust max width to ensure it doesn’t overflow the screen
                color: '#2c3e50'  // Make the text dark for better readability
            }}>
                {cuteAsciiBookArt}
            </pre>

            {/* Stylish thank you message */}
            <h2 style={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                fontSize: '30px',
                color: '#FF6347',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                marginTop: '20px'
            }}>
                Thank you for visiting our library!
            </h2>
        </div>
    );
}

export default HomePage;
