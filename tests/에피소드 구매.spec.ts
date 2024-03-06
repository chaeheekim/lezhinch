import { test, expect } from '@playwright/test';

test('에피소드 목록 단권구매 팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
  
  // 특정 유료 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("골든 로드(Golden Rod) 06")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('작품 구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

   // 작품 구매 팝업 내의 안내문구 확인
   const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');
   const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들의 텍스트 일치 여부 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 단권구매 팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'DEAR DOOR');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
  
  // 특정 유료 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("第3話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('作品購入');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 단권구매 팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Behind Story');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  
  // 특정 유료 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("Episode 2")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('Purchase Title');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 단권구매 팝업 UI 확인_성인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto2@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '커튼콜 아래그랑');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
  
  // 특정 유료 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 2000));
  const episodeSelector = '.episode__title:has-text("교환학생(1)")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('작품 구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

   // 작품 구매 팝업 내의 안내문구 확인
   const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');
   const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들의 텍스트 일치 여부 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 단권구매 팝업 UI 확인_성인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto2_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

    // 작품 검색
    await page.click('.style_supportsItem__search__ZPNGK');
    await page.type('.style_gnbSearch__input__KGtkv', 'DEAR DOOR【完全版】');
    await page.waitForTimeout(1000);
    await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
    await page.waitForSelector('.lzComic__item');
    const link = await page.waitForSelector('.lzComic__link');
    await link.click();
    await page.waitForTimeout(2000);
  
  // 특정 유료 에피소드 선택
  const episodeSelector = '.episode__title:has-text("第3話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('作品購入');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 단권구매 팝업 UI 확인_성인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto2_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'An Innocent Sin');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
  
  // 특정 유료 에피소드 선택
  const episodeSelector = '.episode__title:has-text("Episode 2")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForTimeout(3000);
  
  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('Purchase Title');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 각 구매 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
    
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
    
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매 팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('전체구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매 팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'DEAR DOOR');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('まとめ買い');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("「まとめ買い」は無料の対象区間を含めた全ての有料エピソードが購入されます。")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('マイレージの有効期限:支給日から90日まで。');
  expect(purchaseNoticeText).toContain('「まとめ買い」は無料の対象区間を含めた全ての有料エピソードが購入されます。');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매 팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Behind Story');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('Unlock all');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("Purchase all episodes(including paid episodes that are currently in WUF).  ")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('Point Expiration Date: Points will be available for 30 days after receiving them.');
  expect(purchaseNoticeText).toContain('Purchase all episodes(including paid episodes that are currently in WUF).');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매 팝업 UI 확인_성인ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto2@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '커튼콜 아래그랑');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 작품 구매 팝업 노출 대기
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('전체구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체무료 작품 구매 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '꼴데툰2020');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 팝업 노출을 확인
  await page.waitForSelector('.lzSnackbar__msg');
  const snackbarMessage = await page.$('.lzSnackbar__msg');
  const messageText = await (snackbarMessage ? snackbarMessage.textContent() : null);

  // 팝업 메시지 확인
  expect(messageText).toBe('구매 가능한 유료회차가 없습니다.');

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체무료 작품 구매 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  await page.waitForTimeout(3000);

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'レジンコミックスガイド');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 팝업 노출을 확인
  await page.waitForSelector('.lzSnackbar__msg');
  const snackbarMessage = await page.$('.lzSnackbar__msg');
  const messageText = await (snackbarMessage ? snackbarMessage.textContent() : null);

  // 팝업 메시지 확인
  expect(messageText).toBe('ご購入できる有料エピソードがありません。');

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매한 작품 구매 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto3@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '유월의 연애');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 팝업 노출 확인
  await page.waitForSelector('.lzSnackbar__msg');
  const snackbarMessage = await page.$('.lzSnackbar__msg');
  const messageText = await (snackbarMessage ? snackbarMessage.textContent() : null);

  // 팝업 메시지 확인
  expect(messageText).toBe('구매 가능한 유료회차가 없습니다.');

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매한 작품 구매 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'カボチャの冒険');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 팝업 노출 확인
  await page.waitForSelector('.lzSnackbar__msg');
  const snackbarMessage = await page.$('.lzSnackbar__msg');
  const messageText = await (snackbarMessage ? snackbarMessage.textContent() : null);

  // 팝업 메시지 확인
  expect(messageText).toBe('ご購入できる有料エピソードがありません。');

  // 브라우저 닫기
  await page.close();
});

