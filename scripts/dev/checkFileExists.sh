if [ ! -f "./lib/index.js" ]; then
    echo "Build file not found, building now..."
    npm run build
fi
# Update build files if new changes from src aren't in build files
./scripts/dev/updateBuild.sh
