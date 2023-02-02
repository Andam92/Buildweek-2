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
const pauseSignGreenBtnReference = document.getElementById(
  "pauseSignGreenButton"
);

const overlayReference = document.querySelector(".overly");

// API LINK

let apiLink = "https://striveschool-api.herokuapp.com/api/deezer/album";

// URL SEARCH PARAMS

let dataFromUrl = new URLSearchParams(window.location.search);
dataFromUrl = dataFromUrl.get("albumId");
// console.log(dataFromUrl);
if (dataFromUrl === null) {
  // window.location.href = "homepage.html";
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

      // FUNZIONE PER GENERARE LE CANZONI DELL'ALBUM
      let trackList = element.tracks.data;
      console.log(trackList);
      tracksContainerReference.innerHTML = ``;
      for (let index = 0; index < trackList.length; index++) {
        tracksContainerReference.innerHTML += `<div class="row">
              <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center  col-6">
                    <p class="opacity-75 d-none d-md-block">${index + 1}</p>
                    <div class="ms-0 ms-md-3">
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
                  ? `${(trackList[index].duration / 60).toFixed(2)} min`
                  : `${trackList[index].duration} sec`
              }</p></div>
              <i class="bi bi-three-dots-vertical d-inline d-md-none fs-3 mb-2 pb-2 opacity-75"></i>
            </div>   
              </div>`;
        /*  if (index >= 4) break; */
      }
      // const trackSelectorReference = document.querySelectorAll("trackSelector");
      // console.log(trackSelectorReference);
      const trackItems = document.querySelectorAll(".trackSelector");
      console.log("track", trackItems);
      trackItems.forEach((item, index) => {
        item.addEventListener("click", function () {
          footerReference.classList.remove("d-none");
          playBarImgReference.src = element.cover;
          audioSrcReference.src = element.tracks.data[index].preview;

          playBarAuthorReference.innerText = element.artist.name;
          playBarTitleReference.innerText = element.tracks.data[index].title;
          const audio = new Audio();
          audio.src = element.tracks.data[index].preview;
          audio.play();

          // Overlay ferma la canzone
          overlayReference.classList.remove("d-none");
          overlayReference.addEventListener("click", function () {
            audio.pause();

            overlayReference.classList.add("d-none");
          });

          // Esc o Barra spaziatrice ferma la canzone
          document.addEventListener("keydown", function (e) {
            if (e.key === " " || e.key === "Escape") {
              audio.pause();
            }
          });
        });
      });
    });
};

albumAssign(dataFromUrl);

/* let fetch = async function () {
  try {
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
      );
      console.log(res);
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        
        console.log("L'ARRAY E': ", jsonArray);
      } else {
        console.log("Attenzione! res !== ok");
      }
    } catch (error) {
      console.log("ATTENZIONE, ERRORE CATCH", error);
    }
  };
  */

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
      audioSrcReference.src = element.tracks.data[0].preview;

      playBarImgReference.src = element.cover;
      playBarAuthorReference.innerText = element.artist.name;
      playBarTitleReference.innerText = element.tracks.data[0].title;
      const audio = new Audio();
      audio.src = element.tracks.data[0].preview;

      audio.play();

      overlayReference.classList.remove("d-none");
      overlayReference.addEventListener("click", function () {
        audio.pause();
        overlayReference.classList.add("d-none");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Escape") {
          audio.pause();
          overlayReference.classList.add("d-none");
        }
      });
    });
});