test('에피소드 목록 전체구매한 작품 구매 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1 Plus 1');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);

  // 전체구매 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(2000);
  await page.click('button#btn-bulk-purchase');

  // 팝업 노출을 확인하는 부분
  await page.waitForSelector('.lzSnackbar__msg');
  const snackbarMessage = await page.$('.lzSnackbar__msg');
  const messageText = await (snackbarMessage ? snackbarMessage.textContent() : null);

  // 팝업 메시지 확인
  expect(messageText).toBe('There are no episodes available to purchase');

  // 브라우저 닫기
  await page.close();
});

test('소장작품 전체소장 팝업 UI 확인  ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto3@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  
  await page.getByRole('button', { name: '계정 메뉴' }).click();
  await page.getByRole('link', { name: '내 서재' }).click();
  await page.waitForLoadState('networkidle');

  // 소장 작품 탭 선택
  await page.click('a#library-tab-comic');
  await page.waitForTimeout(2000);

  // 전체소장 버튼 클릭
  await page.click('.library__purchaseAll');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('전체소장');

  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');
  const bulkPurchaseNotice = await purchaseDialog.$('.purchase__notice--bulk:has-text("전체소장은 무료 회차 포함 전체 에피소드가 구매됩니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);
  const bulkPurchaseNoticeText = await (bulkPurchaseNotice ? bulkPurchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(bulkPurchaseNoticeText).toContain('전체소장은 무료 회차 포함 전체 에피소드가 구매됩니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장작품 전체소장 팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  await page.waitForTimeout(3000);    
      
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'My本棚' }).click();
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForLoadState('networkidle');

  // 전체소장 버튼 클릭
  await page.click('.library__purchaseAll');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('全て購入');

  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("「全て購入」は無料エピソードを含めた全てのエピソードが購入されます。")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('マイレージの有効期限:支給日から90日まで。');
  expect(purchaseNoticeText).toContain('「全て購入」は無料エピソードを含めた全てのエピソードが購入されます。');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장작품 전체소장 팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  await page.getByRole('button', { name: 'Account Menu' }).click();
  await page.getByRole('link', { name: 'My Library' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 전체소장 버튼 클릭
  await page.click('.library__purchaseAll');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('Purchase All');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("Purchase all paid and freed episodes.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('Point Expiration Date: Points will be available for 30 days after receiving them.');
  expect(purchaseNoticeText).toContain('Purchase all paid and freed episodes.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장목록 단권구매 팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto3@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  
  await page.getByRole('button', { name: '계정 메뉴' }).click();
  await page.getByRole('link', { name: '내 서재' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '캐릭터 컴퍼니 완결 2%' }).click();

  // 유료 에피소드 선택
  const episode49Button = await page.waitForSelector('.epsName:has-text("49화")');
  await episode49Button.click();

  // 단권구매 팝업 UI 확인
  await page.waitForSelector('.lzModal--purchase');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('전체소장');

  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장목록 단권구매 팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'My本棚' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForLoadState('networkidle');

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '香しいオフィスライフ 完結 2%' }).click();

  // 유료 에피소드 선택
  const episode49Button = await page.waitForSelector('.epsName:has-text("41話")');
  await episode49Button.click();

  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('作品購入');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('소장목록 단권구매 팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  await page.getByRole('button', { name: 'Account Menu' }).click();
  await page.getByRole('link', { name: 'My Library' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '1 Plus 1 Completed 9%' }).click();

  // 유료 에피소드 선택
  const episode49Button = await page.waitForSelector('.epsName:has-text("Episode 47")');
  await episode49Button.click();

  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('Purchase Title');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('소장목록 전체소장 팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto3@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  await page.getByRole('button', { name: '계정 메뉴' }).click();
  await page.getByRole('link', { name: '내 서재' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '캐릭터 컴퍼니 완결 2%' }).click();
  await page.waitForTimeout(3000); // 페이지가 로드될 때까지 대기

  // 전체소장 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
await page.waitForTimeout(2000);
await page.click('a[data-ga-event-label="버튼_전체소장"]');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('전체소장');

  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');
  const bulkPurchaseNotice = await purchaseDialog.$('.purchase__notice--bulk:has-text("전체소장은 무료 회차 포함 전체 에피소드가 구매됩니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);
  const bulkPurchaseNoticeText = await (bulkPurchaseNotice ? bulkPurchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(bulkPurchaseNoticeText).toContain('전체소장은 무료 회차 포함 전체 에피소드가 구매됩니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장목록 전체소장 팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'My本棚' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '香しいオフィスライフ 完結 2%' }).click();
  await page.waitForTimeout(3000); // 페이지가 로드될 때까지 대기

  // 전체소장 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
await page.waitForTimeout(2000);
await page.click('a[data-ga-event-label="버튼_전체소장"]');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('全て購入');

  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("「全て購入」は無料エピソードを含めた全てのエピソードが購入されます。")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('マイレージの有効期限:支給日から90日まで。');
  expect(purchaseNoticeText).toContain('「全て購入」は無料エピソードを含めた全てのエピソードが購入されます。');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('소장목록 전체소장 팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  await page.getByRole('button', { name: 'Account Menu' }).click();
  await page.getByRole('link', { name: 'My Library' }).click();
  await page.waitForLoadState('networkidle');
  
  // 소장 작품 탭 선택
  await page.click('#library-tab-comic');
  await page.waitForTimeout(2000); // 페이지가 로드될 때까지 대기

  // 소장 작품인 캐릭터 컴퍼니 작품 선택
  await page.getByRole('link', { name: '1 Plus 1 Completed 9%' }).click();
  await page.waitForTimeout(3000); // 페이지가 로드될 때까지 대기

  // 전체소장 버튼 클릭
  await page.evaluate(() => window.scrollBy(0, 500));
await page.waitForTimeout(2000);
await page.click('a[data-ga-event-label="버튼_전체소장"]');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isBulkTitleVisible = titleText?.includes('Purchase All');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.waitForSelector('.purchase__list');

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("Purchase all paid and freed episodes.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 작품 구매 리스트 아이템 확인
  const purchaseListItems = await purchaseList?.$$('.purchase__item');
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isBulkTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('Point Expiration Date: Points will be available for 30 days after receiving them.');
  expect(purchaseNoticeText).toContain('Purchase all paid and freed episodes.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 이전화 구매팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 6000));
  const episodeSelector = '.episode__title:has-text("빙카(Periwinkle)")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
  
  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('작품 구매');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
    
  // 작품 구매 팝업 내의 안내문구 확인
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 이전화 구매팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1R。私のベッドに兄2人!?');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("10話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn.viewer__navBtn--next');
  
  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('作品購入');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 이전화 구매팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Doridosim');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 5000));
  const episodeSelector = '.episode__title:has-text("Season 1 Epilogue")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
  
  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('Purchase Title');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});
  
test('에피소드 뷰어 다음화 구매팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 6000));
  const episodeSelector = '.episode__title:has-text("골든 로드(Golden Rod) 05")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);

  // 다음화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn.viewer__navBtn--next');

  // 작품구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('작품 구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = await (purchaseList ? purchaseList.$$('.purchase__item') : []);

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 다음화 구매팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1R。私のベッドに兄2人!?');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("10話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
  
  // 단권구매 팝업 UI 확인
  const purchaseDialog = await page.waitForSelector('.lzModal--purchase');
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('作品購入');
  
  // 작품 구매 리스트 확인
  const purchaseListItems = await purchaseDialog.$$('.purchase__item');
    
  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  
  // 각 구매 아이템 확인
  for (const item of purchaseListItems || []) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBeGreaterThan(0); // 최소한 한 개 이상의 구매 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('マイレージの有効期限:支給日から90日まで。');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 다음화 구매팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Doridosim');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 5000));
  const episodeSelector = '.episode__title:has-text("Season 1 Epilogue")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);

  // 다음화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn.viewer__navBtn--next');

  // 작품구매 팝업 UI 확인
const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('Purchase Title');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = await (purchaseList ? purchaseList.$$('.purchase__item') : []);

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('Point Expiration Date: Points will be available for 30 days after receiving them.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 다음화 구매팝업 UI 확인_성인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto2@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '커튼콜 아래그랑');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("균 문제")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);

  // 다음화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn.viewer__navBtn--next');

  // 작품구매 팝업 UI 확인
const purchaseDialog = await page.waitForSelector('.lzModal--purchase');

  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = await (purchaseTitle ? purchaseTitle.textContent() : null);
  const isSingleTitleVisible = titleText?.includes('작품 구매');

  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = await (purchaseList ? purchaseList.$$('.purchase__item') : []);

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of (purchaseListItems || [])) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');

    const itemText = await (itemTextElement ? itemTextElement.textContent() : null);
    const coinAmount = await (coinAmountElement ? coinAmountElement.textContent() : null);

    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }

  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');

  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();

  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 스크롤 > 다음화 구매팝업 UI 확인 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 6000));
  const episodeSelector = '.episode__title:has-text("골든 로드(Golden Rod) 05")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForLoadState('networkidle');

  // 특정 요소 위치까지 스크롤
  await page.evaluate(async () => {
    const maxScrollAttempts = 10; // 최대 스크롤 시도 횟수
    const scrollInterval = 1000; // 스크롤 간격 (밀리초 단위)

    for (let i = 0; i < maxScrollAttempts; i++) {
      await new Promise((resolve) => {
        const distance = 1000 * (i + 1); // 스크롤 거리 조정
        window.scrollBy(0, distance);
        setTimeout(resolve, scrollInterval);
      });

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        break;
      }
    }
  });
  await page.waitForLoadState('networkidle');

  // 구매 팝업이 노출되는지 확인
  const purchasePopup = '.lzModal--purchase';
  await page.waitForSelector(purchasePopup);
  await page.waitForLoadState('networkidle'); 
  
  // 작품 구매 팝업 내의 요소들 확인
  const purchaseDialog = await page.waitForSelector(purchasePopup);
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = purchaseTitle ? await purchaseTitle.textContent() : null;
  const isSingleTitleVisible = titleText ? titleText.includes('작품 구매') : false;
  
  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = purchaseList ? await purchaseList.$$('.purchase__item') : [];

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');
  const purchaseNotice = await purchaseDialog.$('.purchase__notice:has-text("열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.")');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);
  const purchaseNoticeText = await (purchaseNotice ? purchaseNotice.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of purchaseListItems) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
  
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
  
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(purchaseNoticeText).toContain('열람하지 않은 에피소드에 대해서만 구매 후 7일 이내 청약철회가 가능합니다.');
  expect(noticeExpirationText).toContain('포인트 유효기간 : 지급받은 시점으로부터 180일 동안 유효합니다.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 스크롤 > 다음화 구매팝업 UI 확인 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1R。私のベッドに兄2人!?');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("10話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForLoadState('networkidle');

  // 특정 요소 위치까지 스크롤
  await page.evaluate(async () => {
    const maxScrollAttempts = 10; // 최대 스크롤 시도 횟수
    const scrollInterval = 1000; // 스크롤 간격 (밀리초 단위)

    for (let i = 0; i < maxScrollAttempts; i++) {
      await new Promise((resolve) => {
        const distance = 1000 * (i + 1); // 스크롤 거리 조정
        window.scrollBy(0, distance);
        setTimeout(resolve, scrollInterval);
      });

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        break;
      }
    }
  });
  await page.waitForLoadState('networkidle');

  // 구매 팝업이 노출되는지 확인
  const purchasePopup = '.lzModal--purchase';
  await page.waitForSelector(purchasePopup);
  await page.waitForLoadState('networkidle'); 
  
  // 작품 구매 팝업 내의 요소들 확인
  const purchaseDialog = await page.waitForSelector(purchasePopup);
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = purchaseTitle ? await purchaseTitle.textContent() : null;
  const isSingleTitleVisible = titleText ? titleText.includes('作品購入') : false;
  
  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = purchaseList ? await purchaseList.$$('.purchase__item') : [];

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of purchaseListItems) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
  
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
  
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('マイレージの有効期限:支給日から90日まで。');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('에피소드 뷰어 스크롤 > 다음화 구매팝업 UI 확인 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Doridosim');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 5000));
  const episodeSelector = '.episode__title:has-text("Season 1 Epilogue")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
  await page.waitForLoadState('networkidle');

  // 특정 요소 위치까지 스크롤
  await page.evaluate(async () => {
    const maxScrollAttempts = 10; // 최대 스크롤 시도 횟수
    const scrollInterval = 1000; // 스크롤 간격 (밀리초 단위)

    for (let i = 0; i < maxScrollAttempts; i++) {
      await new Promise((resolve) => {
        const distance = 1000 * (i + 1); // 스크롤 거리 조정
        window.scrollBy(0, distance);
        setTimeout(resolve, scrollInterval);
      });

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        break;
      }
    }
  });
  await page.waitForLoadState('networkidle');

  // 구매 팝업이 노출되는지 확인
  const purchasePopup = '.lzModal--purchase';
  await page.waitForSelector(purchasePopup);
  await page.waitForLoadState('networkidle'); 
  
  // 작품 구매 팝업 내의 요소들 확인
  const purchaseDialog = await page.waitForSelector(purchasePopup);
  
  // 작품 구매 타이틀 확인
  const purchaseTitle = await purchaseDialog.$('.lzModal__title');
  const titleText = purchaseTitle ? await purchaseTitle.textContent() : null;
  const isSingleTitleVisible = titleText ? titleText.includes('Purchase Title') : false;
  
  // 작품 구매 리스트 확인
  const purchaseList = await purchaseDialog.$('.purchase__list');
  const purchaseListItems = purchaseList ? await purchaseList.$$('.purchase__item') : [];

  // 작품 구매 팝업 내의 안내문구 확인
  const noticeExpiration = await purchaseDialog.$('#notice-expiration');

  // 각 요소의 텍스트 가져오기
  const noticeExpirationText = await (noticeExpiration ? noticeExpiration.textContent() : null);

  // 각 구매 아이템 확인
  for (const item of purchaseListItems) {
    const itemTextElement = await item.$('.purchase__itemText');
    const coinAmountElement = await item.$('.purchase__coinAmount');
  
    const itemText = itemTextElement ? await itemTextElement.textContent() : null;
    const coinAmount = coinAmountElement ? await coinAmountElement.textContent() : null;
  
    console.log('구매 아이템:', itemText);
    console.log('코인 수량:', coinAmount);
  }
  // 구매 버튼 및 취소 버튼 확인
  const purchaseButton = await purchaseDialog.$('.lzBtn--major');
  const cancelButton = await purchaseDialog.$('.lzBtn[aria-controls="modal-purchase"]');
  
  // 각 요소들이 존재하는지 확인
  expect(isSingleTitleVisible).toBeTruthy();
  expect(purchaseListItems.length).toBe(2); // 2개의 아이템이 존재해야 함
  expect(noticeExpirationText).toContain('Point Expiration Date: Points will be available for 30 days after receiving them.');
  expect(purchaseButton).not.toBeNull();
  expect(cancelButton).not.toBeNull();
  
  // 브라우저 닫기
  await page.close();
});

