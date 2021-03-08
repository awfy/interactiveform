/**
 * On load, we focus the first input (in this case, name).
 */
window.onload = () => document.getElementById("name").focus();

/**
 * Hides `other-title` on load then shows it if "other" is selected in `title`.
 * Also then rehides it if the user selects another option again.
 */
const jobRole = document.getElementById("title");
const jobRoleOther = document.getElementById("other-title");
jobRoleOther.style.display = "none";
jobRole.addEventListener("change", (event) => {
  const value = event.target.value;
  if (value === "other") {
    jobRoleOther.style.display = "";
  } else {
    jobRoleOther.style.display = "none";
  }
});

/**
 * Controls which t-shirts the user can select based on which design is picked
 * then filters the color options down to only the valid ones.
 */
const design = document.getElementById("design");
const colorFieldset = document.getElementById("colors-js-puns");
const color = document.getElementById("color");
colorFieldset.style.display = "none"; // We hide the label and field for color initially until a theme is selected.

design.addEventListener("change", (event) => {
  const value = event.target.value;

  /**
   * If there is no design selected we hide the color select.
   */
  if (value === "Select Theme") {
    colorFieldset.style.display = "none";
  } else if (value !== "Select Theme") {
    colorFieldset.style.display = "";
  }

  /**
   * Depending on which design is selected, we filter the non-valid colors out
   * and only display the ones we want the user to be able to pick.
   */
  const colorOptions = Object.values(color);
  if (value === "js puns") {
    colorOptions.filter((option) => {
      if (
        option.value === "cornflowerblue" ||
        option.value === "darkslategrey" ||
        option.value === "gold"
      ) {
        option.selected = option.value === "cornflowerblue"; // Sets the first option to selected.
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  } else if (value === "heart js") {
    colorOptions.filter((option) => {
      if (
        option.value === "tomato" ||
        option.value === "steelblue" ||
        option.value === "dimgrey"
      ) {
        option.selected = option.value === "tomato"; // Sets the first option to selected.
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  }
});

/**
 * Constructs the additional parts of the activities section we'll require to
 * apply the total and any errors.
 */
const activities = document.querySelector(".activities");
const activitiesTitle = document.querySelector(".activities legend");
const activitiesCheckboxes = document.querySelectorAll(
  'input[type="checkbox"]'
);
const activitiesCost = document.createElement("div");
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
activities.addEventListener("change", (e) => {
  const input = e.target;
  const inputChecked = input.checked;

  /**
   * Get the cost from the `data-cost` attr and convert to a number.
   **/
  const activityCost = parseInt(input.getAttribute("data-cost"));

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
  const activityDate = input.getAttribute("data-day-and-time");

  /**
   * Loop over the checkboxes and mark them as disabled if their date matches
   * that of the checked input, then set disabled to false if the original
   * checkbox is later unchecked.
   **/
  for (let i = 0; i < activitiesCheckboxes.length; i += 1) {
    const currentInput = activitiesCheckboxes[i];
    const currentDate = currentInput.getAttribute("data-day-and-time");
    const dateMatcher = currentDate === activityDate && currentInput !== input;

    if (inputChecked && dateMatcher) {
      currentInput.disabled = true;
    } else if (!inputChecked && dateMatcher) {
      currentInput.disabled = false;
    }
  }
});

const payment = document.querySelector("#payment");
const paymentOptions = Object.values(payment);
const paymentCreditCard = document.querySelector("#credit-card");
const paymentPayPal = document.querySelector("#paypal");
paymentPayPal.style.display = "none";
const paymentBitcoin = document.querySelector("#bitcoin");
paymentBitcoin.style.display = "none";

/**
 * Hides the "Select Payment Method" and selects the "Credit Card" option on
 * load.
 **/
paymentOptions[0].hidden = true;
payment.value = "credit card";

payment.addEventListener("change", (e) => {
  const value = e.target.value;

  /**
   * Shows or hides the different parts of the payment form depending on which
   * payment method is selected.
   */
  if (value === "credit card") {
    paymentCreditCard.style.display = "";
    paymentPayPal.style.display = "none";
    paymentBitcoin.style.display = "none";
  } else if (value === "paypal") {
    paymentCreditCard.style.display = "none";
    paymentPayPal.style.display = "";
    paymentBitcoin.style.display = "none";
  } else if (value === "bitcoin") {
    paymentCreditCard.style.display = "none";
    paymentPayPal.style.display = "none";
    paymentBitcoin.style.display = "";
  }
});

/**
 * Validation for the name field.
 */
const validateName = () => {
  const name = document.querySelector("#name");
  const nameError = document.querySelector("#name-error");
  if (name.value === "") {
    name.className = "field-error";
    nameError.style.display = "block";
    nameError.textContent = "Your name is required.";
    return false;
  } else {
    name.className = "";
    nameError.style.display = "none";
    return true;
  }
};

/**
 * Validation for the email field.
 */
const validateEmail = () => {
  const email = document.querySelector("#mail");
  const emailError = document.querySelector("#email-error");
  const regex = new RegExp(
    "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$"
  );
  if (!regex.test(email.value)) {
    email.className = "field-error";
    emailError.style.display = "block";
    emailError.textContent = "A valid email address is required.";
    return false;
  } else {
    email.className = "";
    emailError.style.display = "none";
    return true;
  }
};

/**
 * Validation for the activities section (at least one must be picked).
 */
const validateActivities = () => {
  const checkboxChecker = Array.prototype.slice
    .call(activitiesCheckboxes)
    .some((checkbox) => checkbox.checked);
  const activitiesError = document.querySelector("#activities-error");
  if (!checkboxChecker) {
    activitiesError.style.display = "block";
    activitiesError.textContent = "You must pick at least one activity.";
    return false;
  } else {
    activitiesError.style.display = "none";
    return true;
  }
};

/**
 * Validation for the 16 digit credit card field.
 */
const validateCCNum = () => {
  const ccNum = document.querySelector("#cc-num");
  const ccNumError = document.querySelector("#cc-num-error");
  const numRegex = new RegExp("^[0-9]{13,16}$");

  /** Show/hide the error message for the 16-digit number. */
  if (payment.value === "credit card") {
    if (!ccNum.value) {
      ccNum.className = "field-error";
      ccNumError.style.display = "block";
      ccNumError.textContent = "You must provide a credit card number.";
      return false;
    } else if (!numRegex.test(ccNum.value)) {
      ccNum.className = "field-error";
      ccNumError.style.display = "block";
      ccNumError.textContent = "Card number must be between 13 and 16 digits.";
      return false;
    } else {
      ccNum.className = "";
      ccNumError.style.display = "none";
      return true;
    }
  }
};

/**
 * Validation for the zip credit card field.
 */
const validateCCZip = () => {
  const ccZIP = document.querySelector("#zip");
  const ccZIPError = document.querySelector("#zip-error");
  const zipRegex = new RegExp("^[0-9]{5}$");

  /** Show/hide the error message for the zip code. */
  if (payment.value === "credit card") {
    if (!zipRegex.test(ccZIP.value)) {
      ccZIP.className = "field-error";
      ccZIPError.style.display = "block";
      ccZIPError.textContent = "Zip must be 5 digits.";
      return false;
    } else {
      ccZIP.className = "";
      ccZIPError.style.display = "none";
      return true;
    }
  }
};

/**
 * Validation for the cvv credit card field.
 */
const validateCCCVV = () => {
  const ccCVV = document.querySelector("#cvv");
  const ccCVVError = document.querySelector("#cvv-error");
  const cvvRegex = new RegExp("^[0-9]{3}$");

  /** Show/hide the error message for the cvv. */
  if (payment.value === "credit card") {
    if (!cvvRegex.test(ccCVV.value)) {
      ccCVV.className = "field-error";
      ccCVVError.style.display = "block";
      ccCVVError.textContent = "CVV must be 3 digits.";
      return false;
    } else {
      ccCVV.className = "";
      ccCVVError.style.display = "none";
      return true;
    }
  }
};

/**
 * Run the email validation whenever the user presses a key in the field.
 *
 * An alternative method might be to do this on blur to avoid annoying the user
 * as they type.
 */
const email = document.querySelector("#mail");
email.addEventListener("keyup", (e) => {
  validateEmail();
});

/**
 * Run the various validators once the form has been submitted.
 */
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  validateName();
  validateEmail();
  validateActivities();
  validateCCNum();
  validateCCZip();
  validateCCCVV();
  if (
    !validateName() ||
    !validateEmail() ||
    !validateActivities() ||
    !validateCCNum() ||
    !validateCCZip() ||
    !validateCCCVV()
  ) {
    e.preventDefault();
  }
});
