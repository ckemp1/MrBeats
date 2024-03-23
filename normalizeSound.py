import sys
from pydub import AudioSegment
if len(sys.argv) == 1:
    print("No argument given!")
    sys.exit()

max_db = -20
sound = AudioSegment.from_file(sys.argv[1])

new_db = max_db - sound.max_dBFS

new_sound = sound.apply_gain(new_db)
new_sound.export(sys.argv[1], format="mp3")
