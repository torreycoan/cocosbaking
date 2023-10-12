// sign up environment
let signuplink = document.querySelector("#signuplink");
let signupmodalbg = document.querySelector("#signupmodalbg");
let signupmodal = document.querySelector("#signupmodal");
function showmodal() {
  signupmodal.classList.add("is-active");
}
function hidemodal() {
  signupmodal.classList.remove("is-active");
}

signuplink.addEventListener("click", showmodal);

signupmodalbg.addEventListener("click", hidemodal);
