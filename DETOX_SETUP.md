# Detox Setup (Windows + Android)

This project is pre-configured to run Detox end-to-end tests on Android.

## Prerequisites

- Node.js >= 18 (already OK)
- Java JDK 17 or 11 (set JAVA_HOME)
- Android Studio (SDK, Platform Tools)
- Android emulator (recommended) or a physical Android device with USB debugging enabled
- ANDROID_HOME set to your SDK (e.g. C:\\Users\\<you>\\AppData\\Local\\Android\\Sdk)
- Add to PATH: %ANDROID_HOME%\\platform-tools and %ANDROID_HOME%\\emulator

Verify:

```powershell
java -version
adb version
emulator -version
```

## Install dependencies

From project root:

```powershell
npm install
```

## Build the app for Detox

This builds the debug APK and the AndroidTest APK.

```powershell
npm run detox:build:android
```

If Gradle downloads the distribution the first time, the step may take a few minutes.

## Start an emulator

Create an AVD in Android Studio (e.g., Pixel_6_API_34). You can launch it from Android Studio or:

```powershell
emulator -list-avds
emulator -avd Pixel_6_API_34
```

If you prefer a device connected by USB, enable USB debugging and use config `android.att.debug`.

## Run Detox tests

With an emulator running:

```powershell
npm run detox:test:android
```

Or against an attached device (USB):

```powershell
npm run detox:test:device
```

## Test suite

We include:

- e2e/positive.e2e.test.js – valid form submission shows success
- e2e/negative.e2e.test.js – invalid inputs show error
- e2e/starter.test.js – smoke test for the home screen

## Troubleshooting

- SDK not found: Ensure ANDROID_HOME and PATH are set.
- Emulator not found: Create an AVD and update `.detoxrc.js` `emulator.device.avdName` to match.
- Build fails at gradlew: Run `cd android; .\\gradlew.bat assembleDebug` for detailed errors.
- App cannot connect to Metro: Ensure port 8081 is free; try `npx react-native start` in a separate terminal.
- Detox cannot launch app: Make sure emulator is running and unlocked before `npm run detox:test:android`.
