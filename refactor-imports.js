const fs = require('fs');
const path = require('path');

const importMappings = {
  '@/features/auth/': '@/features/auth/',
  '@/features/dashboard/': '@/features/dashboard/',
  '@/features/vendors/': '@/features/vendors/',
  '@/features/events/': '@/features/events/',
  '@/features/payments/': '@/features/payments/',
  '@/features/tasks/': '@/features/tasks/',
  '@/features/messages/': '@/features/messages/',
  '@/features/bookings/': '@/features/bookings/',
  '@/core/contexts/': '@/core/contexts/',
  '@/core/hooks/': '@/core/hooks/',
  '@/shared/lib/': '@/shared/lib/'
};

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  Object.entries(importMappings).forEach(([oldPath, newPath]) => {
    if (content.includes(oldPath)) {
      content = content.replace(new RegExp(oldPath, 'g'), newPath);
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in: ${filePath}`);
  }
}

// Process all TypeScript/JavaScript files
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      updateImports(filePath);
    }
  });
}

processDirectory('.');
