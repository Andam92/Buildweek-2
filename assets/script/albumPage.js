// RIFERIMENTI
const albumNameReference = document.getElementById("albumName");
const albumImgReference = document.getElementById("albumImg");
const authorName = document.getElementById("authorName");
const authorImg = document.getElementById("profileImg");
const albumAuthorandDateReference =
  document.getElementById("albumAuthorandDate");
const albumTracksNumberReference = document.getElementById("albumTracksNumber");
const albumDurationReference = document.getElementById("albumDuration");
const tracksContainerReference = document.getElementById("tracksContainer");
const heartIconChangerReference = document.getElementById("heartIcon");
const playerHeartIconChangerReference = document.getElementById("barHeartIcon");
const playFunction = document.querySelector("#playBtn");
const playBarImgReference = document.getElementById("playBarImg");
const playBarAuthorReference = document.getElementById("playBarAuthor");
const playBarTitleReference = document.getElementById("playBarTitle");
const footerReference = document.querySelector("footer");
const audioReference = document.querySelector("audio");
const audioSrcReference = document.getElementById("audioSrc");
/* const pauseSignGreenBtnReference = document.getElementById(
  "pauseSignGreenButton"
); */
const shuffleBtn = document.getElementById("shuffleBtn");
// RIFERIMENTI BOTTONI PLAYER
const pauseBtnReference = document.getElementById("pauseButton");
const playBtnReference = document.getElementById("playButton");
const volumeReference = document.getElementById("volume");

const overlayReference = document.querySelector(".overly");
const skipBackward = document.getElementById("skipBackward");
const skipForward = document.getElementById("skipForward");

// API LINK

let apiLink = "https://striveschool-api.herokuapp.com/api/deezer/album";

// URL SEARCH PARAMS

let dataFromUrl = new URLSearchParams(window.location.search);
dataFromUrl = dataFromUrl.get("albumId");
// console.log(dataFromUrl);
if (dataFromUrl === null) {
  window.location.href = "homepage.html";
}

console.log(playBarImgReference);

// PER GENERARE NOME ALBUM E IMMAGINE

const albumPicker = function (title, image, length, tracks, profileImg) {
  typeof title === "string" || typeof title === "number"
    ? (albumNameReference.innerText = String(title))
    : (albumNameReference.innerHTML = `non hai inserito il nome di un album!`);

  albumNameReference.innerText = `${title}`;
  albumImgReference.src = `${image}`;
  albumAuthorandDateReference.innerText = `durata: ${length} ·`;
  albumTracksNumberReference.innerText = `${tracks} brani ·`;
  authorImg.src = `${profileImg}`;
};

