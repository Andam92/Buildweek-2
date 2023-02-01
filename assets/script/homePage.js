const h1Reference = document.querySelector("h1");
const buttonReference = document.getElementById("play");
const imgReference = document.getElementById("albumImg");

// Id dell'album
let albumIdRef = 75621062;

let apiLink = "https://striveschool-api.herokuapp.com/api/deezer/album";
// let artistIdArray = [];
let artistIdValue = 0;

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
      h1Reference.innerText = element.title;
      // artistIdArray.push(artistId);
      artistIdValue = artistId;
    });
};

albumAssign(albumIdRef);

console.log(buttonReference);

/* buttonReference.addEventListener("click", function () {

  console.log("ciao", String(artistIdValue));
  document.location.href = `artistpage.html?artistId=${String(artistIdValue)}`;
});
 */

buttonReference.addEventListener("click", function () {
  console.log("ciao", String(artistIdValue));
  document.location.href = `artistpage.html?artistId=${String(albumIdRef)}`;
});
