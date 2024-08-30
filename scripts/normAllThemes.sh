# ONLY USED IF NECESSARY: continuous normalizing audios will ruin the audio quality
for file in ../data/mp3s/*; do
  echo "$file normalized"
  python ./normalizeSound.py $file
done
echo "All mp3s have been normalized"
