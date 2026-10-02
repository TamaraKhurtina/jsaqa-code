let page;

async function openPage(url) {
  page = await browser.newPage();
  await page.goto(url);
}

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await openPage("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 20000);
});

describe("Github other pages tests", () => {
  beforeEach(async () => {
    await openPage("https://github.com/features/actions");
  });

  test("The h1 header on Actions page", async () => {
    const title = await page.title();
    expect(title).toEqual('Features • GitHub Actions · GitHub');
  }, 30000);

  test("The h1 header on Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector('h1');
    const h1Text = await page.$eval('h1', el => el.textContent);
    expect(h1Text).toContain('Try the Copilot-powered platform');
  }, 30000);

  test("The h1 header on Security page", async () => {
    await page.goto("https://github.com/features/security");
    await page.waitForSelector('h1');
    const h1Text = await page.$eval('h1', el => el.textContent);
    expect(h1Text).toContain('Security');
  }, 30000);
});