#!/bin/bash

# Get the project path from argument or use current directory
PROJECT_PATH="${1:-.}"
ABSOLUTE_PATH=$(cd "$PROJECT_PATH" && pwd)

echo "Opening $ABSOLUTE_PATH in Cursor using Desktop Commander..."

# Use desktop-commander to automate Cursor
desktop-commander << 'EOF'
{
  "commands": [
    {
      "type": "launch",
      "app": "Cursor"
    },
    {
      "type": "wait",
      "duration": 2000
    },
    {
      "type": "keystroke",
      "keys": ["cmd", "o"],
      "description": "Open folder dialog"
    },
    {
      "type": "wait",
      "duration": 1000
    },
    {
      "type": "type",
      "text": "'"$ABSOLUTE_PATH"'"
    },
    {
      "type": "keystroke",
      "key": "return",
      "description": "Confirm open"
    }
  ]
}
EOF

echo "Project opened in Cursor!"