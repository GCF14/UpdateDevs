const fs = require('fs');
const path = require('path');

// Paths
const appDir = path.join(__dirname, '..', 'app');
const appExampleDir = path.join(__dirname, '..', 'app-example');

// Check if app directory exists
if (fs.existsSync(appDir)) {
  // Create app-example directory if it doesn't exist
  if (!fs.existsSync(appExampleDir)) {
    fs.mkdirSync(appExampleDir);
  }

  // Move files from app to app-example
  const files = fs.readdirSync(appDir);
  files.forEach(file => {
    const srcPath = path.join(appDir, file);
    const destPath = path.join(appExampleDir, file);
    
    // Skip if the file already exists in app-example
    if (!fs.existsSync(destPath)) {
      if (fs.lstatSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });

  // Remove app directory and recreate it
  fs.rmSync(appDir, { recursive: true, force: true });
  fs.mkdirSync(appDir);

  // Create a new index.tsx file
  const indexContent = `import { Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Fresh start!</Text>
    </View>
  );
}
`;

  fs.writeFileSync(path.join(appDir, 'index.tsx'), indexContent);
  
  console.log('Project reset successfully!');
  console.log('Original files moved to app-example/');
  console.log('New app/ directory created with fresh index.tsx');
} else {
  console.error('Error: app directory not found');
}