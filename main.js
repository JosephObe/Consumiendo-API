const API_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";
const API_FAVORITE = 'https://api.thecatapi.com/v1/favourites?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';
const API_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46`;
const msjError = document.getElementById("error");

const btn = document.getElementById("btn");
btn.addEventListener("click", randomCats)

async function randomCats() {
  const res = await fetch(API_RANDOM)
  const data = await res.json();

  if (res.status !== 200) {
    msjError.innerHTML = "Hubo un error" + res.status + " " + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
  
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    const addCats1 = document.getElementById("btn1");
    addCats1.onclick = () => saveFavoriteCats(data[0].id);

    const addCats2 = document.getElementById("btn2");
    addCats2.onclick = () => saveFavoriteCats(data[1].id);

    const addCats3 = document.getElementById("btn3");
    addCats3.onclick = () => saveFavoriteCats(data[2].id);
  }

}

async function favoriteCats() {
  const res = await fetch(API_FAVORITE);
  const data = await res.json();
  
  if (res.status !== 200) {
    msjError.innerHTML = "Hubo un error " + res.status;
  } else {
    const divContainer = document.getElementById("favorite");
    divContainer.innerHTML = "";


    data.forEach(michis => {
      const div = document.createElement("div")
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Remove Cats");
      btn.onclick = () => deleteFavoriteCats(michis.id);

      btn.appendChild(btnText);
      img.src = michis.image.url;
      img.classList.add("img");
      div.appendChild(img);
      div.appendChild(btn);
      div.classList.add("contenedor1");
      divContainer.appendChild(div);

    });
  }

  console.log(data);
  console.log("Favoritos");
  console.log(res);
  
}

async function saveFavoriteCats(id) {
  const res = await fetch (API_FAVORITE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: id
    }),
  })
  console.log("save");
  console.log(res)
  const data = await res.json();

  if (res.status !== 200) {
    msjError.innerHTML = "Hubo un error" + res.status + " " + data.message;
  } else {
    favoriteCats();
  }
}

async function deleteFavoriteCats (id) {
  const res = await fetch (API_FAVORITE_DELETE(id), {
    method: "DELETE",
  })
  const data = await res.json();

  if (res.status !== 200) {
    msjError.innerHTML = "Hubo un error " + res.status;
  } else {
    favoriteCats();
  }
}

randomCats();
favoriteCats();



