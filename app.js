let inputFood = document.getElementById("input-food");
let inputBtn = document.getElementById("input-btn");
let foodContainer = document.getElementById("food-container");
let noListEl = document.getElementById("no-list");
let foodListStatistic = document.getElementById("food-list-statstics");

document.addEventListener("DOMContentLoaded", () => {
    //local storage fetch.draw ui.
    const getFoodItems = localStorage.getItem("food-items");
    const fetchedFoodItems = [...JSON.parse(getFoodItems)];
    fetchedFoodItems.forEach(item => {
        createFoodList(item.foodItem);
        refreshUI();

    })
})
const handleInputFood = () => {
    createFoodList(inputFood.value);

    //set local storage
    localStorage.setItem("food-items", JSON.stringify([...JSON.parse(localStorage.getItem("food-items") || "[]"), { foodItem: inputFood.value }]));

    // resetting the inputFood value
    inputFood.value = "";
    refreshUI();
};

inputBtn.addEventListener("click", handleInputFood);

inputFood.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        handleInputFood();
    }
    else if (event.key === 'KeyZ') {
        inputFood.value = "";
    }

});

//remove list
function removeItem(event) {
    let existingList = event.target.parentNode.parentNode;
    existingList.remove();

    //remove from local storage
    const getFoodItems = localStorage.getItem("food-items");
    const fetchedFoodItems = [...JSON.parse(getFoodItems)];

    fetchedFoodItems.forEach((item) => {

        if (item.foodItem === existingList.innerText) {
            //remove from local storage
            fetchedFoodItems.splice(fetchedFoodItems.indexOf(item), 1)
        }

    });

    localStorage.setItem("food-items", JSON.stringify(fetchedFoodItems));

    refreshUI();
}

function refreshUI() {
    let listLength = foodContainer.children.length;
    foodListStatistic.innerText = `You have ${listLength} tasks`;
    // if (listLength > 0) {
    //     //chidren exist dont show no-list div;
    //     noListEl.hidden = true;
    //     foodListStatistic.innerText = `You have ${listLength} lists`;
    // }
    // else {
    //     noListEl.hidden = false;
    // }
    //you can write better
    foodContainer.children.length > 0 ? ((noListEl.hidden = true), (foodListStatistic.hidden = false)) : ((noListEl.hidden = false), (foodListStatistic.hidden = true));
}

//function to create a new food list
function createFoodList(value) {
    const newFoodEl = document.createElement("li");
    newFoodEl.className = "food-item";
    const divItem = document.createElement('div');
    const divRemoveBtn = document.createElement('div');
    divRemoveBtn.setAttribute('onclick', "removeItem(event)");
    divRemoveBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    newFoodEl.append(divItem, divRemoveBtn);
    //createing inner text dynamically by passing parametrs
    const text = document.createTextNode(value);
    divItem.append(text);
    foodContainer.append(newFoodEl);
}



