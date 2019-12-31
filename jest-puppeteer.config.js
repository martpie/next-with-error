const appPath = 'src/__tests__/__apps__/basic';

module.exports = {
  launch: {
    headless: true,
    slowMo: false,
    devtools: true
  },
  server: {
    command: `npm run build --prefix=${appPath} && npm run start --prefix=${appPath}`,
    launchTimeout: 50000,
    port: 3000
  }
};
