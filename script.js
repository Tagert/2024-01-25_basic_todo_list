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
const localStorageTasksDone =
  JSON.parse(localStorage.getItem("doneArray")) || [];
const localStorageRemoved =
  JSON.parse(localStorage.getItem("removedArray")) || [];

const toDoTaskArray = localStorageTasksToDo;
const doneArray = localStorageTasksDone;
let removedArray = localStorageRemoved;

const createCard = (task, container) => {
  const addDivCard = document.createElement("div");
  addDivCard.classList.add("added-card");

  const addSymbolRemoveDiv = document.createElement("div");
  addSymbolRemoveDiv.classList.add("remove-symbol");

  const addSymbolRemoveImage = document.createElement("img");
  addSymbolRemoveImage.src = "./assets/close_delete_remove_icon.svg";
  addSymbolRemoveImage.addEventListener("click", () => moveCardToRemoved(task));

  const cardTitleDiv = document.createElement("div");
  cardTitleDiv.classList.add("card-title");

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
  localStorage.setItem("removedArray", JSON.stringify(removedArray));
};

const createRemovedCard = (task) => {
  const removedCardContainer = document.createElement("div");
  removedCardContainer.classList.add("removed-card");

  const addSymbolRemoveDiv = document.createElement("div");
  addSymbolRemoveDiv.classList.add("remove-symbol");

  const wrapDiv = document.createElement("div");
  wrapDiv.classList.add("wrap");

  const wrapImage = document.createElement("img");
  wrapImage.src = "./assets/arrow_direction_down_navigation_icon.svg";

  const modifyDiv = document.createElement("div");
  modifyDiv.classList.add("modify");

  const undoImage = document.createElement("img");
  undoImage.src = "./assets/arrow_next_right_icon.svg";

  const deleteImage = document.createElement("img");
  deleteImage.src = "./assets/forever-remove_icon.svg";
  deleteImage.addEventListener("click", () =>
    removeCard(task, removedCardList)
  ); // find out how to delete it - permanent

  const cardTitleDiv = document.createElement("div");
  cardTitleDiv.classList.add("card-title");

  const titleParagraph = document.createElement("p");
  const addCardTitle = task.title;
  titleParagraph.innerText = addCardTitle;

  const descriptionParagraph = document.createElement("p");
  const addCardDescription = task.description;
  descriptionParagraph.innerText = addCardDescription;

  removedCardContainer.append(
    addSymbolRemoveDiv,
    cardTitleDiv,
    descriptionParagraph
  );
  cardTitleDiv.append(titleParagraph);
  addSymbolRemoveDiv.append(wrapDiv, modifyDiv);
  wrapDiv.append(wrapImage);
  modifyDiv.append(undoImage, deleteImage);

  removedCardList.appendChild(removedCardContainer);
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
  localStorage.setItem("doneArray", JSON.stringify(doneArray));
  localStorage.setItem("removedArray", JSON.stringify(removedArray));

  cardTitle.value = "";
  cardDescription.value = "";
};

const removeCard = (task, container) => {
  const findIndexRemoved = removedArray.findIndex(
    (t) => t.title === task.title
  );

  if (findIndexRemoved !== -1) {
    container.innerHTML = "";
    removedArray.splice(findIndexRemoved, 1);
  }

  removedArray.forEach((removedTask) => createRemovedCard(removedTask));

  localStorage.setItem("removedArray", JSON.stringify(removedArray));
};

const moveCardToRemoved = (task) => {
  const findIndexDo = toDoTaskArray.findIndex((t) => t.title === task.title);
  const findIndexDone = doneArray.findIndex((t) => t.title === task.title);

  if (findIndexDo !== -1) {
    removedArray.push(toDoTaskArray[findIndexDo]);
    toDoTaskArray.splice(findIndexDo, 1);

    localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));
    localStorage.setItem("removedArray", JSON.stringify(removedArray));

    inProgressCard.innerHTML = "";
    removedCardList.innerHTML = "";

    if (inProgressCard) {
      toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
    }

    if (removedCardList) {
      removedArray.forEach((task) => createRemovedCard(task, removedCardList));
    }
  }

  if (findIndexDone !== -1) {
    removedArray.push(doneArray[findIndexDone]);
    doneArray.splice(findIndexDone, 1);

    localStorage.setItem("doneArray", JSON.stringify(doneArray));
    localStorage.setItem("removedArray", JSON.stringify(removedArray));

    doneCard.innerHTML = "";
    removedCardList.innerHTML = "";

    if (doneCard) {
      doneArray.forEach((task) => createCard(task, doneCard));
    }

    if (removedCardList) {
      removedArray.forEach((task) => createRemovedCard(task, removedCardList));
    }
  }
};

const moveCardToDone = (task) => {
  const findIndex = toDoTaskArray.findIndex((t) => t.title === task.title);
  if (findIndex !== -1) {
    task.isDone = !task.isDone;

    doneArray.push(toDoTaskArray[findIndex]);
    toDoTaskArray.splice(findIndex, 1);

    localStorage.setItem("doneArray", JSON.stringify(doneArray));
    localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));

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

    localStorage.setItem("toDoTaskArray", JSON.stringify(toDoTaskArray));
    localStorage.setItem("doneArray", JSON.stringify(doneArray));

    inProgressCard.innerHTML = "";
    doneCard.innerHTML = "";

    // toDoTaskArray.reverse().forEach((task) => createCard(task, inProgressCard)); reverse method
    toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
    doneArray.forEach((task) => createCard(task, doneCard));
  }
};

toDoTaskArray.forEach((task) => createCard(task, inProgressCard));
doneArray.forEach((task) => createCard(task, doneCard));
removedArray.forEach((task) => createRemovedCard(task));

cardTitle.value = "";
cardDescription.value = "";

addButton.addEventListener("click", addCardFunc);