test('정주행 이전화 코인부족 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 6000));
  const episodeSelector = '.episode__title:has-text("빙카(Periwinkle)")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
    
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
    
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
  
  // 단권구매 팝업 구매하기 선택
  await page.waitForSelector('.lzModal--purchase');
  await page.getByRole('button', { name: '구매' }).click();
  
  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/payment?contentId=5414469958696960&redirect=%2Fko%2Fcomic%2Fold_photo%2F2%3Ffrom%3D5361238838673408%26to%3D5361238838673408&requiredCoin=3&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('3코인이 부족합니다. 코인을 충전해주세요!');
    
  // 브라우저 닫기
  await page.close();
});

test('정주행 이전화 코인부족 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1R。私のベッドに兄2人!?');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("10話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
    
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
    
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn.viewer__navBtn--next');
  
  // 단권구매 팝업 구매하기 선택
  await page.waitForSelector('.lzModal--purchase');
  await page.getByRole('button', { name: '購入' }).click();
  
  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/payment?contentId=5930649941966848&redirect=%2Fja%2Fcomic%2Foneroom%2F9%3Ffrom%3D6384012731088896%26to%3D6384012731088896&requiredCoin=68&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('65ポイントが足りません。ポイントをチャージしてください。');
    
  // 브라우저 닫기
  await page.close();
});

