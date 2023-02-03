// DOM ELEMENTS REFERENCES

const artistBackgroundReference = document.getElementById("artistBackground");
const titleReference = document.getElementById("title");
const monthlyViewersReference = document.getElementById("monthlyViewers");
const playBtnReference = document.getElementById("playBtn");
const followBtnReference = document.getElementById("followBtn");
const popularSongsReference = document.getElementById("popularSongs");
const roundedArtistImgRefercence = document.querySelector(".likedImg");
const likedArtistReference = document.querySelector(".likedArtist");

const footerReference = document.querySelector("footer");
const playBarImgReference = document.getElementById("playBarImg");
const playBarAuthorReference = document.getElementById("playBarAuthor");
const playBarTitleReference = document.getElementById("playBarTitle");
const playerHeartIconChangerReference = document.getElementById("barHeartIcon");
const audioSrcReference = document.getElementById("audioSrc");
const playFunction = document.getElementById("playBtn");
const followBtn = document.getElementById("followBtn");

// PLAYER REF
const pauseBtnReference = document.getElementById("pauseButton");
const playerPlayBtnReference = document.getElementById("playButton");
const volumeReference = document.getElementById("volume");

const overlayReference = document.querySelector(".overly");
const timeBarReference = document.querySelector(".barra");

// VARIE
const heartIconContainerReference = document.querySelector("#heartIcon");
const heartIconReference = document.getElementById("heartLike");

// API LINK

let apiLink = `https://striveschool-api.herokuapp.com/api/deezer/artist`;

let dataFromUrl = new URLSearchParams(window.location.search);
// console.log(dataFromUrl);

dataFromUrl = dataFromUrl.get("albumId");
if (dataFromUrl === null) {
  window.location.href = "homepage.html";
}

// FUNZIONE PER GENERARE NEL DOM ARTISTA e BACKGROUND DINAMICAMENTE

const titlePicker = function (title, background, fans) {
  typeof title === "string" || typeof title === "number"
    ? (titleReference.innerText = String(title))
    : (titleReference.innerText = `Oops something goeas wrong`);

  artistBackgroundReference.style.backgroundImage = `url(${background})`; // IMPORTANTE! In Js le proprietà css col trattino si scrivono in camelCase
  artistBackgroundReference.classList.add("backgroundSettings");
  monthlyViewersReference.innerText = `${fans} ascoltatori mensili`;
};

// FUNZIONE PER GENERARE IL VALORE DI TITLE E DEL BACKGROUND IMG DAL JSON

const titleAssign = function (artistId) {
  fetch(`${apiLink}/${artistId}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      titlePicker(element.name, String(element.picture_xl), element.nb_fan);
      roundedArtistImgRefercence.src = `${element.picture}`;
      likedArtistReference.innerText = `di ${element.name}`;
    });
};

titleAssign(dataFromUrl);

// FUNZIONE PER GENERARE CANZONI DAL JSON

const songGenerator = function (artistId) {
  fetch(`${apiLink}/${artistId}/top?limit=50`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      element = element.data;
      let title;
      let rank;
      let duration;
      popularSongsReference.innerHTML = "";
      let rankOrder = [];
      for (let i = 0; i < element.length; i++) {
        rankOrder.push(element[i].rank);
      }
      rankOrder = rankOrder.sort((a, b) => b - a);
      for (let i = 0; i < element.length; i++) {
        title = element[i].title;
        rank = rankOrder[i];
        duration = element[i].duration;
        imgPreview = element[i].album.cover_small;
        // ADDIVETTITI
        popularSongsReference.innerHTML += `<div class="d-flex song">
        <div class="col-12 col-lg-6 d-flex align-items-center mb-3">
          <p class="ms-2 mb-0">${i + 1}</p>
          <img class="ms-2" src=${imgPreview} alt="" />
          <p class="ms-2 mb-0">${title}</p>
        </div>
        <div class="offset-1 col-2 d-flex align-items-center justify-content-end views mb-3"><p class="mb-0">${rank}</p></div>
        <div class="col-3 d-flex align-items-center justify-content-end duration mb-3"><p class="mb-0 me-5">${
          duration > 59
            ? `${(duration / 60).toFixed(0)}:${
                Math.trunc((duration % 60) / 1.85) === 0
                  ? `00`
                  : Math.trunc((duration % 60) / 1.85) < 10
                  ? "0" + Math.trunc((duration % 60) / 1.85)
                  : Math.trunc((duration % 60) / 1.85)
              }`
            : `${duration} sec`
        }</p></div>
      </div>`;
      }
      const songReference = document.querySelectorAll(".song");
      console.log(element[0].preview);
      for (let i = 0; i < songReference.length; i++) {
        songReference[i].addEventListener("click", function () {
          footerReference.classList.remove("d-none");
          timeBarReference.style.animation = `animazione ${30}s linear`;
          playerPlayBtnReference.classList.add("d-none");
          pauseBtnReference.classList.remove("d-none");
          playBarImgReference.src = element[i].album.cover;
          playBarAuthorReference.innerText = element[i].title;
          playBarTitleReference.innerText = element[i].contributors[0].name;
          const audio = new Audio();
          audio.src = element[i].preview;
          volumeReference.value = 20;
          audio.play();
          volumeReference.addEventListener("input", function () {
            audio.volume = this.value / 100;
          });

          // Comandi player-pausa
          pauseBtnReference.addEventListener("click", function () {
            pauseBtnReference.classList.add("d-none");
            playerPlayBtnReference.classList.remove("d-none");
            audio.pause();
          });

          // Comandi player-play
          playerPlayBtnReference.addEventListener("click", function () {
            playerPlayBtnReference.classList.add("d-none");
            pauseBtnReference.classList.remove("d-none");
            overlayReference.classList.remove("d-none");
            audio.play();
            volumeReference.value = 20;
            volumeReference.addEventListener("input", function () {
              audio.volume = this.value / 100;
            });
          });

          // Overlay ferma la canzone
          overlayReference.classList.remove("d-none");
          overlayReference.addEventListener("click", function () {
            audio.pause();
            overlayReference.classList.add("d-none");
            playerPlayBtnReference.classList.remove("d-none");
            pauseBtnReference.classList.add("d-none");
          });

          // Esc o Barra spaziatrice ferma la canzone
          document.addEventListener("keydown", function (e) {
            if (e.key === " " || e.key === "Escape") {
              audio.pause();
              playerPlayBtnReference.classList.remove("d-none");
              pauseBtnReference.classList.add("d-none");
            }
          });
        });
      }
    });
};

songGenerator(dataFromUrl);

// PLAYER

const favourite = function (icon) {
  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
  icon.classList.toggle("text-danger");
};

playerHeartIconChangerReference.addEventListener("click", function () {
  favourite(this);
});

// Follow Button

followBtn.addEventListener("click", function () {
  if (followBtn.classList.contains("followBtnActive")) {
    followBtn.classList.remove("followBtnActive");
    followBtn.innerText = "Follow";
    followBtn.classList.add("px-4");
  } else {
    followBtn.classList.add("followBtnActive");
    followBtn.innerText = "Following";
    followBtn.classList.remove("px-4");
  }
});

// LIKE ALL'ARTISTA

const likeArtist = function () {
  heartIconReference.classList.toggle("d-none");
};

heartIconContainerReference.addEventListener("click", likeArtist);
