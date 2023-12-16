/*
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import 'regenerator-runtime';
import { url, dogovorComponents, urlScreens, patchlog, urlStage, urlBoy } from './others/config';
import {
   calcPublic,
  openQuaInvest, 
  delay } from './others/helpers';
import { writeFileSync } from 'fs';
import { SERVFAIL } from 'dns';
import { error, time } from 'console';
import { Int } from 'mssql';
import { urlTest } from './others/config';
const screenPath = './testing/__tests__/screenshot/';
let jsonResults = {};


describe('sum module', () => {
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
 //    try {

 //     //Переход на страницу "dobrozaim"
 //     await page.goto(url, { waitUntil: 'load', timeout: 300000 });
 //     await delay(5000);

   //  //Проверка чек-бокса "В офисе"
   //  await page.waitForSelector('.sposob_polucheniya_btn._office');
   //  await page.click('.sposob_polucheniya_btn._office');
   //  await delay(3000);

   //  //Убедиться что нету кнопки ЕСИА
   //  await page.waitForSelector('.esia-auth-button', { visible: false });
   //  await delay(3000);

   //  //Переключить чек-бокс на "На карту"
   //  await page.waitForSelector('.sposob_polucheniya_btn._card');
   //  await page.click('.sposob_polucheniya_btn._card');
   //  await delay(3000);

   //  //Проверка калькулятора на 2к/30дн c отображением суммы
   //  await calcPublic(2000, 168, page);
   //  await delay(3000);
   //  const repayment1 = await page.waitForSelector('.block._vozvrat_block > .cont');
   //  const settlement1 = await repayment1.evaluate((el) => el.textContent);
   //  expect(settlement1.trim()).toBe('Платеж по 311 р.. Всего 12 платежей');
   //  await delay(3000);

   //  //Проверка калькулятора на 100к/350дн c отображением суммы
   //  await calcPublic(100000, 350, page);
   //  await delay(3000);
   //  const repayment2 = await page.waitForSelector('.block._vozvrat_block > .cont');
   //  const settlement2 = await repayment2.evaluate((el) => el.textContent);
   //  expect(settlement2.trim()).toBe('Платеж по 9 135 р.. Всего 25 платежей');
   //  await delay(3000);

   //  //Проверка калькулятора на 1к/4дн
   //  await calcPublic(1000, 4, page);
   //  await delay(3000);

   //  //Проверка калькулятора на 30к/30дн
   //  await calcPublic(30000, 30, page);
   //  await delay(3000);

   //  //Проверить переход в ЕСИА
   //  await page.waitForSelector('.esia-auth-button', { visible: true });
   //  await page.click('.esia-auth-button');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlESIA = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlESIA.includes('esia.gosuslugi.ru/login')) {
   //      console.log('Редирект произошел на страницу "/esia.gosuslugi.ru/login"');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(5000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //  //-----------------------------------Гиперсылки1-------------------------------------------------
   //  //Проверить переход на авторизацию
   //  await page.waitForSelector('a[href^="/auth/#w_referring_place=microloan_calculator"]');
   //  await page.click('a[href^="/auth/#w_referring_place=microloan_calculator"]');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlAuthorization = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlAuthorization.includes('auth/#w_referring_place=microloan_calculator')) {
   //      console.log('Редирект произошел на страницу "auth/#w_referring_place=microloan_calculator"');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //  //Проверить переход "В офисах"
   //  await page.waitForSelector('.cont > div:nth-child(4) > a[href^="/kontakty/"]');
   //  await page.click('.cont > div:nth-child(4) > a[href^="/kontakty/"]');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlОffice = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlОffice.includes('kontakty')) {
   //      console.log('kontakty');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });
   //  //-----------------------------------Гиперсылки1-------------------------------------------------

   //  //---------------------Проверить присутвия кодов для установки МП--------------------------------
   //  //-- Google play
   //  await page.waitForSelector('.btn_block > a:nth-child(1) > img');
   //  // -- Nashstore
   //  await page.waitForSelector('.btn_block > a:nth-child(2) > img');
   //  // -- Appgallery
   //  await page.waitForSelector('.btn_block > a:nth-child(3) > img');
   //  // -- AppStore
   //  await page.waitForSelector('.btn_block > a:nth-child(4) > img');
   //  //-----------------------------------------------------------------------------------------------------

   //  //---------------------------------Блок из тарифов------------------------------------------------
   //   //Проверить переход на тариф под -------------- 0%
   //  const rateNull = await page.waitForSelector('.products-list > div:nth-child(2) > div:nth-child(4) > ._val');
   //  const nullRate = await rateNull.evaluate((el) => el.textContent);
   //  expect(nullRate.trim()).toBe('1 000 - 15 000 ₽');
   //  await delay(1000);
   //  await page.waitForSelector('div:nth-child(2) > .btn_line > .header__but.green');
   //  await page.click('div:nth-child(2) > .btn_line > .header__but.green');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlNull = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlNull.includes('/zaimy/bez-procentov/#w_referring_place=products')) {
   //      console.log('/zaimy/bez-procentov/#w_referring_place=products');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //  //Проверить переход на тариф -------------- 100к
   //  const rateMax = await page.waitForSelector('.products-list > div:nth-child(3) > div:nth-child(4) > ._val');
   //  const maxRate = await rateMax.evaluate((el) => el.textContent);
   //  expect(maxRate.trim()).toBe('1 000-100 000 ₽');
   //  await delay(1000);
   //  await page.waitForSelector('div:nth-child(3) > .btn_line > .header__but.green');
   //  await page.click('div:nth-child(3) > .btn_line > .header__but.green');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlMax = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlMax.includes('online')) {
   //      console.log('/online/');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //  //Проверить переход на тариф -------------- Автозалог
   //  const rateAvto = await page.waitForSelector('.products-list > div:nth-child(4) > div:nth-child(4) > ._val');
   //  const avtoRate = await rateAvto.evaluate((el) => el.textContent);
   //  expect(avtoRate.trim()).toBe('50 000 - 1 000 000 ₽');
   //  await delay(1000);
   //  await page.waitForSelector('div:nth-child(4) > .btn_line > .header__but.green');
   //  await page.click('div:nth-child(4) > .btn_line > .header__but.green');
   //  await delay(3000);

   //  //Получаем URL текущей страницы
   //  const redirectedUrlAvto = page.url();

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlAvto.includes('zaimy/dengi-pod-zalog-pts')) {
   //      console.log('zaimy/dengi-pod-zalog-pts');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });
   //  //-----------------------------------------------------------------------------------------------------

   //  //Проверка кликабельного блока на переход
   //  await page.waitForSelector('._list > .item._sh.hv');
   //  await page.click('._list > .item._sh.hv');
   //  await delay(3000);

   //  //Сравниваем текущую страницу с указанной
   //  if (redirectedUrlMax.includes('/online/')) {
   //      console.log('/online/');
   //   } else {
   //      throw new Error('Падение Автотеста');
   //   };
   //   await delay(3000);

   //  //Вернуться на страницу "dobrozaim"
   //  await page.goBack({ waitUntil: 'load', timeout: 300000 });

   //  //Проверка кликабельность кнопки "Получить деньги"
   //  await page.waitForSelector('.wrap > div:nth-child(3) > ._btn.go_calc');
   //  await page.click('.wrap > div:nth-child(3) > ._btn.go_calc');
   //  await delay(3000);

   //  //Проверка открытия страницы на просмотр всех документов компаннии (!что-то не так)
   //  await page.waitForSelector('.view_all.lazyloaded');
   //  await page.click('a.view_all.lazyloaded');
   //  await delay(3000);

   //    //JSON
   //    jsonResults.modWindowInvest = {
   //       result: 1,
   //       description: 'Проверка страницы "dobrozaim"',
   //    };
   // } catch (e) {
   //    jsonResults.modWindowInvest = {
   //       result: 0,
   //       description: 'Проверка страницы "dobrozaim"',
   //    };
   //    throw e;
//    }
});


 it('Проверка страницы "Займ под 0%" на сайте "dobrozaim"', async () => {
//     try {
//        await page.goto(url, { waitUntil: 'load', timeout: 300000 });

//        //Переход на страницу "Займ под 0%" (через 'бургер')
//        await page.waitForSelector('.header__menu-but');
//        await page.click('.header__menu-but ');
//        await delay(3000);
//        await page.waitForSelector('div:nth-of-type(1) > .header__menu-link');
//        await page.click('div:nth-of-type(1) > .header__menu-link');
//        await delay(7000);
//        await page.waitForSelector('.header__menu-sub-list.show-block > .pts_hover > .btn_line > .green.header__but');
//        await page.click('.header__menu-sub-list.show-block > .pts_hover > .btn_line > .green.header__but');
//        await delay(3000);

//        //Получаем URL текущей страницы
//        const redirectedUrlNoPersen = page.url();

//        //Сравниваем текущую страницу с указанной
//         if (redirectedUrlNoPersen.includes('zaimy/bez-procentov')) {
//            console.log('Редирект произошел на страницу "zaimy/bez-procentov"');
//         } else {
//            throw new Error('Падение Автотеста');
//         };
//         await delay(3000);

//        //Переход на калькулятор "Займ под 0%"
//        await page.waitForSelector('.btn_block > ._btn');
//        await page.click('.btn_block > ._btn ');
//        await delay(3000);

//        //Получаем URL текущей страницы
//        const redirectedUrlNoPersen7 = page.url();

//        //Сравниваем текущую страницу с указанной
//         if (redirectedUrlNoPersen7.includes('online/?sum=15000&term=7')) {
//            console.log('Редирект произошел на страницу "online/?sum=15000&term=7"');
//         } else {
//            throw new Error('Падение Автотеста');
//         };
//         await delay(3000);

//        //Вернуться на страницу "dobrozaim"
//        await page.goBack({ waitUntil: 'load', timeout: 300000 });

//        //--------------------------Блок проверки текста ответов на соотвествие--------------------------
//        //Первый вопрос.  
//        const oneQuaZero1 = await page.waitForSelector('div:nth-child(1) > .q_name.open');
//        const zeroOneQua1 = await oneQuaZero1.evaluate((el) => el.textContent);
//        expect(zeroOneQua1.trim()).toBe('Требуется ли хорошая кредитная история для оформления микрозайма под 0%?');
//        const oneAnsZero1 = await page.waitForSelector('div:nth-child(1) > .a_text');
//       //  const zeroOneAns1 = await oneAnsZero1.evaluate((el) => el.textContent);
//       //  expect(zeroOneAns1.trim()).toBe('Микрозаймы под 0% выдаем при любой кредитной истории. Мы не даем под 0% взаймы абсолютно всем без отказа без проверки кредитной истории, ни в одной МФО (микрофинансовой организации) нет одобрения 100%. Заявки на микрокредиты под 0% с плохой кредитной историей рассматриваем на общих основаниях - без справок, поручителей, посредников. Если вы попали в черный список какой-либо кредитной организации, то это не значит, что вам будут отказывать остальные.');
//        await delay(3000);

//        //Второй вопрос.  
//        const oneQuaZero2 = await page.waitForSelector('div:nth-child(2) > .q_name.open');
//        const zeroOneQua2 = await oneQuaZero2.evaluate((el) => el.textContent);
//        expect(zeroOneQua2.trim()).toBe('Можно ли получить займ под 0% без работы и без подтверждения дохода?');
//        const oneAnsZero2 = await page.waitForSelector('div:nth-child(2) > .a_text');
//       // const zeroOneAns2 = await oneAnsZero2.evaluate((el) => el.textContent);
//       // expect(zeroOneAns2.trim()).toBe('Займ под 0% безработным и работающим неофициально выдается на общих условиях. Отсутствие официального трудоустройства (указание работы в трудовой книжке) может влиять на выдачу самых крупных займов - на 100000 рублей;');
//        await delay(3000);

//        //Третий вопрос.  
//        const oneQuaZero3 = await page.waitForSelector('div:nth-child(3) > .q_name.open');
//        const zeroOneQua3 = await oneQuaZero3.evaluate((el) => el.textContent);
//        expect(zeroOneQua3.trim()).toBe('Какие документы нужны для получения микрокредита под 0%');
//        const oneAnsZero3 = await page.waitForSelector('div:nth-child(3) > .a_text');
//        const zeroOneAns3 = await oneAnsZero3.evaluate((el) => el.textContent);
//        expect(zeroOneAns3.trim()).toBe('Для получения займа под 0% нужен только паспорт гражданина РФ (без СНИЛС, ИНН)');
//        await delay(3000);

//        //Четвертый вопрос.  
//        const oneQuaZero4 = await page.waitForSelector('div:nth-child(4) > .q_name.open');
//        const zeroOneQua4 = await oneQuaZero4.evaluate((el) => el.textContent);
//        expect(zeroOneQua4.trim()).toBe('О беззалоговых микрокредитах Доброзайм');
//        const oneAnsZero4 = await page.waitForSelector('tbody > tr:nth-child(2) > td:nth-child(2)');
//        const zeroOneAns4 = await oneAnsZero4.evaluate((el) => el.textContent);
//        expect(zeroOneAns4.trim()).toBe('24/7/365');
//        await delay(3000);

//        //Пятый вопрос.  
//        const oneQuaZero5 = await page.waitForSelector('div:nth-child(5) > .q_name.open');
//        const zeroOneQua5 = await oneQuaZero5.evaluate((el) => el.textContent);
//        expect(zeroOneQua5.trim()).toBe('Каковы требования к карте для получения микрозайма под 0%?');
//        const oneAnsZero5 = await page.waitForSelector('div:nth-child(5) > .a_text');
//       //  const zeroOneAns5 = await oneAnsZero5.evaluate((el) => el.textContent);
//       //  expect(zeroOneAns5.trim()).toBe('24/7/365');
//        await delay(3000);

//        //Шестой вопрос.  
//        const oneQuaZero6 = await page.waitForSelector('div:nth-child(6) > .q_name.open');
//        const zeroOneQua6 = await oneQuaZero6.evaluate((el) => el.textContent);
//        expect(zeroOneQua6.trim()).toBe('Как получить займ под 0% без проверки кредитной истории и без отказа?');
//        const oneAnsZero6 = await page.waitForSelector('div:nth-child(6) > .a_text');
//       //  const zeroOneAns6 = await oneAnsZero6.evaluate((el) => el.textContent);
//       //  expect(zeroOneAns6.trim()).toBe('Проверка кредитной истории есть в любой МФО. Считаете, что конкретно у вас совсем небольшая вероятность получить под 0% в МФО? Мы не даем взаймы абсолютно всем, ни в одной МФО (микрофинансовой организации) нет одобрения 100%, но шанс на положительное решение есть и с плохой КИ, обращайтесь!');
//        await delay(3000);

//        //Седьмой вопрос.  
//        const oneQuaZero7 = await page.waitForSelector('div:nth-child(7) > .q_name.open');
//        const zeroOneQua7 = await oneQuaZero7.evaluate((el) => el.textContent);
//        expect(zeroOneQua7.trim()).toBe('Есть ли возможность продлить займ под 0%, если не успеваешь погасить вовремя?');
//        const oneAnsZero7 = await page.waitForSelector('div:nth-child(7) > .a_text');
//        const zeroOneAns7 = await oneAnsZero7.evaluate((el) => el.textContent);
//        expect(zeroOneAns7.trim()).toBe('Да, пролонгацию микрокредита под 0% можно произвести в личном кабинете.');
//        await delay(3000);

//        //Восьмой вопрос. 
//        const oneQuaZero8 = await page.waitForSelector('div:nth-child(8) > .q_name.open');
//        const zeroOneQua8 = await oneQuaZero8.evaluate((el) => el.textContent);
//        expect(zeroOneQua8.trim()).toBe('Займ под 0% должникам?');
//        const oneAnsZero8 = await page.waitForSelector('div:nth-child(8) > .a_text');
//        const zeroOneAns8 = await oneAnsZero8.evaluate((el) => el.textContent);
//        expect(zeroOneAns8.trim()).toBe('Заявка на займ под 0% должникам рассматривается на общих основаниях. Если у вас даже далеко не один открытый займ с просрочками, то шансы на получение микрозайма под 0% все равно остаются.');
//        await delay(3000);
//        //--------------------------Блок проверки текста ответов на соотвествие--------------------------
      
//        //Проверка инф. в крошках
//        const kukiZero = await page.waitForSelector('#bx_967703615_255877');
//        const zeroKuki = await kukiZero.evaluate((el) => el.textContent);
//        expect(zeroKuki.trim()).toBe('ООО МФК «Саммит», ОГРН 1117746346244, Адрес: 123007, г. Москва, ш. Хорошёвское, д.35, корпус 1 каб. 20. https://dobrozaim.ru/. Условия предоставления займа: Возраст: 19-90 лет; Срок: 7 дн.; Сумма: 1-15 тыс. руб.; ПСК: 292,000% в год; Процент: 0,80% в день; Неустойка: 0,054% в день. В случае возврата суммы займа в срок либо ранее срока, предусмотренного индивидуальными условиями Договора потребительского займа (микрозайма), фактически начисленные проценты, подлежат списанию в полном размере. В случае нарушений Заемщиком обязательства по возврату суммы займа, проценты, указанные в индивидуальных условиях потребительского Займа, подлежат начислению с даты, следующей за датой заключения Договора потребительского займа (микрозайма) и до даты фактического исполнения Заемщиком обязательства по возвращению суммы займа и уплаты начисленных на эту сумму процентов. Порядок и условия получения займа уточняйте в офисах или на сайте компании. Компания оставляет за собой право отказать в выдаче займа.');
//        await delay(3000);

//        //JSON
//        jsonResults.modWindowInvest = {
//           result: 1,
//           description: 'Проверка страницы "Займ под 0%" на сайте "dobrozaim',
//        };
//     } catch (e) {
//        jsonResults.modWindowInvest = {
//           result: 0,
//           description: 'Проверка страницы "Займ под 0%" на сайте "dobrozaim"',
//        };
//        throw e;
//     }
 });

 it('Проверка страницы "Как получить займ" на сайте "dobrozaim"', async () => {
   try {
      await page.goto(url, { waitUntil: 'load', timeout: 300000 });

       //Переход на страницу "Как получить займ" (через 'бургер')
       await page.waitForSelector('.header-flex-group > span.header__menu-but');
       await page.click('.header-flex-group > span.header__menu-but ');
       await delay(3000);
       await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(3) > a');
       await page.click('.header__menu.show-flex > div:nth-of-type(3) > a');
       await delay(7000);
 
       //Получаем URL текущей страницы
       const redirectedUrlHowZaim = page.url();
 
       //Сравниваем текущую страницу с указанной
       if (redirectedUrlHowZaim.includes('kak-poluchit-zaim')) {
         console.log('Редирект произошел на страницу "kak-poluchit-zaim"');
       } else {
        throw new Error('Падение Автотеста');
        };
       await delay(3000);

       //--------------------------проверка блока "Получить 100к.р уже сегодня"--------------------------
       //Проверка присутсвия блока с "Заполните заявку на займ"
       await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(2)');
       await page.waitForSelector('div:nth-of-type(2) > ._name > a[href^="/online/"]');
       await page.click('div:nth-of-type(2) > ._name > a[href^="/online/"]');
       await delay(3000);

       //Получаем URL текущей страницы
       const redirectedUrlHundred = page.url();
 
       //Сравниваем текущую страницу с указанной
       if (redirectedUrlHundred.includes('online')) {
         console.log('Редирект произошел на страницу "online"');
       } else {
        throw new Error('Падение Автотеста');
        };
       await delay(3000);

       //Вернуться на страницу "dobrozaim"
       await page.goBack({ waitUntil: 'load', timeout: 300000 });

       //Проверка присутсвия блока с "Узнать решение"
       await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(3)');
       await delay(3000);

       //Проверка присутсвия блока с "Получить деньги"
       await page.waitForSelector('.block.sect_1.sect_mgb > .wrap > .cont > div:nth-of-type(4)');
       await delay(3000);

       //Проверить переход в блоке "Получить деньги" -> "В офисах"
       await page.waitForSelector('.cont > div:nth-of-type(4) > div:nth-child(2) > a[href^="/kontakty/"]');
       await page.click('.cont > div:nth-of-type(4) > div:nth-child(2) > a[href^="/kontakty/"]');
       await delay(3000);

       //Получаем URL текущей страницы
       const redirectedUrlОffice = page.url();

       //Сравниваем текущую страницу с указанной
       if (redirectedUrlОffice.includes('kontakty')) {
        console.log('kontakty');
       } else {
        throw new Error('Падение Автотеста');
       };
       await delay(3000);

       //Вернуться на страницу "dobrozaim"
       await page.goBack({ waitUntil: 'load', timeout: 300000 });
       //-----------------------------------------------------------------------------------------------------

       //--------------------------Проверить присутвия кодов для установки МП--------------------------------
       //-- AppStore
       await page.waitForSelector('.block.sect_apps.sect_bottom.sect_mgb > .btn_block > a:nth-of-type(1)');
       await page.waitForSelector('.sect_mgb > .btn_block > a:nth-child(1) > img.qr.lazyloaded');
       await delay(3000);
      //  //-- Google play
      //  await page.waitForSelector('.block.sect_apps.sect_bottom.sect_mgb > .btn_block > a:nth-child(2)');
      //  await page.waitForSelector('.sect_mgb > .btn_block > a:nth-child(2) > img.qr.lazyload');
      //  await delay(3000);
      //  //-- Appgallery
      //  await page.waitForSelector('.block.sect_apps.sect_bottom.sect_mgb > .btn_block > a:nth-child(3)');
      //  await page.waitForSelector('.sect_mgb > .btn_block > a:nth-child(3) > img.qr.lazyload');
      //  await delay(3000);
      //  //-- Nashstore
      //  await page.waitForSelector('.block.sect_apps.sect_bottom.sect_mgb > .btn_block > a:nth-child(4)');
      //  await page.waitForSelector('.sect_mgb > .btn_block > a:nth-child(4) > img.qr.lazyload');
      //  await delay(3000);
       //-----------------------------------------------------------------------------------------------------







       //JSON
       jsonResults.modWindowInvest = {
         result: 1,
         description: 'Проверка страницы "Как получить займ" на сайте "dobrozaim',
      };
   } catch (e) {
      jsonResults.modWindowInvest = {
         result: 0,
         description: 'Проверка страницы "Как получить займ" на сайте "dobrozaim"',
      };
      throw e;
   }
});

  
    afterAll(async () => {
    if (browser) browser.close();
});
});
