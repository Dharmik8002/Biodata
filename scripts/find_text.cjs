const fs = require('fs');
const content = fs.readFileSync('node_modules/html2canvas/dist/html2canvas.esm.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('bounds') && (line.includes('text') || line.includes('Range'))) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
