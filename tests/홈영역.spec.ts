import { test, expect } from '@playwright/test';

test('Top 버튼 동작', async ({ page }) => {
  // Top 이동 버튼 동작
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.evaluate(() => window.scrollBy(0, 3000));
  await page.getByRole('button', { name: '맨 위로' }).click();
  await page.waitForLoadState('networkidle');

  // "Top 이동" 버튼 미노출 확인
  const isTopButtonVisible = await page.isVisible('.topButton--on');
  expect(isTopButtonVisible).toBe(false); // "Top 이동" 버튼이 노출되지 않아야 함

  // 브라우저 닫기
  await page.close();

});

test('GNB 메뉴 확인 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();

  const expectedMenuItems = [
    '연재', '만화', '후방주의19+', 'BL', '로맨스', '드라마', '소년', '무료', '랭킹', '이벤트'
  ];

  const gnbItems = await page.$$('.gnb__list .gnb__item a.gnb__link');
  const gnbTexts = await Promise.all(gnbItems.map(item => item.textContent()));

  expect(gnbTexts).toEqual(expectedMenuItems);

  // 브라우저 닫기
  await page.close();
});

test('GNB 메뉴 확인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');

  const expectedMenuItems = [
    'オリジナル', 'ランキング', '無料', 'マンガ', '男性向け', '女性向け', 'BL', 'オトナ18+', 'キャンペーン',
  ];

  const gnbItems = await page.$$('.gnb__list .gnb__item a.gnb__link');
  const gnbTexts = await Promise.all(gnbItems.map(item => item.textContent()));

  expect(gnbTexts).toEqual(expectedMenuItems);

  // 브라우저 닫기
  await page.close();
});


test('GNB 메뉴 확인 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');

  const expectedMenuItems = [
    'Daily', 'Rankings', 'BL/GL', 'MatureR', 'Free', 'General', 'Sale'
  ];

  const gnbItems = await page.$$('.gnb__list .gnb__item a.gnb__link');
  const gnbTexts = await Promise.all(gnbItems.map(item => item.textContent()));

  expect(gnbTexts).toEqual(expectedMenuItems);

  // 브라우저 닫기
  await page.close();
});

test('랭킹 장르 노출 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();
  await page.waitForLoadState('networkidle');

  const expectedRankingOrder = [
    '전체', '로맨스', '드라마', 'BL', '백합', '판타지', '개그', '학원', '일상', '액션', '미스터리'
  ];

  const genreTabs1 = await page.$$('#ranking-tab-list a[role="tab"]');
  const genreTexts1 = await Promise.all(genreTabs1.map(tab => tab.textContent()));

  expect(genreTexts1).toEqual(expectedRankingOrder);

  // 브라우저 닫기
  await page.close();
});

test('랭킹 장르 노출 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();
  await page.waitForLoadState('networkidle');

  const expectedRankingOrder = [
    '全体', 'メンズ18+', 'BL', 'TL18+', '少年・青年', '百合', 'ロマンス', 'アクション', 'ドラマ', 'ファンタジー', '学園', '日常', 'ミステリー', '児童'
  ];

  const genreTabs1 = await page.$$('#ranking-tab-list a[role="tab"]');
  const genreTexts1 = await Promise.all(genreTabs1.map(tab => tab.textContent()));

  expect(genreTexts1).toEqual(expectedRankingOrder);

  // 브라우저 닫기
  await page.close();
});

test('랭킹 장르 노출 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();
  await page.waitForLoadState('networkidle');

  const expectedRankingOrder = [
    'All', 'Romance', 'GL', 'BL', 'MatureR', 'Action', 'SF/Fantasy', 'Drama'
  ];

  const genreTabs1 = await page.$$('#ranking-tab-list a[role="tab"]');
  const genreTexts1 = await Promise.all(genreTabs1.map(tab => tab.textContent()));

  expect(genreTexts1).toEqual(expectedRankingOrder);

  // 브라우저 닫기
  await page.close();
});

