// sizeSelection.js

// Function to check if a size is selected
function checkSizeSelection(event) {
  // Check if any radio button is selected
  const sizeSelected = document.querySelector(
    'input[name="size"]:checked'
  );

  if (!sizeSelected) {
    // If no size is selected, display an alert and prevent default action
    alert("Vui lòng chọn size");
    return false;

  }
  return true;
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

const logoutIcon = document.getElementById("logout-icon");
const logoutMenu = document.getElementById("logout-menu");

logoutIcon.addEventListener("click", function (event) {
  event.preventDefault();
  logoutMenu.style.display =
    logoutMenu.style.display === "block" ? "none" : "block";
});

// JavaScript để hiển thị/ẩn menu khi click

// js đã thêm 4/11/2024
// logout
document.addEventListener("DOMContentLoaded", function () {
  const logoutIcon = document.getElementById("logout-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (logoutIcon && dropdownMenu) {
    // Toggle hiển thị menu khi nhấp vào biểu tượng
    logoutIcon.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Ẩn menu khi click ra ngoài
    document.addEventListener("click", function (event) {
      if (
        !logoutIcon.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.style.display = "none";
      }
    });
  }
});

// update price money
// function updateQuantity(button, change) {
//   const quantityInput = button
//     .closest(".input-group")
//     .querySelector(".quantity-input");
//   let quantity = parseInt(quantityInput.value);

//   // Tính toán giá tổng cho sản phẩm
//   const productRow = button.closest("tr");
//   const pricePerUnit = parseInt(
//     productRow.querySelector(".product-price").getAttribute("data-price")
//   );
//   const totalPriceElement = productRow.querySelector(".product-total");

//   // Cập nhật giá tổng sản phẩm
//   const total = pricePerUnit * quantity;
//   totalPriceElement.setAttribute("data-price", total);
//   totalPriceElement.innerHTML = formatCurrency(total) + " VNĐ";

//   // Cập nhật tổng phụ
//   updateCartTotals();
// }

function updateCartTotals() {
  const productTotals = document.querySelectorAll(".product-total");
  const shippingFee = 100000; // Phí vận chuyển
  let subtotal = 0;

  productTotals.forEach((total) => {
    // Lấy giá trị từ thuộc tính data-price
    const price = parseInt(total.getAttribute("data-price"));
    if (!isNaN(price)) {
      subtotal += price; // Chỉ cộng vào subtotal nếu giá hợp lệ
    }
  });

  // Cập nhật giá trị tổng phụ
  const subtotalElement = document.querySelector("[data-subtotal]");
  subtotalElement.innerHTML = formatCurrency(subtotal) + " VNĐ";

  // Cập nhật phí vận chuyển
  const shippingElement = document.querySelector("[data-shipping]");
  shippingElement.innerHTML = formatCurrency(shippingFee) + " VNĐ";

  // Cập nhật tổng cộng
  const totalElement = document.querySelector("[data-total]");
  const grandTotal = subtotal + shippingFee;
  totalElement.innerHTML = formatCurrency(grandTotal) + " VNĐ";
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng giá tiền
}

// Gọi hàm này khi trang được tải để cập nhật tổng số giỏ hàng
updateCartTotals();



function updatenum(){

}
