describe("Input Interactions", () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    // Reload with new instance to ensure clean state
    await device.launchApp({newInstance: true});
  });

  it("should clear input and allow resubmission", async () => {
    // Type initial value using replaceText for consistency
    await element(by.id("nameInput")).replaceText("TestUser");
    await element(by.id("submitButton")).tap();

    // Verify success
    await expect(element(by.id("successMessage"))).toBeVisible();

    // Clear the input
    await element(by.id("nameInput")).replaceText("");

    // Submit empty - should show error
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("errorMessage"))).toBeVisible();
  });

  it("should handle multiple submissions with different inputs", async () => {
    // First submission - valid
    await element(by.id("nameInput")).replaceText("Alice");
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("successMessage"))).toBeVisible();
    await expect(element(by.text("Welcome, Alice!"))).toBeVisible();

    // Replace with invalid input
    await element(by.id("nameInput")).replaceText("Bo");
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("errorMessage"))).toBeVisible();

    // Replace with valid input again
    await element(by.id("nameInput")).replaceText("Charlie");
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("successMessage"))).toBeVisible();
    await expect(element(by.text("Welcome, Charlie!"))).toBeVisible();
  });

  it("should preserve message state after valid submission", async () => {
    // Submit valid name
    await element(by.id("nameInput")).replaceText("David");
    await element(by.id("submitButton")).tap();

    // Verify success message appears
    await expect(element(by.id("successMessage"))).toBeVisible();
    await expect(element(by.text("Welcome, David!"))).toBeVisible();

    // Tap somewhere else (input field) - message should still be visible
    await element(by.id("nameInput")).tap();
    await expect(element(by.id("successMessage"))).toBeVisible();
  });
});
