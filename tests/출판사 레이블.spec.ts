import { test, expect } from '@playwright/test';

test('홈에서 접근 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');

  // "もっと見る" 버튼 클릭
  await page.click('section#comic_printed_ownership a.lzComic__more');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // 출판사|레이블 상세 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/artists?page=0';
  
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('단행본 페이지에서 접근 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
  await page.waitForLoadState('networkidle'); 

  // 출판사|레이블 상세 페이지 URL을 기대결과와 비교
  const currentURL = page.url();
  const expectedURL = 'https://q-www.lezhin.jp/ja/artists?page=0';
  
  expect(currentURL).toBe(expectedURL);

  // 브라우저 닫기
  await page.close();
});

test('출판사/레이블 타이틀 확인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "出版社・レーベル一覧" 타이틀이 페이지에 노출되는지 확인
  const titleText = await page.textContent('h2.ownerships__heading');
  const expectedTitle = '出版社・レーベル一覧';

  expect(titleText).toContain(expectedTitle);

  // 브라우저 닫기
  await page.close();
});

test('출판사/레이블 안내문구 확인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "出版社・レーベルは上段から検索可能です" 안내문구가 페이지에 노출되는지 확인
  const descriptionText = await page.textContent('p.ownerships__description');
  const expectedDescription = '出版社・レーベルは上段から検索可能です。';

  expect(descriptionText).toContain(expectedDescription);

  // 브라우저 닫기
  await page.close();
});

test('출판사/레이블 탭 노출 확인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // 출판사/레이블 탭이 노출되고 출판사 탭이 선택된 상태인지 확인
  const publisherTab = await page.waitForSelector('div#ownerships-tab-list button[data-tab="publisher"]');
  const labelTab = await page.waitForSelector('div#ownerships-tab-list button[data-tab="label"]');
  await page.waitForLoadState('networkidle'); 

  const isPublisherTabVisible = await publisherTab.isVisible();
  const isLabelTabVisible = await labelTab.isVisible();
  const isPublisherTabSelected = await publisherTab.getAttribute('aria-selected');
  const isLabelTabSelected = await labelTab.getAttribute('aria-selected');
  await page.waitForLoadState('networkidle'); 

  expect(isPublisherTabVisible).toBeTruthy();
  expect(isLabelTabVisible).toBeTruthy();
  expect(isPublisherTabSelected).toBe('true');
  expect(isLabelTabSelected).toBe(null); // "레이블" 탭이 선택되지 않았음을 확인합니다.

  // 브라우저 닫기
  await page.close();
});

test('레이블 탭 선택 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "레이블" 탭을 클릭하여 레이블 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="label"]');

  // 레이블 리스트가 나타날 때까지 대기
  const labelList = await page.waitForSelector('ul#ownerships-list');

  if (!labelList) {
    throw new Error("레이블 리스트를 찾을 수 없습니다.");
  }

  // 레이블 리스트가 노출되는지 확인
  const isLabelListVisible = await labelList.isVisible();
  expect(isLabelListVisible).toBeTruthy(); // 레이블 리스트가 노출되어야 함

  // 브라우저 닫기
  await page.close();
});

test('출판사 탭 선택 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "출판사" 탭을 클릭하여 출판사 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="publisher"]');

  // 출판사 리스트가 나타날 때까지 대기
  const publisherList = await page.waitForSelector('ul#ownerships-list');

  if (!publisherList) {
    throw new Error("출판사 리스트를 찾을 수 없습니다.");
  }

  // 출판사 리스트가 노출되는지 확인
  const isPublisherListVisible = await publisherList.isVisible();
  expect(isPublisherListVisible).toBeTruthy(); // 출판사 리스트가 노출되어야 함

  // 브라우저 닫기
  await page.close();
});

