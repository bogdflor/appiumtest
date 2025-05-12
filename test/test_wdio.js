const { remote } = require('webdriverio');
const assert = require('assert');

describe('Appium Android App Test', function () {
  this.timeout(300000); // Allow enough time for emulator

  let driver;

  before(async function() {
    // Increase timeout for the before hook
    this.timeout(120000);

    const capabilities = {
      platformName: 'Android',
      'appium:deviceName': 'Android Emulator',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.APK_PATH || '/home/runner/work/appiumtest/appiumtest/platforms/android/app/build/outputs/apk/debug/app-debug.apk',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 120000,
      'appium:androidInstallTimeout': 120000,
      'appium:uiautomator2ServerLaunchTimeout': 60000,
      'appium:uiautomator2ServerInstallTimeout': 60000,
      'appium:adbExecTimeout': 60000
    };

    const config = {
      protocol: 'http',
      hostname: process.env.APPIUM_HOST || '127.0.0.1',
      port: parseInt(process.env.APPIUM_PORT || 4723),
      path: process.env.APPIUM_BASE_PATH || '/wd/hub',
      connectionRetryTimeout: 120000,
      connectionRetryCount: 3,
      logLevel: 'debug'
    };

    try {
      driver = await remote({ ...config, capabilities });
    } catch (error) {
      console.error('Failed to initialize WebDriver:', error);
      throw error;
    }
  });

  it('should launch the app', async function() {
    // Add actual test steps here
    await driver.pause(2000);
    // Add your app verification logic
    const currentActivity = await driver.getCurrentActivity();
    console.log('Current activity:', currentActivity);
    assert.ok(currentActivity);
  });

  after(async function() {
    if (driver) {
      await driver.deleteSession();
    }
  });
});
