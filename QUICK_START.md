# Quick Start Guide - Detox Presentation

## Prerequisites Check

```powershell
# Verify tools
node -v          # Should show v20+
npm -v           # Should show 10+
adb devices      # Should show your emulator/device
```

## Step-by-Step Demo Flow

### 1. Start Metro Bundler (Terminal 1)

```powershell
cd C:\dev\Detox\DetoxPresentationApp
npm start
```

**Leave this running!** Metro bundles the JavaScript for React Native.

### 2. Build APKs for Detox (Terminal 2 - one-time)

```powershell
cd C:\dev\Detox\DetoxPresentationApp
npm run detox:build:android
```

This creates:

- `app-debug.apk` (your React Native app)
- `app-debug-androidTest.apk` (Detox test instrumentation)

### 3. Launch Emulator (if not running)

```powershell
# List available AVDs
cmd /c "%ANDROID_HOME%\emulator\emulator.exe" -list-avds

# Launch your AVD (e.g., Pixel_7)
Start-Process -FilePath "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd","Pixel_7"
```

Wait for emulator to fully boot (unlock screen, see home screen).

### 4. Run Detox Tests

```powershell
cd C:\dev\Detox\DetoxPresentationApp
npm run detox:test:android
```

## What to Show in Presentation

### Part 1: The App (2 min)

1. Open `App.tsx` - show the simple form UI
2. Point out `testID` props on each element:
   - `homeScreen`
   - `nameInput`
   - `submitButton`
   - `successMessage`
   - `errorMessage`

### Part 2: The Tests (3 min)

1. Open `e2e/positive.e2e.test.js`
   - Types valid name → expects success message
2. Open `e2e/negative.e2e.test.js`
   - Types short name → expects error
   - Empty input → expects error
3. Open `e2e/starter.test.js`
   - Smoke test - verifies home screen loads

### Part 3: Live Demo (5 min)

1. Show Metro bundler running in Terminal 1
2. Show emulator running (Pixel_7)
3. Run `npm run detox:test:android` in Terminal 2
4. Watch tests execute on emulator:
   - App launches automatically
   - Input field gets filled
   - Button gets tapped
   - Success/error messages appear
5. Show test results in terminal

## Common Issues & Fixes

### Tests fail with "app disconnected"

**Fix:** Make sure Metro bundler is running (`npm start`)

### Emulator not found

```powershell
# Check available AVDs
emulator -list-avds

# Update .detoxrc.js if needed
# Change: devices.emulator.device.avdName to match your AVD
```

### Build fails

```powershell
# Check environment
npx react-native doctor

# Clean and rebuild
cd android
.\gradlew.bat clean
cd ..
npm run detox:build:android
```

### ADB can't connect

```powershell
adb kill-server
adb start-server
adb devices
```

## Presentation Tips

✅ **DO:**

- Have Metro bundler running before tests
- Show test code alongside running tests
- Point out automatic app installation/launch
- Highlight test stability (retry on failure)

❌ **DON'T:**

- Run tests without Metro (will fail with "app disconnected")
- Forget to unlock emulator screen
- Run with emulator still booting (wait for home screen)

## Quick Commands Summary

```powershell
# Terminal 1: Metro (keep running)
npm start

# Terminal 2: Tests
npm run detox:build:android        # First time only
npm run detox:test:android         # Run all tests
npx detox test e2e/positive.e2e.test.js -c android.emu.debug  # Single file
```

## Files to Reference

- `DETOX_SETUP.md` - Full setup guide for attendees
- `PRESENTATION_NOTES.md` - Detailed talking points
- `.detoxrc.js` - Detox configuration
- `android/app/build.gradle` - Android Detox integration

## Time Estimates

- Setup/build: 5 min
- Test run: 30-45 seconds per test file
- Total demo: ~10 min

**You're ready!** Just remember: **Metro must be running** before tests.
