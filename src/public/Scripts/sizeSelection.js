// sizeSelection.js

// Function to check if a size is selected
function checkSizeSelection() {
  // Check if any radio button is selected
  const sizeSelected = document.querySelector(
    'input[name="size"]:checked'
  );

  if (!sizeSelected) {
    // If no size is selected, display an alert and prevent default action
    alert("Vui lòng chọn size");
    return false; // Prevent page navigation
  }else{
    return true;
  }
}


// Variable to track the last checked size
let lastCheckedSize = null;

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to each size option
  document.querySelectorAll('input[name="shop-sizes"]').forEach((option) => {
    option.addEventListener("click", function () {
      if (lastCheckedSize === this) {
        // If the same option is clicked again, uncheck it
        this.checked = false;
        lastCheckedSize = null; // Reset to no selection
      } else {
        // If a new size is selected, update lastCheckedSize
        lastCheckedSize = this;
      }
    });
  });

  // Attach the checkSizeSelection function to the form submission
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", checkSizeSelection);
  }
});

// passwordValidation.js

// Function to validate password and confirm password
function validatePassword() {
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp! Vui lòng nhập lại.");
    return false; // Return false if passwords do not match
  }
  return true; // Return true if passwords match
}

function validateEmail() {
  const emailInput = document.getElementById("username").value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(emailInput)) {
    alert("Vui lòng nhập một địa chỉ email hợp lệ.");
    return false; // Ngăn chặn form submit nếu email không hợp lệ
  }
  return true; // Cho phép submit nếu email hợp lệ
}
