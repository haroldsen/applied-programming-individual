
import { songs } from './songs.mjs';

const songLibrary = document.getElementById('song-library');

function populateSongLibrary() {
    for (let i = 0; i < songs.length; i ++) {
        songLibrary.insertAdjacentHTML('beforeend', `
            <li>
                <button id="${i}" class="song">
                    <p>${songs[i].title}</p>
                    <p>${songs[i].from}</p>
                </button>
            </li>
        `);
    }
}

function handleSongSelect(e) {
    let selectedSong = e.target.closest('button');
    if (selectedSong) {
        localStorage.setItem('song', JSON.stringify(songs[selectedSong.id]));
        window.location.href = '/play-along-music/html/play.html';
    }
}

populateSongLibrary();
songLibrary.addEventListener('click', handleSongSelect);
