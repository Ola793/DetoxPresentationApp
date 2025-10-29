describe("Smoke", () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.launchApp({newInstance: true});
  });

  it("should show home screen", async () => {
    await expect(element(by.id("homeScreen"))).toBeVisible();
  });
});
