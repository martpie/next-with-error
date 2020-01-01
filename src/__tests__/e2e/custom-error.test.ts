describe('custom-error end-to-end test', () => {
  const BASE_URL = 'http://localhost:3001';

  test('root page should be correctly displayed and return a 200 http code', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(200);
  });

  test('custom page should be correctly displayed and return a 200 http code when no error is present', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/existing-one`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(200);
  });

  test('custom page should return a 404 http code when error.statusCode is equal to 404 and the error page should be displayed', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/unknown-one`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(404);

    const content = await page.$eval('p', (e) => e.textContent);
    expect(content).toBe('could not find that');
  });

  test('custom page should return a 404 http code when error.statusCode is equal to 500 and the error page should be displayed', async () => {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/posts/crash-me`);

    if (!response) throw new Error('Could not access the page');

    expect(response.status()).toBe(500);

    const content = await page.$eval('p', (e) => e.textContent);
    expect(content).toBe('something went wrong');
  });
});
