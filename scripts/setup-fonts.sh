#!/bin/bash

# Font Setup Script for Physical AI & Robotics Docusaurus
# Downloads web fonts to static/fonts/ directory

set -e

FONTS_DIR="static/fonts"
INTER_URL="https://rsms.me/inter/inter.var.woff2"
JB_MONO_REGULAR="https://download.jetbrains.com/fonts/JetBrainsMono-Regular.woff2"
JB_MONO_MEDIUM="https://download.jetbrains.com/fonts/JetBrainsMono-Medium.woff2"
NOTO_URDU="https://fonts.gstatic.com/s/notonas taliqurdu/v17/Dxxu8jqsJHxLd64w7tCe6S1xX_Xu3P_EoWj7qvHvf9I.woff2"

# Create fonts directory
mkdir -p "$FONTS_DIR"

echo "📥 Downloading web fonts..."

# Download Inter Variable
if [ ! -f "$FONTS_DIR/Inter-Variable.woff2" ]; then
  echo "  - Downloading Inter Variable..."
  curl -L "$INTER_URL" -o "$FONTS_DIR/Inter-Variable.woff2"
  echo "    ✅ Inter-Variable.woff2"
else
  echo "  ✓ Inter-Variable.woff2 already exists"
fi

# Download JetBrains Mono Regular
if [ ! -f "$FONTS_DIR/JetBrainsMono-Regular.woff2" ]; then
  echo "  - Downloading JetBrains Mono Regular..."
  curl -L "$JB_MONO_REGULAR" -o "$FONTS_DIR/JetBrainsMono-Regular.woff2"
  echo "    ✅ JetBrainsMono-Regular.woff2"
else
  echo "  ✓ JetBrainsMono-Regular.woff2 already exists"
fi

# Download JetBrains Mono Medium
if [ ! -f "$FONTS_DIR/JetBrainsMono-Medium.woff2" ]; then
  echo "  - Downloading JetBrains Mono Medium..."
  curl -L "$JB_MONO_MEDIUM" -o "$FONTS_DIR/JetBrainsMono-Medium.woff2"
  echo "    ✅ JetBrainsMono-Medium.woff2"
else
  echo "  ✓ JetBrainsMono-Medium.woff2 already exists"
fi

# Download Noto Nastaliq Urdu
if [ ! -f "$FONTS_DIR/NotoNastaliqUrdu-Regular.woff2" ]; then
  echo "  - Downloading Noto Nastaliq Urdu..."
  curl -L "$NOTO_URDU" -o "$FONTS_DIR/NotoNastaliqUrdu-Regular.woff2"
  echo "    ✅ NotoNastaliqUrdu-Regular.woff2"
else
  echo "  ✓ NotoNastaliqUrdu-Regular.woff2 already exists"
fi

echo ""
echo "✅ Font setup complete!"
echo "📁 Fonts directory: $FONTS_DIR"
ls -lh "$FONTS_DIR"
