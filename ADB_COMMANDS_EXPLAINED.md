# ADB Commands Explained

## What is ADB?

**ADB** stands for **Android Debug Bridge** - it's a command-line tool that lets you communicate with Android devices (emulators or physical devices).

Think of it as a "remote control" for Android devices from your computer.

---

## The Command: `adb shell input keyevent 82`

Let's break this down piece by piece:

### `adb`
- The Android Debug Bridge command-line tool
- Installed automatically with Android SDK
- Located in: `%ANDROID_HOME%\platform-tools\adb.exe`

### `shell`
- Opens a shell (command-line interface) on the Android device
- Allows you to run Linux commands on the Android device
- Everything after `shell` is executed on the device, not your computer

### `input`
- An Android shell command for simulating input events
- Can simulate touches, swipes, key presses, etc.
- Part of the Android OS

### `keyevent`
- A subcommand of `input` for simulating key presses
- Sends hardware key events to the device
- Equivalent to physically pressing a button

### `82`
- The key code number for the "Menu" button
- In React Native, this opens the Dev Menu
- Different numbers represent different keys

**Full Translation:**
> "Hey Android device, simulate pressing the Menu button (key code 82)"

---

## Common ADB Commands for React Native

### Open React Native Dev Menu
```bash
adb shell input keyevent 82
```
**What it does:** Opens the React Native developer menu
**Keyboard equivalent:** `Ctrl + M` (in emulator)

### Reload the App
```bash
adb shell input text "RR"
```
**What it does:** Sends "RR" which triggers reload in React Native
**Keyboard equivalent:** Press `r` twice in Metro bundler terminal

### List Connected Devices
```bash
adb devices
```
**What it does:** Shows all connected Android devices/emulators
**Output example:**
```
List of devices attached
emulator-5554   device
```

### Install APK
```bash
adb install path/to/app.apk
```
**What it does:** Installs an APK file on the device
**Detox does this automatically**

### Uninstall App
```bash
adb uninstall com.detoxpresentationapp
```
**What it does:** Removes the app from the device

### Get Device Logs
```bash
adb logcat
```
**What it does:** Shows real-time logs from the device
**Use `Ctrl + C` to stop**

### Take Screenshot
```bash
adb exec-out screencap -p > screenshot.png
```
**What it does:** Saves a screenshot to your computer

### Clear App Data
```bash
adb shell pm clear com.detoxpresentationapp
```
**What it does:** Clears all app data (like uninstalling and reinstalling)

---

## Android Key Event Codes Reference

Here are some useful key codes for `adb shell input keyevent`:

| Key Code | Key Name | Description |
|----------|----------|-------------|
| 3 | HOME | Goes to home screen |
| 4 | BACK | Back button |
| 26 | POWER | Power button (lock/unlock) |
| 82 | MENU | Menu button (Dev Menu in RN) |
| 84 | SEARCH | Search button |
| 85 | PLAY_PAUSE | Media play/pause |
| 122 | MOVE_HOME | Move cursor to start |
| 123 | MOVE_END | Move cursor to end |
| 187 | APP_SWITCH | Recent apps (task switcher) |

### Volume Keys
- `24` - Volume Up
- `25` - Volume Down
- `164` - Mute

### Navigation Keys
- `19` - D-pad Up
- `20` - D-pad Down
- `21` - D-pad Left
- `22` - D-pad Right
- `23` - D-pad Center (Select)

---

## How Detox Uses ADB

Detox uses ADB behind the scenes to:

1. **Launch the emulator** - Starts the Android Virtual Device
2. **Install the app** - Deploys your APK
3. **Run tests** - Communicates with the app through native code
4. **Capture screenshots** - Takes screenshots on test failures
5. **Get device state** - Checks if device is ready

You don't usually need to run ADB commands manually when using Detox, but understanding them helps with debugging.

---

## Using ADB for Debugging

### Check if Device is Connected
```bash
adb devices
```
**Expected output:**
```
List of devices attached
emulator-5554   device
```

If you see `offline` or `unauthorized`, restart adb:
```bash
adb kill-server
adb start-server
```

### Monitor What's Happening
```bash
adb logcat | grep -i "detox"
```
**What it does:** Filters logs to show only Detox-related messages

### Check App is Installed
```bash
adb shell pm list packages | grep detoxpresentation
```
**Output:** `package:com.detoxpresentationapp`

---

## For Your Presentation

### Demo Opening Dev Menu
Show both methods:

**Method 1: Keyboard Shortcut**
```
Press Ctrl + M in emulator
→ Dev Menu opens
```

**Method 2: ADB Command**
```bash
adb shell input keyevent 82
→ Dev Menu opens
```

**Talking Points:**
- "ADB is the bridge between our computer and the Android device"
- "Key code 82 is the menu button that opens React Native's Dev Menu"
- "This is the same as pressing Ctrl + M"
- "Detox uses ADB behind the scenes to control the device during tests"

---

## Quick Reference for Presentation

### Open Dev Menu (3 Ways)
1. **Keyboard:** `Ctrl + M` (while emulator focused)
2. **ADB:** `adb shell input keyevent 82`
3. **Shake:** Physical shake on real device

### Check Detox Setup
```bash
# Is emulator running?
adb devices

# Is app installed?
adb shell pm list packages | grep detoxpresentation

# View app logs
adb logcat | grep -i "ReactNative"
```

---

## Troubleshooting with ADB

### Emulator Not Responding
```bash
adb kill-server
adb start-server
adb devices
```

### App Won't Install
```bash
# Uninstall old version
adb uninstall com.detoxpresentationapp

# Clear cache
adb shell pm clear com.detoxpresentationapp

# Try installing again
npm run detox:build
```

### Can't Open Dev Menu
```bash
# Force open via ADB
adb shell input keyevent 82

# If that doesn't work, reload app
adb shell am force-stop com.detoxpresentationapp
npm run android
```

---

## Summary

**`adb shell input keyevent 82`** is like a virtual finger pressing the Menu button on your Android device, which opens the React Native Dev Menu.

- `adb` = Talk to Android device
- `shell` = Run command on the device
- `input` = Simulate user input
- `keyevent` = Simulate key press
- `82` = Menu button key code

It's a handy debugging tool, but for everyday use, just press **`Ctrl + M`**! 🎯

---

## Additional Resources

- **ADB Documentation:** https://developer.android.com/tools/adb
- **Key Event Codes:** https://developer.android.com/reference/android/view/KeyEvent
- **React Native Debugging:** https://reactnative.dev/docs/debugging
