describe('basic end-to-end test', () => {
  const BASE_URL = 'http://localhost:3000';

  it('root page should be correctly displayed and return a 200 http code', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(200);
  });

  it('custom page should be correctly displayed and return a 200 http code when no error is present', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/existing-one`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(200);
  });

  it('custom page should return a 404 http code when error.statusCode is equal to 404 and the error page should be displayed', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/unknown-one`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(404);

    const content = await page.$eval('h2', (e) => e.textContent);
    expect(content).toBe('This page could not be found.');
  });

  it('custom page should return a 404 http code when error.statusCode is equal to 500 and the error page should be displayed', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/crash-me`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(500);

    const content = await page.$eval('h2', (e) => e.textContent);
    expect(content).toBe('Internal Server Error.');
  });
});
