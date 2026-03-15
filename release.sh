#!/bin/bash
# Release script for Valkyrie Origins

echo "🚀 Starting release process..."

# 1. Increment version and package
echo "📦 Incrementing version and packaging..."
PROJECT_DIR=$(pwd)
NEW_VERSION=$(python3 increment_version.py)
PACKAGE_NAME="ValkyrieOrigins-v$NEW_VERSION.mcaddon"

# Create package
BUILD_DIR=$(mktemp -d)
cp -r BP "$BUILD_DIR/"
cp -r RP "$BUILD_DIR/"
cd "$BUILD_DIR" || exit 1
zip -r "$PROJECT_DIR/$PACKAGE_NAME" . > /dev/null
cd - > /dev/null
rm -rf "$BUILD_DIR"

echo "✅ Created $PACKAGE_NAME"

# 2. Commit and Push
echo "📤 Committing and pushing changes to GitHub..."
git add BP/manifest.json RP/manifest.json README.md
git commit -m "chore: release v$NEW_VERSION"
git push origin master

# 3. Create GitHub Release
echo "🐙 Creating GitHub Release v$NEW_VERSION..."
gh release create "v$NEW_VERSION" "$PACKAGE_NAME" \
    --title "Valkyrie Origins v$NEW_VERSION" \
    --notes "Automated release of Valkyrie Origins v$NEW_VERSION. Download the .mcaddon below and enable Beta APIs in Minecraft."

echo "🎉 Release v$NEW_VERSION is live!"