test('출판사 상세 페이지 이동 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
  await page.waitForLoadState('networkidle'); 

  // 출판사 리스트에서 FILL-IN 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("FILL-IN")');
  await page.waitForLoadState('networkidle'); 

  // FILL-IN 상세 페이지로 이동되었는지 확인
  const currentURL = page.url();
  expect(currentURL).toContain('https://q-www.lezhin.jp/ja/artist/fill_in?page=0');

  // "FILL-INの作品" 텍스트가 페이지에 노출되는지 확인
  const artistHeading = await page.textContent('h2#artist-heading');
  expect(artistHeading).toContain('FILL-INの作品');

  // 브라우저 닫기
  await page.close();
});

test('레이블 상세 페이지 이동 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
  await page.waitForLoadState('networkidle'); 

  // "레이블" 탭을 클릭하여 레이블 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="label"]');
  await page.waitForSelector('ul#ownerships-list'); // 레이블 리스트가 노출되길 기다림

  // 출판사 리스트에서 comico 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("comico")');
  await page.waitForLoadState('networkidle'); 

  // comico 상세 페이지로 이동되었는지 확인
  const currentURL = page.url();
  expect(currentURL).toContain('https://q-www.lezhin.jp/ja/artist/comico?page=0');

  // "comicoの作品" 텍스트가 페이지에 노출되는지 확인
  const artistHeading = await page.textContent('h2#artist-heading');
  expect(artistHeading).toContain('comicoの作品');

  // 브라우저 닫기
  await page.close();
});

test('성인/비성인 출판사 작품 구분_비성인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'メールアドレスでログイン' }).click();
  await page.getByLabel('メールアドレス').fill('ch_auto1_ja@yopmail.com');
  await page.getByLabel('パスワード').fill('qwer1234!@');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // 출판사 리스트에서 FILL-IN 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("FILL-IN")');
  await page.waitForLoadState('networkidle'); 
  await page.evaluate(() => window.scrollBy(0, 500));

  // 작품명 확인
  const workTitle = '24時からは悪魔の彼～オネエ天使とOLの同棲生活～';

  // 작품에 성인 블라인드 이미지가 노출되는지 확인
  const blindComicSelector = 'section.artistComic img[src="//ccdn.lezhin.com/files/assets/img/adult_square.png"]';

  // 해당 작품명이 포함된 성인 이미지가 노출되는지 여부 확인
  const isAdultImageVisible = await page.evaluate(
    ({ selector, title }) => {
      const images = Array.from(document.querySelectorAll(selector));
      for (const image of images) {
        const alt = image.getAttribute('alt');
        if (alt && alt.includes(title)) {
          return true;
        }
      }
      return false;
    },
    { selector: blindComicSelector, title: workTitle }
  );

  // 블라인드 이미지가 노출되는지 여부 확인
  expect(isAdultImageVisible).toBeTruthy();

  // 브라우저 닫기
  await page.close();
});

test('성인/비성인 출판사 작품 구분_성인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'メールアドレスでログイン' }).click();
  await page.getByLabel('メールアドレス').fill('ch_auto2_ja@yopmail.com');
  await page.getByLabel('パスワード').fill('qwer1234!@');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // 출판사 리스트에서 FILL-IN 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("FILL-IN")');
  await page.waitForLoadState('networkidle'); 
  await page.evaluate(() => window.scrollBy(0, 500));

  // 작품명 확인
  const workTitle = '24時からは悪魔の彼～オネエ天使とOLの同棲生活～';

  // 작품 썸네일 이미지가 노출되는지 확인
  const blindComicSelector = 'section.artistComic img[src="https://q-ccdn.lezhin.com/v2/comics/4531551787089920/images/square.jpg?updated=1677226094799&width=600"]';

  // 해당 작품명이 포함된 성인 이미지가 노출되는지 여부 확인
  const isAdultImageVisible = await page.evaluate(
    ({ selector, title }) => {
      const images = Array.from(document.querySelectorAll(selector));
      for (const image of images) {
        const alt = image.getAttribute('alt');
        if (alt && alt.includes(title)) {
          return true;
        }
      }
      return false;
    },
    { selector: blindComicSelector, title: workTitle }
  );

  // 썸네일 이미지 노출되는지 여부 확인
  expect(isAdultImageVisible).toBeTruthy();

  // 브라우저 닫기
  await page.close();
});

