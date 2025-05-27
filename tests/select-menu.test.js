// tests/select-menu.test.js
import { test, expect } from "@playwright/test";
import { SelectMenuPage } from "../pages/SelectMenuPage.js";
import { enableAdBlock } from "../utils/adblock.js";

test.describe("Select Menu functionality", () => {
  let selectMenu;

  test.beforeEach(async ({ page }) => {
    await enableAdBlock(page);
    selectMenu = new SelectMenuPage(page);
    await selectMenu.goto();
  });

  test("Dropdown selections work correctly", async () => {
    await selectMenu.selectFromSelectValue("Group 2, option 1");
    const selectValue = await selectMenu.getSelectedSelectValue();
    expect(selectValue?.trim()).toBe("Group 2, option 1");

    await selectMenu.selectFromSelectOne("Other");
    const selectOneValue = await selectMenu.getSelectedSelectOneValue();
    expect(selectOneValue?.trim()).toBe("Other");

    await selectMenu.selectFromOldSelectMenuByText("Green");
    const oldSelectValue = await selectMenu.getSelectedOldSelectMenuValue();
    expect(oldSelectValue?.trim()).toBe("Green");

    await selectMenu.selectFromMultiSelectDropDown(["Black", "Blue"]);
    const multiSelected =
      await selectMenu.getSelectedMultiSelectDropDownValues();
    expect(multiSelected).toEqual(expect.arrayContaining(["Black", "Blue"]));
  });
});
