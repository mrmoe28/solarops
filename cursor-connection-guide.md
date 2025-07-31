# How to Connect to Cursor Editor

## Overview
This guide explains how to open your Solar Ops project in the Cursor editor.

## Method 1: Using the Command Line

### Step 1: Open Terminal
Navigate to your project directory:
```bash
cd /Users/ekodevapps/Desktop/Solar\ Ops
```

### Step 2: Open in Cursor
Run the following command:
```bash
cursor .
```

## Method 2: Using the Shell Script

### Step 1: Make the Script Executable
First, ensure the `open-in-cursor.sh` script is executable:
```bash
chmod +x open-in-cursor.sh
```

### Step 2: Run the Script
Execute the script:
```bash
./open-in-cursor.sh
```

## Troubleshooting

### If 'cursor' Command Not Found
If you get a "command not found" error, you need to install the Cursor command in your PATH:

1. Open Cursor manually (from Applications)
2. Press `Cmd+Shift+P` to open Command Palette
3. Type "Install 'cursor' command in PATH"
4. Select and run the command
5. Restart your terminal
6. Try the `cursor .` command again

## What the Script Does
The `open-in-cursor.sh` script is a simple bash script that:
- Executes the command `cursor .`
- Opens the current directory in Cursor editor
- Provides a convenient way to launch Cursor from the project root

---
Generated on: ${new Date().toLocaleDateString()}