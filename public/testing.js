// import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
  });

  const page = await browser.newPage();

  //   site the to be tested

  await page.goto("https://cocobaking-88eae.web.app/");

  await page.click("#burger_nav");
  //   user click the sign-in button
  await new Promise((r) => setTimeout(r, 2000));
  await page.click("#signinlink");

  // user will provide email, password, and interests information

  await page.type("#signinemail", "twaste210@gmail.com");
  await page.type("#signinpassword", "easypassword");

  await page.click("#signinbtn");

  //   test the search functionality

  //   set 2 second delay

  await new Promise((r) => setTimeout(r, 2000));
  await page.click("#burger_nav");
  await page.click("#orders");

  await page.click("#productselection");
  await page.keyboard.press("B"); // select blueberry
  await page.keyboard.press("Enter");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  //await page.keyboard.press('Tab')
  await page.type("#completiondate", "11112024");

  await page.click("#orderbutton");

  await page.click("#burger_nav");
  await page.click("#signoutlink");

  // now testing owner log in
  await page.click("#burger_nav");
  await new Promise((r) => setTimeout(r, 2000));
  await page.click("#signinlink");
  await page.type("#signinemail", "cocosbakingowner@gmail.com");
  // show what happens with wrong password
  await page.type("#signinpassword", "wrongpassword");
  //correct password
  await page.type("#signinpassword", "adminCoconutBaker424");

  await page.click("#signinbtn");

  // testing functionalities in manage orders for owner
  await page.click("#myorders");

  // first, filtering (will show no orders)
  await page.click("orderstatusfilter");
  await page.press("A");
  await page.click("filterbutton");
  await new Promise((r) => setTimeout(r, 2000));
  await page.click("resetfilterbutton");

  // then, updating a payment status to paid
  await page.click("#orderu1h3EHkYyKH2UpIGRh6Lnewpaymentstatus");
  await page.press("P");
  await page.click("#u1h3EHkYyKH2UpIGRh6L > td:nth-child(14) > button");

  // now filter to see if the update went correctly (should only show a one or two orders)
  await page.click("orderstatusfilter");
  await page.press("P");
  await page.click("paymentstatusfilter");
  await page.press("P");
  await page.click("filterbutton");
  await new Promise((r) => setTimeout(r, 2000));
  await page.click("resetfilterbutton");

  // finally, deleting an order
  await page.click("#oQGnMdlnJBqflE8UvjTw > td:nth-child(15) > button");
  await new Promise((r) => setTimeout(r, 2000));

  // owner now signs out
  await page.click("#burger_nav");
  await page.click("#signoutlink");

  browser.close();
}

// call the go()

go();
