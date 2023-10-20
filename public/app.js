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

// messages

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
  query("homepage").classList.remove("is-hidden");
  query("homepage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");
});

query("products").addEventListener("click", () => {
  query("productpage").classList.remove("is-hidden");
  query("productpage").classList.add("is-active");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");
});

query("orders").addEventListener("click", () => {
  query("orderpage").classList.remove("is-hidden");
  query("orderpage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");
});

// ------------------------------------------------------------

// resetting sign up and sign in fields

query("resetsignupfields").addEventListener("click", (e) => {
  e.preventDefault();
  query("signup").reset();
});

query("resetsigninfields").addEventListener("click", (e) => {
  e.preventDefault();
  query("signin").reset();
});

// ------------------------------------------------------------

// create a user

query("signupbtn").addEventListener("click", (e) => {
  alert("hello");
  // e.preventDefault();

  // // email and password

  // let email = query("signupemail").value;
  // let password = query("signuppassword").value;

  // auth.createUserWithEmailAndPassword(email, password).then((user) => {
  //   query("signup").reset();
  //   query("signupmodalcontent").classList.add("is-hidden");

  //   query(
  //     "signupmessage"
  //   ).innerHTML = `You (${user.email}) have succussfully signed up!`;

  //   query("signupmessage").classList.remove("is-hidden");

  //   setTimeout(() => {
  //     query("signupmessage").classList.add("is-hidden");
  //     query("signupmessage").innerHTML = ``;
  //     query(
  //       "signupmodalcontent"
  //     ).innerHTML = `<h2 class="subtitle is-size-3 has-text-weight-bold has-text-centered">
  //     WELCOME TO COCO'S BAKING!
  //   </h2>
  //   <!-- sign up form -->
  //   <form id="signup">
  //     <!-- Name -->
  //     <div class="field">
  //       <label class="label">Name</label>
  //       <div class="control">
  //         <input class="input" type="text" id="email" />
  //       </div>
  //     </div>
  //     <!-- email -->
  //     <div class="field">
  //       <label class="label">Email</label>
  //       <div class="control">
  //         <input class="input" type="text" id="email" />
  //       </div>
  //     </div>

  //     <!-- password -->
  //     <div class="field">
  //       <label class="label">Password</label>
  //       <div class="control">
  //         <input type="password" class="input" id="password" />
  //       </div>
  //     </div>
  //     <div class="has-text-centered">
  //       <button class="button mt-5 mr-3" id="signupbtn">Sign Up</button>
  //       <button class="button has-text-danger mt-5" id="resetsignupfields">
  //         Reset Fields
  //       </button>
  //     </div>
  //   </form>`;
  //     query("signupmodalcontent").classList.remove("is-hidden");
  //     query("signupmodalcontent").classList.add("is-active");
  //   }, 3000);
  // });
});
