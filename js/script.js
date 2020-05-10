// On load, we focus the first input (in this case, name).
window.onload = () => document.getElementById("name").focus();

/**
 * Hides `other-title` on load then shows it if "other" is selected in `title`.
 * Also then rehides it if the user selects another option again.
**/
const jobRole = document.getElementById("title");
const jobRoleOther = document.getElementById("other-title");
jobRoleOther.style.display = 'none';
jobRole.addEventListener('change', event => {
  const value = event.target.value;
  if (value === 'other') {
    jobRoleOther.style.display = '';
  } else {
    jobRoleOther.style.display = 'none';
  }
})

/**
 * 
**/
const design = document.getElementById("design");
const colorFieldset = document.getElementById("colors-js-puns");
const color = document.getElementById("color");

/** We hide the label and field for color initially until a theme is selected. */
colorFieldset.style.display = 'none';

design.addEventListener('change', event => {
  const value = event.target.value;
  if (value === 'Select Theme') {
    colorFieldset.style.display = 'none';
  } else if (value !== 'Select Theme') {
    colorFieldset.style.display = '';
  }

  const colorOptions = Object.values(color);
  if (value === 'js puns') {
    colorOptions.filter(option => {
      if (option.value === 'cornflowerblue' || option.value === 'darkslategrey' || option.value === 'gold') {
        option.selected = option.value === 'cornflowerblue'; // Sets the first option to selected.
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  } else if (value === 'heart js') {
    colorOptions.filter(option => {
      if (option.value === 'tomato' || option.value === 'steelblue' || option.value === 'dimgrey') {
        option.selected = option.value === 'tomato'; // Sets the first option to selected.
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  }
})


const activities = document.querySelector('.activities');
const activitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');
console.log(activitiesCheckboxes);
const activitiesCost = document.createElement('div');
activities.appendChild(activitiesCost);

/** 
 * Create a variable to hold the total cost and apply it to the DOM with 
 * `innerHTML` before any event listeners have been triggered. 
**/
let activitiesTotal = 0;
activitiesCost.innerHTML = `
  <p>Total: $${activitiesTotal}.00</p>
`;

/** 
 * An event listener which listens for any changes made to the checkboxes
 * inside of the activities section.
**/
activities.addEventListener('change', e => {
  const input = e.target;
  const inputChecked = input.checked;

  /** 
   * Get the cost from the `data-cost` attr and convert to a number.
  **/
  const activityCost = parseInt(input.getAttribute('data-cost'));

  /** 
   * If the checkbox is checked we add its cost to the total, if it's not 
   * checked its value is taken away from the total.
  **/
  if (inputChecked) {
    activitiesTotal += activityCost;
  } else if (!inputChecked) {
    activitiesTotal -= activityCost;
  }

  /**
   * Update the total in the DOM with the new total.
  **/
  activitiesCost.innerHTML = `
    <p>Total: $${activitiesTotal}.00</p>
  `;

  /** 
   * Get the day and time from the `data-day-and-time` attr.
  **/
  const activityDate = input.getAttribute('data-day-and-time');
  console.log(activityDate);

  /**
   * Loop over the checkboxes and mark them as disabled if their date matches 
   * that of the checked input, then set disabled to false if the original 
   * checkbox is later unchecked.
  **/
  for (let i = 0; i < activitiesCheckboxes.length; i += 1) {
    const currentInput = activitiesCheckboxes[i];
    const currentDate = currentInput.getAttribute('data-day-and-time');
    const dateMatcher = currentDate === activityDate && currentInput !== input;

    if (inputChecked && dateMatcher) {
      currentInput.disabled = true;
    } else if (!inputChecked && dateMatcher) {
      currentInput.disabled = false;
    }
  }
})


