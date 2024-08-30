import sys
from pydub import AudioSegment

# Example: python normalizeSound.py ./data/mp3s/131536633282560000-themeSong.mp3
# Returns the length of the normalized audio
if len(sys.argv) == 1:
    print("No argument given!")
    sys.exit()
try :
    sound = AudioSegment.from_file(sys.argv[1], format="mp3")

    length = sound.duration_seconds
    if length < 7:
        print(length)
    else:
        print("Gah damn it bobby, the mp3 file needs to be less than 7 seconds long, yours is " + length + " seconds!")
 

except:
    print("Failed to normalize given file: " + sys.argv[1])
