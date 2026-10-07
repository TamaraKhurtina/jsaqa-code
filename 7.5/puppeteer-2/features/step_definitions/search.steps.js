const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");

const {
  openAppAndSelectDay,
  selectFirstMovieAndSession,
  selectAvailableSeat,
  clickBookButton,
  getConfirmationTitle,
  getConfirmationMovieTitle,
  isBookButtonEnabled
} = require("../../lib/commands.js");


// Hooks 

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});


// Given

Given("я открыла приложение «Идёмвкино» и выбрала дату", async function () {
  await openAppAndSelectDay(this.page);
});


// When

When("я выбираю первый фильм и сеанс", async function () {
  this.selectedMovie = await selectFirstMovieAndSession(this.page);
});

When("я выбираю свободное место", async function () {
  this.seatInfo = await selectAvailableSeat(this.page);
});

When("я нажимаю кнопку «Забронировать»", async function () {
  await clickBookButton(this.page);
});


// Then

Then("я вижу заголовок подтверждения «Вы выбрали билеты»", async function () {
  const actual = await getConfirmationTitle(this.page);
  expect(actual).contains("Вы выбрали билеты");
});

Then(
  "название фильма на странице подтверждения совпадает с выбранным",
  async function () {
    const actual = await getConfirmationMovieTitle(this.page);
    expect(actual).contains(this.selectedMovie);
  }
);

Then("кнопка «Забронировать» неактивна", async function () {
  const isEnabled = await isBookButtonEnabled(this.page);
  expect(isEnabled).to.be.false;
});