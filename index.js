const playBtn = document.querySelector(".ri-play-line")
const pauseBtn = document.querySelector(".ri-pause-line")
const nextBtn = document.querySelector(".ri-skip-forward-line")
const prevBtn = document.querySelector(".ri-skip-back-line")
const volumeBtn = document.querySelector(".ri-volume-up-line")
const volSlider = document.querySelector("#volume")

const audio = document.querySelector("audio")
const duration = document.querySelector("#duration")
const currentTime = document.querySelector("#current-time")
const seekSlider = document.querySelector("#seek-slider")

const img = document.querySelector("img")
const songName = document.querySelector("#songName")
const artistName = document.querySelector("#artistName")


// audio data

const files = [
    {
        imgUrl: "https://freemusicarchive.org/image/?file=album_image%2F5imc3xiKVzK0cm2ey9WQvWhm2rfs2p7XkDHcsDq8.png&width=290&height=290&type=album",

        name: "Nostalgia PT. 2",
        artist: "Makaih Beats",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/BEnE2hinIRwCw3GUShacYh0a6cQAhZpbgMHDUtic.mp3?download=1&name=Makaih%20Beats%20-%20Nostalgia%20PT.%202.mp3"

    },
    {
        imgUrl: "https://freemusicarchive.org/image/?file=album_image%2Fh36dDWbTv3e26BAoA1kWTwIGgSf9KBPx7LD4QW61.jpg&width=290&height=290&type=album",

        name: "Weepy",
        artist: "Dee Yan-Key",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Vij468kiRK6c3YSc92yd8ylGqUVRTGfn7FYSD2t9.mp3?download=1&name=Dee%20Yan-Key%20-%20weepy.mp3"

    },
    {
        imgUrl: "https://freemusicarchive.org/image/?file=image%2FnxHKJznNsElpf37zKRmFIxhna72Ai7IVztv6tKoz.png&width=290&height=290&type=album",

        name: "Let's Get It",
        artist: "Scott Holmes Music",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/UTdhPv9WRc9pDbF9VdsqdNCR9Ge6R7JSUoYfDORz.mp3?download=1&name=Scott%20Holmes%20Music%20-%20Let%27s%20Get%20It.mp3"

    }
]

// load the audio details


let initialIndex = 0;

img.src = files[initialIndex].imgUrl
songName.innerText = files[initialIndex].name
artistName.innerText = files[initialIndex].artist
audio.src = files[initialIndex].url



playBtn.addEventListener("click", () => {
    playBtn.classList.add("hidden")
    pauseBtn.classList.remove("hidden")
    audio.play()
    
})

pauseBtn.addEventListener("click", () => {
    pauseBtn.classList.add("hidden")
    playBtn.classList.remove("hidden")
    audio.pause()
})

// changing the track

nextBtn.addEventListener("click", () => {
    initialIndex = initialIndex + 1;
    audio.autoplay = true
    
    // hide the volume slider
    volSlider.classList.add("hidden")

    // check if the value exceed the length of the file
    // if it exceed, make it to zero (0)
    if(initialIndex >= files.length) {
        initialIndex = 0
    }
    img.src = files[initialIndex].imgUrl
    songName.innerText = files[initialIndex].name
    artistName.innerText = files[initialIndex].artist
    audio.src = files[initialIndex].url
})

prevBtn.addEventListener("click", () => {
    initialIndex = initialIndex - 1;
    audio.autoplay = true

    // hide the volume slider
    volSlider.classList.add("hidden")
    
    // check if the value exceed the length of the file
    // if it exceed, make it to zero (0)
    if(initialIndex < 0) {
        initialIndex = files.length
    }
    img.src = files[initialIndex].imgUrl
    songName.innerText = files[initialIndex].name
    artistName.innerText = files[initialIndex].artist
    audio.src = files[initialIndex].url
})

// working on volume

volumeBtn.addEventListener("click", () => {
    volSlider.classList.toggle("hidden")
})

volSlider.value = 100
volSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100
})

// loading the audio metadata

function calDuration(durationInMs) {
    let minutes = Math.floor(durationInMs / 60)
    let seconds = Math.floor(durationInMs % 60)
    let convertedSec;
    if(seconds < 10) {
        convertedSec = `0${seconds}`
    }else {
        convertedSec = seconds
    }

    return `${minutes}:${convertedSec}`
}

// set the max property of the seek slider to the length of the mp3 file
function setSeekSlider() {
    seekSlider.max = Math.floor(audio.duration)
}
/* More often than not, the browser loads the audio faster than usual. When this happens, the loadedmetadata event is fired before its listener can be added to the <audio> element. Therefore, the audio duration is not displayed on the browser. Nevertheless, there’s a hack. The HTMLMediaElement has a property called readyState.*/

if(audio.readyState > 0) {
    const formattedDuration = calDuration(audio.duration);
    duration.innerText = formattedDuration
    setSeekSlider()
}else {
    audio.addEventListener("loadedmetadata", () => {
    const formattedDuration = calDuration(audio.duration);
    duration.innerText = formattedDuration
    setSeekSlider()
    })
}

// modifying the current input

seekSlider.addEventListener("input", (e) => {
    audio.currentTime = e.target.value
    const formattedDuration = calDuration(e.target.value);
    currentTime.innerText = formattedDuration
})

audio.addEventListener("timeupdate", () => {
    seekSlider.value = Math.floor(audio.currentTime)
    currentTime.innerText = calDuration(audio.currentTime)
})

