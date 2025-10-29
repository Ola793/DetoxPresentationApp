# React DevTools Guide - Finding Selectors for Detox Tests

## Installation

### Step 1: Install React DevTools Globally
Open PowerShell or Command Prompt and run:
```bash
npm install -g react-devtools
```

This installs React DevTools globally on your system, making it available for any React Native project.

---

## Using React DevTools to Find Selectors

### Step 2: Start React DevTools
In any terminal, run:
```bash
npx react-devtools
```

**What happens:** A standalone React DevTools window will open with the message "Waiting for React to connect..."

**Alternative if PowerShell blocks scripts:**
```bash
npx react-devtools
```

---

### Step 3: Launch Your App
In your project directory (`DetoxPresentationApp`), run:

**Option A: Start emulator first (recommended)**
```bash
npm run emulator
```
Wait 20-30 seconds for emulator to fully start, then:
```bash
npm run android
```

**Option B: Launch app directly (auto-starts emulator)**
```bash
npm run android
```

**What happens:** 
- Your React Native app launches on the emulator
- React DevTools automatically connects
- You'll see "Connected to React" in the DevTools window

---

### Step 4: Navigate the Component Tree

In the React DevTools window, you'll see:

**Left Panel: Component Tree**
- Shows all React components in a hierarchical structure
- Components are collapsible (click arrows to expand/collapse)
- Your app structure will look something like:
  ```
  ▼ Root Component
    ▼ AppContainer
      ▼ View
        ▼ ScrollView
          ▼ View
            ▼ TextInput
            ▼ TouchableOpacity
              ▼ Text
            ▼ Text (success message)
            ▼ Text (error message)
  ```

**Right Panel: Props Inspector**
- Shows details of the selected component
- Displays all props, state, and hooks

---

### Step 5: Find testID Values

**Method 1: Browse the Tree**
1. Click on any component in the left panel
2. Look at the right panel under "props"
3. Find the `testID` property
4. Note the value (e.g., `testID: "nameInput"`)

**Method 2: Search for Components**
1. Use the search box at the top of DevTools
2. Type the component name (e.g., "TextInput")
3. Click through the search results
4. Check each component's props for testID

**Method 3: Find by testID Value**
1. If you know the testID name, search for it
2. Type the testID value in the search box
3. DevTools will highlight matching components

---

### Step 6: Map testIDs to Detox Selectors

Once you find a component with a testID, use it in your Detox tests:

**Example:**

**In React DevTools, you see:**
```
TextInput
  props:
    testID: "nameInput"
    placeholder: "Enter your name"
```

**In your Detox test, use:**
```javascript
await element(by.id('nameInput')).typeText('Alice');
```

---

## Common Components and Their testIDs in DetoxPresentationApp

| Component Type | testID | Detox Selector |
|---------------|--------|----------------|
| View (container) | `homeScreen` | `by.id('homeScreen')` |
| TextInput | `nameInput` | `by.id('nameInput')` |
| TouchableOpacity | `submitButton` | `by.id('submitButton')` |
| Text (success) | `successMessage` | `by.id('successMessage')` |
| Text (error) | `errorMessage` | `by.id('errorMessage')` |

---

## Tips for Your Presentation

### Visual Flow:
1. **Show the running app** on the emulator
2. **Show React DevTools** with the component tree
3. **Click on TextInput** in DevTools
4. **Highlight the testID prop** in the right panel
5. **Show your test file** with `by.id('nameInput')`
6. **Explain the connection:** "This testID in the code becomes our selector in tests"

### Demo Script:
```
"Let's see how Detox finds elements in our app...
[Open React DevTools]
Here's our entire component tree. Let me click on this TextInput...
[Click TextInput]
See this 'testID' prop with the value 'nameInput'?
[Highlight in DevTools]
In our app code, we added testID='nameInput' to this component.
[Show App.tsx]
And in our test, we use by.id('nameInput') to find it.
[Show test file]
This is how Detox knows exactly which element to interact with!"
```

---

## Troubleshooting

### React DevTools won't connect:
- Make sure your app is running (`npm run android`)
- Try reloading the app: Press `r` in the Metro bundler terminal
- Or use Dev Menu: Press `Ctrl + M` in emulator, select "Reload"

### Can't see testID props:
- Make sure you've added testID to your components in the source code
- Refresh React DevTools: Close and reopen it
- Reload the app

### Component tree is too large:
- Use the search function to find specific components
- Collapse branches you don't need to inspect
- Filter by component type

---

## Alternative: Inspect Without React DevTools

If React DevTools isn't working, you can always:

1. **Read your source code** (`App.tsx`) to see testID values
2. **Run a test** and let it fail - Detox will show the view hierarchy
3. **Add temporary debug labels** to your UI during development

---

## Keyboard Shortcuts in React DevTools

- **Ctrl + F** - Search components
- **Arrow Up/Down** - Navigate component tree
- **Arrow Left/Right** - Collapse/expand nodes
- **Ctrl + C** - Copy component info

---

## For Presentation Preparation

✅ Install React DevTools: `npm install -g react-devtools`
✅ Practice launching: `npx react-devtools` → `npm run android`
✅ Know your testIDs: Review `App.tsx` beforehand
✅ Prepare side-by-side view: DevTools + Emulator + VS Code
✅ Have test file open: Show the connection between testID and `by.id()`

---

## Quick Command Reference

```bash
# Install React DevTools
npm install -g react-devtools

# Start React DevTools
npx react-devtools

# Start emulator (in project directory)
npm run emulator

# Launch app
npm run android

# Open Dev Menu in emulator
Ctrl + M
```

---

**Pro Tip for Presentation:** 
Use multiple monitors or split screen:
- Left: Emulator showing the running app
- Center: React DevTools showing component tree
- Right: VS Code with test file showing `by.id()` selectors

This creates a powerful visual connection between the UI, the component structure, and the test code!
