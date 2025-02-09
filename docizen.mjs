#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cwd, env } from 'process';
import { cp } from 'node:fs/promises';

console.log('Building the project...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __workingDirectory = cwd().replace(/\\/g, '/');

const process = spawn('npm', ['run', 'build'], { 
  stdio: 'inherit', 
  shell: true, 
  cwd: __dirname,
  env: {
    ...env,
    DOCIZEN_ROOT: __workingDirectory
  }
});

process.on('close', async (code) => {
  if (code === 0) {
    console.log('Build succeeded. Copying files...');
    try {
      await cp(
        join(__dirname, 'dist'), 
        join(__workingDirectory, 'dist'), 
        { recursive: true }
      );
      console.log('Copying files completed!');
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log(`npm run build exited with code ${code}`);
  }
});

// process.on('close', (code) => {
//   console.log(`npm run dev exited with code ${code}`);
// });