const albumAssign = function (albumName) {
  fetch(`${apiLink}/${albumName}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      console.log(element.nb_tracks);
      albumPicker(
        element.title,
        element.cover_medium,
        (element.duration / 60).toFixed(2),
        element.nb_tracks,
        element.artist.picture_small
      );

      // REDIRECT ARTIST PAGE FROM IMAGE

      console.log(element.artist);
      authorImg.addEventListener("click", function () {
        document.location.href = `artistpage.html?albumId=${element.artist.id}`;
      });

      // FUNZIONE PER GENERARE LE CANZONI DELL'ALBUM
      let trackList = element.tracks.data;
      console.log(trackList);
      tracksContainerReference.innerHTML = ``;
      for (let index = 0; index < trackList.length; index++) {
        tracksContainerReference.innerHTML += `<div class="row">
              <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center  col-6">
                    <p class="opacity-75 d-none d-md-block">${index + 1}</p>
                    <div class="ms-0 ms-md-3 pointer">
                      <p class="m-0 trackSelector">${
                        trackList[index].title
                      }</p> 
                      <p id="authorName" class="opacity-75 mt-1">${
                        trackList[index].artist.name
                      }</p>
                    </div>
                  </div>
              <div class="col-3 justify-content-start d-flex" > <p class="opacity-75 d-none d-lg-block songRanks">${
                trackList[index].rank
              }</p> </div>
              <div class="col-3 d-flex justify-content-end"> <p class="opacity-75 d-none d-md-block">${
                trackList[index].duration > 59
                  ? `${(trackList[index].duration / 60).toFixed(0)} min ${
                      Math.trunc((trackList[index].duration % 60) / 1.85) === 0
                        ? ` `
                        : Math.trunc((trackList[index].duration % 60) / 1.85) +
                          ` sec`
                    }`
                  : `${trackList[index].duration} sec`
              }</p></div>
              <i class="bi bi-three-dots-vertical d-inline d-md-none fs-3 mb-2 pb-2 opacity-75"></i>
            </div>   
              </div>`;
        /*  if (index >= 4) break; */
      }
      // const trackSelectorReference = document.querySelectorAll("trackSelector");
      // console.log(trackSelectorReference);

      // FUNZIONALITA' AUDIO
      const trackItems = document.querySelectorAll(".trackSelector");

      trackItems.forEach((item, index) => {
        item.addEventListener("click", function () {
          footerReference.classList.remove("d-none");
          playBtnReference.classList.add("d-none");
          pauseBtnReference.classList.remove("d-none");
          playBarImgReference.src = element.cover;
          audioSrcReference.src = element.tracks.data[index].preview;

          playBarAuthorReference.innerText = element.artist.name;
          playBarTitleReference.innerText = element.tracks.data[index].title;
          const audio = new Audio();
          audio.src = element.tracks.data[index].preview;
          audio.play();
          volumeReference.addEventListener("input", function () {
            audio.volume = this.value / 100;
          });

          console.log(volume);

          // Skip forward-backward (TENTATIVO)

          /*      skipBackward.addEventListener("click", function () {
            console.log(element.tracks.data[index - 1].preview);
            console.log(audioSrcReference.src);
            audioSrcReference.src = element.tracks.data[index - 1].preview;
            audio.pause();
            const musica = function () {
              audio.play();
            };
            setTimeout(musica, 2000);

            // audioSrcReference.src = element.tracks.data[index - 1].preview;
          }); */

          // Comandi player-play
          playBtnReference.addEventListener("click", function () {
            playBtnReference.classList.add("d-none");
            pauseBtnReference.classList.remove("d-none");
            overlayReference.classList.remove("d-none");
            audio.play();
            volumeReference.addEventListener("input", function () {
              audio.volume = this.value / 100;
            });
          });

          // Overlay ferma la canzone
          overlayReference.classList.remove("d-none");
          overlayReference.addEventListener("click", function () {
            audio.pause();
            overlayReference.classList.add("d-none");
            pauseBtnReference.classList.add("d-none");
            playBtnReference.classList.remove("d-none");
          });

          // Comandi player-pausa
          pauseBtnReference.addEventListener("click", function () {
            pauseBtnReference.classList.add("d-none");
            playBtnReference.classList.remove("d-none");
            overlayReference.classList.add("d-none");

            audio.pause();
          });

          // Esc o Barra spaziatrice ferma la canzone
          document.addEventListener("keydown", function (e) {
            if (e.key === " " || e.key === "Escape") {
              audio.pause();
              pauseBtnReference.classList.add("d-none");
              playBtnReference.classList.remove("d-none");
            }
          });
        });
      });
    });
};

albumAssign(dataFromUrl);

// FUNZIONE PER RIEMPIRE IL CUORE PREFERITI

const favourite = function (icon) {
  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
  icon.classList.toggle("text-danger");
};

heartIconChangerReference.addEventListener("click", function () {
  favourite(this);
});

playerHeartIconChangerReference.addEventListener("click", function () {
  favourite(this);
});

// SPOSTARE CANZONE NELLA BARRA

playFunction.addEventListener("click", function () {
  fetch(`${apiLink}/${dataFromUrl}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      footerReference.classList.remove("d-none");
      playBtnReference.classList.add("d-none");
      pauseBtnReference.classList.remove("d-none");
      audioSrcReference.src = element.tracks.data[0].preview;
      playBarImgReference.src = element.cover;
      playBarAuthorReference.innerText = element.artist.name;
      playBarTitleReference.innerText = element.tracks.data[0].title;
      const audio = new Audio();
      audio.src = element.tracks.data[0].preview;
      audio.play();
      volumeReference.value = 20;
      volumeReference.addEventListener("input", function () {
        audio.volume = this.value / 100;
      });

      // Comandi player-play
      playBtnReference.addEventListener("click", function () {
        playBtnReference.classList.add("d-none");
        pauseBtnReference.classList.remove("d-none");
        audio.play();
        volumeReference.value = 20;
      });

      overlayReference.classList.remove("d-none");
      overlayReference.addEventListener("click", function () {
        audio.pause();
        overlayReference.classList.add("d-none");
      });

      // Comandi player-pausa
      pauseBtnReference.addEventListener("click", function () {
        pauseBtnReference.classList.add("d-none");
        playBtnReference.classList.remove("d-none");
        overlayReference.classList.add("d-none");
        audio.pause();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Escape") {
          audio.pause();
          overlayReference.classList.add("d-none");
        }
      });
    });
});

// SHUFFLE

shuffleBtn.addEventListener("click", function () {
  if (shuffleBtn.classList.contains("shuffleOn")) {
    shuffleBtn.classList.remove("shuffleOn");
  } else shuffleBtn.classList.add("shuffleOn");
});

/* shuffleBtn.addEventListener("click", function () {
  shuffleBtn.classList.contains("shuffleOn")
    ? shuffleBtn.classList.remove("shuffleOn")
    : shuffleBtn.classList.add("shuffleOne");
}); */

/* (trackList[index].duration % 60) / 1.85 === 0
  ? ` `
  : (trackList[index].duration % 60) / 1.85 + ` sec`; */
