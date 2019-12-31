const basicAppPath = 'src/__tests__/__apps__/basic';
const customErrorAppPath = 'src/__tests__/__apps__/custom-error';

module.exports = {
  launch: {
    headless: true,
    slowMo: false,
    devtools: true
  },
  server: [
    {
      command: `npm run build --prefix=${basicAppPath} && npm run start --prefix=${basicAppPath}`,
      launchTimeout: 50000,
      port: 3000
    },
    {
      command: `npm run build --prefix=${customErrorAppPath} && npm run start -p 3001 --prefix=${customErrorAppPath}`,
      launchTimeout: 50000,
      port: 3001
    }
  ]
};
