// test/appium.test.js
import wd from 'wd';

const driver = wd.promiseChainRemote("http://127.0.0.1:4723/wd/hub");

await driver.init({
  platformName: "Android",
  deviceName: "Android Emulator",
  app: "/path/to/your/app-debug.apk",
  automationName: "UiAutomator2"
});
