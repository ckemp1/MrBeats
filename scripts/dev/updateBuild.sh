#!/bin/bash

# Path to your source files
SRC_PATH="./src"

# Path to your built files
BUILD_PATH="./lib"

# This command finds all JavaScript files (files ending with .js) in the directory specified by $SRC_PATH. For each file found, 
#  it executes the stat command. The stat command with the --printf="%Y\n" option prints the last modification time of the file in seconds since the Unix Epoch.

# Get the latest modification time in SRC_PATH
latest_src=$(find $SRC_PATH -type f -name '*.ts' -exec stat \{} --printf="%Y\n" \; | sort -nr | head -n 1)

# Get the earliest modification time in BUILD_PATH
earliest_build=$(find $BUILD_PATH -type f -name '*.js' -exec stat \{} --printf="%Y\n" \; | sort -n | head -n 1)
# Check if the source files are newer than the built files
if [ $latest_src -gt $earliest_build ]; then
    echo "The built JS files are outdated due to recent changes within src/, running build script..."
    npm run build
else
    echo "The built JS files are up-to-date."
fi