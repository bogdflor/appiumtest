const wd = require('wd');

(async () => {
  const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");

  await driver.init({
    platformName: "Android",
    deviceName: "Android Emulator",
    app: "/path/to/your/app-debug.apk",  // replace with actual path
    automationName: "UiAutomator2"
  });

  // Add your test steps here...

  await driver.quit();
})();
