# Detox Presentation Demo - Complete Setup

## Project Overview

A React Native 0.76.5 TypeScript app configured for Detox E2E testing on Android (Windows environment).

## App Features

- Simple form with name input field
- Submit button with validation (minimum 3 characters)
- Success message for valid input
- Error message for invalid input
- All elements tagged with `testID` for Detox

## Test Coverage

### 1. Smoke Test (`e2e/starter.test.js`)

- Verifies home screen loads
- Basic app launch test

### 2. Positive Test (`e2e/positive.e2e.test.js`)

- Enter valid name (3+ characters)
- Tap submit button
- Verify success message appears
- Verify welcome text with name

### 3. Negative Tests (`e2e/negative.e2e.test.js`)

- Test 1: Name too short (2 characters) → shows error
- Test 2: Empty name → shows error
- Test 3: Success message not visible by default

## Quick Commands

### Build the app for Detox

```powershell
npm run detox:build:android
```

### Run tests on emulator

```powershell
# Make sure emulator is running first
npm run detox:test:android
```

### Run tests on USB device

```powershell
npm run detox:test:device
```

### Launch emulator manually

```powershell
cmd /c "%ANDROID_HOME%\emulator\emulator.exe" -avd Pixel_7
```

## Key Configuration Files

### `.detoxrc.js`

- Configured for Android emulator (Pixel_7)
- Build commands use `gradlew.bat` for Windows
- Reverse port 8081 for Metro bundler

### `android/app/build.gradle`

- Added `testInstrumentationRunner`
- Added `missingDimensionStrategy "detox", "full"`
- Detox dependencies included

### `android/settings.gradle`

- Includes local Detox module from node_modules

### `App.tsx`

- TestIDs: `homeScreen`, `nameInput`, `submitButton`, `successMessage`, `errorMessage`
- Simple validation logic for demonstration

## Presentation Flow

1. **Show the app structure** - Explain the simple form UI
2. **Show test files** - Walk through positive and negative cases
3. **Run the build** - `npm run detox:build:android`
4. **Launch emulator** - Show Pixel_7 starting up
5. **Run tests** - `npm run detox:test:android`
6. **Show results** - All tests passing (or demonstrate fixing failures)
7. **Show setup guide** - Reference `DETOX_SETUP.md` for attendees

## Troubleshooting Tips

### Emulator not found

- Run `emulator -list-avds` to see available devices
- Update `.detoxrc.js` with correct AVD name

### Build fails

- Ensure Android SDK Platform 35 (or 34) is installed
- Check ANDROID_HOME and JAVA_HOME are set
- Run `npx react-native doctor` to diagnose

### Tests fail

- Verify emulator is unlocked and on home screen
- Check Metro bundler is accessible (port 8081)
- Look for testID mismatches in error logs

### ADB issues

```powershell
adb kill-server
adb start-server
adb devices
```

## What Makes This Demo Real

✅ Actual validation logic (not just button clicks)  
✅ Multiple test scenarios (positive + negative)  
✅ Proper testID usage for stable selectors  
✅ Windows-friendly setup (gradlew.bat, paths)  
✅ Modern RN version (0.76.5)  
✅ Complete documentation for attendees

## Extensions for Advanced Demo

- Add navigation with React Navigation + test screen transitions
- Add API mocking with MSW for network tests
- Show CI/CD integration (GitHub Actions)
- Demonstrate screenshot/video recording on failure
- Show parallel test execution with multiple emulators
