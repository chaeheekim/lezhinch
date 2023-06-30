import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByText('レジンコミックス サイトマップ オリジナル ランキング 無料 マンガ up 男性向け 女性向け BL オトナ18+ キャンペーン 18+に移動 Myプレゼント ').click();
});