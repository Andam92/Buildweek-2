let array = [];
let apiLink =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const prova = function (artistId) {
  fetch(`${apiLink}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (element) {
      console.log(element.title);
      array.push(element.title);
    });
};

prova();
const h1 = document.querySelector("h1");
h1.addEventListener("click", function () {
  console.log("pippo", array[0]);
});

console.log(array);