test('정주행 이전화 코인부족 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Doridosim');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 5000));
  const episodeSelector = '.episode__title:has-text("Season 1 Epilogue")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
    
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
    
  // 이전화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
  
  // 단권구매 팝업 구매하기 선택
  await page.waitForSelector('.lzModal--purchase');
  await page.getByRole('button', { name: 'Purchase' }).click();
  
  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhinus.com/en/payment?contentId=5807744170065920&redirect=%2Fen%2Fcomic%2Fdoridosim_en%2F58a%3Ffrom%3D6272919762239488%26to%3D6272919762239488&requiredCoin=30&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('You need 20 more Coins. Please purchase more Coins!');
    
  // 브라우저 닫기
  await page.close();
});

test('정주행 다음화 코인부족 ko', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.com/ko');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
      
  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '블로섬 데이즈');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 6000));
  const episodeSelector = '.episode__title:has-text("골든 로드(Golden Rod) 05")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
      
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
      
  // 다음화 버튼 클릭
  await page.click('.viewer__navBtn.viewer__navBtn--next');
  await page.waitForSelector('.lzSnackbar.lzSnackbar--on', { state: 'hidden' });
      
  // 작품구매 팝업 구매하기 선택
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: '구매' }).click();   

  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.com/ko/payment?contentId=5414469958696960&redirect=%2Fko%2Fcomic%2Fold_photo%2F2%3Ffrom%3D5361238838673408%26to%3D5361238838673408&requiredCoin=3&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('3코인이 부족합니다. 코인을 충전해주세요!');
    
  // 브라우저 닫기
  await page.close();
});