test('성인/비성인 레이블 작품 구분_비성인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'メールアドレスでログイン' }).click();
  await page.getByLabel('メールアドレス').fill('ch_auto1_ja@yopmail.com');
  await page.getByLabel('パスワード').fill('qwer1234!@');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "레이블" 탭을 클릭하여 레이블 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="label"]');
  await page.waitForSelector('ul#ownerships-list'); // 레이블 리스트가 노출되길 기다림

  // 레이블 리스트에서 comico 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("エロマンガ島")');
  await page.waitForLoadState('networkidle'); 
  // 작품명 확인
  const workTitle = '「拒否権なんてないんだよ」旦那の親友に寝取られる人妻';

  // 작품에 성인 블라인드 이미지가 노출되는지 확인
  const blindComicSelector = 'section.artistComic img[src="//ccdn.lezhin.com/files/assets/img/adult_square.png"]';

  // 해당 작품명이 포함된 성인 이미지가 노출되는지 여부 확인
  const isAdultImageVisible = await page.evaluate(
    ({ selector, title }) => {
      const images = Array.from(document.querySelectorAll(selector));
      for (const image of images) {
        const alt = image.getAttribute('alt');
        if (alt && alt.includes(title)) {
          return true;
        }
      }
      return false;
    },
    { selector: blindComicSelector, title: workTitle }
  );

  // 블라인드 이미지가 노출되는지 여부 확인
  expect(isAdultImageVisible).toBeTruthy();

  // 브라우저 닫기
  await page.close();
});

test('성인/비성인 레이블 작품 구분_성인 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('button', { name: 'アカウントメニュー' }).click();
  await page.getByRole('link', { name: 'メールアドレスでログイン' }).click();
  await page.getByLabel('メールアドレス').fill('ch_auto2_ja@yopmail.com');
  await page.getByLabel('パスワード').fill('qwer1234!@');
  await page.getByRole('button', { name: 'メールアドレスでログイン' }).click();
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
 /* await page.click('a.style_ownerShipList__detailLink__YoTEo');*/
  await page.waitForLoadState('networkidle'); 

  // "레이블" 탭을 클릭하여 레이블 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="label"]');
  await page.waitForSelector('ul#ownerships-list'); // 레이블 리스트가 노출되길 기다림

  // 레이블 리스트에서 comico 링크를 찾아 클릭
  await page.click('ul#ownerships-list a:has-text("エロマンガ島")');
  await page.waitForLoadState('networkidle'); 
  // 작품명 확인
  const workTitle = '「拒否権なんてないんだよ」旦那の親友に寝取られる人妻';

  // 작품에 성인 블라인드 이미지가 노출되는지 확인
  const blindComicSelector = 'section.artistComic img[src="https://q-ccdn.lezhin.com/v2/comics/6669944201478144/images/square.jpg?updated=1689227786590&width=600"]';

  // 해당 작품명이 포함된 성인 이미지가 노출되는지 여부 확인
  const isAdultImageVisible = await page.evaluate(
    ({ selector, title }) => {
      const images = Array.from(document.querySelectorAll(selector));
      for (const image of images) {
        const alt = image.getAttribute('alt');
        if (alt && alt.includes(title)) {
          return true;
        }
      }
      return false;
    },
    { selector: blindComicSelector, title: workTitle }
  );

  // 블라인드 이미지가 노출되는지 여부 확인
  expect(isAdultImageVisible).toBeTruthy();

  // 브라우저 닫기
  await page.close();
});

