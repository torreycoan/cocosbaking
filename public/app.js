// doucument query function
function query(id) {
  return document.querySelector(`#${id}`);
}

// ------------------------------------------------------------

// modal functions
function showmodal(modal) {
  modal.classList.add("is-active");
}

function hidemodal(modal) {
  modal.classList.remove("is-active");
}

// ------------------------------------------------------------

// sign up and sign in modals
// sign up modal

query("signuplink").addEventListener("click", () => {
  showmodal(query("signupmodal"));
});

query("signupmodalbg").addEventListener("click", () => {
  hidemodal(query("signupmodal"));
});

// sign in modal
query("signinlink").addEventListener("click", () => {
  showmodal(query("signinmodal"));
});

query("signinmodalbg").addEventListener("click", () => {
  hidemodal(query("signinmodal"));
});

// ------------------------------------------------------------

// showing and hiding parts of main (home, products, order now)

query("home").addEventListener("click", () => {
  query("homapage").remove("is-hidden");
  query("homapage").add("is-active");

  query("productpage").remove("is-active");
  query("productpage").add("is-hidden");

  query("orderpage").remove("is-active");
  query("orderpage").add("is-hidden");
});

query("products").addEventListener("click", () => {
  query("productpage").remove("is-hidden");
  query("productpage").add("is-active");

  query("homepage").remove("is-active");
  query("homepage").add("is-hidden");

  query("orderpage").remove("is-active");
  query("orderpage").add("is-hidden");
});

query("orders").addEventListener("click", () => {
  query("orderpage").add("is-active");
  query("orderpage").remove("is-hidden");

  query("homepage").remove("is-active");
  query("homepage").add("is-hidden");

  query("productpage").remove("is-active");
  query("productpage").add("is-hidden");
});
