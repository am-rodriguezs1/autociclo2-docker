import { test } from "@playwright/test";
import fs from "fs";
import { PNG } from "pngjs";
import { options } from "../vrt.config";

test.describe("color-palette", () => {
  const compareImages = require("resemblejs/compareImages");

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";
  let resultInfo = {};

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);
  });

  test("vrt", async ({ page, browserName }) => {
    await page.goto("/color-palette");
    await page.screenshot({ path: beforePath });

    await page.click("#generate");
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const data = await compareImages(img1, img2, options);
    resultInfo[browserName] = {
      isSameDimensions: data.isSameDimensions,
      dimensionDifference: data.dimensionDifference,
      rawMisMatchPercentage: data.rawMisMatchPercentage,
      misMatchPercentage: data.misMatchPercentage,
      diffBounds: data.diffBounds,
      analysisTime: data.analysisTime,
    };
    fs.writeFileSync(comparePath, data.getBuffer());
  });

  test.afterAll(async ({ browserName }) => {
    console.log(`ResultInfo ${browserName}`, resultInfo[browserName]);
  });
});
