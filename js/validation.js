/* validation.js - demo Sign In / Sign Up validation (nothing is sent or stored) */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
function isValidName(name) {
  return name.trim().length >= 2;
}

// Show an error under a field, or clear it
function setFieldError(input, message) {
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = message;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

function showFormAlert(id, type, text) {
  const alertBox = document.getElementById(id);
  alertBox.className = "alert alert-" + type + " mt-3";
  alertBox.textContent = text;
}

// SIGN IN: email only (demo)
document.getElementById("signinForm").addEventListener("submit", function (event) {
  event.preventDefault();                               // stop page reload
  const email = document.getElementById("signinEmail");
  if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid email, for example name@example.com.");
    showFormAlert("signinAlert", "danger", "Sign in failed. Please fix the errors above.");
    return;
  }
  setFieldError(email, "");
  showFormAlert("signinAlert", "success", "Demo sign in successful. Welcome back to CHESTER MOVIE HUB!");
});

// SIGN UP: name + email (demo)
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  let ok = true;
  if (!isValidName(name.value)) { setFieldError(name, "Enter your name (at least 2 characters)."); ok = false; } else { setFieldError(name, ""); }
  if (!isValidEmail(email.value.trim())) { setFieldError(email, "Enter a valid email, for example name@example.com."); ok = false; } else { setFieldError(email, ""); }
  if (!ok) {
    showFormAlert("signupAlert", "danger", "Sign up failed. Please fix the errors above.");
    return;
  }
  showFormAlert("signupAlert", "success", "Demo account created for " + name.value.trim() + ". Nothing was saved or sent.");
  this.reset();
  name.classList.remove("is-valid"); email.classList.remove("is-valid");
});

// Switch between the two forms with the tab buttons
document.querySelectorAll("[data-form]").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll("[data-form]").forEach(function (t) { t.classList.remove("active"); });
    tab.classList.add("active");
    document.getElementById("signinPanel").classList.toggle("d-none", tab.dataset.form !== "signin");
    document.getElementById("signupPanel").classList.toggle("d-none", tab.dataset.form !== "signup");
  });
});
