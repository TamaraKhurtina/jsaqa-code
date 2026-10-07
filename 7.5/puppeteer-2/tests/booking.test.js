const {
  openAppAndSelectDay,
  selectFirstMovieAndSession,
  selectAvailableSeat,
  clickBookButton,
  getConfirmationTitle,
  getConfirmationMovieTitle,
  isBookButtonEnabled,
} = require("../lib/commands.js");

describe("Бронирование билетов в приложении «Идёмвкино»", () => {
  let page;

  // Arrange (Given) — общая подготовка для всех тестов
  beforeEach(async () => {
    page = await browser.newPage();
    await openAppAndSelectDay(page);
  });

  // Teardown — закрываем страницу после каждого теста
  afterEach(async () => {
    await page.close();
  });

 
  // HAPPY PATH 1: Успешное бронирование одного места

  test("HP-1: Успешное бронирование одного свободного места", async () => {
    // Act (When)
    await selectFirstMovieAndSession(page);
    await selectAvailableSeat(page);
    await clickBookButton(page);

    // Assert (Then)
    const confirmationTitle = await getConfirmationTitle(page);
    expect(confirmationTitle).toContain("Вы выбрали билеты");
  });


  // HAPPY PATH 2: Название фильма на подтверждении совпадает с выбранным

  test("HP-2: Название фильма на странице подтверждения совпадает с выбранным", async () => {
    // Act
    const selectedMovie = await selectFirstMovieAndSession(page);
    await selectAvailableSeat(page);
    await clickBookButton(page);

    // Assert
    const confirmationMovie = await getConfirmationMovieTitle(page);
    expect(confirmationMovie).toContain(selectedMovie);
  });

  // SAD PATH: Кнопка бронирования неактивна без выбора места

  test("SP-1: Кнопка «Забронировать» неактивна без выбора места", async () => {
    // Act — выбираем фильм и сеанс, но НЕ выбираем место
    await selectFirstMovieAndSession(page);

    // Assert — кнопка должна быть disabled
    const isEnabled = await isBookButtonEnabled(page);
    expect(isEnabled).toBe(false);
  });
});