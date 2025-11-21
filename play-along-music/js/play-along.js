
import { songs } from './songs.mjs';

const playSongButton = document.getElementById('play-song-button');
const noteCanvas = document.getElementById('note-canvas');

function playSong() {
    let notes = songs[0].notes;
    for (let i = 0; i < notes.length; i ++) {
        let noteElement = document.createElement('div');
        noteElement.className = `note ${notes[i].note.toLowerCase()}`;
        noteElement.innerHTML = `${notes[i].note}`;
        noteElement.style.animationDelay = `${notes[i].time}s`;
        
        if (i % 8 == 0) {
            noteElement.style.animationName = 'one-left';
        } else if (i % 8 == 1) {
            noteElement.style.animationName = 'one-right';
        } else if (i % 8 == 2) {
            noteElement.style.animationName = 'two-left';
        } else if (i % 8 == 3) {
            noteElement.style.animationName = 'two-right';
        } else if (i % 8 == 4) {
            noteElement.style.animationName = 'three-left';
        } else if (i % 8 == 5) {
            noteElement.style.animationName = 'three-right';
        } else if (i % 8 == 6) {
            noteElement.style.animationName = 'four-left';
        } else if (i % 8 == 7) {
            noteElement.style.animationName = 'four-right';
        }

        noteCanvas.insertAdjacentElement('beforeend', noteElement);
    }
}

playSongButton.addEventListener('click', playSong);
