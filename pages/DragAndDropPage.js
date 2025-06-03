const { BasePage } = require("./BasePage");

class DragAndDropPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator("#droppableExample-tabpane-simple");
    this.source = this.container.locator("#draggable");
    this.target = this.container.locator("#droppable").first();
    this.resultText = this.target.locator("p");
  }

  async goto() {
    await this.open("https://demoqa.com/droppable");
    const simpleTab = this.page.locator("#droppableExample-tab-simple");
    if (await simpleTab.isVisible()) {
      await simpleTab.click();
    }

    await this.container.waitFor({ state: "visible" });
  }

  async dragSourceToTarget() {
    await this.source.waitFor({ state: "visible" });
    await this.target.waitFor({ state: "visible" });

    await this.source.scrollIntoViewIfNeeded();

  const sourceBox = await this.source.boundingBox();
  const targetBox = await this.target.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error("Bounding boxes not found");
  }

  await this.page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2
  );
  await this.page.mouse.down();
  await this.page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + targetBox.height / 2
  );
  await this.page.mouse.up();

  await this.resultText.waitFor({ state: "visible", timeout: 5000 });
}
  async getDropResultText() {
    return (await this.resultText.textContent()).trim();
  }

}

module.exports = { DragAndDropPage };
