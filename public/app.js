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

// myorders delete doc function
function delMyOrders(id) {
  db.collection("orders")
    .doc(id)
    .delete()
    .then(() => {
      db.collection("orders")
        .get()
        .then((data) => {
          loadMyOrders(data);
        });
    });
  message_bar(`Order has been deleted!`);
}

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

// Account Dropdown

document.addEventListener("DOMContentLoaded", function () {
  // Get the dropdown trigger and menu elements
  const dropdownTrigger = document.querySelector("#user-trigger");
  const dropdownMenu = document.querySelector("#account_dropdown");

  // Function to toggle the dropdown menu
  function toggleDropdown() {
    dropdownMenu.classList.toggle("is-active");
  }

  // Add click event listener to the dropdown trigger
  dropdownTrigger.addEventListener("click", toggleDropdown);

  // Close the dropdown when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInside =
      dropdownMenu.contains(event.target) ||
      dropdownTrigger.contains(event.target);
    if (!isClickInside) {
      dropdownMenu.classList.remove("is-active");
    }
  });
});

// ------------------------------------------------------------

// SIGNIN CHECK
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    if (user.email == "cocosbakingowner@gmail.com") {
      admin_status = true;
      document.getElementById("orders").innerHTML = "Add Products";
      document.getElementById("myorders").innerHTML = "Manage Orders";
    }
    document.getElementById("user_email_drop").innerHTML = "";
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
  document.getElementById("signupfname").value = "";
  document.getElementById("signuplname").value = "";
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
      document.getElementById("signinlink").classList.remove("is-hidden");
      document.getElementById("signuplink").classList.remove("is-hidden");
      document.getElementById("signoutlink").classList.add("is-hidden");
      message_bar("You have successfully signed out!");
      query("myorderspage").classList.add("is-hidden");
      query("homepage").classList.remove("is-hidden");
      query("homepage").classList.add("is-active");
      query("acctsettingspage").classList.add("is-hidden");
    })
    .catch((error) => {
      alert(error.message);
    });
  location.reload();
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
  const fname = query("signupfname").value;
  const lname = query("signuplname").value;
  const email = query("signupemail").value;
  const phone = query("signupphone").value;
  const venmo = query("signupvenmo").value;
  const password = query("signuppassword").value;

  let data = {
    fname: fname,
    lname: lname,
    email: email,
    phone: phone,
    venmo: venmo,
  };

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      query("signup").reset();
      query("signupmodal").classList.remove("is-active");

      document.getElementById("signinlink").classList.add("is-hidden");
      document.getElementById("signuplink").classList.add("is-hidden");
      document.getElementById("signoutlink").classList.remove("is-hidden");
      db.collection("users").doc(email).set(data);
      message_bar(`You (${fname}) have succussfully signed up!`);
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
    query("signuplink").classList.add("is-hidden");
    query("signinlink").classList.add("is-hidden");
    query("account_dropdown").classList.remove("is-hidden");
    query("user_email_drop").innerHTML = auth.currentUser.email;
  } else {
    query("user_email_drop").innerHTML = "";
    query("myorders").classList.add("is-hidden");
    query("signedoutordernow").classList.remove("is-hidden");
    query("signedinordernow").classList.add("is-hidden");
    query("incorrectpassword").classList.add("is-hidden");
    query("signuplink").classList.remove("is-hidden");
    query("signinlink").classList.remove("is-hidden");
    query("account_dropdown").classList.add("is-hidden");
  }
});

// ------------------------------------------------------------

// admin status
let admin_status = false;

// ------------------------------------------------------------

// reset order button
query("resetorderbutton").addEventListener("click", (e) => {
  e.preventDefault();
  query("orderform").reset();
  updateSubtotalPrice();
});
updateSubtotalPrice();

function resetorderbtn() {
  query("orderform").reset();
  updateSubtotalPrice();
}
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
    order_total: query("subtotalprice").innerHTML.replace("$", ""),
    order_status: "Pending acceptance/rejection",
    payment_status: "Not paid",
  };
  // Check if one of the data fields is empty
  for (let key in neworder) {
    if (neworder[key] === "") {
      message_bar("Please fill out all fields.");
      return;
    }
  }
  db.collection("orders")
    .add(neworder)
    .then(() => {
      query("orderform").reset();
      message_bar("Order Placed!");
      document.body.scrollTop = 0;
    });
  resetorderbtn();
});
// -------------------------------------------------------
// My Orders - Owner side - display all orders
//query("myorders").addEventListener("click", (allorders) => {

