const h1Reference = document.querySelector("h1");
const buttonReference = document.getElementById("play");
const imgReference = document.getElementById("albumImg");
const authorReference = document.getElementById("author");
const descriptionReference = document.getElementById("description");
const cardsAlbumReference = document.querySelectorAll(".sideAlbums");
const bottomAlbumsReference = document.querySelectorAll(".cardRiga3");

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
};
sideAlbumsAssign(8293584, 0);
sideAlbumsAssign(8293586, 1);
sideAlbumsAssign(8904269, 2);
sideAlbumsAssign(934176, 3);
sideAlbumsAssign(934177, 4);
sideAlbumsAssign(375765, 5);

const bottomAlbumsAssign = function (albumId, index) {
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
};

/* buttonReference.addEventListener("click", function () {

  console.log("ciao", String(artistIdValue));
  document.location.href = `artistpage.html?artistId=${String(artistIdValue)}`;
});
 */

// buttonReference.addEventListener("click", function () {
//   console.log("ciao", String(artistIdValue));
//   document.location.href = `artistpage.html?artistId=${String(albumIdRef)}`;
// });
buttonReference.addEventListener("click", function () {
  document.location.href = `albumpage.html?albumId=${String(albumIdRef)}`;
});
