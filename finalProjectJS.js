function generateMealPlan() {
  const form = document.getElementById("mealPlanForm");
  const emailInput = form.elements["email"];

  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email address.");
    return;
  }

  const name = form.elements["name"].value;
  const goal = form.elements["goal"].value;

  const meals = {
    Monday: {
      Breakfast: form.elements["mondayBreakfast"].value,
      Snack: form.elements["mondaySnack"].value,
    },
    Tuesday: {
      Lunch: form.elements["tuesdayLunch"].value,
      Snack: form.elements["tuesdaySnack"].value,
    },
    Wednesday: {
      Dinner: form.elements["wednesdayDinner"].value,
    },
    // Add more days and meals as needed
  };

  const mealPlanPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Meal Plan</title>
            <style>
                body {
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <h1>Weekly Meal Plan</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Goal for the Week:</strong> ${goal}</p>
            <h2>Meals</h2>
            <ul>
                ${Object.entries(meals)
                  .map(
                    ([day, meals]) => `
                    <li>
                        <strong>${day}</strong>
                        <ul>
                            ${Object.entries(meals)
                              .map(
                                ([meal, description]) => `
                                <li><strong>${meal}:</strong> ${description}</li>
                            `
                              )
                              .join("")}
                        </ul>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </body>
        </html>
    `;

  const mealPlanWindow = window.open();
  mealPlanWindow.document.write(mealPlanPage);
}
