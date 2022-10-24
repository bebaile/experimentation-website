const hamburgermenu = document.querySelector(".menu");
const subnavbar = document.querySelector(".subnavbar");
const closebox = document.querySelector(".closebox");
const closeboxdiv = document.querySelector(".closeboxdiv");
const hiddenbox = document.querySelector(".hiddenbox");
const subnavbarlist = document.querySelector(".subnavbarlist");
const openBtn = document.querySelector(".openbtn");
const sidenav = document.querySelector(".sidenav");

document.addEventListener("DOMContentLoaded", () => {
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

hamburgermenu.addEventListener("click", () => {
  subnavbar.classList.toggle("unactive");
});

closebox.addEventListener("click", () => {
  hiddenbox.style.visibility = "hidden";
});

const displayPhoto = () => {
  hiddenbox.style.visibility = "initial";
};

const tasks = document.querySelector(".tasklist");

const displayAlert = () => {
  const newTask = document.createElement("li");
  newTask.innerHTML = document.querySelector("#tache").value;
  newTask.className = "item";
  tasks.appendChild(newTask);
};

const deleteLastTask = () => {
  const toBeDeleted = document.querySelectorAll(".item");
  for (let i = 0; i < toBeDeleted.length; i++) {
    toBeDeleted[i].remove();
  }
};

const modifyTitle = (event) => {
  event.preventDefault();
  document.querySelector("#titre").innerHTML =
    document.querySelector(".title").value;
};

// page 2

openBtn.addEventListener("click", (event) => {
  alert("coucou");
});
