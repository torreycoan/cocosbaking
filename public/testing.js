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
  await page.type("#firstname", "Testing");
  await page.type("#lastname", "File");

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
  await new Promise((r) => setTimeout(r, 2000));
  await page.click("#signinlink");
  await page.type("#signinemail", "cocosbakingowner@gmail.com");
  // show what happens with wrong password
  await page.type("#signinpassword", "wrongpassword");
  //correct password
  await page.type("#signinpassword", "adminCoconutBaker424");

  await page.click("#signinbtn");

  await page.click("#myorders");
}

// call the go()

go();
