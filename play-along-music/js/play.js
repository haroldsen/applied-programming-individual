
const song = JSON.parse(localStorage.getItem('song'));
console.log(song.title);

const playSongButton = document.getElementById('play-song-button');
const noteCanvas = document.getElementById('note-canvas');

function playSong() {
    let notes = song.notes;
    console.log(notes);
    for (let i = 0; i < notes.length; i ++) {
        let noteElement = document.createElement('div');
        noteElement.className = `note ${notes[i].note.toLowerCase()}`;
        noteElement.innerHTML = `${notes[i].note}`;
        noteElement.style.animationDelay = `${notes[i].time}s`;
        noteElement.style.animationName = notes[i].location;
        noteCanvas.insertAdjacentElement('beforeend', noteElement);
    }
}

playSongButton.addEventListener('click', playSong);
