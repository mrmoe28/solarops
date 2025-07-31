#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';

// Get the project path from command line argument or use current directory
const projectPath = process.argv[2] || process.cwd();
const absolutePath = path.resolve(projectPath);

console.log(`Opening ${absolutePath} in Cursor...`);

// Desktop Commander script to open Cursor and open a project
const script = `
  # Open Cursor application
  open -a "Cursor"
  
  # Wait for Cursor to fully load
  sleep 2
  
  # Use keyboard shortcut to open folder (Cmd+O)
  osascript -e 'tell application "System Events" to keystroke "o" using command down'
  
  # Wait for dialog to appear
  sleep 1
  
  # Type the project path
  osascript -e 'tell application "System Events" to keystroke "${absolutePath}"'
  
  # Press Enter to open
  osascript -e 'tell application "System Events" to key code 36'
`;

try {
  execSync(script, { shell: '/bin/bash', stdio: 'inherit' });
  console.log('Successfully opened project in Cursor!');
} catch (error) {
  console.error('Error opening Cursor:', error.message);
  process.exit(1);
}