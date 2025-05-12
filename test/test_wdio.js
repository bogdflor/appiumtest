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
      path: '/', // Important: Appium 2 uses `/`
      capabilities: {
        platformName: 'Android',
        deviceName: 'Android Emulator',
        automationName: 'UiAutomator2',
        app: '/home/runner/work/appiumtest/appiumtest/platforms/android/app/build/outputs/apk/debug/app-debug.apk',
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
