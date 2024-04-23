document.addEventListener("DOMContentLoaded", function(){
    const fretboard = document.querySelector('.fretboard');
    const scales_div = document.querySelector('.scales');

    const played_notes_input = document.querySelector('.played_notes_input');
    const played_notes_text = document.querySelector('.played_notes_text');
    const numberOfFrets = 12;
    const numberOfStrings = 6;    
    const singleFretMarks = [3, 5, 7, 9];
    const doubleFretMarks = [12];
    const played_note_color = '#000000';
    const scale_note_color = '#000000';
    var scales = {};
    const played_notes = [];
    var selected_scale = ['C'];
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const tuning = [4, 11, 7, 2, 9, 4]
    const app = {
        async init(){
            fetch('./scales.json')
            .then(response => response.json())
            .then(data => {
                // Do something with the JSON data
                scales = data;
                this.setupMain();
                this.setupFretboard();
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
            
        },
        set_note_colors(){
            let all_notes = document.getElementsByClassName('note-fret');
            Array.from(all_notes).forEach(element => {
                let note = element.getAttribute('data-note')
                element.classList.remove('played');
                if (played_notes.includes(note)){
                    // note.style.color = played_note_color;
                    console.log(note);
                    element.classList.add('played');
                    // element.innerHTML = ".note-fret:before {background: black;}";
                }

                else if (selected_scale.includes(note)){
                    // note.style.color = played_note_color;
                    console.log(note);
                    element.classList.add('in_scale');
                    // element.innerHTML = ".note-fret:before {background: black;}";
                }
            });
        },
        possible_scales(){
            const possibleScales = {};
            // calculate possible scales
            for (const [name, notes] of Object.entries(scales)) {
              if (played_notes.every(note => notes.includes(note))) {
                possibleScales[name] = notes;
              }
            }
            // reset scales
            while (scales_div.firstChild) {
                scales_div.removeChild(scales_div.lastChild);
            }
            // display scales
            for (const [key, value] of Object.entries(possibleScales)) {
                console.log(value);
                let scale = tools.createElement('div');
                scale.classList.add("scale");
                let name = tools.createElement('p');
                name.classList.add("name");
                name.innerHTML = key;
                let notes = tools.createElement('p');
                notes.classList.add("notes");
                let note_text = '';
                value.forEach(note => {
                    if (note.length==1){
                        
                        note_text += '|\t'+ note + '\t';
                    }
                    else{
                        note_text += '|\t'+ note + '';

                    }
                })
                
                notes.innerHTML = note_text;
                scale.appendChild(name);
                scale.appendChild(notes);
                scales_div.appendChild(scale)
            };
            
        },
        addPlayedNote(note){
            // remove note if duplicate
            if(notesSharp.indexOf(note) != -1 && played_notes.indexOf(note) != -1){
                played_notes.splice(played_notes.indexOf(note), 1);
            }
            // add note
            else if(notesSharp.indexOf(note) != -1 && played_notes.indexOf(note) == -1){
                played_notes.push(note);    
            }
            
            
            // clear text from input
            played_notes_input.value = "";
            played_notes_text.innerHTML = played_notes;
            this.set_note_colors()
            this.possible_scales()
        },
        setupFretboard(){
            console.log(scales)
            // add strings to fretboard
            for (let i = 0; i < numberOfStrings; i++) {
                let string = tools.createElement("div")
                string.classList.add("string")
                fretboard.appendChild(string)
    
                // create frets
                for (let j = 0; j <= numberOfFrets; j++) {
                    let noteFret = tools.createElement("div");
                    noteFret.classList.add('note-fret');
                    
                    let noteName = notesSharp[((j + tuning[i])% 12)];
                    noteFret.setAttribute('data-note', noteName);

                    // add single fret marks
                    if(i == 0 && singleFretMarks.indexOf(j)!=-1){
                        noteFret.classList.add('single-fretmark')
                    }

                    // add double fret marks
                    if(i == 0 && doubleFretMarks.indexOf(j)!=-1){
                        let double_fret = tools.createElement('div')
                        double_fret.classList.add('double-fretmark')
                        noteFret.appendChild(double_fret)
                    }
                    let that = this
                    noteFret.addEventListener("click", function(event){
                        that.addPlayedNote(noteName);
                    })
                    string.appendChild(noteFret)
                }
            }
        },
        setupMain(){
            played_notes_input.addEventListener('keydown', function(event){
                if(event.key == "Enter"){
                    let note = event.target.value;
                    if(notesSharp.indexOf(note) != -1 && played_notes.indexOf(note) == -1){
                        played_notes.push(note);    
                    }
                    
                    // clear text from input
                    played_notes_input.value = "";
                    played_notes_text.innerHTML = played_notes;
                }
            });
        }
    }

    const tools = {
        createElement(element, content){
            element = document.createElement(element);
            if(arguments.length > 1){
                element.innerHTML = content
            }
            return element;
        }
    }
    
    app.init();
})





