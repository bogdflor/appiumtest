const wd = require('wd');
const path = require('path');

(async () => {
  // const driver = wd.promiseChainRemote("http://127.0.0.1:4723");
  const driver = wd.promiseChainRemote({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/', // ✅ No /wd/hub in Appium 2.x
  });
  const appPath = path.resolve(__dirname, "../platforms/android/app/build/outputs/apk/debug/app-debug.apk");

  try {
    console.log("Starting Appium test...");

    // await driver.init({
    //   platformName: "Android",
    //   deviceName: "Android Emulator",
    //   app: appPath,
    //   automationName: "UiAutomator2"
    // });
    
    const caps = {
      capabilities: {
        alwaysMatch: {
          platformName: "Android",
          deviceName: "Android Emulator",
          app: appPath,
          automationName: "UiAutomator2"
        }
      }
    };
    
    console.log("Caps:", JSON.stringify(caps, null, 2));
    await driver.init(caps);
    
    // Small pause to let the app load
    await driver.sleep(3000);

    // Example check: log the current activity (for Cordova apps, this is often MainActivity)
    const activity = await driver.currentActivity();
    console.log("Current activity:", activity);

    // Optionally: verify some UI element exists, like the webview
    const contexts = await driver.contexts(); // get available contexts
    console.log("Available contexts:", contexts);

    if (contexts.length > 1) {
      // Switch to webview if found
      await driver.context(contexts[1]);
      console.log("Switched to context:", contexts[1]);
    }

    // Add further interactions or assertions here...

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
    console.log("Test complete, driver quit.");
  }
})();
