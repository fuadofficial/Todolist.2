// Select id form html
let kitchenInput = document.getElementById("kitchen-input");
let addBtn = document.getElementById("add-btn");
let kitchenItemsList = document.getElementById("kitchen-items-list");

// Variable to store data from the kitchen input
let kitchenInputData;
let kitchenInputDataArray = [];

// Event listeners setup:
addBtn.addEventListener("click", addKitchenList);
kitchenItemsList.addEventListener("click", deleteKitchenItem);
kitchenItemsList.addEventListener("click", editKitchenItem);

// Create values by click "addBtn"
function addKitchenList() {
  kitchenInputData = kitchenInput.value;
  kitchenInputDataArray.push(kitchenInputData);
  setLocalStorage();
  getLocalStorage();
}

// Value set to localStorage
function setLocalStorage() {
  localStorage.setItem("kitchenInput", JSON.stringify(kitchenInputDataArray));
}

// Value get from localStorage
function getLocalStorage() {
  if (localStorage.getItem("kitchenInput")) {
    kitchenInputDataArray = JSON.parse(localStorage.getItem("kitchenInput"));
    buildUI();
  }
}

// Function to build and update the kitchen items UI:
function buildUI() {
  kitchenItemsList.textContent = "";
  kitchenInputDataArray.forEach((item) => {
    let li = document.createElement("li");
    let spanElement = document.createElement("span");
    li.appendChild(spanElement);
    spanElement.innerText = item;
    kitchenItemsList.appendChild(li);
    li.style.cssText = "animation-name: slideIn";
    kitchenInput.value = "";
    kitchenInput.focus();

    // Create delete icon
    let trashBtn = document.createElement("i");
    trashBtn.classList.add("fas", "fa-trash");
    li.appendChild(trashBtn);

    // Create edit icon
    let editBtn = document.createElement("i");
    editBtn.classList.add("fas", "fa-edit");
    li.appendChild(editBtn);
  });
}

// Delete value
function deleteKitchenItem(event) {
  if (event.target.classList[1] === "fa-trash") {
    let item = event.target.parentElement;
    item.classList.add("slideOut");
    item.addEventListener("transitionend", function () {
      item.remove();
    });
  }
}

// Edit value
function editKitchenItem(event) {
  if (event.target.classList[1] === "fa-edit") {
    let editValue = prompt("Please change your order now!");
    let item = event.target.parentElement;
    let spanElement = item.querySelector("span");
    spanElement.innerText = editValue;
  }
}

getLocalStorage();
