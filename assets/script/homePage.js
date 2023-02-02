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
      playFunction.addEventListener("click", function () {
        audio.play();
      });
      playFunction.addEventListener("click", function () {
        audio.pause();
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
        <p class="card-text">${element.title}</p>
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
      bottomAlbumsReference[
        index
      ].innerHTML = `<div class="cardRiga3 d-flex flex-column flex-md-row flex-wrap justify-content-evenly m-2 col-12 col-md-2">
        <div class=" d-flex justify-content-evenly align-items-center flex-md-column my-2 ">
          <img class="img-fluid" src="${element.picture}">
          <div class="d-flex flex-column">
            <h5>${element.name}</h5>
            <p>${element.type}</p>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-between d-md-none">
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
