// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsNA9i2J-BFY5FuhmOpFAltzKS9JFdpVg",
  authDomain: "cocosbaking-b6361.firebaseapp.com",
  projectId: "cocosbaking-b6361",
  storageBucket: "cocosbaking-b6361.appspot.com",
  messagingSenderId: "972049300413",
  appId: "1:972049300413:web:38bc284a6eba75a4aaf0d4",
  measurementId: "G-0TH0WTPSGB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// define authentication variable
let auth = firebase.auth();
let db = firebase.firestore();
let ref = firebase.storage().ref();

// ------------------------------------------------------------

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
function message_bar(msg) {
  query("message").innerHTML = msg;

  query("message").classList.remove("is-hidden");

  setTimeout(() => {
    query("message").classList.add("is-hidden");
    query("message").innerHTML = "";
  }, 5000);
}

// ------------------------------------------------------------

// SIGNIN CHECK
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    query("currentuser").innerHTML = auth.currentUser.email;
    document.getElementById("signinlink").classList.add("is-hidden");
    document.getElementById("signuplink").classList.add("is-hidden");
    document.getElementById("signoutlink").classList.remove("is-hidden");
  }
});

// ------------------------------------------------------------

// sign up and sign in modals
// sign up modal

query("signuplink").addEventListener("click", () => {
  showmodal(query("signupmodal"));
});

query("signupmodalbg").addEventListener("click", () => {
  hidemodal(query("signupmodal"));
  document.getElementById("signupname").value = "";
  document.getElementById("signupemail").value = "";
  document.getElementById("signuppassword").value = "";
});

// sign in modal
query("signinlink").addEventListener("click", () => {
  showmodal(query("signinmodal"));
});

query("signinmodalbg").addEventListener("click", () => {
  hidemodal(query("signinmodal"));
  document.getElementById("signinemail").value = "";
  document.getElementById("signinpassword").value = "";
});

// ------------------------------------------------------------

// Sign Out
query("signoutlink").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      query("currentuser").innerHTML = "";
      document.getElementById("signinlink").classList.remove("is-hidden");
      document.getElementById("signuplink").classList.remove("is-hidden");
      document.getElementById("signoutlink").classList.add("is-hidden");
      message_bar("You have successfully signed out!");
    })
    .catch((error) => {
      alert(error.message);
    });
});

// ------------------------------------------------------------

// showing and hiding parts of main (home, products, order now)
query("logohome").addEventListener("click", () => {
  query("homepage").classList.remove("is-hidden");
  query("homepage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");
});

query("home").addEventListener("click", () => {
  query("homepage").classList.remove("is-hidden");
  query("homepage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");
});

query("products").addEventListener("click", () => {
  query("productpage").classList.remove("is-hidden");
  query("productpage").classList.add("is-active");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");
});

query("orders").addEventListener("click", () => {
  query("orderpage").classList.remove("is-hidden");
  query("orderpage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");
});

query("myorders").addEventListener("click", () => {
  query("myorderspage").classList.remove("is-hidden");
  query("myorderspage").classList.add("is-active");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");
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

// Sign Up - create a user

query("signupbtn").addEventListener("click", (e) => {
  e.preventDefault();

  // name, email and password from the form
  const name = query("signupname").value;
  const email = query("signupemail").value;
  const password = query("signuppassword").value;

  let data = {
    name: name,
    email: email,
  };

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      query("signup").reset();
      query("signupmodal").classList.remove("is-active");

      query("currentuser").innerHTML = name;
      document.getElementById("signinlink").classList.add("is-hidden");
      document.getElementById("signuplink").classList.add("is-hidden");
      document.getElementById("signoutlink").classList.remove("is-hidden");
      db.collection("users").doc(email).set(data);
      message_bar(`You (${name}) have succussfully signed up!`);
    })
    .catch(() => {
      alert("The email address is already in use by another account.");
    });
});

// ------------------------------------------------------------

// Sign In

const signInForm = query("signin");
// Add an event listener for form submission
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get user info
  const email = signInForm.querySelector("input[type=email]").value;
  const password = signInForm.querySelector("input[type=password]").value;
  // Sign in with Firebase authentication APIs
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //Clear the form
      signInForm.reset();
      //Close the modal
      query("signinmodal").classList.remove("is-active");
      // Show the user profile removing sign in and sign up buttons
      // After firestore is set up, we will show the user's name here
      query("currentuser").innerHTML = auth.currentUser.email;
      document.getElementById("signinlink").classList.add("is-hidden");
      document.getElementById("signuplink").classList.add("is-hidden");
      document.getElementById("signoutlink").classList.remove("is-hidden");
      //Show a success message
      message_bar("You signed in successfully!");
    })
    .catch((error) => {
      query("incorrectpassword").classList.remove("is-hidden");
    });
});

// ------------------------------------------------------------

// status of user on the site
auth.onAuthStateChanged((user) => {
  if (user) {
    query("myorders").classList.remove("is-hidden");
    query("signedoutordernow").classList.add("is-hidden");
    query("signedinordernow").classList.remove("is-hidden");
  } else {
    query("myorders").classList.add("is-hidden");
    query("signedoutordernow").classList.remove("is-hidden");
    query("signedinordernow").classList.add("is-hidden");
    query("incorrectpassword").classList.add("is-hidden");
  }
});