test('전체 실시간 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_실시간랭킹_더보기"]');
  await moreButton.click();

  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=realtime';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 실시간 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_실시간랭킹_더보기"]');
  await moreButton.click();

  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=realtime';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 실시간 랭킹 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_실시간랭킹_더보기"]');
  await moreButton.click();

  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhinus.com/en/ranking/detail?genre=_all&type=realtime';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('BL 실시간 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();
  await page.waitForLoadState('networkidle');

  // BL 탭 선택
  const blTab = await page.waitForSelector('#ranking-tab-list a[data-tab="bl"]');
  await blTab.click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼_bl_실시간랭킹_더보기"]');
  await moreButton.click();
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=bl&type=realtime';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('BL 실시간');

  // 브라우저 닫기
  await page.close();
});

test('로맨스 실시간 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();

  // 로맨스 탭 선택
  await page.getByRole('tab', { name: 'ロマンス' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼_romance_실시간랭킹_더보기"]');
  await moreButton.click();
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=romance&type=realtime';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('ロマンス タイムリー');

  // 브라우저 닫기
  await page.close();
});

test('드라마 실시간 랭킹 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();

  // 드라마 탭 선택
  await page.getByRole('tab', { name: 'drama' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼_drama_실시간랭킹_더보기"]');
  await moreButton.click();
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhinus.com/en/ranking/detail?genre=drama&type=realtime';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('Drama Real Time');

  // 브라우저 닫기
  await page.close();
});

test('전체 신작 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();
  await page.waitForLoadState('networkidle');

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_신작랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=new';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 신작 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();
  
  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_신작랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=new';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 신작 랭킹 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_신작랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhinus.com/en/ranking/detail?genre=_all&type=new';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 이벤트 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_이벤트랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=event';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 이벤트 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_이벤트랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=event';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 이벤트 랭킹 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_이벤트랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhinus.com/en/ranking/detail?genre=_all&type=event';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('드라마 이벤트 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();

  // 드라마 탭 선택
  await page.getByRole('tab', { name: '드라마' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼_drama_이벤트랭킹_더보기"]');
  await moreButton.click();
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=drama&type=event';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('드라마 이벤트');

  // 브라우저 닫기
  await page.close();
});

test('전체 단행본 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();

  // '더보기' 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/ranking/detail?genre=_all&type=printed"]');
  await page.waitForLoadState('networkidle'); 

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=printed';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 연도별 2023년 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_2023년랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=annual&year=2023';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 연도별 2023년 랭킹 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'ランキング' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_2023년랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=annual&year=2023';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 연도별 2023년 랭킹 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Rankings' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_2023년랭킹_더보기"]');
  await moreButton.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhinus.com/en/ranking/detail?genre=_all&type=annual&year=2023';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전체 연도별 2021년 랭킹 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();
  await page.waitForLoadState('networkidle');

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_2023년랭킹_더보기"]');
  await moreButton.click();

  // 2019년 탭 선택
  const Tab = await page.waitForSelector('#ranking-tab-list a[data-tab="2021"]');
  await Tab.click();

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=annual&year=2021';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('2023~2018년 탭 노출', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '랭킹' }).click();

  // '더보기' 버튼 클릭
  const moreButton = await page.waitForSelector('a[data-ga-event-label="버튼__all_2023년랭킹_더보기"]');
  await moreButton.click();

  // 연도 탭이 나타날 때까지 대기
  const tab2023 = await page.waitForSelector('a[aria-selected="true"][data-tab="2023"]');
  const tab2022 = await page.waitForSelector('a[data-tab="2022"]');
  const tab2021 = await page.waitForSelector('a[data-tab="2021"]');
  const tab2020 = await page.waitForSelector('a[data-tab="2020"]');
  const tab2019 = await page.waitForSelector('a[data-tab="2019"]');
  const tab2018 = await page.waitForSelector('a[data-tab="2018"]');

  // 탭이 예상한 텍스트를 포함하는지 확인
  const tabText2023 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2023"]');
    return tab ? tab.textContent : null;
  });
  const tabText2022 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2022"]');
    return tab ? tab.textContent : null;
  });
  const tabText2021 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2021"]');
    return tab ? tab.textContent : null;
  });
  const tabText2020 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2020"]');
    return tab ? tab.textContent : null;
  });
  const tabText2019 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2019"]');
    return tab ? tab.textContent : null;
  });
  const tabText2018 = await page.evaluate(() => {
    const tab = document.querySelector('a[data-tab="2018"]');
    return tab ? tab.textContent : null;
  });

  // 탭이 null이 아니고 예상한 텍스트를 포함하는지 확인하는 어서션 추가
  expect(tabText2023).toContain('2023');
  expect(tabText2022).toContain('2022');
  expect(tabText2021).toContain('2021');
  expect(tabText2020).toContain('2020');
  expect(tabText2019).toContain('2019');
  expect(tabText2018).toContain('2018');

  // 브라우저 닫기
  await page.close();
});

