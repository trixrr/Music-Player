const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

const title = document.getElementById('title')
const cover = document.getElementById('cover')

// song titles
const songs = ['hey', 'summer', 'ukulele'];


let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}


// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}
// add the play class
// when playing, remove the play button and add pause button.

// pause song 
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = song.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
// decrease index by 1 --
// if index < 0 set index to the length of array(3) - 1 = 2 which is the last song in the array.

// next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}
// incriment songIndex by 1 with ++ 
// if the index is greater than the length of the array(3) - 1 (2)  .. 0,1,2 are the songs. 
// so if greater than 2 then set index back to 0; 



function updateProgress(e) {
  const {
    duration,
    currentTime
  } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
// getting duration / currenttime from the event target element.
// storing the currenttime divided by the duration and * 100 (whole thing i think)
// styling with progresspercent to fill bar accordinaly 


// set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// set time on track with click divided by width of progress container * duration.

// Event Listeners 
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})
// if musicContainer class list contains 'play' class then run pause song else playsong

// change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// time/song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress)

// song ends
audio.addEventListener('ended', nextSong);