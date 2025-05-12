const { remote } = require('webdriverio');
const assert = require('assert');

describe('Appium Android App Test', function () {
  this.timeout(300000); // Allow enough time for emulator

  let driver;

  before(async () => {
    driver = await remote({
      protocol: 'http',
      hostname: '127.0.0.1',
      port: 4723,
      path: '/',
      capabilities: {
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/home/runner/work/appiumtest/appiumtest/platforms/android/app/build/outputs/apk/debug/app-debug.apk',
        'appium:uiautomator2ServerInstallTimeout': 60000
      },
    });
  });

  it('should launch the app', async () => {
    const currentActivity = await driver.getCurrentActivity();
    console.log('Current activity:', currentActivity);
    assert.ok(currentActivity);
  });

  after(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });
});
