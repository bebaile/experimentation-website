const burgerbtn = document.querySelector(".burgerbtn");
const subnavbar = document.querySelector(".subnavbar");
const subnavbarlist = document.querySelector(".subnavbarlist");
const closebtn = document.querySelector("#closebtn");

document.addEventListener("DOMContentLoaded", () => {
  fetch("./title.json")
    .then((response) => response.json())
    .then((data) => {
      const randomi = Math.floor(Math.random() * data.length);
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
  console.log("clicked");
  burgerbtn.classList.toggle("clicked");
  subnavbar.classList.toggle("active");
});

closebtn.addEventListener("click", () => {
  subnavbar.classList.toggle("active");
});

// const leaflet = require("http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js");

const mapOptions = {
  center: [43.608079, 3.883246],
  zoom: 10,
};

const map = new L.map("container", mapOptions);

const layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);

map.addLayer(layer);
