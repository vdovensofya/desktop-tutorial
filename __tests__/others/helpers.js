import { url, sqlConfig, sqlConfigFight } from './Step/config';
import * as sql from 'mssql';
import { TimeoutError } from 'puppeteer';
const fetch = require('node-fetch');

export const sentToPo = function (title, content, ChatID = 'chat933540') {
	return sql.connect(sqlConfigFight).then(async function () {
		await sql.query(`EXEC Bitrix_SendToMsgInChat
                     @ChatID         = '${ChatID}'
                  ,@subject        = '${title}'
                  ,@TextBody       = '${content}'
                  ,@System         = 1`);
		sql.close();
	});
};
/**
 * Получение клиента для автотеста
 * @return object
 * @param type - Тип клиента
 * Справочник типов:
1. Новый без займа
2. С активным займом
3. Онлайн недоступен
4. Кредитные каникулы
5. Реструктуризация
6. 3 клика
7. 3 клика(БВО)
8. Постоянный(не 3 клика)
 */

export const getDogovorMainPageFromPo = async function () {
	// Заглушка, пока ПО не починят.
	return { NomDog: '0038172302281170', SumDolg: '2147.26', SumPlat: '8350.00' };

	try {
		await sql.connect(sqlConfigFight);
		const result = await sql.query(`EXEC LK_Get_ActiveDogovor @needSelect = 1;`);
		sql.close();
		if (
			result?.recordsets &&
			result.recordsets[0] &&
			result.recordsets[0][0] &&
			result.recordsets[0][0]['Res']
		) {
			return result.recordsets[1][0];
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
};

export const getCode = function () {
	return '1234';
};


// export const checkCalcThree = async function (summa, srok, result, page) {
// 	await page.click('div:nth-of-type(1) > .line_top > ._box.sl');
// 	await page.waitForSelector(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);
// 	await page.click(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);
// 	await page.click("._sliders_block .sl[rel='srok'] .summa");
// 	await page.waitForSelector(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);
// 	await page.click(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);
// 	const textElementCalc3 = await page.waitForSelector('._vozvrat_block .cont>span');
// 	let textCalc3 = await textElementCalc3.evaluate((el) => el.textContent);
// 	textCalc3 = textCalc3.replace(/\s/g, '');
// 	expect(textCalc3).toBe(`${result}`);
// };

// export const checkCalcFour = async function (summa, srok, page) {
// 	await page.click('div:nth-of-type(1) > .line_top > ._box.sl');
// 	await page.waitForSelector(`div:nth-of-type(1) .line_top > ._box.sl .drop .cont>a[val='${summa}']`);
// 	await page.click(`div:nth-of-type(1) .line_top > ._box.sl .drop .cont>a[val='${summa}']`);
// 	await page.click('div:nth-of-type(2) > .line_top > ._box.sl');
// 	await page.waitForSelector(`div:nth-of-type(2) > .line_top > ._box.sl > .drop > .cont>a[val='${srok}']`);
// 	await page.click(`div:nth-of-type(2) > .line_top > ._box.sl > .drop > .cont>a[val='${srok}']`);
// };

export const calculatorAvto = async function (summa, srok, page) {
	// ---------------Проверка суммы---------------------
    await page.click('._sliders_block .line:nth-of-type(1) .line_top .summa');
    await page.waitForSelector(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);
    await page.click(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);
	//---------------Проверка срока------------------
    await page.click("._sliders_block .sl[rel='srok'] .summa");
    await page.waitForSelector(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);
    await page.click(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);
};


export const openQuaAvto = async function (qua, page) {
	// ---------------Открыть вопрос---------------------
	await page.waitForSelector(`.faq-sections div:nth-of-type(${qua})`);
	await page.click(`.faq-sections div:nth-of-type(${qua})`);
	// ---------------Закрыть вопрос---------------------
	// await page.waitForSelector(`.faq-sections div:nth-of-type(${qua}) ._faq_name.open`);
	// await page.click(`.faq-sections div:nth-of-type(${qua}) ._faq_name.open`);
};

export const calcInvect = async function (summa, srok, page) {
	// ---------------Проверка суммы---------------------
	await page.evaluate((selector) => document.querySelector(selector).click(), '.val.summa.sl')
    await page.waitForSelector(`.val.summa.sl .drop .cont div[val='${summa}']`);
    await page.click(`.val.summa.sl .drop .cont div[val='${summa}`);
    //---------------Проверка срока------------------
    await page.evaluate((selector) => document.querySelector(selector).click(), '._left > ._term.inv_slider_line.last > .sl.val.weeks');
    await page.waitForSelector(`.val.weeks.sl .drop .cont div[val='${srok}']`);
    await page.click(`.val.weeks.sl .drop .cont div[val='${srok}']`);
};

export const openQuaInvest = async function (qua, page) {
	// ---------------Открыть вопрос---------------------
	await page.waitForSelector(`.q_block div:nth-child(${qua}) div.q_name.title_4`);
	await page.click(`.q_block div:nth-child(${qua}) div.q_name.title_4`);
	// ---------------Закрыть вопрос---------------------
	await page.waitForSelector(`div:nth-child(${qua}) .q_name.title_4.open`);
	await page.click(`div:nth-child(${qua}) .q_name.title_4.open`);
};

export const calcPublic = async function (summa, srok, page) {
	// ---------------Проверка суммы---------------------
	await page.click('._box.calc-summ.sl');
	await page.waitForSelector(`._box.calc-summ.sl .drop .cont a[val='${summa}']`);
	await page.click(`._box.calc-summ.sl .drop .cont a[val='${summa}']`);
	//---------------Проверка срока------------------
	await page.click('._box.calc-srok.sl');
	await page.waitForSelector(`._box.calc-srok.sl .drop .cont a[val='${srok}']`);
	await page.click(`._box.calc-srok.sl .drop .cont a[val='${srok}']`);
}; 



export const textSpace = async function removeExtraSpaces(text) {
	return text.replace(/\s+/g, ' ').trim();
};

/**
 * Закрытие онбординга
 */

/**
 * Получение телефона и пароля
 * @return object
 */
const getAuthData = async function (keyPart) {
	let user = {};
	try {
		return sql.connect(sqlConfig).then(async function () {
			const result = await sql.query(`EXEC LK_registr
            @keyPart = '${keyPart}'                                  
            ,@DeleteCurReg = 1
            ,@needSelect = 1`);
			user.login = formatPhone(result.recordsets[0][0]['login']);
			user.password = result.recordsets[0][0]['Pass'];
			sql.close();
			await getUserName(keyPart, user);
			return user;
		});
	} catch (err) {
		return 6;
	}
};
/**
 * Получение имени клиента
 * @return object
 * */

export const paspNumberRandom = async function () {
	let ar = [];
	for (let i = 0; i < 10; i++) {
		let randomInt = Math.floor(Math.random() * (9 - 0));
		ar.push(randomInt);
	}
	let string = ar.toString();
	return string;
};

export const getScoreSpeed = function (url, mode = "mobile") {
	const psi = require('psi');

	// Настройки тестирования
	const options = {
		nokey: 'true', // Важно: Это для использования PageSpeed Insights без ключа API
		strategy: mode, // Или 'desktop' для десктопной версии
	};

	return psi(url, options).then(data => {
		return (data.data.lighthouseResult.categories.performance.score);
	}).catch(error => {
		return false;
	});
};

export const delay = (time) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
};

export async function sendMessageToTelegram(message) {
	try {
		const BOT_TOKEN = '6512235407:AAG2mMW7nZMnztqvSPYYbN0aigzXa0CVJyQ';
		const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
		const CHAT_ID = '-1001593973998';
		const data = {
			chat_id: CHAT_ID,
			text: message,
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const responseBody = await response.json();
		if (responseBody.ok) {
			console.log('Сообщение успешно отправлено в Telegram');
		} else {
			console.error('Ошибка отправки сообщения в Telegram:', responseBody.description);
		}
	} catch (error) {
		console.error('Ошибка:', error);
	}
}