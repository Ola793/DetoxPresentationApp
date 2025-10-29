describe("Form - negative cases", () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  it("shows error when name is too short", async () => {
    await element(by.id("nameInput")).tap();
    await element(by.id("nameInput")).typeText("Al");
    await element(by.id("submitButton")).tap();

    await expect(element(by.id("errorMessage"))).toBeVisible();
    await expect(
      element(by.text("Name must be at least 3 characters")),
    ).toBeVisible();
  });

  it("shows error when name is empty", async () => {
    // ensure field is focused and no input entered
    await element(by.id("nameInput")).tap();
    await element(by.id("submitButton")).tap();

    await expect(element(by.id("errorMessage"))).toBeVisible();
  });

  it("does not show success by default", async () => {
    await expect(element(by.id("successMessage"))).toBeNotVisible();
  });

  // Intentionally failing test for demo purposes
  it("DEMO: This test will fail intentionally", async () => {
    await element(by.id("nameInput")).replaceText("Valid");
    await element(by.id("submitButton")).tap();

    // Wrong assertion - we expect success but check for error
    await expect(element(by.id("errorMessage"))).toBeVisible();
    await expect(element(by.text("This will never appear"))).toBeVisible();
  });
});