test('정주행 다음화 코인부족 ja', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhin.jp/ja');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_ja@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', '1R。私のベッドに兄2人!?');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 3000));
  const episodeSelector = '.episode__title:has-text("10話")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
      
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
      
  // 다음화 버튼 클릭
  await page.waitForLoadState('networkidle'); 
  await page.click('.viewer__navBtn--prev');
      
  // 작품구매 팝업 구매하기 선택
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: '購入' }).click();   

  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/payment?contentId=5930649941966848&redirect=%2Fja%2Fcomic%2Foneroom%2F9%3Ffrom%3D6384012731088896%26to%3D6384012731088896&requiredCoin=68&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('65ポイントが足りません。ポイントをチャージしてください。');
    
  // 브라우저 닫기
  await page.close();
});

test('정주행 다음화 코인부족 en', async ({ page }) => {
  // 레진 웹페이지로 이동 및 로그인
  await page.goto('https://q-www.lezhinus.com/en');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }
  const element = await page.waitForSelector('button.style_supportsItem__OIhu2.style_supportsItem__userMenu__a0S2I');
  await element.click();
  const loginButton = await page.waitForSelector('.style_emailLogin__Mguo_');
  await loginButton.click();
  await page.fill('input[type="email"]', 'ch_auto1_en@yopmail.com');
  await page.fill('input[type="password"]', 'qwer1234!@');
  await page.click('button[type="submit"]');
  try {
    const element = await page.waitForSelector('.style_lzBtn__tyLuS', { timeout: 1000 });
    await element.click();
    console.log('오늘 하루 안보기 버튼 클릭 성공');
  } catch (error) {
    console.log('오늘 하루 안보기 버튼이 없습니다. 계속 진행합니다.');
  }

  // 작품 검색
  await page.click('.style_supportsItem__search__ZPNGK');
  await page.type('.style_gnbSearch__input__KGtkv', 'Doridosim');
  await page.waitForTimeout(1000);
  await page.click('.style_gnbSearch__inputGotoDetail__VeIbG');
  await page.waitForSelector('.lzComic__item');
  const link = await page.waitForSelector('.lzComic__link');
  await link.click();
  await page.waitForTimeout(2000);
      
  // 특정 에피소드 선택
  await page.evaluate(() => window.scrollBy(0, 5000));
  const episodeSelector = '.episode__title:has-text("Season 1 Epilogue")';
  await page.waitForSelector(episodeSelector);
  await page.click(episodeSelector);
      
  // 정주행 버튼 클릭
  const watchAllButton = await page.waitForSelector('.vh__btn--lzpass');
  await watchAllButton.click();
  await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  const confirmButton = await page.waitForSelector('#confirm-lzpass-dialog button[aria-controls="confirm-lzpass-dialog"]');
  await confirmButton.click();
      
  // 다음화 버튼 클릭
  await page.click('.viewer__navBtn.viewer__navBtn--next');
  await page.waitForSelector('.lzSnackbar.lzSnackbar--on', { state: 'hidden' });
      
  // 작품구매 팝업 구매하기 선택
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Purchase' }).click();   

  // 코인 충전 페이지 URL 확인
  await page.waitForLoadState('networkidle');
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhinus.com/en/payment?contentId=5807744170065920&redirect=%2Fen%2Fcomic%2Fdoridosim_en%2F58a%3Ffrom%3D6272919762239488%26to%3D6272919762239488&requiredCoin=30&type=comic';
    
  // 코인 부족 메시지 확인
  await page.waitForSelector('.payment__requiredMsg');
  const coinShortageMsg = await page.$eval('.payment__requiredMsg', (element) => element.textContent);
  expect(coinShortageMsg).toContain('You need 20 more Coins. Please purchase more Coins!');
    
  // 브라우저 닫기
  await page.close();
});