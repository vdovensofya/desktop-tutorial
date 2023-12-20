/*
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import 'regenerator-runtime';
import { url, dogovorComponents, urlScreens, patchlog, urlStage, urlBoy } from './others/config';
import {
  calcPublic,
  openQuaInvest, 
  calcInvect,
  calculatorAvto,
  openQuaAvto,
  delay } from './others/helpers';
import { writeFileSync } from 'fs';
import { SERVFAIL } from 'dns';
import { error, time } from 'console';
import { Int } from 'mssql';
import { urlTest } from './others/config';
const screenPath = './testing/__tests__/screenshot/';
let jsonResults = {};


describe('Проверка страниц на сайте "dobrozaim" ', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [`--mobile-size=480,853`, '--no-sandbox'],
      // slowMo: 250,
      defaultViewport: {
    
        width: 480,
        height: 853,
      },
    });
    page = await browser.newPage();
  });


  it('Проверка сайта "dobrozaim"', async () => {
    //   try {
  
    //   //Переход на страницу "dobrozaim"
    //   await page.goto(url, { waitUntil: 'load', timeout: 300000 });
    //   await delay(5000);
  
    //   //Проверка чек-бокса "В офисе"
    //   await page.waitForSelector('.sposob_polucheniya_btn._office');
    //   await page.click('.sposob_polucheniya_btn._office');
    //   await delay(3000);
  
    //   //Убедиться что нету кнопки ЕСИА
    //   await page.waitForSelector('.esia-auth-button', { visible: false });
    //   await delay(3000);
  
    //   //Переключить чек-бокс на "На карту"
    //   await page.waitForSelector('.sposob_polucheniya_btn._card');
    //   await page.click('.sposob_polucheniya_btn._card');
    //   await delay(3000);
  
    //   //Проверка калькулятора на 2к/30дн c отображением суммы
    //   await calcPublic(2000, 168, page);
    //   await delay(3000);
    //   const repayment1 = await page.waitForSelector('.block._vozvrat_block > .cont');
    //   const settlement1 = await repayment1.evaluate((el) => el.textContent);
    //   expect(settlement1.trim()).toBe('Платеж по 311 р.. Всего 12 платежей');
    //   await delay(3000);
  
    //   //Проверка калькулятора на 100к/350дн c отображением суммы
    //   await calcPublic(100000, 350, page);
    //   await delay(3000);
    //   const repayment2 = await page.waitForSelector('.block._vozvrat_block > .cont');
    //   const settlement2 = await repayment2.evaluate((el) => el.textContent);
    //   expect(settlement2.trim()).toBe('Платеж по 9 135 р.. Всего 25 платежей');
    //   await delay(3000);
  
    //   //Проверка калькулятора на 1к/4дн
    //   await calcPublic(1000, 4, page);
    //   await delay(3000);
  
    //   //Проверка калькулятора на 30к/30дн
    //   await calcPublic(30000, 30, page);
    //   await delay(3000);
  
    //   //Проверить переход в ЕСИА
    //   await page.waitForSelector('.esia-auth-button', { visible: true });
    //   await page.click('.esia-auth-button');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlESIA = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlESIA.includes('esia.gosuslugi.ru/login')) {
    //       console.log('Редирект произошел на страницу "/esia.gosuslugi.ru/login"');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(5000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
    //   //-----------------------------------Гиперсылки1-------------------------------------------------
    //   //Проверить переход на авторизацию
    //   await page.waitForSelector('a[href^="/auth/#w_referring_place=microloan_calculator"]');
    //   await page.click('a[href^="/auth/#w_referring_place=microloan_calculator"]');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlAuthorization = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlAuthorization.includes('auth/#w_referring_place=microloan_calculator')) {
    //       console.log('Редирект произошел на страницу "auth/#w_referring_place=microloan_calculator"');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
    //   //Проверить переход "В офисах"
    //   await page.waitForSelector('.cont > div:nth-child(4) > a[href^="/kontakty/"]');
    //   await page.click('.cont > div:nth-child(4) > a[href^="/kontakty/"]');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlОffice = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlОffice.includes('kontakty')) {
    //       console.log('kontakty');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //   //-----------------------------------Гиперсылки1-------------------------------------------------
  
    //   //---------------------Проверить присутвия кодов для установки МП--------------------------------
    //   //-- Google play
    //   await page.waitForSelector('.btn_block > a:nth-child(1) > img');
    //   // -- Nashstore
    //   await page.waitForSelector('.btn_block > a:nth-child(2) > img');
    //   // -- Appgallery
    //   await page.waitForSelector('.btn_block > a:nth-child(3) > img');
    //   // -- AppStore
    //   await page.waitForSelector('.btn_block > a:nth-child(4) > img');
    //   //-----------------------------------------------------------------------------------------------------
  
    //   //---------------------------------Блок из тарифов------------------------------------------------
    //    //Проверить переход на тариф под -------------- 0%
    //   const rateNull = await page.waitForSelector('.products-list > div:nth-child(2) > div:nth-child(4) > ._val');
    //   const nullRate = await rateNull.evaluate((el) => el.textContent);
    //   expect(nullRate.trim()).toBe('1 000 - 15 000 ₽');
    //   await delay(1000);
    //   await page.waitForSelector('div:nth-child(2) > .btn_line > .header__but.green');
    //   await page.click('div:nth-child(2) > .btn_line > .header__but.green');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlNull = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlNull.includes('/zaimy/bez-procentov/#w_referring_place=products')) {
    //       console.log('/zaimy/bez-procentov/#w_referring_place=products');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
    //   //Проверить переход на тариф -------------- 100к
    //   const rateMax = await page.waitForSelector('.products-list > div:nth-child(3) > div:nth-child(4) > ._val');
    //   const maxRate = await rateMax.evaluate((el) => el.textContent);
    //   expect(maxRate.trim()).toBe('1 000-100 000 ₽');
    //   await delay(1000);
    //   await page.waitForSelector('div:nth-child(3) > .btn_line > .header__but.green');
    //   await page.click('div:nth-child(3) > .btn_line > .header__but.green');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlMax = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlMax.includes('online')) {
    //       console.log('/online/');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
    //   //Проверить переход на тариф -------------- Автозалог
    //   const rateAvto = await page.waitForSelector('.products-list > div:nth-child(4) > div:nth-child(4) > ._val');
    //   const avtoRate = await rateAvto.evaluate((el) => el.textContent);
    //   expect(avtoRate.trim()).toBe('50 000 - 1 000 000 ₽');
    //   await delay(1000);
    //   await page.waitForSelector('div:nth-child(4) > .btn_line > .header__but.green');
    //   await page.click('div:nth-child(4) > .btn_line > .header__but.green');
    //   await delay(3000);
  
    //   //Получаем URL текущей страницы
    //   const redirectedUrlAvto = page.url();
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlAvto.includes('zaimy/dengi-pod-zalog-pts')) {
    //       console.log('zaimy/dengi-pod-zalog-pts');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //   //-----------------------------------------------------------------------------------------------------
  
    //   //Проверка кликабельного блока на переход
    //   await page.waitForSelector('._list > .item._sh.hv');
    //   await page.click('._list > .item._sh.hv');
    //   await delay(3000);
  
    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlMax.includes('/online/')) {
    //       console.log('/online/');
    //    } else {
    //       throw new Error('Падение Автотеста');
    //    };
    //    await delay(3000);
  
    //   //Вернуться на страницу "dobrozaim"
    //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
    //   //Проверка кликабельность кнопки "Получить деньги"
    //   await page.waitForSelector('.wrap > div:nth-child(3) > ._btn.go_calc');
    //   await page.click('.wrap > div:nth-child(3) > ._btn.go_calc');
    //   await delay(3000);
  
    //   // //Проверка открытия страницы на просмотр всех документов компаннии (!что-то не так)
    //   // await page.waitForSelector('.view_all.lazyloaded');
    //   // await page.click('a.view_all.lazyloaded');
    //   // await delay(3000);
  
    //     //JSON
    //     jsonResults.modWindowInvest = {
    //        result: 1,
    //        description: 'Проверка страницы "dobrozaim"',
    //     };
    //  } catch (e) {
    //     jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "dobrozaim"',
    //     };
    //     throw e;
    //  }
   });

   it('Проверка страницы "Автозалога" на сайте "dobrozaim"', async () => {
    //  try {

    //   //Указываем урл, не будет продолжать автотест пока страница не загрузиться
    //   await page.goto(url, { waitUntil: 'load', timeout: 300000 });

    //   // Переходим на страницу "Займ до 1мР."
    //   await page.waitForSelector('a[href^="/zaimy/dengi-pod-zalog-pts/"]');
    //   await page.click('a[href^="/zaimy/dengi-pod-zalog-pts/"]');

    //   // Получаем URL текущей страницы
    //   const redirectedUrlAvto = page.url();

    //   //Сравниваем текущую страницу с указанной
    //   if (redirectedUrlAvto.includes('/zaimy/dengi-pod-zalog-pts/')) {
    //       console.log('Редирект произошел на страницу "/zaimy/dengi-pod-zalog-pts/"');
    //      } else {
    //         throw new Error('Падение Автотеста');
    //     };
    //   await delay(3000);

    //   //Проверка калькулятора 50к/3мес
    //   await calculatorAvto(50000, 3, page);
    //   const infReturn1 = await page.waitForSelector('._vozvrat_block > .cont > .plateg')
    //   const returnInf1 = await infReturn1.evaluate((el) => el.textContent);
    //   expect(returnInf1.trim()).toBe('по 19 615.59 р. в месяц');
  
    //   //Проверка калькулятора 411к/15мес
    //   await calculatorAvto(411000, 15, page);
    //   const infReturn2 = await page.waitForSelector('._vozvrat_block > .cont > .plateg');
    //   const returnInf2 = await infReturn2.evaluate((el) => el.textContent);
    //   expect(returnInf2.trim()).toBe('по 49 820.14 р. в месяц');

    //   //Проверка калькулятора 810к/3мес
    //   await calculatorAvto(1000000, 24, page);
    //   const infReturn3 = await page.waitForSelector('._vozvrat_block > .cont > .plateg');
    //   const returnInf3 = await infReturn3.evaluate((el) => el.textContent);
    //   expect(returnInf3.trim()).toBe('по 99 856.24 р. в месяц');

    //   //Проверить переключение радио-кнопки
    //   await page.waitForSelector('.radio_div_cont > .radio_item.per');
    //   await page.click('.radio_div_cont > .radio_item.per');
    //   await delay(3000);

    //   //В условиях займа проверить переход на "Документы" и текст
    //   await page.waitForSelector('._info_tabs > div:nth-child(2)');
    //   await page.click('._info_tabs > div:nth-child(2)');
    //   await delay(3000);
    //   const infClient1 = await page.waitForSelector('div:nth-child(2) > ul > li:nth-child(1)');
    //   const clientInf1 = await infClient1.evaluate((el) => el.textContent);
    //   expect(clientInf1.trim()).toBe('Паспорт гражданина РФ;');
    //   const infClient2 = await page.waitForSelector('div:nth-child(2) > ul > li:nth-child(2)');
    //   const clientInf2 = await infClient2.evaluate((el) => el.textContent);
    //   expect(clientInf2.trim()).toBe('Свидетельство о регистрации автомобиля (СТС);');
    //   const infClient3 = await page.waitForSelector('div:nth-child(2) > ul > li:nth-child(3)');
    //   const clientInf3 = await infClient3.evaluate((el) => el.textContent);
    //   expect(clientInf3.trim()).toBe('Паспорт автомобиля (ПТС).');


    //   //В условиях займа проверить переход на "Автомобиль" и текст
    //   await page.waitForSelector('._info_tabs > div:nth-child(3)');
    //   await page.click('._info_tabs > div:nth-child(3)');
    //   await delay(6000);
    //   const infCar1 = await page.waitForSelector('div:nth-child(3) > ul > li:nth-child(1)');
    //   const carInf1 = await infCar1.evaluate((el) => el.textContent);
    //   expect(carInf1.trim()).toBe('Автомобиль зарегистрирован в РФ;');
    //   const infCar2 = await page.waitForSelector('div:nth-child(3) > ul > li:nth-child(2)');
    //   const carInf2 = await infCar2.evaluate((el) => el.textContent);
    //   expect(carInf2.trim()).toBe('Класс B – легковые автомобили, легкие грузовики, микроавтобусы любой страны-производителя;');
    //   const infCar3 = await page.waitForSelector('div:nth-child(3) > ul > li:nth-child(3)');
    //   const carInf3 = await infCar3.evaluate((el) => el.textContent);
    //   expect(carInf3.trim()).toBe('Автомобиль находится в исправном состоянии, небитый;');

    //   //Проверить текст "Требования к возрасту авто"
    //   const passengerCar1 = await page.waitForSelector('div:nth-child(3) > .block.age > ul:nth-child(3) > li:nth-child(1)');
    //   const carPassenger1 = await passengerCar1.evaluate((el) => el.textContent);
    //   expect(carPassenger1.trim()).toBe('Российские: новый клиент – до 10 лет (вкл.), постоянный клиент – до 15 лет (вкл.);');
    //   await delay(2000);
    //   const passengerCar2 = await page.waitForSelector('div:nth-child(3) > .block.age > ul:nth-child(3) > li:nth-child(2)');
    //   const carPassenger2 = await passengerCar2.evaluate((el) => el.textContent);
    //   expect(carPassenger2.trim()).toBe('Иностранные не китайские: новый клиент – до 15 лет (вкл.), постоянный клиент – до 20 лет (вкл.);');
    //   const passengerCar3 = await page.waitForSelector('div:nth-child(3) > .block.age > ul:nth-child(3) > li:nth-child(3)');
    //   const carPassenger3 = await passengerCar3.evaluate((el) => el.textContent);
    //   expect(carPassenger3.trim()).toBe('Китайские: новый и постоянный клиент – до 5 лет (вкл.).');
    //   const cargoCar = await page.waitForSelector('div:nth-child(3) > .block.age > ul:nth-child(5) > li:nth-child(1)');
    //   const carCargo = await cargoCar.evaluate((el) => el.textContent);
    //   expect(carCargo.trim()).toBe('Грузовые до 10 лет, вес – 3,5-7,5 т.');

    //   //Проверить в блок "3 шага до получения" переход наверх
    //   await page.waitForSelector('.wrap > .cont.gray_block > ._list > div:nth-child(1) > ._descr > .go_calc');
    //   await page.click('.wrap > .cont.gray_block > ._list > div:nth-child(1) > ._descr > .go_calc');
    //   await delay(2000);

    //   //Проверить блок "Вопросы и ответы" на открытии/закрытии вопросов
    //   await openQuaAvto(1, page);
    //   await delay(3000);
    //   await openQuaAvto(2, page);
    //   await delay(3000);
    //   await openQuaAvto(3, page);
    //   await delay(3000);
    //   await openQuaAvto(4, page);
    //   await delay(3000);
    //   await openQuaAvto(5, page);
    //   await delay(3000);
    //   await openQuaAvto(6, page);
    //   await delay(3000);
    //   await openQuaAvto(7, page);
    //   await delay(3000);
    //   await openQuaAvto(8, page);
    //   await delay(3000);
    //   await openQuaAvto(9, page);
    //   await delay(3000);
    //   await openQuaAvto(10, page);
    //   await delay(3000);
    //   await openQuaAvto(11, page);
    //   await delay(3000);

    //   //--------------------------Проверка блока "Остались вопросы?"--------------------------
    //   //Проверить вводимость номера
    //   await page.waitForSelector('body > .page_pts');
    //   await page.waitForSelector('.block.wopr.mgb > div:nth-child(1)');
    //   await page.type('input.na_phone', '+79991240000');
    //   await delay(2000);

    //   //Проверить кнопку отправить
    //   await page.waitForSelector('body > .page_pts');
    //   await page.waitForSelector('.block > button._btn.form__send');
    //   await page.click('button._btn.form__send');
    //   await delay(2000);

    //   //Закрыть модальное окно
    //   await page.waitForSelector('#msg_popup > .modal-dialog > .modal-content._sh > .close');
    //   await page.click('#msg_popup > .modal-dialog > .modal-content._sh > .close');
    //   await delay(2000); 
    //   //--------------------------Проверка блока "Остались вопросы?"--------------------------

    //   //Проверить открытие "Живая лента"
    //   await page.waitForSelector('.block.loan_on_card.mgb .wrap > .cont >.loan-item1');
    //   await page.click('.block.loan_on_card.mgb .wrap > .cont >.loan-item1');
    //   await delay(2000);
    //   await page.click('.block.loan_on_card.mgb .wrap > .cont >.loan-item1.open');
    //   await delay(2000);

    //   //Подняться наверх
    //   await page.waitForSelector('#totop_btn');
    //   await page.click('#totop_btn');
    //   await delay(2000);

    //   //----------------------------Отправить заявку займ Авто----------------------------
    //   //Вставить номер телефона в калькулятор
    //   await page.waitForSelector('#auto_phone');
    //   await page.type('input#auto_phone', '+79991240000');
    //   await delay(2000);

    //   //Перейти к оформлению
    //   await page.waitForSelector('.btn_block_btn > button');
    //   await page.click('.btn_block_btn > button');
    //   await delay(2000);

    //   //Заполнить данные клиента - фамилия
    //   await page.waitForSelector('#auto_name_f');
    //   await page.type('input#auto_name_f', 'Иванов');
    //   await delay(2000);

    //   //Заполнить данные клиента - имя
    //   await page.waitForSelector('#auto_name_i');
    //   await page.type('input#auto_name_i', 'Иван');
    //   await delay(2000);

    //   // //Заполнить данные клиента - отчество
    //   // await page.waitForSelector('#auto_name_o');
    //   // await page.type('input#auto_name_o', 'Иванович');
    //   // await delay(2000); 

    //   //Отправить данные клиента на подавление заявки
    //   await page.waitForSelector('.modal-footer > button');
    //   await page.click('.modal-footer > button');
    //   await delay(2000);
    //   //----------------------------Отправить заявку займ Авто----------------------------

    //   //JSON
    //      jsonResults.autoLoanStage = {
    //          result: 1,
    //          description: 'Проверка страницы "Автозалога" на сайте "site-test4.dobrozaim"',
    //      };
    //  } catch (e) {
    //      jsonResults.autoLoanStage = {
    //          result: 0,
    //          description: 'Проверка страницы "Автозалога" на сайте "site-test4.dobrozaim"',
    //      };
    //      throw e;
    //  }
  });
  
   it('Проверка страницы "Займ под 0%" на сайте "dobrozaim"', async () => {
      // try {
      //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
  
      //    //Переход на страницу "Займ под 0%" (через 'бургер')
      //    await page.waitForSelector('.header__menu-but');
      //    await page.click('.header__menu-but ');
      //    await delay(3000);
      //    await page.waitForSelector('div:nth-of-type(1) > .header__menu-link');
      //    await page.click('div:nth-of-type(1) > .header__menu-link');
      //    await delay(7000);
      //    await page.waitForSelector('.header__menu-sub-list.show-block > .pts_hover > .btn_line > .green.header__but');
      //    await page.click('.header__menu-sub-list.show-block > .pts_hover > .btn_line > .green.header__but');
      //    await delay(3000);
  
      //    //Получаем URL текущей страницы
      //    const redirectedUrlNoPersen = page.url();
  
      //    //Сравниваем текущую страницу с указанной
      //     if (redirectedUrlNoPersen.includes('zaimy/bez-procentov')) {
      //        console.log('Редирект произошел на страницу "zaimy/bez-procentov"');
      //     } else {
      //        throw new Error('Падение Автотеста');
      //     };
      //     await delay(3000);
  
      //    //Переход на калькулятор "Займ под 0%"
      //    await page.waitForSelector('.btn_block > ._btn');
      //    await page.click('.btn_block > ._btn ');
      //    await delay(3000);
  
      //    //Получаем URL текущей страницы
      //    const redirectedUrlNoPersen7 = page.url();
  
      //    //Сравниваем текущую страницу с указанной
      //     if (redirectedUrlNoPersen7.includes('online/?sum=15000&term=7')) {
      //        console.log('Редирект произошел на страницу "online/?sum=15000&term=7"');
      //     } else {
      //        throw new Error('Падение Автотеста');
      //     };
      //     await delay(3000);
  
      //    //Вернуться на страницу "dobrozaim"
      //    await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
      //    //--------------------------Блок проверки текста ответов на соотвествие--------------------------
      //    //Первый вопрос.  
      //    const oneQuaZero1 = await page.waitForSelector('div:nth-child(1) > .q_name.open');
      //    const zeroOneQua1 = await oneQuaZero1.evaluate((el) => el.textContent);
      //    expect(zeroOneQua1.trim()).toBe('Требуется ли хорошая кредитная история для оформления микрозайма под 0%?');
      //    const oneAnsZero1 = await page.waitForSelector('div:nth-child(1) > .a_text');
      //   //  const zeroOneAns1 = await oneAnsZero1.evaluate((el) => el.textContent);
      //   //  expect(zeroOneAns1.trim()).toBe('Микрозаймы под 0% выдаем при любой кредитной истории. Мы не даем под 0% взаймы абсолютно всем без отказа без проверки кредитной истории, ни в одной МФО (микрофинансовой организации) нет одобрения 100%. Заявки на микрокредиты под 0% с плохой кредитной историей рассматриваем на общих основаниях - без справок, поручителей, посредников. Если вы попали в черный список какой-либо кредитной организации, то это не значит, что вам будут отказывать остальные.');
      //    await delay(3000);
  
      //    //Второй вопрос.  
      //    const oneQuaZero2 = await page.waitForSelector('div:nth-child(2) > .q_name.open');
      //    const zeroOneQua2 = await oneQuaZero2.evaluate((el) => el.textContent);
      //    expect(zeroOneQua2.trim()).toBe('Можно ли получить займ под 0% без работы и без подтверждения дохода?');
      //    const oneAnsZero2 = await page.waitForSelector('div:nth-child(2) > .a_text');
      //   // const zeroOneAns2 = await oneAnsZero2.evaluate((el) => el.textContent);
      //   // expect(zeroOneAns2.trim()).toBe('Займ под 0% безработным и работающим неофициально выдается на общих условиях. Отсутствие официального трудоустройства (указание работы в трудовой книжке) может влиять на выдачу самых крупных займов - на 100000 рублей;');
      //    await delay(3000);
  
      //    //Третий вопрос.  
      //    const oneQuaZero3 = await page.waitForSelector('div:nth-child(3) > .q_name.open');
      //    const zeroOneQua3 = await oneQuaZero3.evaluate((el) => el.textContent);
      //    expect(zeroOneQua3.trim()).toBe('Какие документы нужны для получения микрокредита под 0%');
      //    const oneAnsZero3 = await page.waitForSelector('div:nth-child(3) > .a_text');
      //    const zeroOneAns3 = await oneAnsZero3.evaluate((el) => el.textContent);
      //    expect(zeroOneAns3.trim()).toBe('Для получения займа под 0% нужен только паспорт гражданина РФ (без СНИЛС, ИНН)');
      //    await delay(3000);
  
      //    //Четвертый вопрос.  
      //    const oneQuaZero4 = await page.waitForSelector('div:nth-child(4) > .q_name.open');
      //    const zeroOneQua4 = await oneQuaZero4.evaluate((el) => el.textContent);
      //    expect(zeroOneQua4.trim()).toBe('О беззалоговых микрокредитах Доброзайм');
      //    const oneAnsZero4 = await page.waitForSelector('tbody > tr:nth-child(2) > td:nth-child(2)');
      //    const zeroOneAns4 = await oneAnsZero4.evaluate((el) => el.textContent);
      //    expect(zeroOneAns4.trim()).toBe('24/7/365');
      //    await delay(3000);
  
      //    //Пятый вопрос.  
      //    const oneQuaZero5 = await page.waitForSelector('div:nth-child(5) > .q_name.open');
      //    const zeroOneQua5 = await oneQuaZero5.evaluate((el) => el.textContent);
      //    expect(zeroOneQua5.trim()).toBe('Каковы требования к карте для получения микрозайма под 0%?');
      //    const oneAnsZero5 = await page.waitForSelector('div:nth-child(5) > .a_text');
      //   //  const zeroOneAns5 = await oneAnsZero5.evaluate((el) => el.textContent);
      //   //  expect(zeroOneAns5.trim()).toBe('24/7/365');
      //    await delay(3000);
  
      //    //Шестой вопрос.  
      //    const oneQuaZero6 = await page.waitForSelector('div:nth-child(6) > .q_name.open');
      //    const zeroOneQua6 = await oneQuaZero6.evaluate((el) => el.textContent);
      //    expect(zeroOneQua6.trim()).toBe('Как получить займ под 0% без проверки кредитной истории и без отказа?');
      //    const oneAnsZero6 = await page.waitForSelector('div:nth-child(6) > .a_text');
      //   //  const zeroOneAns6 = await oneAnsZero6.evaluate((el) => el.textContent);
      //   //  expect(zeroOneAns6.trim()).toBe('Проверка кредитной истории есть в любой МФО. Считаете, что конкретно у вас совсем небольшая вероятность получить под 0% в МФО? Мы не даем взаймы абсолютно всем, ни в одной МФО (микрофинансовой организации) нет одобрения 100%, но шанс на положительное решение есть и с плохой КИ, обращайтесь!');
      //    await delay(3000);
  
      //    //Седьмой вопрос.  
      //    const oneQuaZero7 = await page.waitForSelector('div:nth-child(7) > .q_name.open');
      //    const zeroOneQua7 = await oneQuaZero7.evaluate((el) => el.textContent);
      //    expect(zeroOneQua7.trim()).toBe('Есть ли возможность продлить займ под 0%, если не успеваешь погасить вовремя?');
      //    const oneAnsZero7 = await page.waitForSelector('div:nth-child(7) > .a_text');
      //    const zeroOneAns7 = await oneAnsZero7.evaluate((el) => el.textContent);
      //    expect(zeroOneAns7.trim()).toBe('Да, пролонгацию микрокредита под 0% можно произвести в личном кабинете.');
      //    await delay(3000);
  
      //    //Восьмой вопрос. 
      //    const oneQuaZero8 = await page.waitForSelector('div:nth-child(8) > .q_name.open');
      //    const zeroOneQua8 = await oneQuaZero8.evaluate((el) => el.textContent);
      //    expect(zeroOneQua8.trim()).toBe('Займ под 0% должникам?');
      //    const oneAnsZero8 = await page.waitForSelector('div:nth-child(8) > .a_text');
      //    const zeroOneAns8 = await oneAnsZero8.evaluate((el) => el.textContent);
      //    expect(zeroOneAns8.trim()).toBe('Заявка на займ под 0% должникам рассматривается на общих основаниях. Если у вас даже далеко не один открытый займ с просрочками, то шансы на получение микрозайма под 0% все равно остаются.');
      //    await delay(3000);
      //    //--------------------------Блок проверки текста ответов на соотвествие--------------------------
        
      //    //Проверка инф. в крошках
      //    const kukiZero = await page.waitForSelector('#bx_967703615_255877');
      //    const zeroKuki = await kukiZero.evaluate((el) => el.textContent);
      //    expect(zeroKuki.trim()).toBe('ООО МФК «Саммит», ОГРН 1117746346244, Адрес: 123007, г. Москва, ш. Хорошёвское, д.35, корпус 1 каб. 20. https://dobrozaim.ru/. Условия предоставления займа: Возраст: 19-90 лет; Срок: 7 дн.; Сумма: 1-15 тыс. руб.; ПСК: 292,000% в год; Процент: 0,80% в день; Неустойка: 0,054% в день. В случае возврата суммы займа в срок либо ранее срока, предусмотренного индивидуальными условиями Договора потребительского займа (микрозайма), фактически начисленные проценты, подлежат списанию в полном размере. В случае нарушений Заемщиком обязательства по возврату суммы займа, проценты, указанные в индивидуальных условиях потребительского Займа, подлежат начислению с даты, следующей за датой заключения Договора потребительского займа (микрозайма) и до даты фактического исполнения Заемщиком обязательства по возвращению суммы займа и уплаты начисленных на эту сумму процентов. Порядок и условия получения займа уточняйте в офисах или на сайте компании. Компания оставляет за собой право отказать в выдаче займа.');
      //    await delay(3000);
  
      //    //JSON
      //    jsonResults.modWindowInvest = {
      //       result: 1,
      //       description: 'Проверка страницы "Займ под 0%" на сайте "dobrozaim',
      //    };
      // } catch (e) {
      //    jsonResults.modWindowInvest = {
      //       result: 0,
      //       description: 'Проверка страницы "Займ под 0%" на сайте "dobrozaim"',
      //    };
      //    throw e;
      // }
   });
  
   it('Проверка страницы "Как получить займ" на сайте "dobrozaim"', async () => {
      //  try {
      //   await page.goto(url, { waitUntil: 'load', timeout: 300000 });
  
      //    //Переход на страницу "Как получить займ" (через 'бургер')
      //    await page.waitForSelector('.header-flex-group > span.header__menu-but');
      //    await page.click('.header-flex-group > span.header__menu-but ');
      //    await delay(3000);
      //    await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(3) > a');
      //    await page.click('.header__menu.show-flex > div:nth-of-type(3) > a');
      //    await delay(7000);
   
      //    //Получаем URL текущей страницы
      //    const redirectedUrlHowZaim = page.url();
   
      //    //Сравниваем текущую страницу с указанной
      //    if (redirectedUrlHowZaim.includes('kak-poluchit-zaim')) {
      //      console.log('Редирект произошел на страницу "kak-poluchit-zaim"');
      //    } else {
      //     throw new Error('Падение Автотеста');
      //     };
      //    await delay(3000);
  
      //   //--------------------------проверка блока "Получить 100к.р уже сегодня"--------------------------
      //   //Проверка присутсвия блока с "Заполните заявку на займ"
      //   await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(2)');
      //   await page.waitForSelector('div:nth-of-type(2) > ._name > a[href^="/online/"]');
      //   await page.click('div:nth-of-type(2) > ._name > a[href^="/online/"]');
      //   await delay(3000);
  
      //   //Получаем URL текущей страницы
      //   const redirectedUrlHundred = page.url();
   
      //   //Сравниваем текущую страницу с указанной
      //   if (redirectedUrlHundred.includes('online')) {
      //     console.log('Редирект произошел на страницу "online"');
      //   } else {
      //    throw new Error('Падение Автотеста');
      //    };
      //   await delay(3000);
  
      //   //Вернуться на страницу "dobrozaim"
      //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
      //   //Проверка присутсвия блока с "Узнать решение"
      //   await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(3)');
      //   await delay(3000);
  
      //   //Проверка присутсвия блока с "Получить деньги"
      //   await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(4)');
      //   await delay(3000);
  
      //   //Проверить переход в блоке "Получить деньги" -> "В офисах"
      //   await page.waitForSelector('.cont > div:nth-of-type(4) > div:nth-child(2) > a[href^="/kontakty/"]');
      //   await page.click('.cont > div:nth-of-type(4) > div:nth-child(2) > a[href^="/kontakty/"]');
      //   await delay(3000);
  
      //   //Получаем URL текущей страницы
      //   const redirectedUrlОffice = page.url();
  
      //   //Сравниваем текущую страницу с указанной
      //   if (redirectedUrlОffice.includes('kontakty')) {
      //    console.log('kontakty');
      //   } else {
      //    throw new Error('Падение Автотеста');
      //   };
      //   await delay(3000);
  
      //   //Вернуться на страницу "dobrozaim"
      //   await page.goBack({ waitUntil: 'load', timeout: 300000 });
      //   //-----------------------------------------------------------------------------------------------------
  
      //   //--------------------------Проверить присутвия кодов для установки МП--------------------------------
      //   // -- AppStore
      //   await page.waitForSelector('.block.cont._sh > .btn_block > a:nth-child(1)');
      //   await page.waitForSelector('.btn_block > a:nth-child(1) > img');
      //   await delay(3000);
      //   //-- Google play
      //   await page.waitForSelector('.block.cont._sh > .btn_block > a:nth-child(2)');
      //   await page.waitForSelector('.btn_block > a:nth-child(2) > img');
      //   await delay(3000);
      //   //-- Appgallery
      //   await page.waitForSelector('.block.cont._sh > .btn_block > a:nth-child(3)');
      //   await page.waitForSelector('.btn_block > a:nth-child(3) > img');
      //   await delay(3000);
      //   //-- Nashstore
      //   await page.waitForSelector('.block.cont._sh > .btn_block > a:nth-child(4)');
      //   await page.waitForSelector('.btn_block > a:nth-child(4) > img');
      //   await delay(3000);
      //   //-----------------------------------------------------------------------------------------------------

      //   //Проверить актуальность номера Открытых Линий
      //   await page.waitForSelector('.block.cont.sect_pdt > .btn_block > a[href^="tel:88007752545');
      //   await delay(3000);

      // //   //Проверить присутствия картинки с паспортом
      // //   await page.waitForSelector('img.ls-is-cached.lazyloaded');
      // //   await delay(3000);

      //   // Проверить кнопку "Написать в чат" и выход вариантов Чата
      //   async function pressButton(page) {
      //     const button1 = await page.waitForSelector('.item.show_open_line');
      //     if (button1) {
      //       await button1.click('.item.show_open_line');
      //     } else {
      //       const button2 = await page.waitForSelector('.anim');
      //       if (button2) {
      //          await button2.click('.anim');
      //       } else {
      //         console.log('Ни одна из кнопок не нажата');
      //       }
      //     }
      //   }

      // //   const response = await page.waitForResponse(url => url.includes('api/data', { timeout: 5000 }));
      // //   if (response.status() === 200) {
      // //   const data = await response.json();
      //   // дальнейшие действия с полученными данными
      // //   } else {
      // //   throw new Error('Ошибка запроса к серверу');
      // //   }
      //   //Источник: https://internet-34.ru/kak-ispolzovat-pagewaitforresponse-v-playwright

      //   //JSON
      //   jsonResults.modWindowInvest = {
      //     result: 1,
      //     description: 'Проверка страницы "Как получить займ" на сайте "dobrozaim',
      //    };
      //    } catch (e) {
      //    jsonResults.modWindowInvest = {
      //      result: 0,
      //      description: 'Проверка страницы "Как получить займ" на сайте "dobrozaim"',
      //    };
      //   throw e;
      //   }
   });

   it('Проверка страницы "Как оплатить" -> "Таблица способов оплаты" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "Как оплатить" -> "Таблица способов оплаты" (через 'бургер')
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(7000);
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(1) > a');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(1) > a');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlPaymentTable = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlPaymentTable.includes('sposoby-oplaty')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty"');
    //       };
    //     await delay(3000);

    //     //Нажать на кнопку "Для крыма"
    //     await page.waitForSelector('.how-pay__term-slider > div:nth-child(2) > .how-pay__term-title');
    //     await page.click('.how-pay__term-slider > div:nth-child(2) > .how-pay__term-title');
    //     await delay(3000);

    //     //Вернуться в раздел "Для всех регионов"
    //     await page.waitForSelector('.how-pay__term-slider > div:nth-child(1) > .how-pay__term-title');
    //     await page.click('.how-pay__term-slider > div:nth-child(1) > .how-pay__term-title');
    //     await delay(3000);

    //     //--------------------------проверка блока "Для всех регионов"--------------------------
    //     //Проверка оплаты -------> "В офисе компании"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(1) > a[href^="/sposoby-oplaty/ofisy-kompanii/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(1) > a[href^="/sposoby-oplaty/ofisy-kompanii/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(1) > a[href^="/sposoby-oplaty/ofisy-kompanii/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlOfisyKompanii = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlOfisyKompanii.includes('sposoby-oplaty/ofisy-kompanii')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/ofisy-kompanii"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/ofisy-kompanii"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "Онлайн оплата"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(2) > a[href^="/sposoby-oplaty/online/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(2) > a[href^="/sposoby-oplaty/online/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(2) > a[href^="/sposoby-oplaty/online/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlOnline = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlOnline.includes('sposoby-oplaty/online')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/online"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/online"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "Через приложение"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(3) > a[href^="/sposoby-oplaty/cherez-prilozhenie/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(3) > a[href^="/sposoby-oplaty/cherez-prilozhenie/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(3) > a[href^="/sposoby-oplaty/cherez-prilozhenie/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlCherezPrilozhenie = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlCherezPrilozhenie.includes('sposoby-oplaty/cherez-prilozhenie')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/cherez-prilozhenie"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/cherez-prilozhenie"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "Почта России"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(4) > a[href^="/sposoby-oplaty/pochta-rossii/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(4) > a[href^="/sposoby-oplaty/pochta-rossii/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(4) > a[href^="/sposoby-oplaty/pochta-rossii/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlPochtaRossii = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlPochtaRossii.includes('sposoby-oplaty/pochta-rossii')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/pochta-rossii"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/pochta-rossii"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "В отделениях любого банка"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(5) > a[href^="/sposoby-oplaty/v-otdeleniyah-lyubogo-banka/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(5) > a[href^="/sposoby-oplaty/v-otdeleniyah-lyubogo-banka/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(5) > a[href^="/sposoby-oplaty/v-otdeleniyah-lyubogo-banka/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlOtdelBank = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlOtdelBank.includes('sposoby-oplaty/v-otdeleniyah-lyubogo-banka')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/v-otdeleniyah-lyubogo-banka"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/v-otdeleniyah-lyubogo-banka"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "Через интернет-банк"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(6) > a[href^="/sposoby-oplaty/internet-bank/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(6) > a[href^="/sposoby-oplaty/internet-bank/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(6) > a[href^="/sposoby-oplaty/internet-bank/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlInterBank = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlInterBank.includes('sposoby-oplaty/internet-bank')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/internet-bank"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/internet-bank"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //    //--------------------------
    //     //Проверка оплаты -------> "Через QIWI-кошелек"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(7) > a[href^="/sposoby-oplaty/qiwi-koshelek/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(7) > a[href^="/sposoby-oplaty/qiwi-koshelek/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(7) > a[href^="/sposoby-oplaty/qiwi-koshelek/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlQiwiKoshelek = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlQiwiKoshelek.includes('sposoby-oplaty/qiwi-koshelek')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/qiwi-koshelek"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/qiwi-koshelek"');
    //       };
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //     //--------------------------
    //     //Проверка оплаты -------> "Через терминалы QIWI"
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(8) > a[href^="/sposoby-oplaty/terminaly-qiwi/"] > div:nth-child(1) > img');
    //     await page.waitForSelector('.how-pay__term-list-desctop.active > li:nth-child(8) > a[href^="/sposoby-oplaty/terminaly-qiwi/"] > div:nth-child(1)');
    //     await page.click('.how-pay__term-list-desctop.active > li:nth-child(8) > a[href^="/sposoby-oplaty/terminaly-qiwi/"] > div:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlTerminalQiwi = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlTerminalQiwi.includes('sposoby-oplaty/terminaly-qiwi')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/terminaly-qiwi"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/terminaly-qiwi"');
    //       };
    //     await delay(3000);

    //    //Вернуться на страницу "sposoby-oplaty"
    //    await page.goBack({ waitUntil: 'load', timeout: 300000 });
    //    // -----------------------------------------------------------------------------------------------------
       
    //    //--------------------------Проверка блока "Остались вопросы?"--------------------------
    //     //Снять галочку о согласие персональных данных
    //     await page.waitForSelector('.chbx_item.check.agree');
    //     await page.click('.chbx_item.check.agree');
    //     await delay(3000);
      
    //    //Открыть согласие о персональных данных
    //     await page.waitForSelector('.link.n_pers_d');
    //     await page.click('.link.n_pers_d');
    //     await delay(3000);
        
    //     //Закрыть согласие о персональных данных
    //     await page.waitForSelector('#notice1_popup > .modal-dialog > .modal-content._sh > .modal-footer > .btn.cancel');
    //     await page.click('#notice1_popup > .modal-dialog > .modal-content._sh > .modal-footer > .btn.cancel');
    //     await delay(3000);

    //     //Согласится с персональными данными
    //     await page.waitForSelector('.chbx_item.agree');
    //     await page.click('.chbx_item.agree');
    //     await delay(3000);

    //     //Заполнение данных клиента
    //     //---ФИО---
    //   //   await page.waitForSelector('.data_block._50.pr10 > .field > input');
    //   //   await page.type('.data_block._50.pr10 > .field > input', 'Автотест');
    //     //---Телефон--
    //     await page.waitForSelector('._l > div:nth-child(2) > .field > input');
    //     await page.type('._l > div:nth-child(2) > .field > input', '+7(999)999-99-99');
    //     await delay(1000);

    //     //Отправить заявку на вопрос
    //     await page.waitForSelector('._r > ._btn.form__send');
    //     await page.click('._r > ._btn.form__send');
    //     await delay(3000);
    //    // -----------------------------------------------------------------------------------------------------
    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Таблица способов оплаты" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Таблица способов оплаты" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
   });
  
   it('Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "В офисе компании" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "Моментальное зачисление"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await delay(5000);
    //     //---Нажать "В офисе компании"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(1)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(1)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlOfisyKompanii = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlOfisyKompanii.includes('ofisy-kompanii')) {
    //        console.log('Редирект произошел на страницу "ofisy-kompanii"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty"');
    //       };
    //     await delay(3000);

    //    //--------------------------Проверка соответствие геолокации в офисах "Москвы"--------------------------
    //    //---Москва, ул. Перерва, 43---
    //     const selectorMos1 = 'div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //     await page.waitForSelector(selectorMos1);
    //     const geolocationMos1 = await page.$eval(selectorMos1, (elementMos1) => {
    //       const latitudeMos1 = elementMos1.getAttribute('latitude');
    //       const longitudeMos1 = elementMos1.getAttribute('longtitude');
    //       return { latitudeMos1, longitudeMos1 };
    //     });
    //     //---Сравниваем геолокацию --Москва, ул. Перерва, 43
    //     if (geolocationMos1.latitudeMos1 === '55.659622' && geolocationMos1.longitudeMos1 === '37.747738') {
    //       console.log('Совпадает - Москва, ул. Перерва, 43');
    //     } else {
    //       throw new Error('НЕ Совпадает - Москва, ул. Перерва, 43');
    //     }
    //     await delay(2000);

    //     //---Москва, ул. Марксистская, 10/1---
    //     const selectorMos2 = 'div:nth-child(2) > .addr_cont > .addr > .print_btn';
    //     await page.waitForSelector(selectorMos2);
    //     const geolocationMos2 = await page.$eval(selectorMos2, (elementMos2) => {
    //       const latitudeMos2 = elementMos2.getAttribute('latitude');
    //       const longitudeMos2 = elementMos2.getAttribute('longtitude');
    //       return { latitudeMos2, longitudeMos2 };
    //     });
    //     //---Сравниваем геолокацию --Москва, ул. Марксистская, 10/1
    //     if (geolocationMos2.latitudeMos2 === '55.739611009562' && geolocationMos2.longitudeMos2 === '37.656937977798') {
    //       console.log('Совпадает - Москва, ул. Марксистская, 10/1');
    //     } else {
    //       throw new Error('НЕ Совпадает - Москва, ул. Марксистская, 10/1');
    //     }
    //     await delay(2000);

    //    //---Москва, Хорошевское ш., 35/1---
    //     const selectorMos3 = 'div:nth-child(3) > .addr_cont > .addr > .print_btn';
    //     await page.waitForSelector(selectorMos3);
    //     const geolocationMos3 = await page.$eval(selectorMos3, (elementMos3) => {
    //       const latitudeMos3 = elementMos3.getAttribute('latitude');
    //       const longitudeMos3 = elementMos3.getAttribute('longtitude');
    //       return { latitudeMos3, longitudeMos3 };
    //     });
    //     //---Сравниваем геолокацию --Москва, Хорошевское ш., 35/1
    //     if (geolocationMos3.latitudeMos3 === '55.777456280746' && geolocationMos3.longitudeMos3 === '37.521951503272') {
    //       console.log('Совпадает - Москва, Хорошевское ш., 35/1');
    //     } else {
    //       throw new Error('НЕ Совпадает - Москва, Хорошевское ш., 35/1');
    //     }
    //     await delay(2000);

    //    //---Москва, Старомонетный пер., 14/2---
    //     const selectorMos4 = 'div:nth-child(4) > .addr_cont > .addr > .print_btn';
    //     await page.waitForSelector(selectorMos4);
    //     const geolocationMos4 = await page.$eval(selectorMos4, (elementMos4) => {
    //       const latitudeMos4 = elementMos4.getAttribute('latitude');
    //       const longitudeMos4 = elementMos4.getAttribute('longtitude');
    //       return { latitudeMos4, longitudeMos4 };
    //     });
    //     //---Сравниваем геолокацию --Москва, Старомонетный пер., 14/2
    //     if (geolocationMos4.latitudeMos4 === '55.7400' && geolocationMos4.longitudeMos4 === '37.6182') {
    //       console.log('Совпадает - Москва, Старомонетный пер., 14/2');
    //     } else {
    //       throw new Error('НЕ Совпадает - Москва, Старомонетный пер., 14/2');
    //     }
    //     await delay(2000);

    //    //---Москва, пр-т Вернадского, 39---
    //     const selectorMos5 = 'div:nth-child(5) > .addr_cont > .addr > .print_btn';
    //     await page.waitForSelector(selectorMos5);
    //     const geolocationMos5 = await page.$eval(selectorMos5, (elementMos5) => {
    //       const latitudeMos5 = elementMos5.getAttribute('latitude');
    //       const longitudeMos5 = elementMos5.getAttribute('longtitude');
    //       return { latitudeMos5, longitudeMos5 };
    //     });
    //     //---Сравниваем геолокацию --Москва, пр-т Вернадского, 39
    //     if (geolocationMos5.latitudeMos5 === '55.67559' && geolocationMos5.longitudeMos5 === '37.506038') {
    //       console.log('Совпадает - Москва, пр-т Вернадского, 39');
    //     } else {
    //       throw new Error('НЕ Совпадает - Москва, пр-т Вернадского, 39');
    //     }
    //     await delay(2000);
        
    //    //---Москва, Семеновский пер., 15---
    //    const selectorMos6 = 'div:nth-child(6) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorMos6);
    //    const geolocationMos6 = await page.$eval(selectorMos6, (elementMos6) => {
    //      const latitudeMos6 = elementMos6.getAttribute('latitude');
    //      const longitudeMos6 = elementMos6.getAttribute('longtitude');
    //      return { latitudeMos6, longitudeMos6 };
    //    });
    //    //---Сравниваем геолокацию --Москва, Семеновский пер., 15
    //    if (geolocationMos6.latitudeMos6 === '55.782927' && geolocationMos6.longitudeMos6 === '37.715911') {
    //      console.log('Совпадает - Москва, Семеновский пер., 15');
    //    } else {
    //      throw new Error('НЕ Совпадает - Москва, Семеновский пер., 15');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------
       
    //    //Переключится на Московскую Область(МО)
    //    //---Нажать офисы  
    //     await page.waitForSelector('.region_input');
    //     await page.click('.region_input');
    //     await delay(2000);
    //    //---Нажать на МО 
    //     await page.waitForSelector('.region_list > div:nth-child(2)');
    //     await page.click('.region_list > div:nth-child(2)');
    //     await delay(2000);
    //     //--------------------------Проверка соответствие геолокации в офисах "Московской Области(МО)"--------------------------
    //    //---МО-Зеленоград, ул. Новокрюковская, 7---
    //    const selectorMosObl1 = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorMosObl1);
    //    const geolocatioMosObl1 = await page.$eval(selectorMosObl1, (elementMosObl1) => {
    //      const latitudeMosObl1 = elementMosObl1.getAttribute('latitude');
    //      const longitudeMosObl1 = elementMosObl1.getAttribute('longtitude');
    //      return { latitudeMosObl1, longitudeMosObl1 };
    //    });
    //    //---Сравниваем геолокацию --Зеленоград, ул. Новокрюковская, 7
    //    if (geolocatioMosObl1.latitudeMosObl1 === '55.980674' && geolocatioMosObl1.longitudeMosObl1 === '37.171244') {
    //      console.log('Совпадает - МО-Зеленоград, ул. Новокрюковская, 7');
    //    } else {
    //      throw new Error('НЕ Совпадает - МО-Зеленоград, ул. Новокрюковская, 7');
    //    }
    //    await delay(2000);

    //    //---МО-Люберцы, ул. Инициативная, 14, строение 1---
    //    const selectorMosObl2 = '.act.sect_item > div:nth-child(2) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorMosObl2);
    //    const geolocatioMosObl2 = await page.$eval(selectorMosObl2, (elementMosObl2) => {
    //      const latitudeMosObl2 = elementMosObl2.getAttribute('latitude');
    //      const longitudeMosObl2 = elementMosObl2.getAttribute('longtitude');
    //      return { latitudeMosObl2, longitudeMosObl2 };
    //    });
    //    //---Сравниваем геолокацию --Зеленоград, ул. Новокрюковская, 7
    //    if (geolocatioMosObl2.latitudeMosObl2 === '55.6830' && geolocatioMosObl2.longitudeMosObl2 === '37.8975') {
    //      console.log('Совпадает - МО-Люберцы, ул. Инициативная, 14, строение 1');
    //    } else {
    //      throw new Error('НЕ Совпадает - МО-Люберцы, ул. Инициативная, 14, строение 1');
    //    }
    //    await delay(2000);

    //    //---МО-Одинцово, ул. Советская, 9---
    //    const selectorMosObl3 = '.act.sect_item > div:nth-child(3) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorMosObl3);
    //    const geolocatioMosObl3 = await page.$eval(selectorMosObl3, (elementMosObl3) => {
    //      const latitudeMosObl3 = elementMosObl3.getAttribute('latitude');
    //      const longitudeMosObl3 = elementMosObl3.getAttribute('longtitude');
    //      return { latitudeMosObl3, longitudeMosObl3 };
    //    });
    //    //---Сравниваем геолокацию --Одинцово, ул. Советская, 9
    //    if (geolocatioMosObl3.latitudeMosObl3 === '55.6734' && geolocatioMosObl3.longitudeMosObl3 === '37.2770') {
    //      console.log('Совпадает - МО-Одинцово, ул. Советская, 9');
    //    } else {
    //      throw new Error('НЕ Совпадает - МО-Одинцово, ул. Советская, 9');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------
       
    //    //--------------------------Проверка соответствие геолокации в офисах "Санкт-Петербург(СП)"--------------------------
    //    //Переключится на Санкт-Петербург(СП)
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на СП 
    //    await page.waitForSelector('.region_list > div:nth-child(3)');
    //    await page.click('.region_list > div:nth-child(3)');
    //    await delay(2000);

    //    //---Санкт-Петербург, ул. Ефимова, 4А---
    //    const selectorSanPet = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorSanPet);
    //    const geolocatioSanPet = await page.$eval(selectorSanPet, (elementSanPet) => {
    //      const latitudeSanPet = elementSanPet.getAttribute('latitude');
    //      const longitudeSanPet = elementSanPet.getAttribute('longtitude');
    //      return { latitudeSanPet, longitudeSanPet };
    //    });
    //    //---Сравниваем геолокацию --Зеленоград, ул. Новокрюковская, 7
    //    if (geolocatioSanPet.latitudeSanPet === '59.9254' && geolocatioSanPet.longitudeSanPet === '30.3219') {
    //      console.log('Совпадает - Санкт-Петербург, ул. Ефимова, 4А');
    //    } else {
    //      throw new Error('НЕ Совпадает - Санкт-Петербург, ул. Ефимова, 4А');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Астрахань"--------------------------
    //    //Переключится на Астрахань
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Астрахань 
    //    await page.waitForSelector('.region_list > div:nth-child(4)');
    //    await page.click('.region_list > div:nth-child(4)');
    //    await delay(2000);

    //    //---Астрахань, ул. Победы, 51---
    //    const selectorAstra = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorAstra);
    //    const geolocatioAstra = await page.$eval(selectorAstra, (elementAstra) => {
    //      const latitudeAstra = elementAstra.getAttribute('latitude');
    //      const longitudeAstra = elementAstra.getAttribute('longtitude');
    //      return { latitudeAstra, longitudeAstra };
    //    });
    //    //---Сравниваем геолокацию --Астрахань, ул. Победы, 51
    //    if (geolocatioAstra.latitudeAstra === '46.3530' && geolocatioAstra.longitudeAstra === '48.0568') {
    //      console.log('Совпадает - Астрахань, ул. Победы, 51');
    //    } else {
    //      throw new Error('НЕ Совпадает - Астрахань, ул. Победы, 51');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Екатеринбург"--------------------------
    //    //Переключится на Екатеринбург
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Екатеринбург 
    //    await page.waitForSelector('.region_list > div:nth-child(5)');
    //    await page.click('.region_list > div:nth-child(5)');
    //    await delay(2000);

    //    //---Екатеринбург, ул. 8 Марта, 149---
    //    const selectorEkat = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorEkat);
    //    const geolocatioEkat = await page.$eval(selectorEkat, (elementEkat) => {
    //      const latitudeEkat = elementEkat.getAttribute('latitude');
    //      const longitudeEkat = elementEkat.getAttribute('longtitude');
    //      return { latitudeEkat, longitudeEkat };
    //    });
    //    //---Сравниваем геолокацию --Екатеринбург, ул. 8 Марта, 149
    //    if (geolocatioEkat.latitudeEkat === '56.8069' && geolocatioEkat.longitudeEkat === '60.6123') {
    //      console.log('Совпадает - Екатеринбург, ул. 8 Марта, 149');
    //    } else {
    //      throw new Error('НЕ Совпадает - Екатеринбург, ул. 8 Марта, 149');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Нижний Новгород"--------------------------
    //    //Переключится на Нижний Новгород
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Нижний Новгород 
    //    await page.waitForSelector('.region_list > div:nth-child(6)');
    //    await page.click('.region_list > div:nth-child(6)');
    //    await delay(2000);

    //    //---Нижний Новгород, ул. Гордеевская, 7---
    //    const selectorNig_Nov = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorNig_Nov);
    //    const geolocatioNig_Nov = await page.$eval(selectorNig_Nov, (elementNig_Nov) => {
    //      const latitudeNig_Nov = elementNig_Nov.getAttribute('latitude');
    //      const longitudeNig_Nov = elementNig_Nov.getAttribute('longtitude');
    //      return { latitudeNig_Nov, longitudeNig_Nov };
    //    });
    //    //---Сравниваем геолокацию --Нижний Новгород, ул. Гордеевская, 7
    //    if (geolocatioNig_Nov.latitudeNig_Nov === '56.3252' && geolocatioNig_Nov.longitudeNig_Nov === '43.9460') {
    //      console.log('Совпадает - Нижний Новгород, ул. Гордеевская, 7');
    //    } else {
    //      throw new Error('НЕ Совпадает - Нижний Новгород, ул. Гордеевская, 7');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Ростов-на-Дону"--------------------------
    //    //Переключится на Ростов-на-Дону
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Ростов-на-Дону 
    //    await page.waitForSelector('.region_list > div:nth-child(7)');
    //    await page.click('.region_list > div:nth-child(7)');
    //    await delay(2000);

    //    //---Ростов-на-Дону, ул. Социалистическая, 88---
    //    const selectorRostov_Na_Dony = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorRostov_Na_Dony);
    //    const geolocatioRostov_Na_Dony = await page.$eval(selectorRostov_Na_Dony, (elementRostov_Na_Dony) => {
    //      const latitudeRostov_Na_Dony = elementRostov_Na_Dony.getAttribute('latitude');
    //      const longitudeRostov_Na_Dony = elementRostov_Na_Dony.getAttribute('longtitude');
    //      return { latitudeRostov_Na_Dony, longitudeRostov_Na_Dony };
    //    });
    //    //---Сравниваем геолокацию --Ростов-на-Дону, ул. Социалистическая, 88
    //    if (geolocatioRostov_Na_Dony.latitudeRostov_Na_Dony === '47.2202' && geolocatioRostov_Na_Dony.longitudeRostov_Na_Dony === '39.7154') {
    //      console.log('Совпадает - Ростов-на-Дону, ул. Социалистическая, 88');
    //    } else {
    //      throw new Error('НЕ Совпадает - Ростов-на-Дону, ул. Социалистическая, 88');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Севастополь"--------------------------
    //    //Переключится на Севастополь
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Севастополь 
    //    await page.waitForSelector('.region_list > div:nth-child(8)');
    //    await page.click('.region_list > div:nth-child(8)');
    //    await delay(2000);

    //    //---Севастополь, ул. Большая Морская, 23---
    //    const selectorSevastopl = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorSevastopl);
    //    const geolocatioSevastopl = await page.$eval(selectorSevastopl, (elementSevastopl) => {
    //      const latitudeSevastopl = elementSevastopl.getAttribute('latitude');
    //      const longitudeSevastopl = elementSevastopl.getAttribute('longtitude');
    //      return { latitudeSevastopl, longitudeSevastopl };
    //    });
    //    //---Сравниваем геолокацию --Севастополь, ул. Большая Морская, 23
    //    if (geolocatioSevastopl.latitudeSevastopl === '44.6058' && geolocatioSevastopl.longitudeSevastopl === '33.5227') {
    //      console.log('Совпадает - Севастополь, ул. Большая Морская, 23');
    //    } else {
    //      throw new Error('НЕ Совпадает - Севастополь, ул. Большая Морская, 23');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Симферополь"--------------------------
    //    //Переключится на Симферополь
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Симферополь
    //    await page.waitForSelector('.region_list > div:nth-child(9)');
    //    await page.click('.region_list > div:nth-child(9)');
    //    await delay(2000);

    //    //---Симферополь, пр-т Кирова, 60 / 1---
    //    const selectorSimferopl = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorSimferopl);
    //    const geolocatioSimferopl = await page.$eval(selectorSimferopl, (elementSimferopl) => {
    //      const latitudeSimferopl = elementSimferopl.getAttribute('latitude');
    //      const longitudeSimferopl = elementSimferopl.getAttribute('longtitude');
    //      return { latitudeSimferopl, longitudeSimferopl };
    //    });
    //    //---Сравниваем геолокацию --Симферополь, пр-т Кирова, 60 / 1
    //    if (geolocatioSimferopl.latitudeSimferopl === '44.955447' && geolocatioSimferopl.longitudeSimferopl === '34.103775') {
    //      console.log('Совпадает - Симферополь, пр-т Кирова, 60 / 1');
    //    } else {
    //      throw new Error('НЕ Совпадает - Симферополь, пр-т Кирова, 60 / 1');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //    //--------------------------Проверка соответствие геолокации в офисах "Уфа"--------------------------
    //    //Переключится на Уфа
    //    //---Нажать офисы  
    //    await page.waitForSelector('.region_input');
    //    await page.click('.region_input');
    //    await delay(2000);
    //    //---Нажать на Уфа
    //    await page.waitForSelector('.region_list > div:nth-child(10)');
    //    await page.click('.region_list > div:nth-child(10)');
    //    await delay(2000);

    //    //---Уфа, ул. Менделеева, 118 / 2---
    //    const selectorUfa = '.act.sect_item > div:nth-child(1) > .addr_cont > .addr > .print_btn';
    //    await page.waitForSelector(selectorUfa);
    //    const geolocatioUfa = await page.$eval(selectorUfa, (elementUfa) => {
    //      const latitudeUfa = elementUfa.getAttribute('latitude');
    //      const longitudeUfa = elementUfa.getAttribute('longtitude');
    //      return { latitudeUfa, longitudeUfa };
    //    });
    //    //---Сравниваем геолокацию --Уфа, ул. Менделеева, 118 / 2
    //    if (geolocatioUfa.latitudeUfa === '54.7124' && geolocatioUfa.longitudeUfa === '55.9946') {
    //      console.log('Совпадает - Уфа, ул. Менделеева, 118 / 2');
    //    } else {
    //      throw new Error('НЕ Совпадает - Уфа, ул. Менделеева, 118 / 2');
    //    }
    //    await delay(2000);
    //    // -----------------------------------------------------------------------------------------------------

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "В офисе компании" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "В офисе компании" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
   });

   it('Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Онлайн оплата" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "Моментальное зачисление"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await delay(5000);
    //     //---Нажать "Онлайн оплата"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(2)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(2)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlOnlinePay = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlOnlinePay.includes('sposoby-oplaty/online')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/online"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/online"');
    //       };
    //     await delay(3000);

    //     //Присвоить Геолокацию как Астрахань.
    //     const context = browser.defaultBrowserContext();
    //     await context.overridePermissions('https://site-test4.dobrozaim.ru/zaimy/dengi-pod-zalog-pts', ['geolocation']);
    //     await page.setGeolocation({ latitude: 46, longitude: 48 });

    //     //--------------------------Проверка на соответствие и присутсвие селекторов --------------------------
    //     //---Поле ввода---
    //     await page.waitForSelector('.identity-number > input[type=text]');
    //     await delay(1000);
    //     //---Ссылки на сайты для установки МП---
    //     await page.waitForSelector('.btn_item.GooglePlay > a[href^="https://redirect.appmetrica.yandex.com/serve/1180743176562974591/?from=online"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.AppStore > a[href^="https://redirect.appmetrica.yandex.com/serve/676340043077476850/?from=online"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.AppGalery > a[href^="https://redirect.appmetrica.yandex.com/serve/243994484336042506/?from=online"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.NashStore > a[href^="https://redirect.appmetrica.yandex.com/serve/1180868161067633846?from=online"]');
    //     await delay(1000);
    //     //Найти ближайщий офис
    //     await page.waitForSelector('.nearest_office_block > .nearest_office');
    //     await delay(1000);
    //     // -----------------------------------------------------------------------------------------------------

    //     //Нажать "Список всех офисов"
    //     await page.waitForSelector('.block.app_block > div:nth-child(5) > a[href^="/kontakty/"]');
    //     await page.click('.block.app_block > div:nth-child(5) > a[href^="/kontakty/"]');
    //     await delay(3000);

    //     //Вернуться на страницу "sposoby-oplaty/online"
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });

    //     //Нажать "Список всех офисов"
    //     await page.waitForSelector('.red.radius');
    //     await page.click('.red.radius');
    //     await delay(3000);

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Онлайн оплата" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Онлайн оплата" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
   });

   it('Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через приложение" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "Моментальное зачисление"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await delay(5000);
    //     //---Нажать "Через приложение"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(3)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(3)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlCherez_Prilozhenie = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlCherez_Prilozhenie.includes('sposoby-oplaty/cherez-prilozhenie')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/cherez-prilozhenie"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/cherez-prilozhenie"');
    //       };
    //     await delay(3000);

    //     //--------------------------Проверка на соответствие и присутсвие селекторов --------------------------
    //     //---Ссылки на сайты для установки МП---
    //     await page.waitForSelector('.btn_item.GooglePlay > a[href^="https://play.google.com/store/apps/details?id=com.dobrozaim"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.AppStore > a[href^="https://apps.apple.com/ru/app/%D0%B4%D0%BE%D0%B1%D1%80%D0%BE%D0%B7%D0%B0%D0%B9%D0%BC-%D0%B1%D1%8B%D1%81%D1%82%D1%80%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B9%D0%BC%D1%8B-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/id1517796640"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.AppGalery > a[href^="https://appgallery8.huawei.com/#/app/C102621887"]');
    //     await delay(1000);
    //     await page.waitForSelector('.btn_item.NashStore > a[href^="https://redirect.appmetrica.yandex.com/serve/1180868161067633846"]');
    //     await delay(1000);
    //     //Найти присутствия фото
    //     await page.waitForSelector('._list._2 > div:nth-child(1) > ._img > img');
    //     await delay(1000);
    //     await page.waitForSelector('._list._2 > div:nth-child(2) > ._img > img');
    //     await delay(1000);
    //     await page.waitForSelector('._list._2 > div:nth-child(3) > ._img > img');
    //     await delay(1000);
    //     await page.waitForSelector('._list._2 > div:nth-child(4) > ._img > img');
    //     await delay(1000);
    //     await page.waitForSelector('._list._2 > div:nth-child(5) > ._img > img');
    //     await delay(1000);
    //     await page.waitForSelector('._list._2 > .item.ext > ._img > img');
    //     await delay(1000);
    //     // -----------------------------------------------------------------------------------------------------

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через приложение" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через приложение" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
  });

  it('Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через QIWI-кошелек" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "Моментальное зачисление"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await delay(5000);
    //     //---Нажать "Через QIWI-кошелек"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(4)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(4)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlQiwi_Koshelek = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlQiwi_Koshelek.includes('sposoby-oplaty/qiwi-koshelek')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/qiwi-koshelek"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/qiwi-koshelek"');
    //       };
    //     await delay(3000);

    //     //--------------------------Проверка на соответствие и присутсвие селекторов --------------------------
    //     //---Ссылки на скачивание реквизитов---
    //     await page.waitForSelector('#bx_967703615_142073 > a');
    //     await delay(1000);
    //     //---Найти селектор об Оплатах---
    //     await page.waitForSelector('.pay-page__guide > .sect_title');
    //     await delay(1000);
    //     //---Найти присутствия фото---
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(1) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(2) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     //Найти служба Поддержки Qiwi
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--phone > p > a[href^="tel:88005557494"]');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--phone > p > a[href^="tel:84957717494"]');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--mail > p > a[href^="mailto:support@qiwi.ru"]');
    //     await delay(1000);
    //     // -----------------------------------------------------------------------------------------------------

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через QIWI-кошелек" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Через QIWI-кошелек" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
  });

  it('Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Оплатить через терминалы QIWI" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "Моментальное зачисление"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .for-click');
    //     await delay(5000);
    //     //---Нажать "Оплатить через терминалы QIWI"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(5)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(2) > .hidden-list.show-block > a:nth-child(5)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlTerminaly_Qiwi = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlTerminaly_Qiwi.includes('sposoby-oplaty/terminaly-qiwi')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/terminaly-qiwi"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/terminaly-qiwi"');
    //       };
    //     await delay(3000);

    //     //--------------------------Проверка на соответствие и присутсвие селекторов --------------------------
    //     //---Ссылки на скачивание реквизитов---
    //     await page.waitForSelector('#bx_967703615_142073 > a');
    //     await delay(1000);
    //     //---Найти селектор об Оплатах---
    //     await page.waitForSelector('.pay-page__guide > .sect_title');
    //     await delay(1000);
    //     //---Найти присутствия фото---
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(1) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(2) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(3) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(4) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(5) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(6) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__guide-list > div:nth-child(7) > .pay-page__guide-list-item-pic > picture > img');
    //     await delay(1000);
    //     //Найти служба Поддержки Qiwi
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--phone > p > a[href^="tel:88005557494"]');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--phone > p > a[href^="tel:84957717494"]');
    //     await delay(1000);
    //     await page.waitForSelector('.pay-page__help-item.pay-page__help-item--mail > p > a[href^="mailto:support@qiwi.ru"]');
    //     await delay(1000);
    //     // -----------------------------------------------------------------------------------------------------

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Оплатить через терминалы QIWI" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "Моментальное зачисление" -> "Оплатить через терминалы QIWI" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
  });

  it('Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "В отделениях любого банка" (!ДОПИСАТЬ!) на сайте "dobrozaim"', async () => {
   //  try {
   //     await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
   //      //Переход на страницу "В офисе компании" (через 'бургер')
   //      //---Нажать бургер---
   //      await page.waitForSelector('.header-flex-group > span.header__menu-but');
   //      await page.click('.header-flex-group > span.header__menu-but');
   //      await delay(3000);
   //      //---Нажать "Как оплатить"---
   //      await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
   //      await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
   //      await delay(5000);
   //      //---Нажать "В течение 3 рабочих дней"---
   //      await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(3) > .for-click');
   //      await page.click('.header__menu-sub-list.show-block > div:nth-child(3) > .for-click');
   //      await delay(5000);
   //      //---Нажать "В отделениях любого банка"---
   //      await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(3) > .hidden-list.show-block > a:nth-child(2)');
   //      await page.click('.header__menu-sub-list.show-block > div:nth-child(3) > .hidden-list.show-block > a:nth-child(2)');
   //      await delay(3000);

   //      //Получаем URL текущей страницы
   //      const redirectedUrlBanka = page.url();
   
   //      //Сравниваем текущую страницу с указанной
   //       if (redirectedUrlBanka.includes('sposoby-oplaty/v-otdeleniyah-lyubogo-banka')) {
   //         console.log('Редирект произошел на страницу "sposoby-oplaty/v-otdeleniyah-lyubogo-banka"');
   //       } else {
   //        throw new Error('Переход на страницу "sposoby-oplaty/v-otdeleniyah-lyubogo-banka"');
   //        };
   //      await delay(3000);

   //      //--------------------------Проверка на соответствие и присутсвие селекторов --------------------------
   //      //---Проверка текста "В банках" (Первый блок текста)---
   //      const inBanka1 = await page.waitForSelector('.block.mgb.pay-page__head-list.pay-page__head-list--2 > div:nth-child(1) > p');
   //      const bankaIn1 = await inBanka1.evaluate((el) => el.textContent);
   //      expect(bankaIn1.trim()).toBe('Переводы для погашения займа следует осуществлять не позднее, чем за 3 рабочих дня до наступления платежной даты');
   //      await delay(1000);
   //      //---Проверка текста "В банках" (Второй блок текста)---
   //      const inBanka2 = await page.waitForSelector('.block.mgb.pay-page__head-list.pay-page__head-list--2 > div:nth-child(2) > p');
   //      const bankaIn2 = await inBanka2.evaluate((el) => el.textContent);
   //      expect(bankaIn2.trim()).toBe('В отделениях «Сбербанка России» комиссия составляет 3% от суммы перевода, но не менее 30 рублей за один перевод. Комиссию в остальных банках уточняйте перед совершением платежа');
   //      await delay(1000);
   //      //---Проверка текста "Пошаговая инструкция по оплате" (4 шаг - проверить актуальность номера телефона)---
   //      await page.waitForSelector('.pay-page__steps-list > div:nth-child(4) > div.pay-page__steps-item-desc > p > span > a[href^="tel:88007752545"]');
   //      await delay(1000);
   //      // -----------------------------------------------------------------------------------------------------

   //      //--------------------------Проверка на открытые/закрытыие реквизитов --------------------------
   //    //   await page.waitForSelector('body > div.block.mgt.pay-page');
   //    //   await page.waitForSelector('.wrap > .block.requisites-page > .questions-block > .how-pay-docs-list > div:nth-child(1) > .how-pay-docs-list-item-top');
   //    //   await page.click('.wrap > .block.requisites-page > .questions-block > .how-pay-docs-list > div:nth-child(1) > .how-pay-docs-list-item-top');
   //    //   await delay(3000);
        
   //      // -----------------------------------------------------------------------------------------------------
   //      //JSON
   //      jsonResults.modWindowInvest = {
   //        result: 1,
   //        description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "В отделениях любого банка" на сайте "dobrozaim',
   //       };
   //       } catch (e) {
   //       jsonResults.modWindowInvest = {
   //         result: 0,
   //         description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "В отделениях любого банка" на сайте "dobrozaim"',
   //       };
   //      throw e;
   //      }
  });

  it('Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "Через интернет-банк" на сайте "dobrozaim"', async () => {
    // try {
    //    await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
    //     //Переход на страницу "В офисе компании" (через 'бургер')
    //     //---Нажать бургер---
    //     await page.waitForSelector('.header-flex-group > span.header__menu-but');
    //     await page.click('.header-flex-group > span.header__menu-but');
    //     await delay(3000);
    //     //---Нажать "Как оплатить"---
    //     await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await page.click('.header__menu.show-flex > div:nth-of-type(4) > .header__menu-link');
    //     await delay(5000);
    //     //---Нажать "В течение 3 рабочих дней"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(3) > .for-click');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(3) > .for-click');
    //     await delay(5000);
    //     //---Нажать "Через интернет-банк"---
    //     await page.waitForSelector('.header__menu-sub-list.show-block > div:nth-child(3) > .hidden-list.show-block > a:nth-child(3)');
    //     await page.click('.header__menu-sub-list.show-block > div:nth-child(3) > .hidden-list.show-block > a:nth-child(3)');
    //     await delay(3000);

    //     //Получаем URL текущей страницы
    //     const redirectedUrlInterBank = page.url();
   
    //     //Сравниваем текущую страницу с указанной
    //      if (redirectedUrlInterBank.includes('sposoby-oplaty/internet-bank')) {
    //        console.log('Редирект произошел на страницу "sposoby-oplaty/internet-bank"');
    //      } else {
    //       throw new Error('Переход на страницу "sposoby-oplaty/internet-bank"');
    //       };
    //     await delay(3000);

    //     //--------------------------Проверка на соответствие и присутсвие Фото инструкций --------------------------
    //     await page.waitForSelector('._list._2 > div:nth-child(1) > div._img > img');
    //     await delay(2000);
    //     await page.waitForSelector('._list._2 > div:nth-child(2) > div._img > img');
    //     await delay(2000);
    //     await page.waitForSelector('._list._2 > div:nth-child(3) > div._img > img');
    //     await delay(2000);
    //     await page.waitForSelector('._list._2 > div:nth-child(4) > div._img > img');
    //     await delay(2000);
    //     // -----------------------------------------------------------------------------------------------------

    //     //JSON
    //     jsonResults.modWindowInvest = {
    //       result: 1,
    //       description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "Через интернет-банк" на сайте "dobrozaim',
    //      };
    //      } catch (e) {
    //      jsonResults.modWindowInvest = {
    //        result: 0,
    //        description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "Через интернет-банк" на сайте "dobrozaim"',
    //      };
    //     throw e;
    //     }
  });

  it('Проверка страницы "Офисы" -> "Все офисы (18 по РФ)" (!ДОПИСАТЬ!) на сайте "dobrozaim"', async () => {
   //  try {
   //     await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 
   //      //Переход на страницу "В офисе компании" (через 'бургер')
   //      //---Нажать бургер---
   //      await page.waitForSelector('.header-flex-group > span.header__menu-but');
   //      await page.click('.header-flex-group > span.header__menu-but');
   //      await delay(3000);
   //      //---Нажать "Офисы"---
   //      await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(5) > .header__menu-link');
   //      await page.click('.header__menu.show-flex > div:nth-of-type(5) > .header__menu-link');
   //      await delay(5000);
   //    //   //---Нажать "Все офисы (18 по РФ)"---???
   //    //   await page.waitForSelector(' a:nth-child(13) > a.under-line');
   //    //   await page.click('a:nth-child(13) > a.under-line');
   //    //   await delay(3000);

   //      //Получаем URL текущей страницы
   //      const redirectedUrlKonty = page.url();
   
   //      //Сравниваем текущую страницу с указанной
   //       if (redirectedUrlKonty.includes('kontakty')) {
   //         console.log('Редирект произошел на страницу "kontakty"');
   //       } else {
   //        throw new Error('Переход на страницу "kontakty"');
   //        };
   //      await delay(3000);

   //      //--------------------------Проверка на соответствие и присутсвие Фото инструкций --------------------------
        // await page.waitForSelector('._list._2 > div:nth-child(1) > div._img > img');
        // await delay(2000);
        // await page.waitForSelector('._list._2 > div:nth-child(2) > div._img > img');
        // await delay(2000);
        // await page.waitForSelector('._list._2 > div:nth-child(3) > div._img > img');
        // await delay(2000);
        // await page.waitForSelector('._list._2 > div:nth-child(4) > div._img > img');
        // await delay(2000);
        // -----------------------------------------------------------------------------------------------------

      //   //JSON
      //   jsonResults.modWindowInvest = {
      //     result: 1,
      //     description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "Через интернет-банк" на сайте "dobrozaim',
      //    };
      //    } catch (e) {
      //    jsonResults.modWindowInvest = {
      //      result: 0,
      //      description: 'Проверка страницы "Как оплатить" -> "В течение 3 рабочих дней" -> "Через интернет-банк" на сайте "dobrozaim"',
      //    };
      //   throw e;
      //   }
  });

  it('Проверка отправки заявки на странице "Инвестиции" на сайте "dobrozaim"', async () => {
   //  try {
   //   await page.goto(urlTest, { waitUntil: 'load', timeout: 300000 });

   //   //Переход на страницу инвестиций(через 'бургер')
   //   await page.waitForSelector('.header-flex-group > span.header__menu-but');
   //   await page.click('.header-flex-group > span.header__menu-but ');
   //   await delay(3000);
   //   await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(6) > a');
   //   await page.click('.header__menu.show-flex > div:nth-of-type(6) > a');
   //   await delay(7000);

   //   //Получаем URL текущей страницы
   //   const redirectedUrlInvest = page.url();

   //   //Сравниваем текущую страницу с указанной
   //    if (redirectedUrlInvest.includes('/investicii-v-microzajmy/')) {
   //      console.log('Редирект произошел на страницу "/investicii-v-microzajmy/"');
   //    } else {
   //     throw new Error('Падение Автотеста');
   //     };
   //   await delay(3000);

   //   //Проверка кликабельность варианта "Выплата процентов" на капитализации
   //   await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.opt_line.cap > ._tab');
   //   await page.click('.tabs.opt_line.cap > ._tab');
   //   await delay(3000);

   //    //  //Проверка кликабельность варианта "Выплата процентов" на ежемесячно - !!!сомнительный селектор!!!
   //    //  await page.waitForSelector('._left > .tabs.opt_line.cap > div:nth-child(1)');
   //    //  await page.click('._left > .tabs.opt_line.cap > div:nth-child(1)');
   //    //  await delay(3000);

   //   //Проверка кликабельность варианта "Для кого" на ЮР.Л.
   //   await page.waitForSelector('.choose_face > div:nth-child(3)');
   //   await page.click('.choose_face > div:nth-child(3)');
   //   await delay(3000);
     
   //   //----------------------------------Проверка калькулятора по юр. л.----------------------------------
   //   //Проверка суммы ЮР.Л. в 30млР (Граничное значение на 20 лет + ставка 15%)
   //   await calcInvect(30000000, 240, page);
   //   await delay(3000);
   //   const facelegal1 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const legalFace1 = await facelegal1.evaluate((el) => el.textContent);
   //   expect(legalFace1.trim()).toBe('120 000 000.00 ₽');
   //   const legalPercent1 = await page.waitForSelector('.v.bigprocent');
   //   const percentLegal1 = await legalPercent1.evaluate((el) => el.textContent);
   //   expect(percentLegal1.trim()).toBe('15%');

   //   //Проверка суммы ЮР.Л. в 15млР (Среднее значение на 2 года + ставка 14%)
   //   await calcInvect(15000000, 24, page);
   //   await delay(3000);
   //   const facelegal2 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const legalFace2 = await facelegal2.evaluate((el) => el.textContent);
   //   expect(legalFace2.trim()).toBe('19 200 000.00 ₽');
   //   const legalPercent2 = await page.waitForSelector('.v.bigprocent');
   //   const percentLegal2 = await legalPercent2.evaluate((el) => el.textContent);
   //   expect(percentLegal2.trim()).toBe('14%');

   //   //Проверка суммы ЮР.Л. в 15млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
   //   await calcInvect(15000000, 13, page);
   //   await delay(3000);
   //   const facelegal3 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const legalFace3 = await facelegal3.evaluate((el) => el.textContent);
   //   expect(legalFace3.trim()).toBe('17 275 000.00 ₽');
   //   const legalPercent3 = await page.waitForSelector('.v.bigprocent');
   //   const percentLegal3 = await legalPercent3.evaluate((el) => el.textContent);
   //   expect(percentLegal3.trim()).toBe('14%');

   //   //Проверка суммы ЮР.Л. в 15млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
   //   await calcInvect(15000000, 12, page);
   //   await delay(3000);
   //   const facelegal4 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const legalFace4 = await facelegal4.evaluate((el) => el.textContent);
   //   expect(legalFace4.trim()).toBe('16 950 000.00 ₽');
   //   const legalPercent4 = await page.waitForSelector('.v.bigprocent');
   //   const percentLegal4 = await legalPercent4.evaluate((el) => el.textContent);
   //   expect(percentLegal4.trim()).toBe('13%');

   //   //Проверка сумму ЮР.Л. в 500к (Граничное значение на 6 месяцев + ставка 13%)
   //   await calcInvect(500000, 6, page);
   //   await delay(3000);
   //   const facelegal5 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const legalFace5 = await facelegal5.evaluate((el) => el.textContent);
   //   expect(legalFace5.trim()).toBe('532 500.00 ₽');
   //   const legalPercent5 = await page.waitForSelector('.v.bigprocent');
   //   const percentLegal5 = await legalPercent5.evaluate((el) => el.textContent);
   //   expect(percentLegal5.trim()).toBe('13%');
   //   //----------------------------------Проверка калькулятора по юр. л.----------------------------------
     
   //   //------------------------------------Проверка калькулятора по ИП. ------------------------------------
   //   //Проверка кликабельность варианта "Для кого" на ИП
   //   await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.choose_face > div:nth-child(2)');
   //   await page.click('.choose_face > div:nth-child(2)');
   //   await delay(3000);

   //   //Проверка суммы ИП в 30млР (Граничное значение на 20 лет + ставка 16%)
   //   await calcInvect(30000000, 240, page);
   //   await delay(3000);
   //   const faceUp1 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const upFace1 = await faceUp1.evaluate((el) => el.textContent);
   //   expect(upFace1.trim()).toBe('126 000 000.00 ₽');
   //   const UpPercent1 = await page.waitForSelector('.v.bigprocent');
   //   const percentUp1 = await UpPercent1.evaluate((el) => el.textContent);
   //   expect(percentUp1.trim()).toBe('16%');

   //   //Проверка суммы ИП в 20млР (Среднее значение на 2 года + ставка 14%)
   //   await calcInvect(20000000, 24, page);
   //   await delay(3000);
   //   const faceUp2 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const upFace2 = await faceUp2.evaluate((el) => el.textContent);
   //   expect(upFace2.trim()).toBe('25 600 000.00 ₽');
   //   const UpPercent2 = await page.waitForSelector('.v.bigprocent');
   //   const percentUp2 = await UpPercent2.evaluate((el) => el.textContent);
   //   expect(percentUp2.trim()).toBe('14%');

   //   //Проверка суммы ИП в 15,5млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
   //   await calcInvect(15500000, 13, page);
   //   await delay(3000);
   //   const faceUp3 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const upFace3 = await faceUp3.evaluate((el) => el.textContent);
   //   expect(upFace3.trim()).toBe('17 850 833.33 ₽');
   //   const UpPercent3 = await page.waitForSelector('.v.bigprocent');
   //   const percentUp3 = await UpPercent3.evaluate((el) => el.textContent);
   //   expect(percentUp3.trim()).toBe('14%');

   //   //Проверка суммы ИП в 15млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
   //   await calcInvect(15000000, 12, page);
   //   await delay(3000);
   //   const faceUp4 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const upFace4 = await faceUp4.evaluate((el) => el.textContent);
   //   expect(upFace4.trim()).toBe('16 950 000.00 ₽');
   //   const UpPercent4 = await page.waitForSelector('.v.bigprocent');
   //   const percentUp4 = await UpPercent4.evaluate((el) => el.textContent);
   //   expect(percentUp4.trim()).toBe('13%');

   //   //Проверка суммы ИП в 1,5млР (Граничное значение на 6 месяцев + ставка 13%)
   //   await calcInvect(1500000, 6, page);
   //   await delay(3000);
   //   const faceUp5 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const upFace5 = await faceUp5.evaluate((el) => el.textContent);
   //   expect(upFace5.trim()).toBe('1 597 500.00 ₽');
   //   const UpPercent5 = await page.waitForSelector('.v.bigprocent');
   //   const percentUp5 = await UpPercent5.evaluate((el) => el.textContent);
   //   expect(percentUp5.trim()).toBe('13%');
   //   //------------------------------------Проверка калькулятора по ИП. ------------------------------------

   //   //----------------------------------Проверка калькулятора по Физ. л. ----------------------------------
   //   //Проверка кликабельность варианта "Для кого" на Физ.лиц.
   //   await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.choose_face > div:nth-child(1)');
   //   await page.click('.choose_face > div:nth-child(1)');
   //   await delay(3000);

   //   //Проверка суммы ФИЗ.Л. в 30млР (Граничное значение на 20 лет + ставка 16%)
   //   await calcInvect(30000000, 240, page);
   //   await delay(3000);
   //   const facePhysical1 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const physicallFace1 = await facePhysical1.evaluate((el) => el.textContent);
   //   expect(physicallFace1.trim()).toBe('126 000 000.00 ₽');
   //   const physicallPercent1 = await page.waitForSelector('.v.bigprocent');
   //   const percentphysicall1 = await physicallPercent1.evaluate((el) => el.textContent);
   //   expect(percentphysicall1.trim()).toBe('16%');

   //   //Проверка суммы ФИЗ.Л. в 18млР (Среднее значение на 2 года + ставка 14%)
   //   await calcInvect(18000000, 24, page);
   //   await delay(3000);
   //   const facePhysical2 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const physicallFace2 = await facePhysical2.evaluate((el) => el.textContent);
   //   expect(physicallFace2.trim()).toBe('23 040 000.00 ₽');
   //   const physicallPercent2 = await page.waitForSelector('.v.bigprocent');
   //   const percentphysicall2 = await physicallPercent2.evaluate((el) => el.textContent);
   //   expect(percentphysicall2.trim()).toBe('14%');

   //   //Проверка суммы ФИЗ.Л. в 8млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
   //   await calcInvect(8000000, 13, page);
   //   await delay(3000);
   //   const facePhysical3 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const physicallFace3 = await facePhysical3.evaluate((el) => el.textContent);
   //   expect(physicallFace3.trim()).toBe('9 213 333.33 ₽');
   //   const physicallPercent3 = await page.waitForSelector('.v.bigprocent');
   //   const percentphysicall3 = await physicallPercent3.evaluate((el) => el.textContent);
   //   expect(percentphysicall3.trim()).toBe('14%');

   //   //Проверка суммы ФИЗ.Л. в 5млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
   //   await calcInvect(5000000, 12, page);
   //   await delay(3000);
   //   const facePhysical4 = await page.waitForSelector('.val.lead_text.inv-result');
   //   const physicallFace4 = await facePhysical4.evaluate((el) => el.textContent);
   //   expect(physicallFace4.trim()).toBe('5 650 000.00 ₽');
   //   const physicallPercent4 = await page.waitForSelector('.v.bigprocent');
   //   const percentphysicall4 = await physicallPercent4.evaluate((el) => el.textContent);
   //   expect(percentphysicall4.trim()).toBe('13%');

   //   //Проверка суммы ФИЗ.Л. в 1,5млР (Граничное значение на 6 месяцев + ставка 18%)
   //   await calcInvect(1500000, 6, page);
   //   await delay(3000);
   //     const facePhysical5 = await page.waitForSelector(await '.val.lead_text.inv-result');
   //     const physicallFace5 = await facePhysical5.evaluate((el) => el.textContent);
   //     expect(physicallFace5.trim()).toBe('1 635 000.00 ₽');
   //     const physicallPercent5 = await page.waitForSelector(await '.v.bigprocent');
   //     const percentphysicall5 = await physicallPercent5.evaluate((el) => el.textContent);
   //     expect(percentphysicall5.trim()).toBe('18%');
   //   //----------------------------------Проверка калькулятора по Физ. л. ----------------------------------
     
   //   //Перезагрузка страницы для Корректной работы автотеста 
   //   await page.reload({ waitUntil: 'load', timeout: 300000 });
   //   await delay(3000);

   //   //Проверка открытия Графика по ФИЗ.Л.
   //   await page.evaluate((selector) => document.querySelector(selector).click(), '#calc > .calc_cont > ._right._box.green_light > span');
   //   await page.click('#calc > .calc_cont > ._right._box.green_light > span');
   //   await delay(3000); 

   //    //  //Перехват 1
   //    //  await page.setRequestInterception(true);

   //    //  //Проверка скачать графика
   //    //  await page.evaluate((selector) => document.querySelector(selector).click(), '#grafik_save > span');
   //    //  await page.click('#grafik_save > span');
   //    //  await delay(5000);

   //    //  //Перехват 2
   //    //  await waitWithTimeout(page, 'request', 50000);
   //    //  page.on('request', interceptedRequest => {
   //    //    if  (
   //    //     interceptedRequest.url().endsWith('.png') ||
   //    //     interceptedRequest.url().endsWith('.jpg') ||
   //    //     interceptedRequest.url().endsWith('.pdf')
   //    //    )
   //    //     interceptedRequest.abort();
   //    //    else interceptedRequest.continue();
   //    //  });


   //   //Проверка закрытия Графика по ФИЗ.Л.
   //   await page.evaluate((selector) => document.querySelector(selector).click(), '#calc > .calc_cont > ._right._box.green_light > span');
   //   await page.click('#calc > .calc_cont > ._right._box.green_light > span');
   //   await delay(3000); 

   //   //Проверить актуальность номера Руководителя отдела инвестиции
   //   await page.waitForSelector('body > div.investors_page');
   //   await page.waitForSelector('._pers-contacts > div:nth-child(1) > p > a[href^="tel:88006009226"]');
   //   await delay(3000);
   //   const TelInvect = await page.waitForSelector('._pers-contacts > div:nth-child(1) > p > a[href^="tel:88006009226"]');
   //   const invectTel = await TelInvect.evaluate((el) => el.textContent);
   //   expect(invectTel.trim()).toBe('8 (800) 600 92 26');
   //   await delay(3000);

   //   //Заполнить данные на перезвон клиентА - ФИО
   //   await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
   //   await page.waitForSelector('div:nth-child(3) > form > div:nth-child(1) > div > input.na_name');
   //   await page.type('input.na_name', 'Иванович');
   //   await delay(2000);

   //   //Заполнить данные на перезвон клиентА - Телефон
   //   await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
   //   await page.waitForSelector('div:nth-child(3) > form > div:nth-child(2) > div > input.na_phone');
   //   await page.type('input.na_phone', '9991237565');
   //   await delay(2000);

   //   //Отправить заявку клиентА на перезвон
   //   await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
   //   await page.evaluate((selector) => document.querySelector(selector).click(), 'div:nth-child(3) > form > ._btn.investors-page__pers-form-but.recall');
   //   await page.click('._btn.investors-page__pers-form-but.recall');
   //   await delay(3000);

   //   //Закрыть заявку на перезвон
   //   await page.waitForSelector('#msg_popup > .modal-dialog > .modal-content._sh > .close');
   //   await page.click('#msg_popup > .modal-dialog > .modal-content._sh > .close');
   //   await delay(5000);

   //    //  //Проверка работоспособности на открытие/закрытие вопросов
   //    //  await openQuaInvest(1, page);
   //    //  await delay(3000);
   //    //  await openQuaInvest(2, page);
   //    //  await delay(3000);
   //    //  await openQuaInvest(3, page);
   //    //  await delay(3000);
   //    //  await openQuaInvest(4, page);
   //    //  await delay(3000);

   //    // //  Проверка работоспособности на открытие/закрытие вопросов - в функции не видит 5 вопрос
   //    //   await openQuaInvest(5, page);
   //    //   await delay(3000);
   //    // //  await page.evaluate((selector) => document.querySelector(selector).click(), '.q_block div:nth-child(5) div.q_name.title_4');
   //    // //  await page.click('.q_block div:nth-child(5) div.q_name.title_4');
   //    // //  await delay(3000);

   //    //  await openQuaInvest(6, page);
   //    //  await delay(3000);
   //    //  await openQuaInvest(7, page);
   //    //  await delay(10000);

   //   //Проверка работоспособности перехода в Телеграмм
   //   await page.waitForSelector('._txt > a[href^="https://t.me/summit_investments"]');
   //   await page.click('._txt > a[href^="https://t.me/summit_investments"]');
   //   await delay(3000);

   //   //Вернуться на страницу Инвестиции
   //   await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //   //Проверить стрелку вверх к калькулятору
   //   await page.waitForSelector('#totop_btn');
   //   await page.click('#totop_btn');
   //   await delay(3000);

   //   //Открыть модальное окно "Инвестировать" под калькулятором
   //   await page.waitForSelector('._right._box.green_light > ._btn.calc_inv');
   //   await page.click('._right._box.green_light > ._btn.calc_inv');
   //   await delay(3000);

   //   //Заполнение данных клиента - ФИО
   //   await page.waitForSelector('#calc_inv .modal-body ._fio input');
   //   await page.type('#calc_inv .modal-body ._fio input', 'Автотест');
   //   await delay(1000);

   //   //Заполнение данных клиента - Телефон
   //   await page.waitForSelector('#calc_inv .modal-body input.form-control._phone');
   //   await page.type('#calc_inv .modal-body input.form-control._phone', '9041111111');
   //   await delay(1000);

   //   //Заполнение данных клиента - Почта
   //   await page.waitForSelector('#calc_inv .modal-body input.form-control.na_email');
   //   await page.type('#calc_inv .modal-body input.form-control.na_email', 'test@mail.ru');
   //   await delay(1000);

   //   //Заполнение данных Капчи
   //   await page.waitForSelector('#captcha_word');
   //   await page.type('#captcha_word', '11111');
   //   await delay(1000);

   //   //Отправка заявки на инвестирование
   //   await page.waitForSelector('.btn.inv_zayavka');
   //   await page.click('.btn.inv_zayavka');
   //   await delay(1000);

   //   //Закрытия мод.окна после отправки заявки
   //   await page.waitForSelector('.btn.green.cancel');
   //   await page.click('.btn.green.cancel');
   //   await delay(1000);

   //   //Проверка перехода в КаДоброзайм 
   //   await page.waitForSelector('._right._box.green_light > ._btn.white.ka');
   //   await page.click('._right._box.green_light > ._btn.white.ka');
   //   await delay(3000);
       
   //   //JSON
   //    jsonResults.modWindowInvest = {
   //      result: 1,
   //      description: 'Проверка отправки заявки на странице "Инвестиции" на сайте "dobrozaim"',
   //     };
   //  } catch (e) {
   //     jsonResults.modWindowInvest = {
   //        result: 0,
   //        description: 'Проверка отправки заявки на странице "Инвестиции" на сайте "dobrozaim"',
   //     };
   //     throw e;
   //  }
 });


    afterAll(async () => {
    if (browser) browser.close();
});
});
