# Valkyrie Origins (Minecraft Bedrock Add-on)

Valkyrie Origins is a custom character class system for Minecraft Bedrock Edition. It introduces specialized "Origins" that provide unique powers and mechanical drawbacks, enhancing the roleplay and survival experience.

## 🎯 Overview
This project focuses on high-quality scripting and custom UI for class selection. It uses the Minecraft Scripting API (JavaScript) for complex abilities and system management.

## 🚀 Features & Systems
- **Origin Selection UI**: A custom dialogue-based interface for selecting your class upon entering the world (stored in `BP/dialogue`).
- **Advanced Scripting**: Uses JavaScript for core mechanics (e.g., `valkyrie.js`).
- **Custom Powers**: Includes unique mechanics like `cavePhobiaPower.js` and others that define each Origin's gameplay.
- **Initialization**: Automated setup via `valkyrie_origins_init.mcfunction`.

## 🏗️ Architecture
- **Structure**: standard `.mcaddon` format (Behavior Pack + Resource Pack).
- **Packaging**: Automated bundling via `package.sh` and `release.sh`.
- **Core Files**: 
    - `BP/scripts/index.js` (Entry point)
    - `BP/manifest.json` (UUID and dependency management)

## 📥 How to Access & Install
The add-on is distributed via **GitHub Releases** for easy access to the latest and historical versions.

1. **Download the latest release**: Go to the [Releases page](https://github.com/thedza49/ValkyrieOrigins/releases) and download the `.mcaddon` file.
2. **Import to Minecraft**: Double-click or tap the file.
3. **World Setup**: Activate both BP and RP in your world settings.
4. **⚠️ Critical Step**: Enable **Beta APIs** in the Experiments menu.

## 🗺️ Mini Roadmap

- [ ] **Power Balancing**: Review the performance of `cavePhobiaPower` and other scripts to ensure no server lag during high player counts.
- [ ] **Release Automation**: Integrate `package.sh` with a GitHub Action to automate `.mcaddon` creation on every push.
- [ ] **New Origin Concepting**: Researching potential new classes based on user feedback.

---
*Created by Daniel using OpenClaw.*