function ownerLoadMyOrders(data) {
  query("myorderstablebody").innerHTML = ``;
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

    //see all orders - and have hidden inputs so that we can later use them to update orders
    docs.forEach((doc) => {
      let order = doc.data();

      tablehtml += `<tr id = ${doc.id}>
          <td>${order.first_name} ${order.last_name}</td>
          <td>${order.customer_email}</td>
          <td>${order.product_type}</td>
          <td>${order.quantity}</td>
          <td>${order.delivery_method}</td>
          <td>${order.formal_event}</td>
          <td>${order.completion_date}</td>
          <td>${order.additional_notes}</td>
          <td>${order.order_total} </td>
          <td>
              <div class = "select"><select id = "order${doc.id}neworderstatus">
              <option selected disabled hidden>${order.order_status}</option>
              <option>Pending acceptance/rejection</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>In progress</option>
                <option>Completed</option>
              </select></div>
              </td>
          <td>
              <div class = "select"><select id = "order${doc.id}newpaymentstatus">
                <option selected disabled hidden>${order.payment_status}</option>
                <option>Not paid</option>
                <option>Paid</option>
              </select></div>
          </td>
          <td><button class="button" onclick="update_order('${doc.id}')">Update</button></td>
          <td><button class="button is-danger" onclick="delMyOrders('${doc.id}')">Delete</button></td>
          </tr>
          `;
    });

    query("myorderstablebody").innerHTML += tablehtml;
  }
}
//});
myorders_area = document.querySelector("#myordersplaced");
// ^ does not exist anymore
function loadMyOrders(data) {
  if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
    return;
  }
  query("myordersplaced").innerHTML = "";

  let orders = data.docs;
  orders.forEach((order) => {
    if (auth.currentUser.email == order.data().customer_email) {
      const addOrder = document.createElement("div");
      addOrder.classList.add(`order`);
      addOrder.innerHTML = `<div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-128x128">
                      <img src="images/${order.data().product_type}.jpg" alt="${
        order.data().name
      }">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="card has-background-grey-light is-shadowless p-1 has-text-left has-text-weight-bold"> <a id="button1" class="restaurant_active"> <span class="title is-5 has-text-white"> &nbsp ${
                      order.data().product_type
                    }</span></a></p>
                    <div <button onclick="delMyOrders('${
                      order.id
                    }')" class="button is-pulled-right mt-5"> Cancel Order </div>
                    <p>  <span class="title is-6">Order Status : </span> ${
                      order.data().order_status
                    }</p>
                    <p>  <span class="title is-6">Payment Status : </span> ${
                      order.data().payment_status
                    }</p>
                    <p>  <span class="title is-6">Quantity : </span> ${
                      order.data().quantity
                    }</p>
                    <p><span class="title is-6">Order Total : </span> ${
                      order.data().order_total
                    }</p>
                    <p>  <span class="title is-6">Order Complete By Date : </span> ${
                      order.data().completion_date
                    }</p>
                    <p>  <span class="title is-6">Additional Notes : </span> ${
                      order.data().additional_notes
                    }</p>
                  </div>       
                </div>
              </div>
            </div> 
            <br>`;

      myorders_area.append(addOrder);
    }
  });
}

//       docs.forEach((doc) => {
//         // if the current user's email is the one in the order, display it.
//         let order = doc.data();

