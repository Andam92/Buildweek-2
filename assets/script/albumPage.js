let fetch = async function () {
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
