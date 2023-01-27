let container = document.querySelector(".container");
let title = document.querySelector(".box_title");
let h1 = document.querySelector("h1");
let turn = 0;
let firstCard = "";
let secondCard = "";
let gameover = 0;
let countwin = 0;
let level = 0;

const checkCards = () => {
  firstCard.id === secondCard.id
    ? ((firstCard = ""), (secondCard = ""), ++countwin)
    : setTimeout(() => {
        firstCard.classList.remove("flip_card");
        secondCard.classList.remove("flip_card");
        firstCard = "";
        secondCard = "";
      }, 1000);
};

const getclick = ({ target }) => {
  if (target.className.includes("flip_card")) {
    return;
  }
  if (firstCard === "" && gameover === 0) {
    target.classList.add("flip_card");
    firstCard = target;
  } else if (secondCard === "") {
    target.classList.add("flip_card");
    secondCard = target;
    checkCards();
  }
  countwin == 12
    ? ((h1.innerHTML = "YOU WIN!!!"), (h1.style = "color: blue"))
    : null;
};
const createstagegame = () => {
  let card = document.createElement("div");
  let back_face = document.createElement("div");
  let front_face = document.createElement("div");

  card.className = "card";
  back_face.className = "back_face";
  front_face.className = "front_face";
  card.addEventListener("click", getclick);
  card.appendChild(front_face);
  card.appendChild(back_face);
  return card;
};
const drawstage = (target) => {
  for (i in target) {
    let mypath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${target[i]}.png`;
    let card = createstagegame();
    card.firstChild.style = `background-image: url(${mypath});`;
    card.id = target[i];
    container.appendChild(card);
  }
};
const random = () => {
  let n = 900;
  let al = 12;
  let list_index_arr = Array.from({ length: al }, () =>
    Math.floor(Math.random() * n)
  );

  let controller_duplicate = list_index_arr.filter(
    (e, i) => list_index_arr.indexOf(e) === i
  );

  let index_list_arr =
    controller_duplicate.length == al
      ? list_index_arr
      : Array.from({ length: al }, () => Math.floor(Math.random() * n));

  if (index_list_arr.indexOf(0) != -1) {
    index_list_arr = Array.from({ length: al }, () =>
      Math.floor(Math.random() * n)
    );
  }

  const list_duplicate = [...index_list_arr, ...index_list_arr];
  return list_duplicate.sort(() => Math.random() - 0.5);
};
const setgame = () => {
  drawstage(random());
};

const settime = () => {
  let i = 100;
  setInterval(() => {
    countwin < 12
      ? i != 0
        ? (h1.innerText = --i)
        : ((h1.innerText = "GAME OVER!!!"),
          (gameover = 1),
          h1.classList.add("over"))
      : null;
  }, level);
};

const getlevel = (e) => {
  level = e;
  title.style = "display: none";
  h1.innerHTML = "loading...";
  settime();
  setTimeout(() => {
    setgame();
  }, 1000);
};
