const { test, expect } = require("@playwright/test");

// Checking that the statistics page works
test("Viewing main page and statistics, adding a list", async ({ page }) => {
  // main page is empty
  await page.goto("/");
  await expect(page.getByText("No shopping lists yet.")).toBeVisible();
  // add a list
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Test list 1");
  await page.locator("input[type=submit]").click();
  // main page shows statistics
  await page.goto("/");
  await expect(page.getByText("Shopping lists: 1")).toBeVisible();
  await expect(page.getByText("Shopping list items: 0")).toBeVisible();
});

test("Adding shopping lists", async ({ page }) => {
  // Add another list
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Test list 2");
  await page.locator('text="Add list"').click();
  // Both lists are now visible on /lists
  await expect(page.getByText("Test list 1")).toBeVisible();
  await expect(page.getByText("Test list 2")).toBeVisible();
});

test("Adding and viewing items", async ({ page }) => {
  // Add a third list and an item to it
  await page.goto("/lists");
  await page.locator("input[type=text]").type("Test list 3");
  await page.locator('text="Add list"').click();
  await page.goto("/lists/3");
  await page.locator("input[type=text]").type("TestItem1");
  await page.locator('text="Add to list"').click();
  await expect(page.getByText("TestItem1")).toBeVisible();
});

test("Marking items as collected", async ({ page }) => {
  // mark testitem1 as collected, check that it is found in a del element
  await page.goto("/lists/3");
  await page.locator('text="Mark collected!"').click();
  await expect(page.locator("del")).toHaveText("TestItem1")
});

test("Deactivating lists", async ({ page }) => {
  // deactivate list 2 and check that it doesn't show on the /lists page
  await page.goto("/lists");
  await page.locator('text="Deactivate list!"').locator('nth=1').click();
  await expect(page.getByText("Test list 2")).toBeHidden();
  await expect(page.getByText("Test list 1")).toBeVisible();
  await expect(page.getByText("Test list 3")).toBeVisible();
});

