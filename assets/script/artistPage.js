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

// API LINK

let apiLink = `https://striveschool-api.herokuapp.com/api/deezer/artist`;

let dataFromUrl = new URLSearchParams(window.location.search);
dataFromUrl = dataFromUrl.get("albumId");
// console.log(dataFromUrl);
if (dataFromUrl === null) {
  // window.location.href = "homepage.html";
}

// FUNZIONE PER GENERARE NEL DOM ARTISTA e BACKGROUND DINAMICAMENTE

const titlePicker = function (title, background, fans) {
  typeof title === "string" || typeof title === "number"
    ? (titleReference.innerText = String(title))
    : (titleReference.innerText = `Oops something goeas wrong`);

  artistBackgroundReference.style.background = `url(${background})`;
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
        duration = (element[i].duration / 60).toFixed(2);
        imgPreview = element[i].contributors[0].picture_small;
        popularSongsReference.innerHTML += `<div class="d-flex song">
        <div class="col-12 col-lg-6 d-flex align-items-center mb-3">
          <p class="ms-2 mb-0">${i + 1}</p>
          <img class="ms-2" src=${imgPreview} alt="" />
          <p class="ms-2 mb-0">${title}</p>
        </div>
        <div class="offset-1 col-2 d-flex align-items-center justify-content-end views mb-3"><p class="mb-0">${rank}</p></div>
        <div class="col-3 d-flex align-items-center justify-content-end duration mb-3"><p class="mb-0 me-5">${duration}</p></div>
      </div>`;
      }
      const songReference = document.querySelectorAll(".song");
      console.log(element[0].preview);
      for (let i = 0; i < songReference.length; i++) {
        songReference[i].addEventListener("click", function () {
          footerReference.classList.remove("d-none");
          playBarImgReference.src = element[i].contributors[0].picture;
          playBarAuthorReference.innerText = element[i].title;
          playBarTitleReference.innerText = element[i].contributors[0].name;
          const audio = new Audio();
          audio.src = element[i].preview;
          // audio.play();
        });
      }
    });
};

songGenerator(dataFromUrl);
