import { test, expect } from "@playwright/test";
import { TooltipsPage } from "../pages/ToolTipsPage";

test("Check all tooltips", async ({ page }) => {
  const tooltipsPage = new TooltipsPage(page);
  await tooltipsPage.goto();

  expect(
    await tooltipsPage.hoverAndCheckTooltip(
      "#toolTipButton",
      "You hovered over the Button"
    )
  ).toBe(true);
  expect(
    await tooltipsPage.hoverAndCheckTooltip(
      "#toolTipTextField",
      "You hovered over the text field"
    )
  ).toBe(true);
  expect(
    await tooltipsPage.hoverAndCheckTooltip(
      "#texToolTopContainer a:nth-child(1)",
      "You hovered over the Contrary"
    )
  ).toBe(true);
  expect(
    await tooltipsPage.hoverAndCheckTooltip(
      "#texToolTopContainer a:nth-child(2)",
      "You hovered over the 1.10.32"
    )
  ).toBe(true);
});