// ------------------------------------------------------------

// reset order button
query("resetorderbutton").addEventListener("click", (e) => {
  e.preventDefault();
  query("orderform").reset();
});

// ------------------------------------------------------------

// taking orders (field values) - Submit Order
query("orderbutton").addEventListener("click", (e) => {
  e.preventDefault();
  let neworder = {
    first_name: query("firstname").value,
    last_name: query("lastname").value,
    //TODO: remove fname and lname OR get it from their signup/profile
    customer_email: auth.currentUser.email, // TODO: check if this works
    product_type: query("productselection").value,
    quantity: query("quantity").value,
    delivery_method: query("deliverymethod").value,
    formal_event: query("formalevent").value,
    completion_date: query("completiondate").value,
    additional_notes: query("additionalnotes").value,
    //TODO: add order total - if not here, to the webpage. "refresh subtotal" button?
    order_total: "TODO - calculate this",
    order_status: "Pending acceptance/rejection",
    payment_status: "Not paid",
  };

  db.collection("orders")
    .add(neworder)
    .then(() => {
      query("orderform").reset();
      message_bar("Order Placed!");
      document.body.scrollTop = 0;
    });
});
// -------------------------------------------------------

// My Orders - Customer side - display all of the user's orders
query("myorders").addEventListener("click", (allorders) => {
  db.collection("orders")
    .get()
    .then((data) => {
      let docs = data.docs; //array to loop thru
      let tablehtml = ``;
      let html = ``;

      if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
        //TODO:if owner, add additional buttons & cols to the My Orders page
        // buttons: one to see pending orders, one to see accepted orders, one to see completed orders
        // maybe limit the number of orders that can be added on a page? or have another button for archived orders that she's not interested in seeing anymore?

        // console.log('admin')
        // html += "Admin view"

        //if owner/admin,
        //TODO: add additional columns for update/delete buttons
        document.querySelector(
          "#myorderstableheaders"
        ).innerHTML += `<th>Update</th>
      <th>Delete</th>`;
        //see all orders - and have hidden inputs so that we can later use them to update orders
        docs.forEach((doc) => {
          let order = doc.data();
          tablehtml += `<tr id = ${doc.id}>
        <td>${order.first_name} ${order.last_name} <input type = "text" value = "${order.first_name} ${order.last_name}"/></td>
        <td>${order.customer_email}</td>
        <td>${order.product_type}</td>
        <td>${order.quantity}</td>
        <td>${order.delivery_method}</td>
        <td>${order.formal_event}</td>
        <td>${order.completion_date}</td>
        <td>${order.additional_notes}</td>
        <td>${order.order_total}</td>
        <td>${order.order_status}</td>
        <td>${order.payment_status}</td>
        <td><button class="button" onclick="update_doc(this, '${doc.id}')">Update</button></td>
        <td><button class="button is-danger" onclick="delete_doc(this, '${doc.id}')">Delete</button></td>
        </tr>
        `;
        });
      }

      docs.forEach((doc) => {
        // if the current user's email is the one in the order, display it.
        let order = doc.data();

        if (auth.currentUser.email == order.customer_email) {
          //console.log(doc.data().customer_email)
          //row: name, email, product, Q, deliv method, form event, comp date,
          // order total, order status, pmt status
          tablehtml += `<tr id = ${doc.id}>
        <td>${order.first_name} ${order.last_name} </td>
        <td>${order.customer_email}</td>
        <td>${order.product_type}</td>
        <td>${order.quantity}</td>
        <td>${order.delivery_method}</td>
        <td>${order.formal_event}</td>
        <td>${order.completion_date}</td>
        <td>${order.additional_notes}</td>
        <td>${order.order_total}</td>
        <td>${order.order_status}</td>
        <td>${order.payment_status}</td>
        </tr>
        `;
        }
      });
      //console.log(html)
      //add content to an existing div - use innerHTML property
      document.querySelector("#myorderstablebody").innerHTML += tablehtml;
      document.querySelector("#myordersplaced").innerHTML += html;
    });

  // todo: change it so if its joey, it brings up the other html.

  //todo: before the html addition, sort it by required completion date
});

// nav burger

let burger_nav = document.querySelector("#burger_nav");
let menu_nav = document.querySelector("#menu_nav");

function burger_open() {
  burger_nav.classList.add("is-active");
  menu_nav.classList.add("is-active");
}

function burger_close() {
  burger_nav.classList.remove("is-active");
  menu_nav.classList.remove("is-active");
}
document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#burger_nav") &&
    burger_nav.classList.contains("is-active")
  ) {
    burger_close();
  }
});
burger_nav.removeEventListener("mouseover", burger_open);
burger_nav.addEventListener("click", function (event) {
  event.stopPropagation();
  burger_nav.classList.toggle("is-active");
  menu_nav.classList.toggle("is-active");
});
