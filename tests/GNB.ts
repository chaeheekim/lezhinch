import { test, expect } from '@playwright/test';


test('GNB 진입', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '닫기' }).click();
  await page.getByRole('link', { name: 'top Banner' }).nth(1).click();
  await page.getByRole('link', { name: '레진코믹스' }).click();
  await page.getByRole('button', { name: '닫기' }).click();
  await page.getByRole('button', { name: '맨 위로' }).click();

  // 탑버튼 노출
  await page.getByRole('button', { name: '닫기' }).click();
  await page.getByRole('button', { name: '맨 위로' }).click();
  await expect(page).toHaveTitle(/Playwright/);

  // GNB 순서 노출_KR
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '닫기' }).click();
  await page.getByText('레진코믹스 사이트 네비게이션 연재 만화 up 후방주의19+ BL 로맨스 드라마 소년 무료 랭킹 이벤트up 완전판(19)으로 이동 선물함 검색창 ').click();
  await page.getByRole('button', { name: '닫기' }).click();

  // GNB 순서 노출_JP
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByText('レジンコミックス サイトマップ オリジナル ランキング 無料 マンガ up 男性向け 女性向け BL オトナ18+ キャンペーン 18+に移動 Myプレゼント ').click();
 
  // GNB 순서 노출_US
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByText('Lezhin Comics Site navigation Daily Rankings BL/GL MatureR Free General Sale Go ').click();

  // 실시간랭킹_KR
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '닫기' }).click();
  await page.getByRole('heading', { name: '랭킹' }).click();
  await page.getByRole('heading', { name: '실시간' }).click();
  await page.getByRole('link', { name: '더보기' }).click();
  await page.getByRole('heading', { name: '실시간 랭킹' }).click();
  await page.locator('#rank-realtime').getByRole('link', { name: '더보기' }).click();
  await page.getByRole('heading', { name: '전체 실시간' }).click();

  // 실시간랭킹_JP
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('heading', { name: 'ランキング' }).click();
  await page.getByRole('heading', { name: 'タイムリー' }).click();
  await page.getByRole('region', { name: 'ランキング' }).getByRole('link', { name: 'もっと見る' }).click();
  await page.getByRole('heading', { name: 'タイムリーランキング' }).click();
  await page.locator('#rank-realtime').getByRole('link', { name: 'もっと見る' }).click();
  await page.getByRole('heading', { name: '全体 タイムリー' }).click();

  // 실시간랭킹_US
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('heading', { name: 'Rankings' }).click();
  await page.getByRole('heading', { name: 'Real Time' }).click();
  await page.getByRole('link', { name: 'Read more' }).click();
  await page.getByRole('heading', { name: 'Real Time Ranking' }).click();
  await page.locator('#rank-realtime').getByRole('link', { name: 'Read more' }).click();
  await page.getByRole('heading', { name: 'All Real Time' }).click();
});