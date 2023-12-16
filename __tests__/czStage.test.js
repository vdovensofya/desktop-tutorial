/*
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import 'regenerator-runtime';
import { url, dogovorComponents, urlScreens, patchlog, urlStage } from './others/config';
import {
	calculatorAvto,
  openQuaAvto,
	// checkCalcTwo,
	// checkCalcThree,
	// checkCalcFour,
	// sentToPo,
	// getDogovorMainPageFromPo,
	// textSpace, 
  delay } from './others/helpers';
import { writeFileSync } from 'fs';
import { SERVFAIL } from 'dns';
import { error, time } from 'console';
import { Int } from 'mssql';
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


    it('Проверка страницы Жалоб  на сайте "site-test4.dobrozaim"', async () => {
    //  try {
    //     //Указываем урл, не будет продолжать автотест пока страница не загрузиться
    //     await page.goto(urlStage, { waitUntil: 'load', timeout: 300000 });

    //     //Ищем бургер и кликаем
    //     const headerMenuBut = 'span.header__menu-but';
    //     await page.waitForSelector(headerMenuBut);
    //     await page.click(headerMenuBut);
    //     await delay(3000);

    //     //Ищем кнопку Пожаловаться
    //     await page.waitForSelector('a.header__but.header__help.header__help-bottom');
    //     await page.click('a.header__but.header__help.header__help-bottom');
    //     await delay(3000);

    //     //Проверка номера телефона
    //     const helpPhone = await page.waitForSelector('.block.mgb.top nobr');
    //     const phoneHelp = await helpPhone.evaluate((el) => el.textContent);
    //     expect(phoneHelp.trim()).toBe('8 (800) 775 25 45');
    //     await delay(1000);

    //     //Проверка перехода на страницу "Вопросы и ответы"
    //     await page.waitForSelector('a._btn.green');
    //     await page.click('a._btn.green');
    //     await delay(10000);
       
    //   //   //Получаем URL текущей страницы
       
    //   //   const redirectedUrlOne = page.url();

    //   //  //Сравниваем текущую страницу с указанной
    //   //   if (redirectedUrlOne.includes('centrzaimov')) {
    //   //   console.log('Редирект произошел на страницу "centrzaimov"');
    //   //   } else {
    //   //   throw new Error('Падение Автотеста');
    //   //   };
       
    //     //редирект на страницу Жалоб
    //     await page.goBack({ waitUntil: 'load', timeout: 300000 });
        
    //     //Ввожу в поле данные клиента
    //     await page.waitForSelector('.zhaloba_block');
    //     await page.type('input._name_1.ym-record-keys', 'Тест');
    //     await page.type('input.mphone.ym-record-keys', '+79991240000');
    //     await page.type('input._lat.email.ym-record-keys', '123@mail.ru');
    //     await page.waitForSelector('.field > textarea.msg.ym-record-keys');
    //     await page.type('textarea.msg.ym-record-keys', 'Проводим Тест');
    //     await delay(1000);

    //     //Проверить чек бокс о согласии персональных данных
    //     await page.waitForSelector('.data_block > ._box > .chbx_radio._agree.check');
    //     await page.click('.data_block > ._box > .chbx_radio._agree.check');
    //     await delay(1000);

    //     //Открыть документ о согласии персональных данных
    //     await page.waitForSelector('.data_block > ._box > .descr > .link.n_pers_d');
    //     await page.click('.data_block > ._box > .descr > .link.n_pers_d');
    //     await delay(1000);

    //     //Закрыть документ о согласии персональных данных (почему ошибка?)
    //     await page.waitForSelector('button.btn.cancel');
    //     await page.click('button.btn.cancel');
    //     await delay(3000);

    //     // Согласиться на обработку персональных данных
    //     await page.waitForSelector('.data_block > ._box > .chbx_radio._agree');
    //     await page.click('.data_block > ._box > .chbx_radio._agree');
    //     await delay(1000);

    //     //Проверка номера телефона1 в блоке "Есть вопросы? Звони!"
    //     const helpPhone2 = await page.waitForSelector('.cont > a:nth-of-type(1) > nobr');
    //     const phoneHelp2 = await helpPhone2.evaluate((el) => el.textContent);
    //     expect(phoneHelp2.trim()).toBe('8 (800) 775 59 75');
    //     await delay(1000);

    //     //Проверка номера телефона2 в блоке "Есть вопросы? Звони!"
    //     const helpPhone3 = await page.waitForSelector('a:nth-of-type(2) > nobr');
    //     const phoneHelp3 = await helpPhone3.evaluate((el) => el.textContent);
    //     expect(phoneHelp3.trim()).toBe('8 (916) 779 66 28');
    //     await delay(1000);

    //     // Отправить жалобу или предложение
    //     await page.waitForSelector('button._btn.green.form__send');
    //     await page.click('button._btn.green.form__send');
    //     await delay(3000);

    //     // // Подняться наверх
    //     // await page.waitForSelector('#totop_btn');
    //     // await page.click('#totop_btn');
    //     // await delay(3000);

   //         //JSON
   //         jsonResults.autoLoanStage = {
   //             result: 1,
   //             description: 'Проверка страницы "Автозалога" на сайте "site-test4.dobrozaim"',
   //         };
   //     } catch (e) {
   //         jsonResults.autoLoanStage = {
   //             result: 0,
   //             description: 'Проверка страницы "Автозалога" на сайте "site-test4.dobrozaim"',
   //         };
   //         throw e;
   //     }
   });

   it('Проверка страницы "Автозалога" на сайте "site-test4.dobrozaim"', async () => {
      //  try {

      //   //Указываем урл, не будет продолжать автотест пока страница не загрузиться
      //   await page.goto(urlStage, { waitUntil: 'load', timeout: 300000 });

      //   // Переходим на страницу "Займ до 1мР."
      //   await page.waitForSelector('a[href^="/zaimy/dengi-pod-zalog-pts/"]');
      //   await page.click('a[href^="/zaimy/dengi-pod-zalog-pts/"]');

      //   // Получаем URL текущей страницы
      //   const redirectedUrlAvto = page.url();

      //   //Сравниваем текущую страницу с указанной
      //   if (redirectedUrlAvto.includes('zaimy/dengi-pod-zalog-pts')) {
      //       console.log('Редирект произошел на страницу "zaimy/dengi-pod-zalog-pts"');
      //      } else {
      //         throw new Error('Падение Автотеста');
      //     };
      //   await delay(3000);

      //   //Проверка калькулятора 126к/13мес
      //   await calculatorAvto(126000, 13, page);
      //   const infReturn1 = await page.waitForSelector('._vozvrat_block > .cont > .plateg')
      //   const returnInf1 = await infReturn1.evaluate((el) => el.textContent);
      //   expect(returnInf1.trim()).toBe('по 16 480.66 р. в месяц');
    
      //   //Проверка калькулятора 411к/15мес
      //   await calculatorAvto(411000, 15, page);
      //   const infReturn2 = await page.waitForSelector('._vozvrat_block > .cont > .plateg');
      //   const returnInf2 = await infReturn2.evaluate((el) => el.textContent);
      //   expect(returnInf2.trim()).toBe('по 49 820.14 р. в месяц');

      //   //Проверка калькулятора 810к/3мес
      //   await calculatorAvto(810000, 3, page);
      //   const infReturn3 = await page.waitForSelector('._vozvrat_block > .cont > .plateg');
      //   const returnInf3 = await infReturn3.evaluate((el) => el.textContent);
      //   expect(returnInf3.trim()).toBe('по 317 772.58 р. в месяц');

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

      //   //Заполнить данные клиента - отчество
      //   await page.waitForSelector('#auto_name_o');
      //   await page.type('input#auto_name_o', 'Иванович');
      //   await delay(2000); 

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

    it('Проверка отправки заявки на странице "Инвестиции" на сайте "site-test4.dobrozaim"', async () => {
      try {
       await page.goto(urlTest, { waitUntil: 'load', timeout: 300000 });
  
       //Переход на страницу инвестиций(через 'бургер')
       await page.waitForSelector('.header-flex-group > span.header__menu-but');
       await page.click('.header-flex-group > span.header__menu-but ');
       await delay(3000);
       await page.waitForSelector('.header__menu.show-flex > div:nth-of-type(6) > a');
       await page.click('.header__menu.show-flex > div:nth-of-type(6) > a');
       await delay(7000);
  
       //Получаем URL текущей страницы
       const redirectedUrlInvest = page.url();
  
       //Сравниваем текущую страницу с указанной
        if (redirectedUrlInvest.includes('/investicii-v-microzajmy/')) {
          console.log('Редирект произошел на страницу "/investicii-v-microzajmy/"');
        } else {
         throw new Error('Падение Автотеста');
         };
       await delay(3000);
  
       //Проверка кликабельность варианта "Выплата процентов" на капитализации
       await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.opt_line.cap > ._tab');
       await page.click('.tabs.opt_line.cap > ._tab');
       await delay(3000);
  
        //  //Проверка кликабельность варианта "Выплата процентов" на ежемесячно - !!!сомнительный селектор!!!
        //  await page.waitForSelector('._left > .tabs.opt_line.cap > div:nth-child(1)');
        //  await page.click('._left > .tabs.opt_line.cap > div:nth-child(1)');
        //  await delay(3000);
  
       //Проверка кликабельность варианта "Для кого" на ЮР.Л.
       await page.waitForSelector('.choose_face > div:nth-child(3)');
       await page.click('.choose_face > div:nth-child(3)');
       await delay(3000);
       
       //----------------------------------Проверка калькулятора по юр. л.----------------------------------
       //Проверка суммы ЮР.Л. в 30млР (Граничное значение на 20 лет + ставка 15%)
       await calcInvect(30000000, 240, page);
       await delay(3000);
       const facelegal1 = await page.waitForSelector('.val.lead_text.inv-result');
       const legalFace1 = await facelegal1.evaluate((el) => el.textContent);
       expect(legalFace1.trim()).toBe('120 000 000.00 ₽');
       const legalPercent1 = await page.waitForSelector('.v.bigprocent');
       const percentLegal1 = await legalPercent1.evaluate((el) => el.textContent);
       expect(percentLegal1.trim()).toBe('15%');
  
       //Проверка суммы ЮР.Л. в 15млР (Среднее значение на 2 года + ставка 14%)
       await calcInvect(15000000, 24, page);
       await delay(3000);
       const facelegal2 = await page.waitForSelector('.val.lead_text.inv-result');
       const legalFace2 = await facelegal2.evaluate((el) => el.textContent);
       expect(legalFace2.trim()).toBe('19 200 000.00 ₽');
       const legalPercent2 = await page.waitForSelector('.v.bigprocent');
       const percentLegal2 = await legalPercent2.evaluate((el) => el.textContent);
       expect(percentLegal2.trim()).toBe('14%');
  
       //Проверка суммы ЮР.Л. в 15млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
       await calcInvect(15000000, 13, page);
       await delay(3000);
       const facelegal3 = await page.waitForSelector('.val.lead_text.inv-result');
       const legalFace3 = await facelegal3.evaluate((el) => el.textContent);
       expect(legalFace3.trim()).toBe('17 275 000.00 ₽');
       const legalPercent3 = await page.waitForSelector('.v.bigprocent');
       const percentLegal3 = await legalPercent3.evaluate((el) => el.textContent);
       expect(percentLegal3.trim()).toBe('14%');
  
       //Проверка суммы ЮР.Л. в 15млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
       await calcInvect(15000000, 12, page);
       await delay(3000);
       const facelegal4 = await page.waitForSelector('.val.lead_text.inv-result');
       const legalFace4 = await facelegal4.evaluate((el) => el.textContent);
       expect(legalFace4.trim()).toBe('16 950 000.00 ₽');
       const legalPercent4 = await page.waitForSelector('.v.bigprocent');
       const percentLegal4 = await legalPercent4.evaluate((el) => el.textContent);
       expect(percentLegal4.trim()).toBe('13%');
  
       //Проверка сумму ЮР.Л. в 500к (Граничное значение на 6 месяцев + ставка 13%)
       await calcInvect(500000, 6, page);
       await delay(3000);
       const facelegal5 = await page.waitForSelector('.val.lead_text.inv-result');
       const legalFace5 = await facelegal5.evaluate((el) => el.textContent);
       expect(legalFace5.trim()).toBe('532 500.00 ₽');
       const legalPercent5 = await page.waitForSelector('.v.bigprocent');
       const percentLegal5 = await legalPercent5.evaluate((el) => el.textContent);
       expect(percentLegal5.trim()).toBe('13%');
       //----------------------------------Проверка калькулятора по юр. л.----------------------------------
       
       //------------------------------------Проверка калькулятора по ИП. ------------------------------------
       //Проверка кликабельность варианта "Для кого" на ИП
       await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.choose_face > div:nth-child(2)');
       await page.click('.choose_face > div:nth-child(2)');
       await delay(3000);
  
       //Проверка суммы ИП в 30млР (Граничное значение на 20 лет + ставка 16%)
       await calcInvect(30000000, 240, page);
       await delay(3000);
       const faceUp1 = await page.waitForSelector('.val.lead_text.inv-result');
       const upFace1 = await faceUp1.evaluate((el) => el.textContent);
       expect(upFace1.trim()).toBe('126 000 000.00 ₽');
       const UpPercent1 = await page.waitForSelector('.v.bigprocent');
       const percentUp1 = await UpPercent1.evaluate((el) => el.textContent);
       expect(percentUp1.trim()).toBe('16%');
  
       //Проверка суммы ИП в 20млР (Среднее значение на 2 года + ставка 14%)
       await calcInvect(20000000, 24, page);
       await delay(3000);
       const faceUp2 = await page.waitForSelector('.val.lead_text.inv-result');
       const upFace2 = await faceUp2.evaluate((el) => el.textContent);
       expect(upFace2.trim()).toBe('25 600 000.00 ₽');
       const UpPercent2 = await page.waitForSelector('.v.bigprocent');
       const percentUp2 = await UpPercent2.evaluate((el) => el.textContent);
       expect(percentUp2.trim()).toBe('14%');
  
       //Проверка суммы ИП в 15,5млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
       await calcInvect(15500000, 13, page);
       await delay(3000);
       const faceUp3 = await page.waitForSelector('.val.lead_text.inv-result');
       const upFace3 = await faceUp3.evaluate((el) => el.textContent);
       expect(upFace3.trim()).toBe('17 850 833.33 ₽');
       const UpPercent3 = await page.waitForSelector('.v.bigprocent');
       const percentUp3 = await UpPercent3.evaluate((el) => el.textContent);
       expect(percentUp3.trim()).toBe('14%');
  
       //Проверка суммы ИП в 15млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
       await calcInvect(15000000, 12, page);
       await delay(3000);
       const faceUp4 = await page.waitForSelector('.val.lead_text.inv-result');
       const upFace4 = await faceUp4.evaluate((el) => el.textContent);
       expect(upFace4.trim()).toBe('16 950 000.00 ₽');
       const UpPercent4 = await page.waitForSelector('.v.bigprocent');
       const percentUp4 = await UpPercent4.evaluate((el) => el.textContent);
       expect(percentUp4.trim()).toBe('13%');
  
       //Проверка суммы ИП в 1,5млР (Граничное значение на 6 месяцев + ставка 13%)
       await calcInvect(1500000, 6, page);
       await delay(3000);
       const faceUp5 = await page.waitForSelector('.val.lead_text.inv-result');
       const upFace5 = await faceUp5.evaluate((el) => el.textContent);
       expect(upFace5.trim()).toBe('1 597 500.00 ₽');
       const UpPercent5 = await page.waitForSelector('.v.bigprocent');
       const percentUp5 = await UpPercent5.evaluate((el) => el.textContent);
       expect(percentUp5.trim()).toBe('13%');
       //------------------------------------Проверка калькулятора по ИП. ------------------------------------

       //----------------------------------Проверка калькулятора по Физ. л. ----------------------------------
       //Проверка кликабельность варианта "Для кого" на Физ.лиц.
       await page.evaluate((selector) => document.querySelector(selector).click(), '.tabs.choose_face > div:nth-child(1)');
       await page.click('.choose_face > div:nth-child(1)');
       await delay(3000);
  
       //Проверка суммы ФИЗ.Л. в 30млР (Граничное значение на 20 лет + ставка 16%)
       await calcInvect(30000000, 240, page);
       await delay(3000);
       const facePhysical1 = await page.waitForSelector('.val.lead_text.inv-result');
       const physicallFace1 = await facePhysical1.evaluate((el) => el.textContent);
       expect(physicallFace1.trim()).toBe('126 000 000.00 ₽');
       const physicallPercent1 = await page.waitForSelector('.v.bigprocent');
       const percentphysicall1 = await physicallPercent1.evaluate((el) => el.textContent);
       expect(percentphysicall1.trim()).toBe('16%');
  
       //Проверка суммы ФИЗ.Л. в 18млР (Среднее значение на 2 года + ставка 14%)
       await calcInvect(18000000, 24, page);
       await delay(3000);
       const facePhysical2 = await page.waitForSelector('.val.lead_text.inv-result');
       const physicallFace2 = await facePhysical2.evaluate((el) => el.textContent);
       expect(physicallFace2.trim()).toBe('23 040 000.00 ₽');
       const physicallPercent2 = await page.waitForSelector('.v.bigprocent');
       const percentphysicall2 = await physicallPercent2.evaluate((el) => el.textContent);
       expect(percentphysicall2.trim()).toBe('14%');
  
       //Проверка суммы ФИЗ.Л. в 8млР (Среднее значение на приграничное 13 месяцев + ставка 14%)
       await calcInvect(8000000, 13, page);
       await delay(3000);
       const facePhysical3 = await page.waitForSelector('.val.lead_text.inv-result');
       const physicallFace3 = await facePhysical3.evaluate((el) => el.textContent);
       expect(physicallFace3.trim()).toBe('9 213 333.33 ₽');
       const physicallPercent3 = await page.waitForSelector('.v.bigprocent');
       const percentphysicall3 = await physicallPercent3.evaluate((el) => el.textContent);
       expect(percentphysicall3.trim()).toBe('14%');
  
       //Проверка суммы ФИЗ.Л. в 5млР (Среднее значение на приграничное 12 месяцев + ставка 13%)
       await calcInvect(5000000, 12, page);
       await delay(3000);
       const facePhysical4 = await page.waitForSelector('.val.lead_text.inv-result');
       const physicallFace4 = await facePhysical4.evaluate((el) => el.textContent);
       expect(physicallFace4.trim()).toBe('5 650 000.00 ₽');
       const physicallPercent4 = await page.waitForSelector('.v.bigprocent');
       const percentphysicall4 = await physicallPercent4.evaluate((el) => el.textContent);
       expect(percentphysicall4.trim()).toBe('13%');
  
       //Проверка суммы ФИЗ.Л. в 1,5млР (Граничное значение на 6 месяцев + ставка 18%)
       await calcInvect(1500000, 6, page);
       await delay(3000);
        //  const facePhysical5 = await page.waitForSelector(await '.val.lead_text.inv-result');
        //  const physicallFace5 = await facePhysical5.evaluate((el) => el.textContent);
        //  expect(physicallFace5.trim()).toBe('1 635 000.00 ₽');
        //  const physicallPercent5 = await page.waitForSelector(await '.v.bigprocent');
        //  const percentphysicall5 = await physicallPercent5.evaluate((el) => el.textContent);
        //  expect(percentphysicall5.trim()).toBe('18%');
       //----------------------------------Проверка калькулятора по Физ. л. ----------------------------------
       
       //Перезагрузка страницы для Корректной работы автотеста 
       await page.reload({ waitUntil: 'load', timeout: 300000 });
       await delay(3000);
  
       //Проверка открытия Графика по ФИЗ.Л.
       await page.evaluate((selector) => document.querySelector(selector).click(), '#calc > .calc_cont > ._right._box.green_light > span');
       await page.click('#calc > .calc_cont > ._right._box.green_light > span');
       await delay(3000); 
  
        //  //Перехват 1
        //  await page.setRequestInterception(true);
  
        //  //Проверка скачать графика
        //  await page.evaluate((selector) => document.querySelector(selector).click(), '#grafik_save > span');
        //  await page.click('#grafik_save > span');
        //  await delay(5000);
  
        //  //Перехват 2
        //  await waitWithTimeout(page, 'request', 50000);
        //  page.on('request', interceptedRequest => {
        //    if  (
        //     interceptedRequest.url().endsWith('.png') ||
        //     interceptedRequest.url().endsWith('.jpg') ||
        //     interceptedRequest.url().endsWith('.pdf')
        //    )
        //     interceptedRequest.abort();
        //    else interceptedRequest.continue();
        //  });
  
  
       //Проверка закрытия Графика по ФИЗ.Л.
       await page.evaluate((selector) => document.querySelector(selector).click(), '#calc > .calc_cont > ._right._box.green_light > span');
       await page.click('#calc > .calc_cont > ._right._box.green_light > span');
       await delay(3000); 
  
       //Проверить актуальность номера Руководителя отдела инвестиции
       await page.waitForSelector('body > div.investors_page');
       await page.waitForSelector('._pers-contacts > div:nth-child(1) > p > a[href^="tel:88006009226"]');
       await delay(3000);
       const TelInvect = await page.waitForSelector('._pers-contacts > div:nth-child(1) > p > a[href^="tel:88006009226"]');
       const invectTel = await TelInvect.evaluate((el) => el.textContent);
       expect(invectTel.trim()).toBe('8 (800) 600 92 26');
       await delay(3000);
  
       //Заполнить данные на перезвон клиентА - ФИО
       await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
       await page.waitForSelector('div:nth-child(3) > form > div:nth-child(1) > div > input.na_name');
       await page.type('input.na_name', 'Иванович');
       await delay(2000);
  
       //Заполнить данные на перезвон клиентА - Телефон
       await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
       await page.waitForSelector('div:nth-child(3) > form > div:nth-child(2) > div > input.na_phone');
       await page.type('input.na_phone', '9991237565');
       await delay(2000);
  
       //Отправить заявку клиентА на перезвон
       await page.waitForSelector('.sect.mgb.pd.sect_green._pers-block');
       await page.evaluate((selector) => document.querySelector(selector).click(), 'div:nth-child(3) > form > ._btn.investors-page__pers-form-but.recall');
       await page.click('._btn.investors-page__pers-form-but.recall');
       await delay(3000);
  
       //Закрыть заявку на перезвон
       await page.waitForSelector('#msg_popup > .modal-dialog > .modal-content._sh > .close');
       await page.click('#msg_popup > .modal-dialog > .modal-content._sh > .close');
       await delay(5000);
  
        //  //Проверка работоспособности на открытие/закрытие вопросов
        //  await openQuaInvest(1, page);
        //  await delay(3000);
        //  await openQuaInvest(2, page);
        //  await delay(3000);
        //  await openQuaInvest(3, page);
        //  await delay(3000);
        //  await openQuaInvest(4, page);
        //  await delay(3000);
  
        // //  Проверка работоспособности на открытие/закрытие вопросов - в функции не видит 5 вопрос
        //   await openQuaInvest(5, page);
        //   await delay(3000);
        // //  await page.evaluate((selector) => document.querySelector(selector).click(), '.q_block div:nth-child(5) div.q_name.title_4');
        // //  await page.click('.q_block div:nth-child(5) div.q_name.title_4');
        // //  await delay(3000);
  
        //  await openQuaInvest(6, page);
        //  await delay(3000);
        //  await openQuaInvest(7, page);
        //  await delay(10000);
  
       //Проверка работоспособности перехода в Телеграмм
       await page.waitForSelector('._txt > a[href^="https://t.me/summit_investments"]');
       await page.click('._txt > a[href^="https://t.me/summit_investments"]');
       await delay(3000);
  
       //Вернуться на страницу Инвестиции
       await page.goBack({ waitUntil: 'load', timeout: 300000 });
  
       //Проверить стрелку вверх к калькулятору
       await page.waitForSelector('#totop_btn');
       await page.click('#totop_btn');
       await delay(3000);
  
       //Открыть модальное окно "Инвестировать" под калькулятором
       await page.waitForSelector('._right._box.green_light > ._btn.calc_inv');
       await page.click('._right._box.green_light > ._btn.calc_inv');
       await delay(3000);
  
       //Заполнение данных клиента - ФИО
       await page.waitForSelector('#calc_inv .modal-body ._fio input');
       await page.type('#calc_inv .modal-body ._fio input', 'Автотест');
       await delay(1000);
  
       //Заполнение данных клиента - Телефон
       await page.waitForSelector('#calc_inv .modal-body input.form-control._phone');
       await page.type('#calc_inv .modal-body input.form-control._phone', '9041111111');
       await delay(1000);
  
       //Заполнение данных клиента - Почта
       await page.waitForSelector('#calc_inv .modal-body input.form-control.na_email');
       await page.type('#calc_inv .modal-body input.form-control.na_email', 'test@mail.ru');
       await delay(1000);
  
       //Заполнение данных Капчи
       await page.waitForSelector('#captcha_word');
       await page.type('#captcha_word', '11111');
       await delay(1000);
  
       //Отправка заявки на инвестирование
       await page.waitForSelector('.btn.inv_zayavka');
       await page.click('.btn.inv_zayavka');
       await delay(1000);
  
       //Закрытия мод.окна после отправки заявки
       await page.waitForSelector('.btn.green.cancel');
       await page.click('.btn.green.cancel');
       await delay(1000);
  
       //Проверка перехода в КаДоброзайм 
       await page.waitForSelector('._right._box.green_light > ._btn.white.ka');
       await page.click('._right._box.green_light > ._btn.white.ka');
       await delay(3000);
         
       //JSON
        jsonResults.modWindowInvest = {
          result: 1,
          description: 'Проверка отправки заявки на странице "Инвестиции" на сайте "site-test4.dobrozaim"',
         };
      } catch (e) {
         jsonResults.modWindowInvest = {
            result: 0,
            description: 'Проверка отправки заявки на странице "Инвестиции" на сайте "site-test4.dobrozaim"',
         };
         throw e;
      }
   });

    
    afterAll(async () => {
    if (browser) browser.close();
});
});
