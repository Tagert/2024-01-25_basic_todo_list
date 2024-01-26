"use strict";

const cardTitle = document.getElementById("title");
const cardDescription = document.getElementById("text-area");
const addButton = document.getElementById("add-button");
const inProgressCard = document.querySelector(
  ".in-progress-card > .card-content"
);
const doneCard = document.querySelector(".done-card > .card-content");
const removedCardList = document.querySelector(".removed-card-list");

const localStorageTasksToDo =
  JSON.parse(localStorage.getItem("toDoTaskArray")) || [];
console.log(localStorageTasksToDo);
const localStorageTasksDone =
  JSON.parse(localStorage.getItem("doneArray")) || [];
console.log(localStorageTasksDone);

const toDoTaskArray = localStorageTasksToDo;
const doneArray = localStorageTasksDone;

const createCard = (task, container) => {
  const addDivCard = document.createElement("div");
  addDivCard.classList.add("added-card");

  const addSymbolRemoveDiv = document.createElement("div");
  addSymbolRemoveDiv.classList.add("remove-symbol"); //////////////

  const addSymbolRemoveImage = document.createElement("img");
  addSymbolRemoveImage.src = "./assets/close_delete_remove_icon.svg"; /////////
  addSymbolRemoveImage.addEventListener("click", () =>
    removeCard(task, container)
  );

  const cardTitleDiv = document.createElement("div");
  cardTitleDiv.classList.add("card-title"); //////////////////

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

  const removedCardContainer = document.createElement("div");
  removedCardContainer.classList.add("removed-card");

  container.append(addDivCard); // reverse method container.prepend(addDivCard)
  addDivCard.append(
    addSymbolRemoveDiv,
    cardTitleDiv,
    descriptionParagraph,
    buttonDiv
  );
  cardTitleDiv.append(titleParagraph);
  addSymbolRemoveDiv.append(addSymbolRemoveImage);
  buttonDiv.append(statusButton, colorDiv);
  statusButton.append(buttonParagraph);

  if (task.isDone === true) {
    colorDiv.setAttribute("class", "color-check-green");
  } else {
    colorDiv.setAttribute("class", "color-check-red");
  }

  if (container === doneCard) {
    buttonDiv.addEventListener("click", () => moveCardToInProgress(task));
  } else {
    buttonDiv.addEventListener("click", () => moveCardToDone(task));
  }

  localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));
  localStorage.setItem("doneArray", JSON.stringify(doneArray));
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

  localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));

  cardTitle.value = "";
  cardDescription.value = "";
};

const removeCard = (task, container) => {
  const index =
    container === inProgressCard
      ? toDoTaskArray.findIndex((t) => t.title === task.title)
      : doneArray.findIndex((t) => t.title === task.title);

  if (index !== -1) {
    container.innerHTML = "";

    if (container === inProgressCard) {
      toDoTaskArray.splice(index, 1);
      toDoTaskArray.forEach((t) => createCard(t, inProgressCard));
    } else {
      doneArray.splice(index, 1);
      doneArray.forEach((t) => createCard(t, doneCard));
    }
  }

  localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));
  localStorage.setItem("doneArray", JSON.stringify(doneArray));
};

const moveCardToDone = (task) => {
  const findIndex = toDoTaskArray.findIndex((t) => t.title === task.title);

  if (findIndex !== -1) {
    task.isDone = !task.isDone;

    doneArray.push(toDoTaskArray[findIndex]);
    toDoTaskArray.splice(findIndex, 1);

    inProgressCard.innerHTML = "";
    doneCard.innerHTML = "";
    localStorage.setItem("doneArray", JSON.stringify(doneArray));
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

toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
doneArray.forEach((task) => createCard(task, doneCard));

cardTitle.value = "";
cardDescription.value = "";

addButton.addEventListener("click", addCardFunc);
