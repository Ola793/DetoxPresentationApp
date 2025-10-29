describe("Form - positive case", () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  it("shows success when valid name submitted", async () => {
    await expect(element(by.id("homeScreen"))).toBeVisible();

    await element(by.id("nameInput")).tap();
    await element(by.id("nameInput")).typeText("Alice");
    await element(by.id("submitButton")).tap();

    await expect(element(by.id("successMessage"))).toBeVisible();
    await expect(element(by.text("Welcome, Alice!"))).toBeVisible();
  });
});
