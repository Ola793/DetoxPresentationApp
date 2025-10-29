# Detox Test Execution Guide

## Prerequisites
- Android Studio installed with SDK
- `ANDROID_HOME` environment variable set
- AVD named `Pixel_7` created in Android Studio
- Node.js and npm installed

## Step-by-Step Guide

### 1. Install Dependencies (First Time Only)
```powershell
cd c:\dev\Detox\DetoxPresentationApp
npm install
```

### 2. Build the Android Debug APK (First Time & When Needed)
This compiles your app and the Detox test instrumentation:

```powershell
npm run detox:build:android
```

**Expected output:**
- Gradle build runs
- Creates APK at: `android/app/build/outputs/apk/debug/app-debug.apk`
- Creates test APK at: `android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk`

**Time:** ~2-5 minutes (first time), ~30 seconds (subsequent builds)

**⚠️ When do you need to rebuild?**
- ✅ First time setup
- ✅ After changing native code (files in `android/` or `ios/` folders)
- ✅ After adding/updating native dependencies (npm packages with native modules)
- ✅ After modifying `.detoxrc.js` configuration

**✨ When you DON'T need to rebuild:**
- ❌ After changing React components or app logic (`.tsx`, `.ts`, `.js` files)
- ❌ After modifying test files (`e2e/*.test.js`)
- ❌ Between test runs during development

**💡 Pro Tip:** JavaScript changes hot-reload automatically - just run tests!

### 3. Run the Tests
```powershell
npm run detox:test:android
```

**What happens:**
1. Detox automatically launches the `Pixel_7` emulator (if not running)
2. Waits for emulator to boot
3. Installs the APKs on the emulator
4. Runs all test files in `e2e/` folder:
   - `starter.test.js` - Basic smoke test
   - `positive.e2e.test.js` - Valid form submission test
   - `negative.e2e.test.js` - Error validation tests
5. Shows test results in terminal

**Expected output:**
```
PASS  e2e/starter.test.js
PASS  e2e/positive.e2e.test.js
PASS  e2e/negative.e2e.test.js

Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
```

**Time:** ~30-60 seconds

### 4. Run Individual Test Files (Optional)
To run just one test file:

```powershell
# Run only smoke test
npx detox test -c android.emu.debug e2e/starter.test.js

# Run only positive tests
npx detox test -c android.emu.debug e2e/positive.e2e.test.js

# Run only negative tests
npx detox test -c android.emu.debug e2e/negative.e2e.test.js
```

## Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run emulator:android` | Launch emulator manually |
| `npm run detox:build:android` | Build APKs |
| `npm run detox:test:android` | Run all tests |
| `adb devices` | Check connected devices |

## Troubleshooting

### Emulator not starting
**Problem:** `adb devices` shows no devices

**Solution:**
```powershell
# Manually start emulator
npm run emulator:android

# Wait 30-60 seconds, then verify
adb devices
# Should show: emulator-XXXX    device
```

### Build fails
**Problem:** Gradle build errors

**Solution:**
```powershell
cd android
.\gradlew.bat clean
cd ..
npm run detox:build:android
```

### Tests timeout or disconnect
**Problem:** "Detox can't seem to connect to the test app"

**Solution:**
- Ensure emulator is fully booted (not just showing lock screen)
- Check `adb devices` shows "device" status (not "offline")
- Rebuild APK: `npm run detox:build:android`
- Restart Metro bundler if running separately

### App crashes during test
**Problem:** Tests fail with app disconnect

**Solution:**
- Check logs: `adb logcat | grep -i detox`
- Ensure test APK is built: check `android/app/build/outputs/apk/androidTest/`
- Verify `testID` attributes exist in your React components

## Working in VS Code / IDE

### Initial Setup (Once)
```powershell
# Open terminal in VS Code (Ctrl + `)
cd c:\dev\Detox\DetoxPresentationApp

# Build once
npm run detox:build:android
```

### Daily Development Workflow
```powershell
# Just run tests - no rebuild needed!
npm run detox:test:android
```

JavaScript/TypeScript changes (React components, test files) are automatically reloaded.

### Optional: Keep Metro Running
For faster test iterations, keep Metro bundler running in a separate terminal:

```powershell
# Terminal 1 (keep running)
npm start

# Terminal 2 (run as needed)
npm run detox:test:android
```

## For Presentation Demo

### Full Clean Run (First Time)
```powershell
# 1. Build once
npm run detox:build:android

# 2. Run tests (auto-starts emulator)
npm run detox:test:android
```

### Quick Re-run (During Demo)
```powershell
# Just run tests - already built!
npm run detox:test:android
```

## Test Files Overview

### `e2e/starter.test.js`
- **Purpose:** Basic smoke test
- **Tests:** App launches and home screen is visible
- **Duration:** ~5 seconds

### `e2e/positive.e2e.test.js`
- **Purpose:** Valid user flow
- **Tests:** Enter valid name (3+ chars), submit, see success message
- **Duration:** ~10 seconds

### `e2e/negative.e2e.test.js`
- **Purpose:** Error handling
- **Tests:** 
  - Name too short (< 3 chars)
  - Empty name
  - No success message by default
- **Duration:** ~15 seconds

## Configuration Files

- `.detoxrc.js` - Detox configuration (devices, apps, test runner)
- `e2e/jest.config.js` - Jest settings for e2e tests
- `android/app/build.gradle` - Detox Android integration
- `android/settings.gradle` - Detox module inclusion
