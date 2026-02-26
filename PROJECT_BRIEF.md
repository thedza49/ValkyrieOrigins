# PROJECT_BRIEF: Valkyrie Origins (Minecraft Bedrock Add-on)

**Date**: February 26, 2026
**Status**: v1.5 mcaddon generated

## 🎯 Overview
Valkyrie Origins is a custom Minecraft Bedrock Edition add-on that introduces specialized player "Origins" (character classes) with unique powers and drawbacks. This project focuses on high-quality scripting and custom UI for class selection.

## 🏗️ Architecture
- **Platform**: Minecraft Bedrock Edition
- **Structure**: mcaddon (BP: Behavior Pack, RP: Resource Pack)
- **Scripting**: Minecraft Scripting API (JavaScript)
- **Deployment**: Local `/home/daniel/.openclaw/workspace/ValkyrieOrigins` with a `package.sh` build script.

## 📊 Key Features & Systems
- **Origins Selection**: Custom dialogue-based UI for picking classes (stored in `BP/dialogue`).
- **Custom Powers**: Script-based abilities (e.g., `cavePhobiaPower.js`).
- **Initialization**: Managed via `valkyrie_origins_init.mcfunction`.
- **Packaging**: Automated `.mcaddon` generation via `package.sh`.

## 🚀 Transferable Context for Other AIs
- **Language**: JavaScript (Minecraft API).
- **Core Files**: 
    - `BP/scripts/index.js` (Entry point)
    - `BP/scripts/valkyrie.js` (Core logic)
    - `BP/manifest.json` (UUID and dependency management)
- **Current Milestone**: Version 1.5 successfully built.

## 📅 Recent Updates
- **Audit Completed**: Analysis of v1, v2, and v3 development cycles showed ~43M tokens of total reasoning/build effort.
- **Persistence**: Project files are centralized in the workspace for iterative development.