//         if (auth.currentUser.email == order.customer_email) {
//           //console.log(doc.data().customer_email)
//           //row: name, email, product, Q, deliv method, form event, comp date,
//           // order total, order status, pmt status
//           tablehtml += `<tr id = ${doc.id}>
//         <td>${order.first_name} ${order.last_name} </td>
//         <td>${order.customer_email}</td>
//         <td>${order.product_type}</td>
//         <td>${order.quantity}</td>
//         <td>${order.delivery_method}</td>
//         <td>${order.formal_event}</td>
//         <td>${order.completion_date}</td>
//         <td>${order.additional_notes}</td>
//         <td>${order.order_total}</td>
//         <td>${order.order_status}</td>
//         <td>${order.payment_status}</td>
//         </tr>
//         `;
//         }
//       });
//       //console.log(html)
//       //add content to an existing div - use innerHTML property
//       document.querySelector("#myorderstablebody").innerHTML += tablehtml;
//       document.querySelector("#myordersplaced").innerHTML += html;
//     });

//   // todo: change it so if its joey, it brings up the other html.

//   //todo: before the html addition, sort it by required completion date
// });

// // nav burger

let burger_nav = document.querySelector("#burger_nav");
let menu_nav = document.querySelector("#menu_nav");

function burger_open() {
  burger_nav.classList.add("is-active");
  menu_nav.classList.add("is-active");
  console.log("hello");
  document.querySelector("#account_dropdown").classList.remove("is-right");
  document.querySelector("#account_dropdown").classList.add("is-active");
}

function burger_close() {
  burger_nav.classList.remove("is-active");
  menu_nav.classList.remove("is-active");
  document.querySelector("#account_dropdown").classList.add("is-right");
  document.querySelector("#account_dropdown").classList.remove("is-active");
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
  document.querySelector("#account_dropdown").classList.remove("is-right");
  document.querySelector("#account_dropdown").classList.add("is-active");
});

// PRODUCTS PAGE ---------------------------------
//customer side - display all products
// ppr = products per row = 3.
// if #ofproducts%ppr = 0, then numrows = #prod/ppr.
//if !=0, then numrows = #prod/ppr - #prod%ppr/ppr + 1
let productsperrow = 3;

// todo: added to the sign up/ sign in stuff that's executed
// todo: have a refresh button that calls this (for joey's sake)
//db.collection('products').doc('Oth50KDIejTlkT6gHPCv').delete()
query("products").addEventListener("click", () => {
  query("productscontainer").innerHTML = ``; // this may be useful later
  db.collection("products")
    .get()
    .then((data) => {
      let docs = data.docs;
      //console.log(docs)
      let numprod = docs.length;
      let numrows = "!";
      let allproductshtml = ``;
      //let arr = Array.from(Array(numprod).keys())

      //todo; delete these 2 ifs. not needed.
      if (numprod % productsperrow == 0) {
        numrows = numprod / productsperrow;
      }
      if (numprod % productsperrow != 0) {
        numrows =
          numprod / productsperrow -
          (numprod % productsperrow) / productsperrow +
          1;
      }

      let idx = 0;
      docs.forEach((doc) => {
        //console.log(doc.id)
        let prod = doc.data();
        //console.log(prod, doc.id)
        let prodhtml = ``;
        // if the remainder ==0 then i want to start a new columns class div (start a new row)
        if (idx % productsperrow == 0) {
          prodhtml += `<div class="columns">`;
        }
        //then, for all, i want to add a column class div
        prodhtml += `
            <div class="column">
              <div class="card product-card is-one-third">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img src="images/${prod.name}.jpg" alt=${prod.name} />
                  </figure>
                </div>
                <div class="card-content">
                  <p class="title is-4">${prod.name}</p>
                  <p class="content">
                    ${prod.desc}
                  </p>
                  <p class="content">Sizes: ${prod.sizes}</p>
                  <p class="content">Serves: ${prod.serves}</p>
                  <p class="content">Price: $${prod.price}</p>
                </div>
              </div>
            </div>`;
        //if the remainder for idx+1 ==0, close the columns class div (perfect end to row, no blank space to fill w invisible cards)
        if ((idx + 1) % productsperrow == 0) {
          prodhtml += `</div>`;
        }
        // add html to the all html
        allproductshtml += prodhtml;
        // increment idx
        idx += 1;
      });

      // if its not a perfect ending to the row (remainder!=0), add invisible cards to keep proper spacing
      //  - # of invisible cards = ppr-remainder
      //  - close the columns class div
      if (numprod % productsperrow != 0) {
        numinvisiblecards = productsperrow - (numprod % productsperrow); // 3-4%3 = 3-1  = 2 invisible cards needed
        let arr = Array.from(Array(numinvisiblecards).keys());
        arr.forEach(() => {
          allproductshtml += `
        <div class="column is-invisible">
          <div class="card product-card">
          </div>  
        </div>`;
        });
        allproductshtml += `</div>`;
      }

      //add all the html to the page
      query("productscontainer").innerHTML = allproductshtml;
    });
});
// ------------------------------------------------------------

