/*
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import 'regenerator-runtime';
import { sqlConfigStage, urlStage, patchlog } from './others/Step/config';
import {
	calcPablik, getKeypartOne, getKeypartTwo, dataClient, getAspkeyPart, AutoApproveFPSandKI,
	 pageLoanTimeStage, pageLoanTimeStageThree, searchAndClick, searchAndFill, stopwatch, 
} from './others/Step/helpers';
let jsonResults = {};
const stageStart = new Date();

//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
describe('Regular customer check "site-test4.dobrozaim"', () => {
	let browser;
	let page;
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			args: [`--mobile-size=480,853`, '--no-sandbox'],
			defaultViewport: {
				width: 480,
				height: 853,
			},
		});
		page = await browser.newPage();
	});

	it('Loan through a public calculator of a constant (CZ_Stage)', async () => {
		try {

			//------------------Достаем атоматически данные клиента ------------------
			//KEYPART клиента
			global.GET_KEYPART = await getKeypartOne();
			//За счет запроса берем KEYPART и вытаскиваем данные для входа
			const fact = await dataClient(global.GET_KEYPART);
			console.log(global.GET_KEYPART)
			//Номер клиента
			const number = fact[0];
			console.log(number);
			//День рождение клиента
			const birth = fact[1];
			console.log(birth);
			//-------------------------------------------------------------------------
			
			//Загрузка главной страницы
			await page.goto(urlStage, pageLoanTimeStage(page));
			
			//Выбор суммы и срока
			await calcPablik(70000, 168, page);
			await searchAndClick('[data-testid="public__calculator button__loan"]', page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Ввод номера телефона
			await searchAndFill('[data-testid="public__calculator authorization__phone"]', await number, page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Нажатие кнопки "Получить код"
			await searchAndClick(".verify-overlay > .modal.verification-block-phone form[name='phone-form']  .btn", page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Нажатие чекбокса
			await searchAndClick('label', page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Ввод кода
			await searchAndFill("#block-submit [type]", '1234', page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree();

			//Нажатие кнопки "Продолжить"
			await searchAndClick('.get-ident.green-button', page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Ввод даты рождения
			await searchAndFill('input#BIRTH_DATE', await birth, page);

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//Нажатие кнопки "Подтвердить"
			await searchAndClick('.confirm-ident.green-button.questionnaire-button__inline', page);
			// !!!!!!НЕ УБИРАТЬ, БЕЗ ТАЙМЕРА НЕ РАБОТАЕТ, сразу выходит console.log('Кнопки нет, клиент перешел на 31 шаг');
			await delay(10000);

   //Может выйти калькулятор онлайн, если выходит -> нажать взять, если нету то пройти дальше
			const isButtonPresent = await page.evaluate(() => {
			return document.querySelector('.loan-content-html.loan-content-html-with-padding.col-xs-12 > .nav-btn-groupe > button') !== null;
			})

			if (isButtonPresent) {
				await searchAndClick('.loan-content-html.loan-content-html-with-padding.col-xs-12 > .nav-btn-groupe > button', page);
					// !!!!!!НЕ УБИРАТЬ, БЕЗ ТАЙМЕРА НЕ РАБОТАЕТ, сразу выходит console.log('Кнопки нет, клиент перешел на 31 шаг');
				await delay(5000);
			} else {
				console.log('Кнопки нет, клиент перешел на 31 шаг');
	}

			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.stepLoanPublicCalc = {
				result: 1,
				description: ':idea: Loan through a public calculator(Regular) :idea:' + resultTime + ' (second)',
				leadTime: resultTime,
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.stepLoanPublicCalc = {
				result: 0,
				description: ':!: Loan through a public calculator(Regular) :!:' + resultTime + ' (second)',
				leadTime: resultTime,
			};
			throw e;
		}
	});

	it('Full name, passport details, addresses of a constant (step 31)', async () => {
		try {
			await page.waitForSelector('#LAST_NAME');
			// ------------------Фамилия------------------
			const isFieldReadonly = await page.$eval('#LAST_NAME', (field) => {
				return field.readOnly;
			});

			if (isFieldReadonly) {
				console.log('Поле содержит атрибут readonly');
			} else {
				throw new Error('Падение Автотеста, Поле не содержит атрибут readonly')
			}

			//Ожидание завершения загрузки страницы(принудительное прекращение)
			await pageLoanTimeStageThree(page);

			//------------------Имя------------------
			await page.waitForSelector('#NAME');
			await pageLoanTimeStageThree(page);

			//------------------Отчество------------------
			await page.waitForSelector('#SURNAME');
			await pageLoanTimeStageThree(page);

			//------------------Дата рождения------------------
			await page.waitForSelector('#DATE_BIRTH');
			await pageLoanTimeStageThree(page);

			//------------------Выбрать чек-бокс рекламы------------------
			await searchAndClick('label.questionnaire-field__checkbox', page);
			await pageLoanTimeStageThree(page);

			//------------------Подставить Майл------------------
			await page.waitForSelector('#EMAIL');
			await page.evaluate(() => { document.querySelector('#EMAIL').value = ''; });
			await page.type('#EMAIL', '1234@mail.ru');
			await pageLoanTimeStageThree(page);

			//------------------проверка чек-бокса------------------
			await searchAndClick('#EMAIL_LABEL_CHECKBOX', page);
			await pageLoanTimeStageThree(page);

			//------------------Серия и номер------------------
			await page.waitForSelector('#IDENTITY_SERIES_NUM');
			await pageLoanTimeStageThree(page);

			//------------------Код подразделения------------------
			await page.waitForSelector('#IDENTITY_CODE_ISSUED');
			await pageLoanTimeStageThree(page);

			//------------------Дата выдачи------------------
			await page.waitForSelector('#IDENTITY_DATE_ISSUED');
			await pageLoanTimeStageThree(page);

			//------------------Кем выдан------------------
			await page.waitForSelector('#IDENTITY_NAME_ISSUED');
			await pageLoanTimeStageThree(page);
			
			//------------------Место рождения------------------
			await page.waitForSelector('#BIRTH_PLACE');
			await pageLoanTimeStageThree(page);

			//------------------Вид жилья------------------
			await page.waitForSelector('#TYPE_HOUSING');
			await pageLoanTimeStageThree(page);

			//Пройти далее, на 16 шаг
			await searchAndClick('.next-button', page);
			await pageLoanTimeStageThree(page);

			//Согласие с данными на 31 шаге
			await searchAndClick('#button_yes', page);
			await pageLoanTimeStageThree(page);

			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.clientVerificationAtStepThirtyOne = {
				result: 1,
				description: ':idea: Checking a regular customer in step 31 :idea: ' + resultTime + ' (second)',
				leadTime: resultTime,
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.clientVerificationAtStepThirtyOne = {
				result: 0,
				description: ':!: Checking a regular customer in step 31 :!: ' + resultTime + ' (second)',
				leadTime: resultTime,
			};
			throw e;
		}
	});

	it('Field of activity, salary of a constant (step 16)', async () => {
		try {
			//Выбрать основной источник дохода 
			await page.waitForSelector('select#INCOME_SOURCE');
			await page.select('#INCOME_SOURCE', '11');
			await pageLoanTimeStageThree(page);

			//Вставить ежемесячный доход
			await page.waitForSelector('input#qwe16-41');
			await page.evaluate(() => { document.querySelector('input#qwe16-41').value = ''; });
			await page.type('input#qwe16-41', '10000');
			await pageLoanTimeStageThree(page);

			//Пройти далее, на 34 шаг
			await searchAndClick('.green-button:nth-child(2)', page);
			await pageLoanTimeStageThree(page);

			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.fieldOfActivity = {
				result: 1,
				description: ':idea: Field of activity, salary of a constant (step 16) :idea:' + resultTime + ' (second)',
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.fieldOfActivity = {
				result: 0,
				description: ':!: Field of activity, salary of a constant (step 16) :!:' + resultTime + ' (second)',
			};
			throw e;
		}
	});

	it('Add. questions (convicted, bankrupt) + Signing the application form (SMS code) of a constant (step 34)', async () => {
		try {
			//Нажать чек-бокс о судебных спорах
			await searchAndClick('#LIGITATION_NO', page);
			await pageLoanTimeStageThree(page);

			//Нажать чек-бокс о банкротстве
			await searchAndClick('#BANKRUPTCY_NO', page);
			await pageLoanTimeStageThree(page);

			//Нажать чек-бокс об автомобиле
			await searchAndClick('#HAVE_AUTO_YES', page);
			await pageLoanTimeStageThree(page);

			//Выбрать о продуктах сбербанка
			await page.waitForSelector('select#CREDIT_SBERBANK');
			await page.select('#CREDIT_SBERBANK', '2');
			await pageLoanTimeStageThree(page);

			//Открыть Анкету
			await searchAndClick('.label-collapsed', page);
			await pageLoanTimeStageThree(page);

			//Закрыть Анкету 
			await searchAndClick('.label-expanded', page);
			await pageLoanTimeStageThree(page);

			//Согласиться с данными 
			await searchAndClick('.document-body-doc-panel-label > label:nth-child(3)', page);
			await pageLoanTimeStageThree(page);

			//Пройти далее
			await searchAndClick('.green-button:nth-child(2)', page);
			await pageLoanTimeStageThree(page);

			//Зная клиента отправляю запрос на код АСП
			const codeAsp = await getAspkeyPart(global.GET_KEYPART);
			console.log(codeAsp);

			//Внести код АСП
			await searchAndFill('#asp_input_suit', await codeAsp, page);
			await pageLoanTimeStageThree(page);

			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.signingTheForm = {
				result: 1,
				description: ':idea: Add. questions (convicted, bankrupt) + Signing the application form (SMS code) of a constant (step 34) :idea:' + resultTime + ' (second)',
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.signingTheForm = {
				result: 0,
				description: ':!: Add. questions (convicted, bankrupt) + Signing the application form (SMS code) of a constant (step 34) :!:' + resultTime + ' (second)',
			};
			throw e;
		}
	});

	it('Confirmation of the card from the resident (step 28)', async () => {
		try {

			//Выбрать карту
			await searchAndClick('.card-buttons', page);
			await pageLoanTimeStageThree(page);

			// Пройти далее
			await searchAndClick('.green-button:nth-child(1)', page);
			await pageLoanTimeStageThree(page);

			await page.reload('https://site-test4.dobrozaim.ru/online/');
   
			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 1,
				description: ':idea: Confirmation of the card from the resident (step 28) :idea:' + resultTime + ' (second)',
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 0,
				description: ':!: Confirmation of the card from the resident (step 28) :!:' + resultTime + ' (second)',
			};
			throw e;
		}
	});

		it('Transfer the client to step 32 (indicate approval)', async () => {
			try {
			
			//Не согласиться с игрой
			await searchAndClick('.modal-game-close', page);
			await pageLoanTimeStageThree(page);

			//Автоматическое провставления одобрения

			await AutoApproveFPSandKI(global.GET_KEYPART)
			await pageLoanTimeStageThree(page);

			//Обновить страницу 
			await page.reload('https://site-test4.dobrozaim.ru/online/');
			await pageLoanTimeStageThree(page);
		
			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 1,
				description: ':idea: Transfer the client to step 32 (indicate approval) :idea:' + resultTime + ' (second)',
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 0,
				description: ':!: Transfer the client to step 32 (indicate approval) :!:' + resultTime + ' (second)',
			};
			throw e;
		}
	});

 it('Go to the amount selection step (step 32)', async () => {
			try {
			

		
			//JSON
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 1,
				description: ':idea: Transfer the client to step 32 (indicate approval) :idea:' + resultTime + ' (second)',
			};
		} catch (e) {
			let resultTime = stopwatch(stageStart);
			jsonResults.cardConfirmation = {
				result: 0,
				description: ':!: Transfer the client to step 32 (indicate approval) :!:' + resultTime + ' (second)',
			};
			throw e;
		}
	});

	afterAll(async () => {
		// if (browser) browser.close();
		// let resultTime = stopwatch(stageStart);
		// jsonResults.time = resultTime;

		// writeFileSync(patchlog + 'stepsRegularClientStage.json', JSON.stringify(jsonResults));
		// let failTests = [];
		// let countSuccess = 0,
		// 	countFail = 0;

		// for (let item in jsonResults) {
		// 	failTests.push(jsonResults[item].description)
		// 	if (jsonResults[item].result === 0)
		// 		countFail++;
		// 	else {
		// 		countSuccess++;
		// 	}
		// };

		// let textPo = `:idea: :idea: :idea: \n Successfully: ${countSuccess} \n Провалено: ${countFail} \n \n`;
		// textPo += `Name and status of autotests: ${'\n' + failTests.join('\n')}`
		// await sentToPo(`Automated borrowing by the regular client on the website "https://site-test3.dobrozaim.ru"(cz_test) \n Total time to take out a loan: ` + resultTime + ' (second)', textPo, 'chat882776');
		// await sendMessageToTelegram('Automated borrowing by the client 3 clicks on the website "https://site-test4.dobrozaim.ru"(cz_stage): ' + textPo);
	});
});

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}