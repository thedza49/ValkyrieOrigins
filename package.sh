#!/bin/bash
# Package the Valkyrie Origins Add-on

PACKAGE_NAME="ValkyrieOrigins-v1.0.mcaddon"
# Use absolute path for safety
PROJECT_DIR="/home/daniel/.openclaw/workspace/ValkyrieOrigins"

echo "Starting package creation for $PACKAGE_NAME..."

# Create a temporary directory to build the package
BUILD_DIR=$(mktemp -d)
echo "Build directory: $BUILD_DIR"

# Copy BP and RP into the temporary directory
cp -r "$PROJECT_DIR/BP" "$BUILD_DIR/"
cp -r "$PROJECT_DIR/RP" "$BUILD_DIR/"

# Zip the contents of the temporary directory into the final .mcaddon file
cd "$BUILD_DIR" || exit 1
zip -r "$PROJECT_DIR/$PACKAGE_NAME" .

# Clean up temporary directory
rm -rf "$BUILD_DIR"

echo "---"
echo "Package created successfully:"
echo "$PROJECT_DIR/$PACKAGE_NAME"
ls -la "$PROJECT_DIR/$PACKAGE_NAME"
echo "---"