// filtering myorders
query("filterbutton").addEventListener("click", (e) => {
  e.preventDefault();
  let orderstatus = query("orderstatusfilter").value;
  let paymentstatus = query("paymentstatusfilter").value;
  if (orderstatus != "No Selection" && paymentstatus != "No Selection") {
    db.collection("orders")
      .where("order_status", "==", orderstatus)
      .where("payment_status", "==", paymentstatus)
      .get()
      .then((data) => {
        if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
          return ownerLoadMyOrders(data);
        }
        // return loadMyOrders(data);
      });
  }
  if (orderstatus != "No Selection" && paymentstatus == "No Selection") {
    db.collection("orders")
      .where("order_status", "==", orderstatus)
      .get()
      .then((data) => {
        if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
          return ownerLoadMyOrders(data);
        }
        return loadMyOrders(data);
      });
  }
  if (orderstatus == "No Selection" && paymentstatus != "No Selection") {
    db.collection("orders")
      .where("payment_status", "==", paymentstatus)
      .get()
      .then((data) => {
        if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
          return ownerLoadMyOrders(data);
        }
        return loadMyOrders(data);
      });
  }
  if (orderstatus == "No Selection" && paymentstatus == "No Selection") {
    message_bar("Make a selection to filter!");
  }
});

// reset filter form
query("resetfilterbutton").addEventListener("click", (e) => {
  e.preventDefault();
  db.collection("orders")
    .get()
    .then((data) => {
      query("filterform").reset();
      if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
        ownerLoadMyOrders(data);
      } else {
        loadMyOrders(data);
      }
    });
  message_bar("Filter reset!");
});

// customer side showing and hiding parts of main (home, products, order now, my orders)
query("logohome").addEventListener("click", () => {
  query("homepage").classList.remove("is-hidden");
  query("homepage").classList.add("is-active");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");

  query("acctsettingspage").classList.add("is-hidden");
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

  query("acctsettingspage").classList.add("is-hidden");
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

  query("acctsettingspage").classList.add("is-hidden");
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

  query("acctsettingspage").classList.add("is-hidden");

  db.collection("products")
    .get()
    .then((data) => {
      let docs = data.docs;
      let html = `<option value = ''> </option>`;
      docs.forEach((doc) => {
        html += `<option value="${doc.data().name}">${
          doc.data().name
        }</option>`;
      });
      query("productselection").innerHTML = html;
    });
});

query("myorders").addEventListener("click", () => {
  db.collection("orders")
    .get()
    .then((data) => {
      if (auth.currentUser.email == "cocosbakingowner@gmail.com") {
        return ownerLoadMyOrders(data);
      }
      loadMyOrders(data);
    });
  query("myorderspage").classList.remove("is-hidden");
  query("myorderspage").classList.add("is-active");

  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("acctsettingspage").classList.add("is-hidden");
});

query("Add");

// Function to update the subtotal price
function updateordertotal() {}

function updateSubtotalPrice() {
  let productName = query("productselection").value;
  const db = firebase.firestore();
  if (productName == "") {
    query("subtotalprice").innerText = `$0`;
    return;
  }
  db.collection("products")
    .where("name", "==", productName)
    .get()
    .then((data) => {
      let price = data.docs[0].data().price;
      let quantity = query("quantity").value;
      if (quantity == "10+ (Contact Please)") {
        quantity = "Contact Please";
      } else quantity = parseInt(quantity);
      if (quantity == "Contact Please") {
        query("subtotalprice").innerText = `${quantity}`;
        return;
      }
      let subtotal = price * quantity;
      query("subtotalprice").innerText = `$${subtotal}`;
    });
}

