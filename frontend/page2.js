let simpsons;
let count = 8; // number of quotes to fetch by default

const burgerbtn = document.querySelector(".burgerbtn");
const subnavbar = document.querySelector(".subnavbar");
const subnavbarlist = document.querySelector(".subnavbarlist");
const closebtn = document.querySelector("#closebtn");

// load stuff at the beginning

const simpsonApi = `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#amount").value = count;
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
  fetchSimpsonQuotes(count);
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
    const cardHtml =
      '<div class="quotecard"><div class="simpson-visual"><div class="image"><img src="' +
      url +
      '" height="100" /></div></div><div class="quote">"' +
      quote +
      '"</div><div class="name">' +
      character +
      "</div></div>";
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
