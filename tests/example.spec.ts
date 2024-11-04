import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
});

test("should add food", async ({ page }) => {
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.FOOD || "");
  await page
    .locator("input[type='number']")
    .fill(process.env.FOOD_AMOUNT || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.FOOD || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("[data-cy='meal']").filter({ hasText: process.env.FOOD })
  ).toBeVisible();
  await expect(
    page
      .locator("[data-cy='meal']")
      .filter({ hasText: process.env.FOOD_AMOUNT })
  ).toBeVisible();
});

test("should edit food", async ({ page }) => {
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.FOOD || "");
  await page
    .locator("input[type='number']")
    .fill(process.env.FOOD_AMOUNT || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.FOOD || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("[data-cy='meal']").filter({ hasText: process.env.FOOD })
  ).toBeVisible();
  await expect(
    page
      .locator("[data-cy='meal']")
      .filter({ hasText: process.env.FOOD_AMOUNT })
  ).toBeVisible();
  await page.locator("[data-cy='meal-menu-cta']").click();
  await page.locator("[data-cy='meal-menu-edit-btn']").click();
  await page.locator("[data-cy='meal']").click();
  await page
    .locator("[data-cy='meal-new-amount-input']")
    .fill(process.env.NEW_FOOD_AMOUNT || "");
  await page.locator("[data-cy='meal-menu-confirm-edit-btn']").click();
  await expect(
    page.locator("[data-cy='meal-menu-confirm-edit-btn']")
  ).toBeHidden();
  await expect(
    page
      .locator("[data-cy='meal']")
      .filter({ hasText: process.env.NEW_FOOD_AMOUNT })
  ).toBeVisible();
});

test("should delete food", async ({ page }) => {
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.FOOD || "");
  await page
    .locator("input[type='number']")
    .fill(process.env.FOOD_AMOUNT || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.FOOD || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("[data-cy='meal']").filter({ hasText: process.env.FOOD })
  ).toBeVisible();
  await expect(
    page
      .locator("[data-cy='meal']")
      .filter({ hasText: process.env.FOOD_AMOUNT })
  ).toBeVisible();
  await page.locator("[data-cy='meal-menu-cta']").click();
  await page.locator("[data-cy='meal-menu-delete-btn']").click();
  await page.locator("[data-cy='meal']").click();
  await page.locator("[data-cy='meal-menu-confirm-delete-btn']").click();
  await expect(
    page.locator("[data-cy='meal']").filter({ hasText: process.env.FOOD })
  ).toBeHidden();
});

test("should create task", async ({ page }) => {
  await page.getByRole("button", { name: "CREATE TASK" }).click();
  await page
    .locator("input[placeholder*='due date']")
    .fill(process.env.TASK_DUE_DATE || "");
  await page
    .getByText(process.env.TASK_PRIORITY_LEVEL || "", { exact: true })
    .click();
  await page
    .getByPlaceholder("What are you planning?")
    .fill(process.env.TASK_NAME || "");
  await page.getByRole("button", { name: "Create to-do" }).click();
  await expect(
    page.getByText("remaining tasks: 1", { exact: true })
  ).toBeVisible();
  await page.waitForTimeout(1000); // Change this
});

test("should mark task as done", async ({ page }) => {
  await page.getByRole("button", { name: "CREATE TASK" }).click();
  await page
    .locator("input[placeholder*='due date']")
    .fill(process.env.TASK_DUE_DATE || "");
  await page
    .getByText(process.env.TASK_PRIORITY_LEVEL || "", { exact: true })
    .click();
  await page
    .getByPlaceholder("What are you planning?")
    .fill(process.env.TASK_NAME || "");
  await page.getByRole("button", { name: "Create to-do" }).click();
  await expect(
    page.getByText("remaining tasks: 1", { exact: true })
  ).toBeVisible();
  await expect(
    page.locator("[data-cy='todo']").filter({ hasText: process.env.TASK_NAME })
  ).toBeVisible();
  await page
    .locator("[data-cy='todo']")
    .filter({ hasText: process.env.TASK_NAME })
    .locator("svg")
    .first()
    .click();
  await expect(
    page.getByText("remaining tasks: 0", { exact: true })
  ).toBeVisible();
  await page.waitForTimeout(1000); // Change this
});

test("should delete task", async ({ page }) => {
  await page.getByRole("button", { name: "CREATE TASK" }).click();
  await page
    .locator("input[placeholder*='due date']")
    .fill(process.env.TASK_DUE_DATE || "");
  await page
    .getByText(process.env.TASK_PRIORITY_LEVEL || "", { exact: true })
    .click();
  await page
    .getByPlaceholder("What are you planning?")
    .fill(process.env.TASK_NAME || "");
  await page.getByRole("button", { name: "Create to-do" }).click();
  await expect(
    page.getByText("remaining tasks: 1", { exact: true })
  ).toBeVisible();
  await expect(
    page.locator("[data-cy='todo']").filter({ hasText: process.env.TASK_NAME })
  ).toBeVisible();
  await page
    .locator("[data-cy='todo']")
    .filter({ hasText: process.env.TASK_NAME })
    .locator("svg")
    .last()
    .click();
  await expect(
    page.getByText("It looks like your to-do list is empty!", { exact: true })
  ).toBeVisible();
  await page.waitForTimeout(1000); // Change this
});
