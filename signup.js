let signupBtn = document.getElementById("signup");

signupBtn.addEventListener("click", () => {
  let name = document.getElementById("name").value.trim();
  let email_signup = document.getElementById("email_sig").value.trim();
  let password_signup = document.getElementById("password_sig").value.trim();

  let existingData = JSON.parse(localStorage.getItem("signup_data")) || [];

  // ✅ Condition 1: Check for empty fields
  if (!name || !email_signup || !password_signup) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Details',
      text: 'Please fill in all the fields.',
      confirmButtonText: 'OK'
    });
    return;
  }

  // 🚫 Condition 2: Check if email already exists
  let emailExists = existingData.some((user) => user.email === email_signup);
  if (emailExists) {
    Swal.fire({
      icon: 'error',
      title: 'Email Already Registered',
      text: 'Try logging in or use a different email.',
      confirmButtonText: 'OK'
    });
    return;
  }

  // ✅ All good, proceed to signup
  let newUser = {
    name: name,
    email: email_signup,
    password: password_signup,
  };
  existingData.push(newUser);
  localStorage.setItem("signup_data", JSON.stringify(existingData));
  
  Swal.fire({
    icon: 'success',
    title: 'Signup Successful',
    text: `Welcome, ${name}! You can now log in.`,
    confirmButtonText: 'Great!'
  });

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("email_sig").value = "";
  document.getElementById("password_sig").value = "";
});
