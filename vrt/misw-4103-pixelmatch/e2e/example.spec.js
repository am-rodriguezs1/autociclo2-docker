import { test } from '@playwright/test';
import fs from 'fs';
import { PNG } from 'pngjs';
import { options } from '../vrt.config';

test.describe("color-palette", () => {
  let beforePath = "";
  let afterPath = "";
  let comparePath = "";
  let pixelmatch;

  test.beforeAll(async ({ browserName }, testInfo) => {
    pixelmatch = (await import('pixelmatch')).default;
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);
  });

  test('vrt', async ({ page }) => {
    await page.goto("/color-palette");
    await page.screenshot({ path: beforePath });

    await page.waitForLoadState();
    await page.click("#generate");
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});