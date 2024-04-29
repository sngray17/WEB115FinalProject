function onLoad() {
  //define an empty meal plan object with days and meal types
  const mealPlan = {
    Monday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Tuesday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Wednesday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Thursday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Friday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Saturday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
    Sunday: {
      breakfast: "",
      snack1: "",
      lunch: "",
      snack2: "",
      dinner: "",
    },
  };

  //define array containing meal types
  const meals = ["breakfast", "lunch", "snack1", "snack2", "dinner"];
  //get the select element for choosing the day
  const daySelect = document.getElementById("days");
  let currentDay = "Monday";

  // Add event listener to the select element for changing the current day
  daySelect.addEventListener("change", function () {
    // Update the current day to the selected day
    currentDay = daySelect.value;

    // Get the meal plan form element
    const form = document.getElementById("mealPlanForm");

    // Clear all meal inputs in the form
    meals.forEach(function (element) {
      form.elements[element].value = "";
      // This function is called after you select a new day. It clears out all of the meal inputs.
    });
  });
  // Get the button for saving meals
  const saveMealsButton = document.getElementById("saveMeals");

  // Add event listener to the save meals button
  saveMealsButton.addEventListener("click", function () {
    //get the day that we want to set the meals for using the currentDay from the select element
    const dayToSet = mealPlan[currentDay];
    //get all of the inputs in the form
    const form = document.getElementById("mealPlanForm");

    /**
     * for each of the meals in the "meals" array, find the form input value for that meal,
     *  then set the meal according to the current day
     */
    meals.forEach(function (meal) {
      const currentMeal = form.elements[meal].value;
      dayToSet[meal] = currentMeal;
    });

    alert(`Meals added for ${currentDay}`);
    meals.forEach(function (element) {
      form.elements[element].value = "";
      // This function is called after you select a new day. It clears out all of the meal inputs.
    });
  });

  // get the button for generating the meal plan
  const generateButton = document.getElementById("generateButton");
  // add event listener to the generate button
  generateButton.addEventListener("click", function () {
    // call function to generate meal plan
    generateMealPlan(mealPlan);
  });

  // get the button for clearing all inputs
  const clearAllButton = document.getElementById("clear");

  // event listener for clear button
  clearAllButton.addEventListener("click", function () {
    // relad the page to clear all inputs
    window.location.reload();
  });
}

// function to generate meal plan html page
function generateMealPlan(mealPlan) {
  // get form elements for name, goal, and email inputs
  const formElements = document.getElementById("mealPlanForm").elements;
  const nameInput = formElements.name;
  const goalInput = formElements.goal;
  const emailInput = formElements.email;

  // email input validation
  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email address.");
    return;
  }

  // get array of days from the meal plan object
  const days = Object.keys(mealPlan);

  // html for meal plan page
  const mealPlanPage = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Meal Plan</title>
          </head>
          <body id="printContent" onload="onLoadOutput">
            <style>
            body {
              font-family: monospace;
            }
            
            button {
              background-color: #319B9E;
              color: white;
              border: none;
              cursor: pointer;
              width: 150px;
              padding-block: 8px;
              margin-block-end: 16px;
              margin-inline-start: 24px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
              transition: background-color 0.3s ease;
          }
  
          button:hover {
              background-color: #206467;
          }

          li {
            list-style-type: none;
          }

          .dayListItem {
            margin-block-end: 20px;
          }
            </style>
              <h1>Weekly Meal Plan</h1>
              <p><strong>Name:</strong> ${nameInput.value}</p>
              <p><strong>Email:</strong> ${emailInput.value}</p>
              <p><strong>Goal for the Week:</strong> ${goalInput.value}</p>
              <h2>Meals</h2>
              <ul>
                  ${days
                    .map(
                      (day) =>
                        `<li class="dayListItem">
                         <h3><strong>${day}</strong></h3>
                          <ul>
                            <li>
                              <span>Breakfast: </span>
                              <span>${mealPlan[day].breakfast}</span>
                            </li>
                            <li>
                              <span>Snack One: </span>
                              <span>${mealPlan[day].snack1}</span>
                            </li>
                            <li>
                              <span>Lunch: </span>
                              <span>${mealPlan[day].lunch}</span>
                            </li>
                            <li>
                              <span>Snack two: </span>
                              <span>${mealPlan[day].snack2}</span>
                            </li>
                            <li>
                             <span>Dinner: </span>
                              <span>${mealPlan[day].dinner}</span>
                            </li>
                          </ul>
                      </li>`
                    )
                    .join("")}
              </ul>
              <button type="button" id="print">Print</button>

          </body>
          </html>
      `;

  // open a new window to display meal plan
  const mealPlanWindow = window.open();
  mealPlanWindow.document.write(mealPlanPage);

  // get meal plan button from meal plan page
  const printButton = mealPlanWindow.document.getElementById("print");

  // function to print meal plan page
  function printMealPlan() {
    var printContents = mealPlanWindow.document.getElementById("printContent").innerHTML;
    mealPlanWindow.print(printContents);
  }

  // event listener for print button
  printButton.addEventListener("click", printMealPlan);
}
