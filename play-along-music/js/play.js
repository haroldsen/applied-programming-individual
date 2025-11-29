
const song = JSON.parse(localStorage.getItem('song'));
console.log(song.title);

const playSongButton = document.getElementById('play-song-button');
const noteCanvas = document.getElementById('note-canvas');
const songInfo = document.getElementById('song-info');

function populateSongInfo() {
    document.getElementById('song-title').innerHTML = song.title;
    document.getElementById('song-performer').innerHTML = song.from;
}

function playSong() {
    songInfo.style.display = 'none';
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

populateSongInfo();
playSongButton.addEventListener('click', playSong);