test('출판사 리스트 페이징 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
  await page.waitForLoadState('networkidle');

  // 출판사 리스트 요소 선택
  let ownershipsList;
  try {
    ownershipsList = await page.waitForSelector('ul#ownerships-list');
  } catch (error) {
    throw new Error("출판사 리스트를 찾을 수 없습니다.");
  }

  // 출판사 리스트가 노출되는지 확인
  const isOwnershipsListVisible = await ownershipsList.isVisible();
  expect(isOwnershipsListVisible).toBe(true);

  // 출판사 리스트 아이템 수 확인 (30개)
  const ownershipsListItems = await ownershipsList.$$eval('li.ownerships__item', items => items.length);
  expect(ownershipsListItems).toBe(30); // 출판사 리스트 아이템 수를 예상 값으로 설정

  // "다음 페이지" 버튼 클릭
  await page.click('button.lzNav__btn--next');
  await page.waitForTimeout(3000);

  // 페이징 숫자 '2'가 노출되는지 확인
  const secondPageNumber = await page.$eval('strong[aria-current="page"]', element => element.textContent);
  expect(secondPageNumber).toBe('2');

  // 출판사 리스트 요소 선택 (다음 페이지)
  const nextPageOwnershipsList = await page.$('ul#ownerships-list');

  if (!nextPageOwnershipsList) {
    throw new Error("다음 페이지의 출판사 리스트를 찾을 수 없습니다.");
  }

  // 다음 페이지에서 출판사 리스트 아이템 수 확인 (20개)
  const nextPageOwnershipsListItems = await nextPageOwnershipsList.$$eval('li.ownerships__item', items => items.length);
  expect(nextPageOwnershipsListItems).toBe(21); // 다음 페이지에서는 20개의 출판사 리스트 아이템이 노출되어야 함

  // 브라우저 닫기
  await page.close();
});

test('레이블 리스트 페이징 ja', async ({ page }) => {
  await page.goto('https://q-www.lezhin.jp/ja');
  await page.getByRole('link', { name: 'マンガ', exact: true }).click();

  // "もっと見る" 버튼 클릭
  await page.click('a.lzComic__more[href="/ja/artists?page=0"]');
  await page.waitForLoadState('networkidle');

  // "레이블" 탭을 클릭하여 레이블 리스트를 노출시킴
  await page.click('div#ownerships-tab-list button[data-tab="label"]');
  await page.waitForSelector('ul#ownerships-list'); // 레이블 리스트가 노출되길 기다림

  let ownershipsList;
  try {
    ownershipsList = await page.waitForSelector('ul#ownerships-list');
  } catch (error) {
    throw new Error("레이블 리스트를 찾을 수 없습니다.");
  }

  // 레이블 리스트가 노출되는지 확인
  const isOwnershipsListVisible = await ownershipsList.isVisible();
  expect(isOwnershipsListVisible).toBe(true);

  // 레이블 리스트 아이템 수 확인 (30개)
  const ownershipsListItems = await ownershipsList.$$eval('li.ownerships__item', items => items.length);
  expect(ownershipsListItems).toBe(30); // 레이블 리스트 아이템 수를 예상 값으로 설정

  // "다음 페이지" 버튼 클릭
  await page.click('button.lzNav__btn--next');
  await page.waitForTimeout(3000);

  // 페이징 숫자 '2'가 노출되는지 확인
  const secondPageNumber = await page.$eval('strong[aria-current="page"]', element => element.textContent);
  expect(secondPageNumber).toBe('2');

  // 레이블 리스트 아이템 수 확인 (30개)
  const ownershipsListItemsSecondPage = await ownershipsList.$$eval('li.ownerships__item', items => items.length);
  expect(ownershipsListItemsSecondPage).toBe(30);

  // "다음 페이지" 버튼 클릭
  await page.click('button.lzNav__btn--next');
  await page.waitForTimeout(3000);

  // '3'이 노출되는지 확인
  const thirdPageNumber = await page.$eval('strong[aria-current="page"]', element => element.textContent);
  expect(thirdPageNumber).toBe('3');

  // 레이블 리스트 아이템 수 확인 (13개)
  const ownershipsListItemsThirdPage = await page.$$eval('li.ownerships__item', items => items.length);
  expect(ownershipsListItemsThirdPage).toBe(13);

  // 브라우저 닫기
  await page.close();
});