test('단행본 페이지 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '만화', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/bookshome?genre=_all&page=0';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('단행본 페이지 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/bookshome?genre=_all&page=0';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('단행본 출판사/레이블 상세 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();
  await page.evaluate(() => window.scrollBy(0, 500));

  const cascomiButton = await page.$('a[href="/ja/artist/cascomi"]');
  if (cascomiButton) {
    await cascomiButton.click();
  await page.waitForLoadState('networkidle');

    // 출판사 상세 페이지로 이동되었는지 확인
    const artistHeading = await page.$('#artist-heading');
    expect(artistHeading).not.toBeNull(); // artist-heading 요소가 존재해야 함
  } else {
    console.log('Cascomi 출판사 페이지를 찾을 수 없음');
  }

  // 페이지 로딩이 완료될 때까지 대기
  await page.waitForLoadState('load');

  // 브라우저 닫기
  await page.close();
});

test('단행본 장르 노출 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '만화', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const expectedGenres = [
    '전체', '로맨스', '드라마', 'BL', '백합', '판타지', '개그', '학원', '일상', '액션', '미스터리'
  ];

  const genreTabs = await page.$$('.lzTab.lzTab--hor a[role="tab"]');
  const genreTexts = await Promise.all(genreTabs.map(tab => tab.textContent()));

  expect(genreTexts).toEqual(expectedGenres);

  // 브라우저 닫기
  await page.close();
});

test('단행본 장르 노출 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForLoadState('networkidle');

  const expectedGenres = [
    '全体', 'メンズ18+', 'BL', 'TL18+', '少年・青年', '百合', 'ロマンス', 'アクション', 'ドラマ', 'ファンタジー', '学園', '日常', 'ミステリー', '児童'
  ];

  const genreTabs = await page.$$('.lzTab.lzTab--hor a[role="tab"]');
  const genreTexts = await Promise.all(genreTabs.map(tab => tab.textContent()));

  expect(genreTexts).toEqual(expectedGenres);

  // 브라우저 닫기
  await page.close();
});

test('단행본 장르 선택 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '만화', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // BL 탭 선택
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.getByRole('tab', { name: 'BL' }).click();
  await page.waitForLoadState('networkidle');

  // 장르탭이 최상단으로 스크롤되었는지 확인
  const tabListSection = await page.waitForSelector('#bookshome-tab-list'); // waitForSelector 사용
  await tabListSection.scrollIntoViewIfNeeded();

  // 현재 URL 확인하여 페이지가 제대로 이동했는지 확인
  const currentURL = page.url();
  expect(currentURL).toBe('https://q-www.lezhin.com/ko/bookshome?genre=bl&page=0');

  // 스크롤 위치 확인
  const scrollPosition = await tabListSection.evaluate(() => {
    return window.scrollY;
  });
  expect(scrollPosition).toBeGreaterThan(0); // 해당 영역에 스크롤되어야 함

  // 브라우저 닫기
  await page.close();
});

