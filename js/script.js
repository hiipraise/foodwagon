document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("sflBtn");
  const menuBar = document.getElementById("menuBar");
  const menuTime = document.getElementById("menuTime");

  menuBar.addEventListener("click", () => {
    menu.classList.add("show");
    menuBar.classList.add("hidden");
    menuTime.classList.remove("hidden");
  });

  menuTime.addEventListener("click", () => {
    menu.classList.remove("show");
    menuBar.classList.remove("hidden");
    menuTime.classList.add("hidden");
  });
});

// script.js

// Loader for pages that have it
window.onload = function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  if (loader && content) {
    setTimeout(function () {
      loader.style.display = "none";
      content.classList.remove("hidden");
    }, 1000);
  }
};

// Floating Label Behavior for all inputs with .input-group
document.querySelectorAll(".input-group input").forEach((input) => {
  if (input.value.trim() !== "") {
    input.classList.add("filled");
  }

  input.addEventListener("input", () => {
    input.classList.toggle("filled", input.value.trim() !== "");
  });

  input.addEventListener("focusout", () => {
    input.classList.toggle("filled", input.value.trim() !== "");
  });
});

// Custom Password Behavior: Show only the last typed character
document.querySelectorAll(".custom-password").forEach((input) => {
  let timeoutId = null;
  const hiddenInput = input.nextElementSibling.nextElementSibling;
  let realPassword = input.getAttribute("data-password") || "";

  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const validationMessage = input.parentElement.querySelector(
    ".validation-message"
  );

  // Function to validate passwords and update UI
  const validatePasswords = () => {
    if (passwordInput && confirmPasswordInput && validationMessage) {
      const passwordValue = passwordInput.getAttribute("data-password") || "";
      const confirmPasswordValue =
        confirmPasswordInput.getAttribute("data-password") || "";
      const passwordGroup = passwordInput.parentElement;
      const confirmPasswordGroup = confirmPasswordInput.parentElement;

      if (confirmPasswordValue.length > 0) {
        if (passwordValue === confirmPasswordValue) {
          validationMessage.textContent = "Passwords match";
          validationMessage.style.color = "#28a745";
          confirmPasswordGroup.classList.remove("error");
          confirmPasswordGroup.classList.add("success");
          passwordGroup.classList.remove("error");
          passwordGroup.classList.add("success");
        } else {
          validationMessage.textContent = "Passwords do not match";
          validationMessage.style.color = "#ff0000";
          confirmPasswordGroup.classList.remove("success");
          confirmPasswordGroup.classList.add("error");
          passwordGroup.classList.remove("success");
          passwordGroup.classList.add("error");
        }
      } else {
        validationMessage.textContent = "";
        confirmPasswordGroup.classList.remove("error", "success");
        passwordGroup.classList.remove("error", "success");
      }
    }
  };

  input.addEventListener("input", (event) => {
    if (
      event.inputType === "deleteContentBackward" ||
      event.inputType === "deleteContentForward"
    ) {
      realPassword = realPassword.slice(0, -1);
    } else if (event.inputType === "insertText") {
      const newChar = event.data;
      if (newChar) {
        realPassword += newChar;
      }
    }

    input.setAttribute("data-password", realPassword);
    hiddenInput.value = realPassword;

    if (realPassword.length > 0) {
      const maskedPart = "●".repeat(realPassword.length - 1);
      const lastChar = realPassword.slice(-1);
      input.value = maskedPart + lastChar;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        input.value = "●".repeat(realPassword.length);
        validatePasswords();
      }, 1000);
    } else {
      input.value = "";
    }

    // Always validate after any change
    validatePasswords();
  });

  input.addEventListener("paste", (event) => {
    const pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    realPassword += pastedText;

    input.setAttribute("data-password", realPassword);
    hiddenInput.value = realPassword;

    const maskedPart = "●".repeat(realPassword.length - 1);
    const lastChar = realPassword.slice(-1);
    input.value = maskedPart + lastChar;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      input.value = "●".repeat(realPassword.length);
      validatePasswords();
    }, 1000);

    validatePasswords();
  });

  // Add event listeners to password and confirm password to validate on change.
  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener("input", validatePasswords);
    confirmPasswordInput.addEventListener("input", validatePasswords);
  }
});

//disable login/signup btn

document.querySelectorAll("form").forEach((form) => {
  const submitButton = form.querySelector("button[type='submit']");
  const inputs = form.querySelectorAll("input[required]");

  const checkFormValidity = () => {
    let allValid = true;

    inputs.forEach((input) => {
      if (input.classList.contains("custom-password")) {
        const realValue = input.getAttribute("data-password") || "";
        if (!realValue.trim()) {
          allValid = false;
        }
      } else if (!input.value.trim()) {
        allValid = false;
      }
    });

    submitButton.disabled = !allValid;
    submitButton.style.opacity = allValid ? "1" : "0.6";
    submitButton.style.cursor = allValid ? "pointer" : "not-allowed";
  };

  // Initial check
  checkFormValidity();

  // Attach input event listeners
  inputs.forEach((input) => {
    input.addEventListener("input", checkFormValidity);
  });
});
