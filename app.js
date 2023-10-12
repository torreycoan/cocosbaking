// sign up environment
let signuplink = document.querySelector("#signuplink");
let signupmodalbg = document.querySelector("#signupmodalbg");
let signupmodal = document.querySelector("#signupmodal");
function showsignupmodal() {
  signupmodal.classList.add("is-active");
}
function hidesignupmodal() {
  signupmodal.classList.remove("is-active");
}

signuplink.addEventListener("click", showsignupmodal);

signupmodalbg.addEventListener("click", hidesignupmodal);

// sign in environment
let signinlink = document.querySelector("#signinlink");
let signinmodalbg = document.querySelector("#signinmodalbg");
let signinmodal = document.querySelector("#signinmodal");
function showsigninmodal() {
  signinmodal.classList.add("is-active");
}
function hidesigninmodal() {
  signinmodal.classList.remove("is-active");
}

signinlink.addEventListener("click", showsigninmodal);

signinmodalbg.addEventListener("click", hidesigninmodal);