document
  .getElementById("productselection")
  .addEventListener("change", updateSubtotalPrice);
document
  .getElementById("quantity")
  .addEventListener("change", updateSubtotalPrice);

// click event for account settings
query("accountsettings").addEventListener("click", () => {
  query("acctsettingspage").classList.remove("is-hidden");
  query("homepage").classList.remove("is-active");
  query("homepage").classList.add("is-hidden");
  query("productpage").classList.remove("is-active");
  query("productpage").classList.add("is-hidden");

  query("orderpage").classList.remove("is-active");
  query("orderpage").classList.add("is-hidden");

  query("myorderspage").classList.remove("is-active");
  query("myorderspage").classList.add("is-hidden");
  settingsuserinfo(auth.currentUser.email);
});

// function to show your user info in account settings
function settingsuserinfo(email) {
  db.collection("users")
    .get()
    .then((data) => {
      docs = data.docs;
      docs.forEach((doc) => {
        if (email == doc.id) {
          query("acctsettingsfname").innerHTML = doc.data().fname;
          query("acctsettingslname").innerHTML = doc.data().lname;
          query("acctsettingsvenmo").innerHTML = doc.data().venmo;
          query("acctsettingsphone").innerHTML = doc.data().phone;
        }
      });
    });
}

function update_doc(id) {
  db.collection("users")
    .doc(id)
    .update({
      fname: query("fnamechange").value,
      lname: query("lnamechange").value,
      phone: query("phonechange").value,
      venmo: query("venmochange").value,
    });
  settingsuserinfo(auth.currentUser.email);
  query("settingsinputfname").innerHTML = ``;
  query("settingsinputlname").innerHTML = ``;
  query("settingsinputphone").innerHTML = ``;
  query("settingsinputvenmo").innerHTML = ``;
  message_bar("Information Updated!");
  query("updategoback").classList.add("is-hidden");
  query("updateinfobutton").classList.remove("is-hidden");
}

// Owner's My Orders/Manage Orders page - update_order function
function update_order(id) {
  // get new payment/order status info
  neworderstatus = query(`order${id}neworderstatus`).value;
  newpaymentstatus = query(`order${id}newpaymentstatus`).value;
  //console.log(neworderstatus, newpaymentstatus)

  // update orders collection
  db.collection("orders").doc(id).update({
    order_status: neworderstatus,
    payment_status: newpaymentstatus,
  });

  message_bar(`Order has been updated!`);
}

// click event for when user clicks on update information
query("updateinfobutton").addEventListener("click", () => {
  query("updateinfobutton").classList.add("is-hidden");
  query("updategoback").classList.remove("is-hidden");
  db.collection("users")
    .get()
    .then((data) => {
      docs = data.docs;
      docs.forEach((doc) => {
        if (auth.currentUser.email == doc.id) {
          id = doc.id;
          query(
            "settingsinputfname"
          ).innerHTML = `<input type="text" class="input" id="fnamechange" value="${
            doc.data().fname
          }"><button class="button m-3" onclick="update_doc('${id}')">Update</button>
          `;

          query(
            "settingsinputlname"
          ).innerHTML = `<input type="text" class="input" id="lnamechange" value="${
            doc.data().lname
          }"><button class="button m-3" onclick="update_doc('${id}')">Update</button>
          `;

          query(
            "settingsinputphone"
          ).innerHTML = `<input type="text" class="input" id="phonechange" value="${
            doc.data().phone
          }"><button class="button m-3" onclick="update_doc('${id}')">Update</button>
          `;

          query(
            "settingsinputvenmo"
          ).innerHTML = `<input type="text" class="input" id="venmochange" value="${
            doc.data().venmo
          }"><button class="button m-3" onclick="update_doc('${id}')">Update</button>
          `;
        }
      });
    });
});

query("updategoback").addEventListener("click", () => {
  query("settingsinputfname").innerHTML = ``;
  query("settingsinputlname").innerHTML = ``;
  query("settingsinputphone").innerHTML = ``;
  query("settingsinputvenmo").innerHTML = ``;
  query("updategoback").classList.add("is-hidden");
  query("updateinfobutton").classList.remove("is-hidden");
});
