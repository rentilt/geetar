import json

# scales steps
major_scale = [0, 2, 4, 5, 7, 9, 11]
natural_minor_scale = [0, 2, 3, 5, 7, 8, 10]
melodic_minor_scale = [0, 2, 3, 5, 7, 9, 11]
dorian_scale = [0, 2, 3, 5, 7, 9, 10]
scales = {'major': major_scale,
          'natural minor': natural_minor_scale,
          'melodic minor': melodic_minor_scale,
          'dorian': dorian_scale}

whole_notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 
             'F#', 'G', 'G#', 'A', 'A#', 'B']
all_notes = whole_notes * 2


# get all possible scale combinations
output = {}
for note in whole_notes:
    # an octave starting at the root note
    root = all_notes.index(note)
    notes = all_notes[root:root+12]

    for name, steps in scales.items():
        # musical scale: root + desired scale
        scale = [notes[i] for i in steps]
        name = name+"_"+note
        output[name] = scale

# Serializing json
json_object = json.dumps(output, indent=4)
 
# Writing to sample.json
with open("scales.json", "w") as outfile:
    outfile.write(json_object)