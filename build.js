// // import esbuild from 'esbuild';

// // esbuild.build({
// //   entryPoints: ['public/index.js'],  // Updated path to 'public/index.js'
// //   bundle: true,
// //   outfile: 'dist/bundle.js',         // Output the bundled code here
// // }).catch(() => process.exit(1));


// require('esbuild').build({
//     entryPoints: ['./public/index.js'],  // Your main JS file
//     bundle: true,  // Bundle everything
//     outfile: 'dist/bundle.js',  // Output file
//     minify: true,  // Minify the output
//     sourcemap: true,  // Optional: Useful for debugging
//     external: ['@adyen/adyen-platform-experience-web'], // ✅ Mark as external to avoid bundling
//     platform: 'browser',  // Use browser compatibility
//     target: ['es2020'] // Or adjust to your needs
//   }).catch(() => process.exit(1));
  
  
  