test('단행본 장르 선택 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 르맨스 탭 선택
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.getByRole('tab', { name: 'ロマンス' }).click();
  await page.waitForLoadState('networkidle');

  // 장르탭이 최상단으로 스크롤되었는지 확인
  const tabListSection = await page.waitForSelector('#bookshome-tab-list'); // waitForSelector 사용
  await tabListSection.scrollIntoViewIfNeeded();

  // 현재 URL 확인하여 페이지가 제대로 이동했는지 확인
  const currentURL = page.url();
  expect(currentURL).toBe('https://q-www.lezhin.jp/ja/bookshome?genre=romance&page=0');

  // 스크롤 위치 확인
  const scrollPosition = await tabListSection.evaluate(() => {
    return window.scrollY;
  });
  expect(scrollPosition).toBeGreaterThan(0); // 해당 영역에 스크롤되어야 함

  // 브라우저 닫기
  await page.close();
});

test('단행본 전체 랭킹 더보기 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '만화', exact: true }).click();

  // "전체 랭킹 더보기" 링크 클릭
  await page.click('a[href="/ko/ranking/detail?genre=_all&type=printed"]');
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=_all&type=printed';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('단행본 전체 랭킹 더보기 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "전체 랭킹 더보기" 링크 클릭
  await page.click('a[href="/ja/ranking/detail?genre=_all&type=printed"]');
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=_all&type=printed';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('단행본 로맨스 랭킹 더보기 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '만화', exact: true }).click();

  // 로맨스 탭 선택
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.getByRole('tab', { name: '로맨스' }).click();

  // "로멘스 랭킹 더보기" 링크 클릭
  await page.click('a[href="/ko/ranking/detail?genre=romance&type=printed"]');
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.com/ko/ranking/detail?genre=romance&type=printed';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('로맨스 만화');

  // 브라우저 닫기
  await page.close();
});

test('단행본 BL 랭킹 더보기 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // BL 탭 선택
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.getByRole('tab', { name: 'bl' }).click();

  // "BL 랭킹 더보기" 링크 클릭
  await page.click('a[href="/ja/ranking/detail?genre=bl&type=printed"]');
  await page.waitForLoadState('networkidle');

  // 기대 URL 생성
  const expectedURL = 'https://q-www.lezhin.jp/ja/ranking/detail?genre=bl&type=printed';

  // 현재 페이지 URL 확인 및 기대 URL과 비교
  const currentURL = page.url();
  expect(currentURL).toBe(expectedURL);

  // 타이틀 문구 확인
  const titleElement = await page.waitForSelector('h2.lzHeading--level1');
  const titleText = await titleElement.textContent();
  expect(titleText).toBe('BL マンガ');

  // 브라우저 닫기
  await page.close();
});

test('무료 장르 노출 확인 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '무료', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const expectedFreeOrder = [
    '전체', '로맨스', '드라마', 'BL', '백합', '판타지', '개그', '학원', '일상', '액션', '미스터리'
  ];

  // 장르 탭 요소들 가져오기
  const genreTabs = await page.$$eval('#free-tab-list a[role="tab"]', tabs => tabs.map(tab => tab.textContent));

  // 예상된 순서와 일치하는지 확인
  expect(genreTabs).toEqual(expectedFreeOrder);

  // 브라우저 닫기
  await page.close();
});

test('무료 장르 노출 확인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: '無料', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const expectedFreeOrder = [
    '全体', 'メンズ18+', 'BL', 'TL18+', 'ロマンス', 'ドラマ', 'ファンタジー'
  ];

  // 장르 탭 요소들 가져오기
  const genreTabs = await page.$$eval('#free-tab-list a[role="tab"]', tabs => tabs.map(tab => tab.textContent));

  // 예상된 순서와 일치하는지 확인
  expect(genreTabs).toEqual(expectedFreeOrder);

  // 브라우저 닫기
  await page.close();
});

test('무료 장르 노출 확인 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'Free', exact: true }).click();
  await page.waitForLoadState('networkidle');

  const expectedFreeOrder = [
    'All', 'Romance', 'GL', 'BL', 'MatureR', 'Action', 'SF/Fantasy', 'Drama'
  ];

  // 장르 탭 요소들 가져오기
  const genreTabs = await page.$$eval('#free-tab-list a[role="tab"]', tabs => tabs.map(tab => tab.textContent));

  // 예상된 순서와 일치하는지 확인
  expect(genreTabs).toEqual(expectedFreeOrder);

  // 브라우저 닫기
  await page.close();
});

