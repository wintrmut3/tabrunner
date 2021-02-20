import fileDownload from 'js-file-download';
import { useState, createRef } from 'react';
import './App.css';
import tabPacker from './tabpacker';


function App() {
    const [tabContent, setTabContent] = useState('');
    let tabInput = createRef();

    const handleClick = () => {
        setTabContent(tabInput.current.value);
        let noteArr = tabPacker(tabInput.current.value);
        console.log("notearr " + noteArr);
        //var jsonNoteArr = JSON.stringify(noteArr).toString();
        var noteintarr = stringifyNotes(noteArr);
        fileDownload(noteintarr, 'tab_json.txt');


        // newWindow.document.open();
        // newWindow.document.write('<html><body><pre>' + jsonNoteArr + '</pre></body></html>');
        // newWindow.document.close();
    }

    // trash version of stringify 
    const stringifyNotes = (s) =>{
        var outstring= "{ { ";
        var currentbaridx = 0;
        //{"str":0,"hpos":0.7,"fret":2,"baridx":59} convert this into {...{...,0x1b2,...}...}
        s.forEach(note => {
            if(note.baridx!== currentbaridx){
                outstring+=" },{ ";
                currentbaridx++;
            }

            var stringNum = note.str+1 << 8; //to avoid 000 confusion
            var hposNum =  Math.round(note.hpos*16) << 4;
            var fretNum = note.fret;
            var noteInt = stringNum + hposNum + fretNum;
            outstring+=noteInt + ",";
        });
        outstring += " } };";
        return "int song [][32] = " + outstring + "\nint totalBars = " + (currentbaridx+1) +";";

    }

    

    return (
        <div className="container">
            <p className="title">TABRUNNER</p>
            <textarea className="editor" placeholder="paste tab here" ref={tabInput}></textarea>
            <button className="button" onClick={handleClick}>process tab</button>
        </div>
    );
}

export default App;
