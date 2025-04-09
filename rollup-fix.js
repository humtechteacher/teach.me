// Script to modify rollup's native module loading logic
// Used in vercel-build.js 
const fs = require('fs');
const path = require('path');

try {
  const nativePath = path.resolve('./node_modules/rollup/dist/native.js');
  if (fs.existsSync(nativePath)) {
    console.log('Patching rollup native module logic...');
    let content = fs.readFileSync(nativePath, 'utf8');
    
    // Replace the native module loading code to always use the JS implementation
    const patched = content.replace(
      /function requireWithFriendlyError.*?return require\(specifier\);/s,
      'function requireWithFriendlyError(specifier, description) { return null; }'
    );
    
    fs.writeFileSync(nativePath, patched);
    console.log('Successfully patched rollup native module!');
  } else {
    console.log('Rollup native.js not found, skipping patch');
  }
} catch (error) {
  console.error('Error patching rollup:', error);
  // Continue the build even if patching fails
}