test('GNB 후방주의_비성인 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.click('#log-nav-btn');

  // 비성인 계정 로그인
  await page.getByRole('link', { name: '이메일로 로그인' }).click();
  await page.getByLabel('이메일').click();
  await page.getByLabel('이메일').fill('ch_auto1@yopmail.com');
  await page.getByLabel('비밀번호').click();
  await page.getByLabel('비밀번호').fill('qwer1234!@');
  await page.getByRole('button', { name: '이메일로 로그인' }).click();
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();

  await page.getByRole('link', { name: '후방주의 19' }).click();
  await page.waitForLoadState('networkidle');

  // 성인인증 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/adult?redirect=%2Fko%2Fcontent-mode%3Fpath%3D%252Fko%252Fnsfw%26sw%3Dall';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('GNB 후방주의_성인 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.click('#log-nav-btn');

  // 비성인 계정 로그인
  await page.getByRole('link', { name: '이메일로 로그인' }).click();
  await page.getByLabel('이메일').click();
  await page.getByLabel('이메일').fill('ch_auto2@yopmail.com');
  await page.getByLabel('비밀번호').click();
  await page.getByLabel('비밀번호').fill('qwer1234!@');
  await page.getByRole('button', { name: '이메일로 로그인' }).click();
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();

  // 토글 버튼 선택하여 '전연령으로 이동' 클릭
  await page.click('.contentMode__link--kid');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();

  // 후방주의 페이지 접근
  await page.click('a.gnb__link--adult');
  await page.waitForLoadState('networkidle');

  // 후방주의 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/nsfw?page=0&sub_tags=all';

  expect(currentURL).toBe(expectedURL);

  // 토글 엘리먼트의 텍스트 가져오기
  const toggleText = await page.$eval('.contentMode__link--kid', (element) => element.textContent);
  
  expect(toggleText).toBe('전연령으로 이동');

  // 브라우저 닫기
  await page.close();
});

