let btn_forget = document.getElementById("forget_btn");

btn_forget.addEventListener("click", () => {
  let email_forget = document.getElementById("email_forget").value.trim();
  let existingData = JSON.parse(localStorage.getItem("signup_data")) || [];

  // ✅ Condition 1: Empty field
  if (!email_forget) {
    Swal.fire({
      icon: "warning",
      title: "Missing Email",
      text: "Please enter your registered email.",
      confirmButtonText: "OK",
    });
    return;
  }

  // ✅ Condition 2: Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email_forget)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      confirmButtonText: "OK",
    });
    return;
  }

  // ✅ Check if email exists
  let userIndex = existingData.findIndex((user) => user.email === email_forget);

  if (userIndex !== -1) {
    // Confirm before deletion
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `This will permanently delete the account with email: ${email_forget}`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the user
        existingData.splice(userIndex, 1);
        localStorage.setItem("signup_data", JSON.stringify(existingData));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The account has been deleted successfully.",
          confirmButtonText: "OK",
        });
      }
    });
  } else {
    // ❌ No user found
    Swal.fire({
      icon: "error",
      title: "Not Found",
      text: "No account is registered with this email.",
      confirmButtonText: "Retry",
    });
  }

  // Clear input field
  document.getElementById("email_forget").value = "";
});
