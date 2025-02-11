#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { argv, cwd, env } from 'process';
import { cp } from 'node:fs/promises';

// Get the command-line arguments (skipping the first two elements)
const args = argv.slice(2);
const __workingDirectory = cwd().replace(/\\/g, '/');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (args[0] === 'dev') {
  console.log('Starting the development server...');

  const process = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname,
    env: {
      ...env,
      PUBLIC_DOCIZEN_ROOT: __dirname,
      PUBLIC_USER_ROOT: env.PUBLIC_USER_ROOT ?? __workingDirectory
    }
  });

} else {
  console.log('Building the project...');

  const process = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname,
    env: {
      ...env,
      PUBLIC_DOCIZEN_ROOT: __dirname,
      PUBLIC_USER_ROOT: env.PUBLIC_USER_ROOT ?? __workingDirectory
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
}
