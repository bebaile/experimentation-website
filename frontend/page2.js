let simpsons;
let count; // number of quotes to fetch by default

const burgerbtn = document.querySelector(".burgerbtn");
const subnavbar = document.querySelector(".subnavbar");
const subnavbarlist = document.querySelector(".subnavbarlist");
const closebtn = document.querySelector("#closebtn");
const savebtn = document.querySelector(".savebtn button");

// load stuff at the beginning

const simpsonApi = `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`;

document.addEventListener("DOMContentLoaded", () => {
  fetch("../backend/preference.json")
    .then((res) => res.json())
    .then((data) => {
      fetchSimpsonQuotes(data[0].amount);
      count = data[0].amount;
    })
    .then(() => {
      document.querySelector("#amount").value = count;
    });
  fetch("./title.json")
    .then((response) => response.json())
    .then((data) => {
      const randomi = Math.floor(Math.random() * data.length);
      console.log(randomi);
      document.querySelector("#titre").innerHTML = data[randomi];
    });
  fetch("./navbar.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        const item = document.createElement("li");
        item.innerHTML =
          "<a href='./" + data[i].link + "'>" + data[i].title + "</a>";
        subnavbarlist.appendChild(item);
      }
    });
});

// actions

burgerbtn.addEventListener("click", () => {
  burgerbtn.classList.toggle("clicked");
  subnavbar.classList.toggle("active");
  console.log(simpsons);
});

closebtn.addEventListener("click", () => {
  subnavbar.classList.toggle("active");
});

savebtn.addEventListener("click", () => {
  console.log("savebtn clicked");
  const backendUrl = `http://localhost:3000/${count}`;
  fetch(backendUrl).then((res) => {
    console.log(res.data);
  });
});

// filter input

document.querySelector("#search").addEventListener("change", () => {
  const searchValue = document.querySelector("#search").value;
  const filteredQuotes = simpsons.filter((character) =>
    character.character.includes(searchValue)
  );
  console.log(filteredQuotes);
  displaySimpsons(filteredQuotes);
});

document.querySelector("#bywords").addEventListener("change", () => {
  const searchValue = document.querySelector("#bywords").value;
  const filteredQuotes = simpsons.filter(
    (character) =>
      character.character.toLowerCase().includes(searchValue.toLowerCase()) ||
      character.quote.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log(filteredQuotes);
  displaySimpsons(filteredQuotes);
});

// fonction display simpson's quotes

const displaySimpsons = (data) => {
  document.querySelector(".cards").innerHTML = "";
  data.map((simpson) => {
    const quote = simpson.quote;
    const url = simpson.image;
    const character = simpson.character;
    const cardHtml = `<div class="quotecard"><div class="content"><div class="simpson-visual"><div class="image"><img src="${url}" height="100" /></div></div><div class="quote">"${quote}"</div><div class="name">${character}</div></div><div class="emptyline"></div><div class="filledline"></div></div>`;
    document.querySelector(".cards").innerHTML += cardHtml;
  });
};

const amount = document.querySelector("#amount");
amount.addEventListener("change", () => {
  count = amount.value;
  fetchSimpsonQuotes(count);
});

// fonction pour fetcher l'api simpson

const fetchSimpsonQuotes = (count) => {
  const simpsonApi = `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`;
  fetch(simpsonApi)
    .then((response) => response.json())
    .then((data) => {
      simpsons = data;
      displaySimpsons(data);
    })
    .then(() => {
      simpsons.map((simpson) => {
        document.querySelector(
          "#search"
        ).innerHTML += `<option value="${simpson.character}">${simpson.character}</option>`;
      });
    });
};
