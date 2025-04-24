const wd = require('wd');

const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");

await driver.init({
  platformName: "Android",
  deviceName: "Android Emulator",
  app: "/path/to/your/app-debug.apk",
  automationName: "UiAutomator2"
});