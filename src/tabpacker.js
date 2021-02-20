export default function tabPacker(rawtab) {
    /* Algorithm
    Extract out lines and process into bars of normalized size, with notes somewhere in the middle
    Iterate through text, create "note" objects with an <int> fret and <float> normalized position within bar
    Find out how many bars by iterating over every line that begins with e| 
    */

    let tabLines = []

    function extractPureTab(s) {
        tabLines = rawtab.split('\n')
        tabLines = tabLines.filter(line => (line!==undefined &&line.charAt(1) === '|' )) 
        // for (var i = tabLines.length; i > 0; i--) {
        //     if (tabLines[i] === undefined || (tabLines[i].charAt(1) !== '|')) {
                //tabLines = tabLines.splice(i, 1)
                // console.log("spliced")
                // i--;
            // }
        // }
        console.log(tabLines);
        return processTextTab();
    }




    let Notes = []
    let Bars = []
    function processTextTab() {
        // 1: Batch the lines into linesets, each with 6 lines.
        var lineidx = 0;
        var lineset = [];
        for (lineidx = 0; lineidx < tabLines.length; lineidx += 6) {
            var sixchunk = tabLines.slice(lineidx, lineidx + 6);
            lineset.push(sixchunk);
        }


        for (var linesetidx = 0; linesetidx < lineset.length; linesetidx++) {
            //2. split each lineset into bars
            for (var line_in_lineset_idx = 0; line_in_lineset_idx < 6; line_in_lineset_idx++) {
                var temp_line = lineset[linesetidx][line_in_lineset_idx];
                temp_line = temp_line.split('|'); //eliminates the character & splits into bars
                temp_line.shift();
                temp_line.pop();
                // console.log(temp_line);
                lineset[linesetidx][line_in_lineset_idx] = temp_line;
            }
        }
        console.log(lineset);

        var lastLineCount = 0;

        for (var linesetidx = 0; linesetidx < lineset.length; linesetidx++) { //each set of lines
            for (var line_in_lineset_idx = 0; line_in_lineset_idx < 6; line_in_lineset_idx++) { //each line in a set
                for (var bar_idx = 0; bar_idx < lineset[linesetidx][line_in_lineset_idx].length; bar_idx++) { //each bar in a single line
                    for (var char_idx = 0; char_idx < lineset[linesetidx][line_in_lineset_idx][bar_idx].length - 1;) { //each char in a bar

                        var c = lineset[linesetidx][line_in_lineset_idx][bar_idx][char_idx]; //charat current ptr 
                        var cn = lineset[linesetidx][line_in_lineset_idx][bar_idx][char_idx + 1]; //charat current ptr + 1

                        var normalized_x_pos = char_idx / lineset[linesetidx][line_in_lineset_idx][bar_idx].length;

                        if (c >= '0' && c <= '9' && cn >= '0' && cn <= '9') {
                            let newNote = new Note(line_in_lineset_idx, normalized_x_pos, parseInt(c + cn), bar_idx + lastLineCount);
                            Notes.push(newNote);
                            char_idx += 2;
                        }
                        else if (c >= '0' && c <= '9' && !(cn >= '0' && cn <= '9')) {
                            let newNote = new Note(line_in_lineset_idx, normalized_x_pos, parseInt(c), bar_idx + lastLineCount);
                            Notes.push(newNote);
                            char_idx += 1;
                        }
                        else {
                            char_idx += 1;
                        }
                    }
                }
                if(line_in_lineset_idx===0 && linesetidx!==0) lastLineCount += lineset[linesetidx][0].length; //offset from last
            }
        }
        console.log("unsorted notes: " + Notes);
    

        Notes.sort((a,b) => a.baridx-b.baridx);
        console.log("sorted notes: ");
        console.log(Notes);

        return Notes;
    }

    return extractPureTab(rawtab);
}


// A musical note with normalized position (within a bar) and number for the fret 
class Note {
    constructor(str, hpos, fret, baridx) {
        this.str = str;//       E A D G B e
        this.hpos = hpos;//     A position from 0 to 1 
        this.fret = fret;
        this.baridx = baridx;
    }
}

// A bar with an index in the song and a list of Note objects
class Bar {
    constructor(baridx, notes) {
        this.baridx = baridx;
        this.notes = notes;
    }
}