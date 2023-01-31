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

// API LINK

let apiLink = "https://striveschool-api.herokuapp.com/api/deezer/album";

// PER GENERARE NOME ALBUM E IMMAGINE

const albumPicker = function (title, image, length, tracks) {
  typeof title === "string" || typeof title === "number"
    ? (albumNameReference.innerText = String(title))
    : (albumNameReference.innerHTML = `non hai inserito il nome di un album!`);

  albumNameReference.innerText = `${title}`;
  albumImgReference.src = `${image}`;
  albumAuthorandDateReference.innerText = `durata: ${length} ·`;
  albumTracksNumberReference.innerText = `${tracks} brani ·`;
  /* authorImg.src = `${profileImg}`; */
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
        element.nb_tracks
      );
      let trackList = element.tracks.data;
      console.log(trackList);
      tracksContainerReference.innerHTML = ``;
      for (let index = 0; index < trackList.length; index++) {
        tracksContainerReference.innerHTML += `<div class="row">
              <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                    <p class="opacity-75 d-none d-md-block">${index + 1}</p>
                    <div class="ms-0 ms-md-3">
                      <p class="m-0">FETCH 2!!!</p> 
                      <p id="authorName" class="opacity-75 mt-1">FETCH 2!!!</p>
                    </div>
                  </div>
              <div > <p class="opacity-75 d-none d-md-block">${
                trackList[index].rank
              }</p> </div>
              <div > <p class="opacity-75 d-none d-md-block">${
                trackList[index].duration > 59
                  ? `${(trackList[index].duration / 60).toFixed(2)} min`
                  : `${trackList[index].duration} sec`
              }</p></div>
              <i class="bi bi-three-dots-vertical d-inline d-md-none fs-3 mb-2 pb-2 opacity-75"></i>
            </div>   
              </div>`;
        if (index >= 4) break;
      }
    });
};

// FUNZIONE PER GENERARE LE CANZONI DELL'ALBUM

albumAssign(75621062);

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
