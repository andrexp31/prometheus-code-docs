---
title: Debugging
category: Preserved Features
---

# Debugging

VS Code's built-in debugger is fully preserved in Prometheus Code: configure
the launch in `launch.json`, set breakpoints and debug with the Run and Debug
panel, all inside the editor.

## Configure with launch.json

Open the **Run and Debug** view (the ▶ icon in the activity bar) and choose
**Create a launch.json file**. The editor generates a template with launch
configurations for the project type it detects (Node.js, Python, etc.) in
`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/src/index.js"
    }
  ]
}
```

Pick the configuration in the dropdown on top and press **F5**.

## Breakpoints

A click on the left margin of the editor sets (or removes) a breakpoint: the
line is marked in red and execution stops there. You can also use `F9` to
toggle it without touching the mouse.

> **Tip:** breakpoints are saved with the workspace, so they are ready the
> next time you open the project.

## The debug panel

When execution stops, the panel shows the full state:

| Section | What it shows |
|---|---|
| Variables | the variables of the current scope, with live values |
| Call Stack | the stack up to the breakpoint |
| Watch | expressions you defined to follow |
| Debug Console | commands and logs in the program's context |

The standard controls are always at hand: **Continue** (F5), **Step Over**
(F10), **Step Into** (F11), **Step Out** (Shift+F11) and **Stop** (Shift+F5).

## What's next

- [Integrated Terminal](terminal) — run the project and watch its logs.
- [Git & Version Control](git) — commit the code you finished debugging.
- [Live Preview](live-preview) — the frontend live inside the editor.