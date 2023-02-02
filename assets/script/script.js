// // DOM ELEMENTS REFERENCES

// const artistBackgroundReference = document.getElementById("artistBackground");
// const titleReference = document.getElementById("title");
// const monthlyViewersReference = document.getElementById("monthlyViewers");
// const playBtnReference = document.getElementById("playBtn");
// const followBtnReference = document.getElementById("followBtn");
// const popularSongsReference = document.getElementById("popularSongs");
// const roundedArtistImgRefercence = document.querySelector(".likedImg");
// const likedArtistReference = document.querySelector(".likedArtist");

// // API LINK

// let apiLink = `https://striveschool-api.herokuapp.com/api/deezer/artist`;

// // FUNZIONE PER GENERARE NEL DOM ARTISTA e BACKGROUND DINAMICAMENTE

// const titlePicker = function (title, background, fans) {
//   typeof title === "string" || typeof title === "number"
//     ? (titleReference.innerText = String(title))
//     : (titleReference.innerText = `Oops something goeas wrong`);

//   artistBackgroundReference.style.backgroundImage = ` url(${background})`;
//   monthlyViewersReference.innerText = `${fans} ascoltatori mensili`;
// };

// // FUNZIONE PER GENERARE IL VALORE DI TITLE E DEL BACKGROUND IMG DAL JSON

// const titleAssign = function (artistId) {
//   fetch(`${apiLink}/${artistId}`)
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then(function (element) {
//       titlePicker(element.name, String(element.picture_xl), element.nb_fan);
//       roundedArtistImgRefercence.src = `${element.picture}`;
//       likedArtistReference.innerText = `di ${element.name}`;
//     });
// };

// titleAssign(120);

// // FUNZIONE PER GENERARE CANZONI DAL JSON

// const songGenerator = function (artistId) {
//   fetch(`${apiLink}/${artistId}/top?limit=50`)
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then(function (element) {
//       console.log("ciao", element.data[0].title);
//       element = element.data;
//       let title;
//       let rank;
//       let duration;
//       popularSongsReference.innerHTML = "";
//       let rankOrder = [];
//       for (let i = 0; i < element.length; i++) {
//         rankOrder.push(element[i].rank);
//       }
//       rankOrder = rankOrder.sort((a, b) => b - a);
//       for (let i = 0; i < element.length; i++) {
//         title = element[i].title;
//         rank = rankOrder[i];
//         duration = (element[i].duration / 60).toFixed(2);
//         imgPreview = element[i].contributors[0].picture_small;
//         popularSongsReference.innerHTML += `<div class="d-flex song">
//         <div class="col-12 col-lg-6 d-flex align-items-center mb-3">
//           <p class="ms-2 mb-0">${i + 1}</p>
//           <img class="ms-2" src=${imgPreview} alt="" />
//           <p class="ms-2 mb-0">${title}</p>
//         </div>
//         <div class="offset-1 col-2 d-flex align-items-center justify-content-end views mb-3"><p class="mb-0">${rank}</p></div>
//         <div class="col-3 d-flex align-items-center justify-content-end duration mb-3"><p class="mb-0 me-5">${duration}</p></div>
//       </div>`;
//       }
//     });
// };

// songGenerator(120);

//Funzioni extra al click
/* let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");

function play() {
  pauseButton.classList.add("visible");
  playButton.classList.add("invisible");
}

function pause() {
  pauseButton.classList.add("invisible");
  playButton.classList.add("visible");
}
 */
/* function playFunction() {
  playButton.innerHTML = <i class="bi bi-play-circle d-none"></i>;
  playButton.innerHTML = `<i class="bi bi-pause-circle d-block"></i>`;
  ;
}
playButton.addEventListener("click", playFunction); */

let pressedElem1 = document.getElementById("press1");
let pressedElem2 = document.getElementById("press2");
let pressedElem3 = document.getElementById("press3");
let pressedElem4 = document.getElementById("press4");

function pressGreen1() {
  pressedElem1.classList.toggle("push");
}
pressedElem1.addEventListener("click", pressGreen1);

function pressGreen2() {
  pressedElem2.classList.toggle("push");
}
pressedElem2.addEventListener("click", pressGreen2);

function pressGreen3() {
  pressedElem3.classList.toggle("push");
}
pressedElem3.addEventListener("click", pressGreen3);

function pressGreen4() {
  pressedElem4.classList.toggle("push");
}
pressedElem4.addEventListener("click", pressGreen4);
