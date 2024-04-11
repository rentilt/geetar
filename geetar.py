import json


# load scales 
try:
    with open('scales.json') as f:
        scales = json.load(f)
except Exception:
    print("Error opening scales.json file...\nPlease run get_scales.py first")

played_notes = ['A#', 'B', 'D#']
possible_scales = {}
for name, notes in scales.items():
    if all(x in notes for x in played_notes):
        possible_scales[name] = notes
print(possible_scales)