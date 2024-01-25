"use strict";

// 1. Sukurti paprastą formą su input bei button;
// 2. Padaryt, kad paspaudus ant button consolėje būtu išvestas tekstas įvestas input'e;
// 3. Ekrane atvaizduot objektą kuriame yra title, isDone ir creationDate;
// 4. Pridėti minimalią validaciją, padaryt, kad consolėj atsirastu informacinė žinutė vietoj objekto jeigu task title bus trumpesnis už 3 simbolius;
// 5. Sukurti masyvą bei sukurtus bei pravaliduotus objektus dėti į masyvą;
// 6. forEach pagalba atvaizduoti task title consolej;
// 7. Prieš atvaizduojant taskTitle į ekraną jį reikia pridėti į prie taskCard komponento, tik tada taskCard pridėt į ekraną;
// 8. Jeigu task yra atliktas - ekrane turi atsirast žalias mažasapskritimas, jei task nėra atliktas - turi atsirast raudonas apskritimas;
// 9. Task kortelei pridėti stilių klasę per JS. Stiliai turi apjuost border'iu task'o kortelę.
// 10. Paspaudus ant korelės -card-c atvaizdoti consolėj task title;
// 11. Padaryt, kad naujausiai pridėta task kortelė būtu viršuje (prieš forEach reiks panaudot reverse() metodą);
// 12. Rasti bei atvaizduoti paspaustos kortelės index'ą;
// 13. Pamodifikuot task status reikšmę masyve kreipantis į teisingo indexo narį;
// 14. Atnaujintą objektą atvaizduoti consolėj;

const cardTitle = document.getElementById("title");
const cardDescription = document.getElementById("text-area");
const addButton = document.getElementById("add-button");
const inProgressCard = document.querySelector(
  ".in-progress-card > .card-content"
);
const doneCard = document.querySelector(".done-card > .card-content");
const toDoTaskArray = [];
const doneArray = [];

const createCard = (task, container) => {
  const addDivCard = document.createElement("div");
  addDivCard.classList.add("added-card");

  const titleParagraph = document.createElement("p");
  const addCardTitle = task.title;
  titleParagraph.innerText = addCardTitle;

  const descriptionParagraph = document.createElement("p");
  const addCardDescription = task.description;
  descriptionParagraph.innerText = addCardDescription;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("bottom-circle");

  const buttonParagraph = document.createElement("p");
  buttonParagraph.classList.add("button-paragraph");
  buttonParagraph.innerText = "Click";

  const statusButton = document.createElement("button");

  const colorDiv = document.createElement("div");
  colorDiv.classList.add("color-check");

  container.append(addDivCard); // reverse method container.prepend(addDivCard)
  addDivCard.append(titleParagraph, descriptionParagraph, buttonDiv);
  buttonDiv.append(statusButton, colorDiv);
  statusButton.append(buttonParagraph);

  if (task.isDone === true) {
    colorDiv.style.borderColor = "#B7E5B4";
  } else {
    colorDiv.style.borderColor = "#f28585";
  }

  if (container === doneCard) {
    buttonDiv.addEventListener("click", () => moveCardToInProgress(task));
  } else {
    buttonDiv.addEventListener("click", () => moveCardToDone(task));
  }
};

const addCardFunc = () => {
  const taskObj = {
    title: cardTitle.value,
    description: cardDescription.value,
    isDone: false,
    creationDate: "",
  };

  if (taskObj.title.length + 1 > 3) {
    toDoTaskArray.push(taskObj);
    inProgressCard.innerHTML = "";
    toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
  } else {
    console.log("Please enter more than 3 letters");
  }

  cardTitle.value = "";
  cardDescription.value = "";
};

const moveCardToDone = (task) => {
  const findIndex = toDoTaskArray.findIndex((t) => t.title === task.title);

  if (findIndex !== -1) {
    task.isDone = !task.isDone;

    doneArray.push(toDoTaskArray[findIndex]);
    toDoTaskArray.splice(findIndex, 1);

    inProgressCard.innerHTML = "";
    doneCard.innerHTML = "";

    toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
    doneArray.forEach((task) => createCard(task, doneCard));
  }
};

const moveCardToInProgress = (task) => {
  const findIndex = doneArray.findIndex((t) => t.title === task.title);

  if (findIndex !== -1) {
    task.isDone = !task.isDone;

    toDoTaskArray.push(doneArray[findIndex]);
    doneArray.splice(findIndex, 1);

    inProgressCard.innerHTML = "";
    doneCard.innerHTML = "";

    // toDoTaskArray.reverse().forEach((task) => createCard(task, inProgressCard)); reverse method
    toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
    doneArray.forEach((task) => createCard(task, doneCard));
  }
};

cardTitle.value = "";
cardDescription.value = "";

addButton.addEventListener("click", addCardFunc);
