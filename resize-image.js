import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the source image
const sourcePath = path.join(__dirname, 'server', 'public', 'profile-picture.jpg');
// Path to save the resized image
const outputPath = path.join(__dirname, 'server', 'public', 'profile-picture-small.jpg');

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.error('Source file not found:', sourcePath);
  process.exit(1);
}

// Resize the image
sharp(sourcePath)
  .resize(150, 150, {
    fit: 'cover',
    position: 'center'
  })
  .toFile(outputPath)
  .then(() => {
    if (process.env.DEBUG_LOGS === 'true') {
      console.log(`Successfully resized image to ${outputPath}`);
    }
  })
  .catch(err => {
    console.error('Error resizing image:', err);
  });