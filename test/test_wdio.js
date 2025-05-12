const { remote } = require('webdriverio');
const assert = require('assert');

describe('Appium Android App Test', function () {
  this.timeout(300000); // Allow enough time for emulator

  let driver;

  before(async () => {
    driver = await remote({
      protocol: 'http',
      hostname: process.env.APPIUM_HOST || '127.0.0.1',
      port: parseInt(process.env.APPIUM_PORT || 4723),
      path: '/',
      logLevel: 'debug',
      capabilities: {
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.APK_PATH || '/home/runner/work/appiumtest/appiumtest/platforms/android/app/build/outputs/apk/debug/app-debug.apk',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 60000
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
