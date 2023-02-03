const h1Reference = document.querySelector("h1");
const buttonReference = document.getElementById("playBtn");
const imgReference = document.getElementById("albumImg");
const authorReference = document.getElementById("author");
const descriptionReference = document.getElementById("description");
const cardsAlbumReference = document.querySelectorAll(".sideAlbums");
const bottomAlbumsReference = document.querySelectorAll(".cardRiga3");
const cardContainerReference = document.querySelectorAll(".cardReference");

// RIFERIMENTI PLAYBAR
const playBarImgReference = document.getElementById("playBarImg");
const playBarAuthorReference = document.getElementById("playBarAuthor");
const playBarTitleReference = document.getElementById("playBarTitle");
const playerHeartIconChangerReference = document.getElementById("barHeartIcon");
const audioSrcReference = document.getElementById("audioSrc");
const playFunction = document.getElementById("playFunction");
const volumeReference = document.getElementById("volume");

// BOTTONI PLAY-PAUSE
const playBtnReference = document.getElementById("playButton");
const pauseBtnReference = document.getElementById("pauseButton");

// Id dell'album
let albumIdRef = 75621062;

let apiLink = "https://striveschool-api.herokuapp.com/api/deezer/album";
// let artistIdArray = [];
let artistIdValue = 0;

// FUNZIONE PER RACCOGLIERE I DATI HEADER

const dataGathering = function (title, artistId, artistName, description, img) {
  h1Reference.innerText = title;
  artistIdValue = artistId;
  authorReference.innerText = artistName;
  descriptionReference.innerText = description;
  imgReference.src = img;
};

// FUNZIONE PER DATI HEADER
let albumAssign = function (albumId) {
  fetch(`${apiLink}/${albumId}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      console.log(element.title);
      let artistId = element.artist.id;
      dataGathering(
        element.title,
        artistId,
        element.artist.name,
        `Ascolta ora ${element.title}`,
        element.cover_medium
      );
      //   h1Reference.innerText = element.title;
      //   // artistIdArray.push(artistId);
      //   artistIdValue = artistId;
      //   authorReference.innerText = element.artist.name;
      //   descriptionReference.innerText = `Ascolta ora ${element.title}`;
      //   imgReference.src = element.cover_medium;
      playBarImgReference.src = element.cover;
      playBarAuthorReference.innerText = element.artist.name;
      playBarTitleReference.innerText = element.tracks.data[1].title;
      audioSrcReference.src = element.tracks.data[1].preview;

      const audio = new Audio();
      audio.src = element.tracks.data[1].preview;
      // audio.volume = 0.3;  funziona?

      // Comandi del player
      playBtnReference.addEventListener("click", function () {
        playBtnReference.classList.add("d-none");
        pauseBtnReference.classList.remove("d-none");
        audio.play();
        volumeReference.value = 20;
        volumeReference.addEventListener("input", function () {
          audio.volume = this.value / 100;
        });
      });
      pauseBtnReference.addEventListener("click", function () {
        pauseBtnReference.classList.add("d-none");
        playBtnReference.classList.remove("d-none");
        audio.pause();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === " ") {
          audio.pause();
          pauseBtnReference.classList.add("d-none");
          playBtnReference.classList.remove("d-none");
        }
      });
    });
};

albumAssign(albumIdRef);

// FUNZIONE PER ALTRI ALBUM

const sideAlbumsAssign = function (albumId, index) {
  fetch(`${apiLink}/${albumId}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      cardsAlbumReference[index].innerHTML = "";
      cardsAlbumReference[
        index
      ].innerHTML = ` <div class="cardContainer d-flex align-items-center border border-dark">
      <div class="col-4 col-md-4">
        <img class="albumPreview" src="${element.cover}">
      </div>
      <div class="col-8 ps-2 m-0 ms-md-4 p-0 pe-sm-5 overflow-hidden">
        <p class="text-truncate card-text">${element.title}</p>
      </div>
     </div>`;
    });

  // redirect albumPage
  cardContainerReference[index].addEventListener("click", function () {
    document.location.href = `albumpage.html?albumId=${String(albumId)}`;
  });
};
sideAlbumsAssign(303413, 0);
sideAlbumsAssign(915785, 1);
sideAlbumsAssign(8904269, 2);
sideAlbumsAssign(1121182, 3);
sideAlbumsAssign(1121181, 4);
sideAlbumsAssign(375765, 5);

// FUNZIONE PER ARTIST PAGE

let apiArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

const bottomAlbumsAssign = function (albumId, index) {
  fetch(`${apiArtist}/${albumId}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      console.log("elemento", element);
      // cardsAlbumReference[index].innerHTML = "";
      // cardsAlbumReference[
      //   index
      // ].innerHTML = ` <div class="cardContainer d-flex align-items-center border border-dark">
      //   <div class="col-4 col-md-4">
      //     <img class="albumPreview" src="${element.cover}">
      //   </div>
      //   <div class="col-8 ps-2 m-0 ms-md-4 p-0 pe-sm-5 overflow-hidden">
      //     <p class="card-text">${element.title}</p>
      //   </div>
      //  </div>`;
      bottomAlbumsReference[index].innerHTML = "";
      bottomAlbumsReference[index].innerHTML = `
        <div class="d-flex justify-content-between align-items-center flex-md-column px-3">
          <div class="imgContainerCardRiga3 w-90">
          <img class="img-fluid w-100 rounded" src="${element.picture}">
          </div>
          <div class="containerCardTextRiga3 d-flex py-2 justify-content-evenly align-items-center">
            <p>${element.name}</p>
          </div>
        </div>
        <div class="col-12 py-1 px-3 d-flex justify-content-between d-md-none">
          <section class="d-flex justify-content-evenly align-items-center">
             <i class="bi bi-suit-heart-fill m-1"></i>
             <i class="bi bi-three-dots-vertical m-1"></i>
          </section>
          <section class="d-flex justify-content-evenly align-items-baseline">
             <p>90 brani</p>
            <i class="bi bi-play-circle m-1"></i>
          </section>
        </div>
       </div>`;
    });
  bottomAlbumsReference[index].addEventListener("click", function () {
    document.location.href = `artistpage.html?albumId=${String(albumId)}`;
  });
};
bottomAlbumsAssign(412, 0);
bottomAlbumsAssign(419, 1);
bottomAlbumsAssign(421, 2);
bottomAlbumsAssign(423, 3);
bottomAlbumsAssign(425, 4);

buttonReference.addEventListener("click", function () {
  document.location.href = `albumpage.html?albumId=${String(albumIdRef)}`;
});

// FUNZIONAMENTO PLAYBAR

const favourite = function (icon) {
  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
  icon.classList.toggle("text-danger");
};

playerHeartIconChangerReference.addEventListener("click", function () {
  favourite(this);
});

const rangeInputs = document.querySelector('input[type="range"]');

console.log(rangeInputs);

rangeInputs.addEventListener("mouseover", function () {
  rangeInputs.classList.add("mouseOver1");
});

rangeInputs.addEventListener("mouseleave", function () {
  rangeInputs.classList.remove("mouseOver1");
});

/* rangeInputs.addEventListener("mouseover", function () {
  rangeInputs.classList.add("mouseOver");
  console.log("mouseOver");
});

h1Reference.addEventListener("mouseover", function () {
  rangeInputs.style.display = "block";
  console.log("over");
});
 */
