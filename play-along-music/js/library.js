
import { songs } from './songs.mjs';

const songLibrary = document.getElementById('song-library');

function populateSongLibrary() {
    for (let i = 0; i < songs.length; i ++) {
        songLibrary.insertAdjacentHTML('beforeend', `
            <li id="${i}" class="song">
                <p>${songs[i].title}</p>
                <p>${songs[i].from}</p>
            </li>
        `);
    }
}

function handleSongSelect(e) {
    let selectedSong = e.target.closest('li');
    if (selectedSong) {
        console.log(selectedSong.id);
        localStorage.setItem('song', JSON.stringify(songs[selectedSong.id]));
        window.location.href = '/play-along-music/html/play.html';
    }
}

populateSongLibrary();
songLibrary.addEventListener('click', handleSongSelect);