test('GNB 로맨스 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '로맨스', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 로맨스 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/romance?page=0&sub_tags=all';
  
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('GNB 소년 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '소년', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 로맨스 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/boys?page=0&sub_tags=all';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('GNB 드라마 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '드라마', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 드라마 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/drama?page=0&sub_tags=all';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('GNB BL ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: 'BL', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // BL 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/bl?page=0&sub_tags=all';

  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '로맨스', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션들이 노출되는지 확인
  const filterList = await page.$('.lzFilter__list');

  if (!filterList) {
    throw new Error('필터/정렬 옵션 목록을 찾을 수 없습니다.');
  }

  const filterButtons = await filterList.$$('button.lzFilter__item');

  // 필터 옵션 확인
  const allFilter = await filterButtons[0].innerText();
  const completedFilter = await filterButtons[1].innerText();

  // 정렬 옵션 확인
  const sortButtons = await filterList.$$('button.lzFilter__item[data-sort]');
  const popularSort = await sortButtons[0].innerText();
  const newSort = await sortButtons[1].innerText();

  // 필터/정렬 옵션들이 제대로 노출되는지 확인
  expect(allFilter).toBe('전체');
  expect(completedFilter).toBe('완결');
  expect(popularSort).toBe('인기순');
  expect(newSort).toBe('신규순');

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: '男性向け' }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션들이 노출되는지 확인
  const filterList = await page.$('.lzFilter__list');

  if (!filterList) {
    throw new Error('필터/정렬 옵션 목록을 찾을 수 없습니다.');
  }

  const filterButtons = await filterList.$$('button.lzFilter__item');

  // 필터 옵션 확인
  const allFilter = await filterButtons[0].innerText();
  const completedFilter = await filterButtons[1].innerText();

  // 정렬 옵션 확인
  const sortButtons = await filterList.$$('button.lzFilter__item[data-sort]');
  const popularSort = await sortButtons[0].innerText();
  const newSort = await sortButtons[1].innerText();

  // 필터/정렬 옵션들이 제대로 노출되는지 확인
  expect(allFilter).toBe('全体');
  expect(completedFilter).toBe('完結');
  expect(popularSort).toBe('人気順');
  expect(newSort).toBe('新着順');

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'General' }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션들이 노출되는지 확인
  const filterList = await page.$('.lzFilter__list');

  if (!filterList) {
    throw new Error('필터/정렬 옵션 목록을 찾을 수 없습니다.');
  }

  const filterButtons = await filterList.$$('button.lzFilter__item');

  // 필터 옵션 확인
  const allFilter = await filterButtons[0].innerText();
  const completedFilter = await filterButtons[1].innerText();

  // 정렬 옵션 확인
  const sortButtons = await filterList.$$('button.lzFilter__item[data-sort]');
  const popularSort = await sortButtons[0].innerText();
  const newSort = await sortButtons[1].innerText();

  // 필터/정렬 옵션들이 제대로 노출되는지 확인
  expect(allFilter).toBe('All');
  expect(completedFilter).toBe('Completed');
  expect(popularSort).toBe('Popular');
  expect(newSort).toBe('New');

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 Default ko', async ({ page }) => {
  await page.goto('https://q-www.lezhin.com/ko');
  await page.getByRole('button', { name: '오늘 하루 안보기' }).click();
  await page.getByRole('link', { name: '소년', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 변경 (완결/신규순)
  await page.getByRole('button', { name: '전체 / 인기순' }).click();
  await page.getByRole('option', { name: '완결' }).click();

  // 다른 메뉴 (https://q-www.lezhin.com/ko/sale) 로 이동
  await page.getByRole('link', { name: '이벤트', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 다시 이전 페이지로 돌아오기
  await page.goBack();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션 확인
  const filterSortButton = await page.$('button.lzFilter__btn');
  if (!filterSortButton) {
    throw new Error('필터/정렬 버튼을 찾을 수 없습니다.');
  }
  const filterSortText = await filterSortButton.innerText();

  // 필터/정렬이 복원되었는지 확인
  expect(filterSortText).toBe('전체 / 인기순 ');

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 Default ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: '女性向け', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 변경 (전체/신규순)
  await page.getByRole('button', { name: '全体 / 人気順' }).click();
  await page.getByRole('option', { name: '新着順' }).click();

  // 다른 메뉴 (https://q-www.lezhin.com/ko/sale) 로 이동
  await page.getByRole('link', { name: '無料', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 다시 이전 페이지로 돌아오기
  await page.goBack();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션 확인
  const filterSortButton = await page.$('button.lzFilter__btn');
  if (!filterSortButton) {
    throw new Error('필터/정렬 버튼을 찾을 수 없습니다.');
  }
  const filterSortText = await filterSortButton.innerText();

  // 필터/정렬이 복원되었는지 확인
  expect(filterSortText).toBe('全体 / 人気順 ');

  // 브라우저 닫기
  await page.close();
});

test('전시메뉴 상세 필터/정렬 Default en', async ({ page }) => {
  await page.goto('https://q-www.lezhinus.com/en');
  await page.getByRole('link', { name: 'BL/GL' }).click();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 변경 (완결/신규순)
  await page.getByRole('button', { name: 'All / Popular' }).click();
  await page.getByRole('option', { name: 'Completed' }).click();
  await page.getByRole('button', { name: 'Completed / Popular' }).click();
  await page.getByRole('option', { name: 'New' }).click();

  // 다른 메뉴 (https://q-www.lezhin.com/ko/sale) 로 이동
  await page.getByRole('link', { name: 'Rankings', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // 다시 이전 페이지로 돌아오기
  await page.goBack();
  await page.waitForLoadState('networkidle');

  // 필터/정렬 옵션 확인
  const filterSortButton = await page.$('button.lzFilter__btn');
  if (!filterSortButton) {
    throw new Error('필터/정렬 버튼을 찾을 수 없습니다.');
  }
  const filterSortText = await filterSortButton.innerText();

  // 필터/정렬이 복원되었는지 확인
  expect(filterSortText).toBe('All / Popular ');

  // 브라우저 닫기
  await page.close();
});