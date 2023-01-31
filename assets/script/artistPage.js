// DOM ELEMENTS REFERENCES

const artistBackgroundReference = document.getElementById("artistBackground");
const titleReference = document.getElementById("title");
const monthlyViewersReference = document.getElementById("monthlyViewers");
const playBtnReference = document.getElementById("playBtn");
const followBtnReference = document.getElementById("followBtn");
const popularSongsReference = document.getElementById("popularSongs");

// API LINK

let apiLink = `https://striveschool-api.herokuapp.com/api/deezer/artist`;

// FUNZIONE PER GENERARE NEL DOM ARTISTA e BACKGROUND DINAMICAMENTE

const titlePicker = function (title, background) {
  typeof title === "string" || typeof title === "number"
    ? (titleReference.innerText = String(title))
    : (titleReference.innerText = `Oops something goeas wrong`);

  artistBackgroundReference.style.backgroundImage = `url(${background})`;
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
      titlePicker(element.name, String(element.picture_xl));
    });
};

titleAssign(2503);
