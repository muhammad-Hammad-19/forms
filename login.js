let btn_login = document.getElementById("btn-login");

btn_login.addEventListener("click", () => {
  let email_login = document.getElementById("login_email").value;
  let password_login = document.getElementById("login_password").value;

  let existingData = JSON.parse(localStorage.getItem("signup_data")) || [];

  let match_data = existingData.find((data) => {
    return data.email === email_login && data.password === password_login;
  });

  if (match_data) {
    Swal.fire({
      icon: "success",
      title: `Welcome, ${match_data.name}!`,
      text: "You have successfully logged in.",
      confirmButtonText: "Continue",
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  } else {
    // ❌ Login failed - using SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password. Please try again.",
      confirmButtonText: "Retry",
    });
  }
  document.getElementById("login_email").value = "";
  document.getElementById("login_password").value = "";
});
