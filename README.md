# Valkyrie Origins (Minecraft Bedrock Add-on)

Valkyrie Origins is a custom character class system for Minecraft Bedrock Edition. It introduces specialized "Origins" that provide unique powers and mechanical drawbacks, enhancing the roleplay and survival experience.

## 🚀 Features
- **Origin Selection UI**: A custom dialogue-based interface for selecting your class upon entering the world.
- **Advanced Scripting**: Uses the Minecraft Scripting API (JavaScript) for complex abilities and system management.
- **Custom Powers**: Includes unique mechanics like `cavePhobiaPower.js` and others that define each Origin's gameplay.

## 📥 How to Access & Install
The add-on is distributed via **GitHub Releases** for easy access to the latest and historical versions.

1. **Download the latest release**: Go to the [Releases page](https://github.com/thedza49/ValkyrieOrigins/releases) and download the `.mcaddon` file (e.g., `ValkyrieOrigins-v1.6.4.mcaddon`).
2. **Import to Minecraft**: 
   - **PC/Mobile**: Double-click or tap the file. Minecraft will launch and automatically import the packs.
3. **World Setup**:
   - Create a new world or edit an existing one.
   - Go to **Behavior Packs** and activate `Valkyrie Origins BP`.
   - Go to **Resource Packs** and activate `Valkyrie Origins RP`.
4. **⚠️ Critical Step**: In the **Experiments** menu of your world settings, you **must enable**:
   - **Beta APIs** (required for the JavaScript scripts to run).

## 📂 Repository Structure
- `BP/`: The Behavior Pack containing scripts, dialogues, and logic.
- `RP/`: The Resource Pack containing language files and visual assets.
- `package.sh`: A shell script used to bundle the packs into the `.mcaddon` format.

---
*Created by Daniel using OpenClaw.*
