// lib/commands.js

module.exports = {
  /**
   * Открыть приложение и выбрать первый доступный день
   * @param {Page} page - экземпляр страницы Puppeteer
   */
  openAppAndSelectDay: async function (page) {
    try {
      await page.goto("https://qamid.tmweb.ru/client/index.php", {
        waitUntil: "networkidle0",
      });
      await page.waitForSelector(".page-nav__day", { visible: true });

      // Кликаем по второму дню (первый — сегодня, может быть недоступен)
      const days = await page.$$(".page-nav__day");
      await days[1].click();
      await page.waitForSelector(".movie", { visible: true });
    } catch (error) {
      throw new Error(`Не удалось открыть приложение: ${error.message}`);
    }
  },

  /**
   * Выбрать первый фильм и первый сеанс
   * @param {Page} page
   * @returns {string} название выбранного фильма (без кавычек)
   */
  selectFirstMovieAndSession: async function (page) {
    try {
      const rawTitle = await page.$eval(".movie__title", (el) =>
        el.textContent.trim()
      );
      // Убираем обрамляющие кавычки: "Сталкер(1979)" → Сталкер(1979)
      const movieTitle = rawTitle.replace(/^["«»"]+|["«»"]+$/g, "").trim();

      await page.click(".movie__title");
      await page.waitForSelector(".movie-seances__time", { visible: true });
      await page.click(".movie-seances__time");
      await page.waitForSelector(".buying-scheme", { visible: true });
      return movieTitle;
    } catch (error) {
      throw new Error(`Не удалось выбрать фильм/сеанс: ${error.message}`);
    }
  },

  /**
   * Выбрать первое свободное место в зале
   * @param {Page} page
   * @returns {string} описание выбранного места
   */
  selectAvailableSeat: async function (page) {
    try {
      const freeSeatSelector =
        ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
      await page.waitForSelector(freeSeatSelector, { visible: true });
      const seat = await page.$(freeSeatSelector);
      const seatInfo = await page.evaluate(
        (el) => el.getAttribute("data-seat-id") || el.className,
        seat
      );
      await seat.click();
      return seatInfo;
    } catch (error) {
      throw new Error(`Не удалось выбрать место: ${error.message}`);
    }
  },

  /**
   * Нажать кнопку "Забронировать"
   * @param {Page} page
   */
  clickBookButton: async function (page) {
    try {
      await page.click("button.acceptin-button");
      await page.waitForSelector(".ticket__check-title", { visible: true });
    } catch (error) {
      throw new Error(`Не удалось нажать кнопку бронирования: ${error.message}`);
    }
  },

  /**
   * Получить текст заголовка на странице подтверждения
   * @param {Page} page
   * @returns {string}
   */
  getConfirmationTitle: async function (page) {
    try {
      await page.waitForSelector(".ticket__check-title", { visible: true });
      return await page.$eval(".ticket__check-title", (el) =>
        el.textContent.trim()
      );
    } catch (error) {
      throw new Error(
        `Не удалось получить заголовок подтверждения: ${error.message}`
      );
    }
  },

  /**
   * Получить название фильма со страницы подтверждения
   * @param {Page} page
   * @returns {string} название фильма без кавычек
   */
  getConfirmationMovieTitle: async function (page) {
    try {
      const selector = ".ticket__title";
      await page.waitForSelector(selector, { visible: true });
      const rawTitle = await page.$eval(selector, (el) =>
        el.textContent.trim()
      );
      // Убираем обрамляющие кавычки, если они есть
      return rawTitle.replace(/^["«»"]+|["«»"]+$/g, "").trim();
    } catch (error) {
      throw new Error(`Не удалось получить название фильма: ${error.message}`);
    }
  },

  /**
   * Проверить, активна ли кнопка "Забронировать"
   * @param {Page} page
   * @returns {boolean} true, если кнопка НЕ заблокирована
   */
  isBookButtonEnabled: async function (page) {
    try {
      return await page.$eval(
        "button.acceptin-button",
        (btn) => !btn.disabled
      );
    } catch (error) {
      throw new Error(
        `Не удалось проверить состояние кнопки: ${error.message}`
      );
    }
  },
};