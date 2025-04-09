// This script is used as a pre-build step to set environment variables
// and patch modules that cause issues in Vercel's serverless env
process.env.ROLLUP_SKIP_LOAD_NATIVE_PLUGIN = 'true';
process.env.ROLLUP_NATIVE_DISABLE = 'true';

// Set a flag that the Node.js process can check
process.env.VERCEL_BUILD = 'true';

console.log('Running Vercel build with native module fixes...');

// Apply rollup patch to fix native module issues
try {
  console.log('Applying rollup native module patch...');
  require('./rollup-fix.js');
} catch (error) {
  console.warn('Error applying rollup patch:', error);
  // Continue anyway
}

// Run the normal build process
console.log('Starting build process...');
require('child_process').execSync('npm run build', {
  stdio: 'inherit',
  env: {
    ...process.env,
    ROLLUP_SKIP_LOAD_NATIVE_PLUGIN: 'true',
    ROLLUP_NATIVE_DISABLE: 'true'
  }
});