import { test, expect } from "@playwright/test";

test("should add food", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.FOOD || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.FOOD || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("span").filter({ hasText: process.env.FOOD })
  ).toBeVisible();
});

test("should create a task", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page.getByRole("button", { name: "CREATE TASK" }).click();
  await page.locator("input[placeholder='Pick a due date (optional)']").click();
  await page.getByText("20", { exact: true }).click();
  await page.getByText("Medium", { exact: true }).click();
  await page
    .getByPlaceholder("What are you planning?")
    .fill(process.env.TASK_NAME || "");
  await page.getByRole("button", { name: "Create to-do" }).click();
  await expect(
    page.getByText("remaining tasks: 1", { exact: true })
  ).toBeVisible();
});
