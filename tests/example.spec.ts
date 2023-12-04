import { test, expect } from "@playwright/test";

test("should add food", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.ITEM || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.ITEM || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("span").filter({ hasText: process.env.ITEM })
  ).toBeVisible();
});

test("should delete food", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.ITEM || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.ITEM || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("span").filter({ hasText: process.env.ITEM })
  ).toBeVisible();
});

test("should create a task", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.ITEM || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.ITEM || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("span").filter({ hasText: process.env.ITEM })
  ).toBeVisible();
});

test("should delete a task", async ({ page }) => {
  await page.goto("https://reactfitnessapp-gilt.vercel.app/");
  await page
    .getByRole("button", { name: "Put some meat on your bones!" })
    .click();
  await page
    .getByPlaceholder("What have you eaten?")
    .fill(process.env.ITEM || "");
  await Promise.all([
    page.waitForResponse(
      (res) => res.status() == 200 && res.url().includes(process.env.ITEM || "")
    ),
    page.getByRole("button", { name: "Add meal" }).click(),
  ]);
  await expect(
    page.locator("span").filter({ hasText: process.env.ITEM })
  ).toBeVisible();
});
