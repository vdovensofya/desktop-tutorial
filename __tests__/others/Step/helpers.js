import { url, sqlConfig, sqlConfigStage, sqlMod} from './config';
import * as sql from 'mssql';
import { TimeoutError } from 'puppeteer';

export const sentToPo = function (title, content, ChatID = 'chat882776') {
	return sql.connect(sqlConfigStage).then(async function () {
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

//-------------------------------------------------------Функции Дениса--------------------------------------------------------

//---------------------Обрабочик ошибок событий страниц------------------------
export const handlePageEventsStage = (page) => {
	page.on('response', response => {
		const status = response.status();

		// Обработка статуса 304
		if (status === 304) {
			console.log(`Resource not modified: ${response.url()}`);
			return; // Пропуск обработки тела, так как его нет
		}

		// Обработка ошибок загрузки, исключая 302 и 304
		if (!response.ok() && response.status() !== 302) {
			console.error(`Failed to load: ${response.url()} with status: ${response.status()}`);
			response.text().then(text => console.log(text)).catch(err => {
				console.error(`Error reading response body: ${err.message}`);
			});
		}
	});

	page.on('error', err => {
		console.error('Page error:', err.message);
	});

	page.on('pageerror', pageError => {
		console.error('Page error occurred:', pageError);
	});

	page.on('requestfailed', request => {
		const failure = request.failure();

		// Игнорирование ошибок net::ERR_ABORTED
		if (failure && failure.errorText === 'net::ERR_ABORTED') {
			return;
		}
		const failureText = failure ? ` (${failure.errorText})` : '';
		console.error(`Request failed: ${request.url()}${failureText}`);
	});

	page.on('timeout', timeout => {
		console.error(`Timeout error: ${timeout}`);
	});
};

//---------------------Функция поиска активного договора------------------------
export const getDogovorMainPageFromPoStage = async function () {
	// // Заглушка, пока ПО не починят.
	// return { NomDog: '0038172302281170', SumDolg: '2147.26', SumPlat: '8350.00' };

	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`EXEC LK_Get_ActiveDogovor @needSelect = 1;`);
		sql.close();
		if (
			result?.recordsets &&
			result.recordsets[0] &&
			result.recordsets[0][0] &&
			result.recordsets[0][0]['Res'] == 1
		) {
			return result.recordsets[1][0];
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
};

//---------------------Функция для получения кода АСП(сейчас через Dogovor_CodeASP и Partner_Tel)
export const getAspCodeFromPoStage = async function (phone) {
	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`SELECT TOP 1 rl.dt, rl.TelNo, dbo.f_DC(rl.codeField, '', 1) AS Code
													FROM dbo.RassilkaLog1 AS rl
													WHERE rl.TelNo = '${phone}'
													ORDER BY rl.keyL1 DESC`);
		sql.close();
		if (
			result?.recordsets &&
			result.recordsets[0]
		) {
			return result.recordsets[0][0]['Code'];
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
};

//---------------------Функция принудительного прекращения дальнейшей загрузки страницы(stage, клиент 3 клика)
export const pageLoanTimeStageThree = async function (page) {
	try {
		await delay(1000);
		await page.waitForNavigation({ waitUntil: 'networkidle30000', timeout: 0 });
	} catch (error) {
		if (error.name === 'TimeoutError') {
			await page.abortNavigation();
		}
	}
};

//---------------------Функция принудительного прекращения дальнейшей загрузки страницы(stage)
export const pageLoanTimeStage = async function (page) {
	const timeout = { timeout: 0 };
	page.setDefaultNavigationTimeout(100000);
	try {
		await delay(2000);
		await page.waitForNavigation({ waitUntil: 'networkidle30000', timeout });
	} catch (error) {
		if (error.name === 'TimeoutError') {
			await page.abortNavigation();
		}
	}
};

//---------------------Функция проверки и сравнения текущего url с нужным-----
export const checkingPageRedirectStage = async function (correctPageUrl, page) {
	const onlinePageUrl = correctPageUrl;
	const pageUrlOnline = await page.url();
	expect(pageUrlOnline).toContain(onlinePageUrl);
};

//---------------------Функция для сравнения текста---------------------------
export const checkingTexts = async function (selectorText, expectedText, page) {
	const codeText = await page.waitForSelector(selectorText);
	const actualText = await codeText.evaluate(el => el.textContent);
	expect(actualText.trim()).toBe(expectedText);
};

//---------------------Функция для поиска и клика-----------------------------
export const searchAndClick = async function (pageSelector, page) {
	await page.waitForSelector(pageSelector);
	await page.click(pageSelector);
	await delay(1000);
};

//---------------------Функция для поиска и заполнения данных-----------------
export const searchAndFill = async function (pageSelectorTwo, pageTestData, page) {
	try {
		await page.waitForSelector(pageSelectorTwo);
		await page.type(pageSelectorTwo, pageTestData);
	} catch (error) {
		console.error('Ошибка при выполнении функции:', error);
		console.log('Не заполняется поле тестовыми данными');
	}
};

//---------------------Калькулятор на странице "dobrozaim"---------------------
export const checkCalcOne = async function (summa, srok, page) {

	await page.click('[data-testid="public__calculator loan__amount"]');
	await page.waitForSelector(`[data-testid="public__calculator loan__amount"] .drop .cont>a[val='${summa}']`);
	await page.click(`[data-testid="public__calculator loan__amount"] .drop .cont>a[val='${summa}']`);

	await page.click('[data-testid="public__calculator loan__term"]');
	await page.waitForSelector(`[data-testid="public__calculator loan__term"] .drop .cont>a[val='${srok}']`);
	await page.click(`[data-testid="public__calculator loan__term"] .drop .cont>a[val='${srok}']`);
};

//---------------------Калькулятор на странице "Инвестиций"--------------------
export const checkCalcTwo = async function (summa, srok, result, page) {

	await page.evaluate((selector) => document.querySelector(selector).click(), '[data-testid="investments deposit__amount"]')
	await delay(3000);
	await page.waitForSelector(`[data-testid="investments deposit__amount"] .drop .cont>div[val='${summa}']`);
	await page.click(`[data-testid="investments deposit__amount"] .drop .cont>div[val='${summa}']`);
	await delay(3000);

	await page.evaluate((selector) => document.querySelector(selector).click(), '._left > ._term.inv_slider_line.last > .sl.val.weeks');
	await delay(3000);
	await page.waitForSelector(`.sl.val.weeks > .drop > .cont > div[val='${srok}']`);
	await page.click(`.sl.val.weeks > .drop > .cont > div[val='${srok}']`);
	await delay(3000);

	const textElementCalc2 = await page.waitForSelector('.val.inv-result');
	let textCalc2 = await textElementCalc2.evaluate((el) => el.textContent);
	textCalc2 = textCalc2.replace(/\s/g, '');
	expect(textCalc2).toBe(`${result}`);
};

//---------------------Калькулятор на странице "Автозалога"--------------------
export const checkCalcThree = async function (summa, srok, result, page) {

	await page.click('[data-testid="car__loan loan__amount"]');
	await page.waitForSelector(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);
	await page.click(`._sliders_block .line:nth-of-type(1) a[val='${summa}']`);

	await page.click('[data-testid="car__loan loan__term"]');
	await page.waitForSelector(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);
	await page.click(`._sliders_block .sl[rel='srok'] a[val='${srok}']`);

	const textElementCalc3 = await page.waitForSelector('._vozvrat_block .cont>span');
	let textCalc3 = await textElementCalc3.evaluate((el) => el.textContent);
	textCalc3 = textCalc3.replace(/\s/g, '');
	expect(textCalc3).toBe(`${result}`);
};

//---------------------Калькулятор на странице "Большой займ"------------------
export const checkCalcFour = async function (summa, srok, page) {

	await page.click('div:nth-of-type(1) > .line_top > ._box.sl');
	await page.waitForSelector(`div:nth-of-type(1) .line_top > ._box.sl .drop .cont>a[val='${summa}']`);
	await page.click(`div:nth-of-type(1) .line_top > ._box.sl .drop .cont>a[val='${summa}']`);

	await page.click('div:nth-of-type(2) > .line_top > ._box.sl');
	await page.waitForSelector(`div:nth-of-type(2) > .line_top > ._box.sl > .drop > .cont>a[val='${srok}']`);
	await page.click(`div:nth-of-type(2) > .line_top > ._box.sl > .drop > .cont>a[val='${srok}']`);
};

//---------------------Калькулятор на странице "Онлайн"------------------------
export const calcPageOnline = async function (summa, srok, page) {

	await page.waitForSelector("select[name='selectSum']");
	await page.click("select[name='selectSum']");
	await page.select("select[name='selectSum']", summa);

	await page.waitForSelector("select[name='selectTerm']");
	await page.click("select[name='selectTerm']");
	await page.select("select[name='selectTerm']", srok);
};

//---------------------Калькулятор на странице на шаге 32----------------------
export const calcPageStepThirtyTwo = async function (summa, srok, page) {

	await page.waitForSelector("select[name='selectSum']");
	await page.click("select[name='selectSum']");
	await page.select("select[name='selectSum']", summa);
	await delay(1000);

	await page.waitForSelector("select[name='selectTerm']");
	await page.click("select[name='selectTerm']");
	await page.select("select[name='selectTerm']", srok);
};
// ---------------------------------------------------------------------------------------------------------



export const getClientForTest = async function (type) {
	try {
		return sql.connect(sqlConfigFight).then(async function () {
			const result = await sql.query(`EXEC LK_GetAutotestPartner
            @typeP = '${type}'
            ,@needSelect = 1`);
			sql.close();
			return await getAuthData(result.recordsets[1][0]['keyPart']);
		});
	} catch (err) {
		return 1;
	}
};

export const login = async function (page, user) {
	await page.goto(url + 'auth');
	await page.waitForSelector('.personal-enter__form');
	await page.$eval(
		'#auth-phone',
		function (item, login) {
			item.value = login;
		},
		user.login
	);
	await page.$eval(
		'#auth-pwd',
		function (item, password) {
			item.value = password;
		},
		user.password
	);
	await page.click('#authorize_');
	await page.waitForSelector('.check-code-field');
	await page.focus('.check-code-field');
	await page.keyboard.type(getCode());
	const nameElement = await page.waitForSelector('.personal-fio .name strong');
	const nameText = await nameElement.evaluate((el) => el.textContent);
	await delay(10000);
	const isOnbording = await page.evaluate(() => {
		let el = document.querySelector('.block-board .button-board .skip');
		return !!el;
	});
	if (isOnbording) {
		await onBoardingSkip(page);
	}
	expect(nameText).toBe(user.name);
};

// Публичный калькулятор
export const calcPablik = async function (sum, term, page) {
	await page.click('._box.calc-summ.sl');
	await page.waitForSelector(`._box.calc-summ.sl .drop .cont a[val='${sum}']`);
	await page.click(`._box.calc-summ.sl .drop .cont a[val='${sum}']`);

	await page.click('._box.calc-srok.sl');
	await page.waitForSelector(`._box.calc-srok.sl .drop .cont a[val='${term}']`);
	await page.click(`._box.calc-srok.sl .drop .cont a[val='${term}']`);
}

// Рандомайзер номера телефона
export const generateRandomPhoneNumber = async function () {
	const areaCode = '915';
	const firstPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
	const secondPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

	const phoneNumber = areaCode + firstPart + secondPart;
	global.PHONE_NUMBER = phoneNumber;
	return phoneNumber;
}

// Рандомайзер паспорта
export function generateRandomPassport() {
	const series = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
	const number = Math.floor(Math.random() * (90000000 - 10000000 + 1)) + 10000000;
	return `${series.toString()}-${number.toString()}`;
}

//функция для кода асп по Телефону
export const getAspFromStage = async function (phone) {
	try {
		await sql.connect(sqlConfigStage);
	 const result = await sql.query(`SELECT top 1 dbo.f_DC(dca.ASPCode,'',1) AS ASP
                                        FROM dbo.Dogovor_CodeASP dca
                                        INNER JOIN Partner_Tel pt ON dca.keyPart = pt.keyPart
                                        WHERE 1=1 AND pt.tipTel = 0
                                        AND pt.Tel = '${phone}' 
                                        ORDER BY dca.keyDCA DESC`);
		sql.close();
		if (
			result?.recordsets &&
			result.recordsets[0]
		) {
			return result.recordsets[0][0]['ASP'];
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
};


// Вытащить кейпарт зная номер телефона
export const getKeypartFromStage = async function (phone) {
	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`SELECT top 1 pt.keyPart AS 'keyPart'
    FROM Partner_Tel pt
    WHERE 1=1 AND pt.tipTel = 0
    AND pt.Tel = '${phone}'
    ORDER BY pt.keyPart DESC`);
		sql.close();
		console.log(result)
		if (
			result?.recordsets &&
			result.recordsets[0]
		) {
			return result.recordsets[0][0]['keyPart'];
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
};

//--Скрипт по обходу iframe на 2м шаге
export const leavePageIframe = async function (keypart) {
    try {
        await sql.connect(sqlMod);
					const result = await sql.query(`EXEC CZ_mod.dbo.AddTestCardForClient @KeyPart = ${keypart}`);
        sql.close();
        console.log("Действие выполнено успешно:", result);
    } catch (err) {
        console.error("Ошибка в leavePageIframe:", err);
        return 1;
    }
};

// --Скрипт по проставлению атоматические одобрения ФПС
export const AutoApproveFPSandKI = async function (client) {
    try {
        await sql.connect(sqlConfigStage);
					const result = await sql.query(`EXEC CZ_mod.dbo.AutoApproveFPSandKI @KeyPart = '${client}'
                                 ,@dbOut = 'CZ_Stage'`);
					sql.close();
					console.log(client);
        console.log("Действие выполнено успешно:", result);
    } catch (err) {
        console.error("Ошибка в AutoApproveFPSandKI:", err);
        return 1;
    }
};


//--Основная функция для связывания двух функций
export const doubleMix = async function (phone) {
	await getKeypartFromStage(phone).then(keypart => { // Получаем keyPart
    if (keypart) {
        console.log("Полученный keyPart:", keypart);
        leavePageIframe(keypart); // Передаем keyPart в leavePageIframe
    } else {
        console.log("Не удалось получить keyPart.");
    }
	});
};


//---Время выполнения автотеста---
export const stopwatch = function (dataStart) {
	let resultTime = (new Date() - dataStart) / 1000;
	return resultTime;
};

const getAuthData = async function (keyPart) {
	let user = {};
	try {
		return sql.connect(sqlConfigFight).then(async function () {
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

const getUserName = async function (keyPart, user) {
	try {
		return sql.connect(sqlConfigFight).then(async function () {
			const result = await sql.query(
				`SELECT PEFN.FN_Name
            FROM Partner_Edit_FullName AS PEFN WITH (NOLOCK)
			   LEFT JOIN Partner_Edit_FullName AS PEFN1 ON PEFN.keyPart = PEFN1.keyPart
               AND PEFN.keyPEF < PEFN1.keyPEF
               AND PEFN1.FN_Type = 1
               WHERE PEFN1.keyPEF IS NULL
               AND PEFN.FN_Type = 1
               AND PEFN.keyPart = ${keyPart}`
			);
			user.name = result.recordsets[0][0]['FN_Name'];
			sql.close();
			return user;
		});
	} catch (err) {
		return 6;
	}
};

export const paspNumberRandom = async function () {
	let ar = [];
	for (let i = 0; i < 10; i++) {
		let randomInt = Math.floor(Math.random() * (9 - 0));
		ar.push(randomInt);
	}
	let string = ar.toString();
	return string;
};

const formatPhone = (phone) => {
	let cleaned = ('' + phone).replace(/\D/g, '');
	let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
	if (match) {
		return '+7(' + match[1] + ')' + match[2] + '-' + match[3] + '-' + match[4];
	}
	return null;
};

// ---------------------------------------------------------------------------------------------------------------------------------------------
// // ----------------------------------------------SQL от Софьи--------------------------------------------------------

// -----Запрос на клиента с закрытым займом, вытащить кейпарт----
export const getKeypartOne = async function () {
	try {
		await sql.connect(sqlConfigStage);
		const result1 = await sql.query(`SELECT DISTINCT TOP 1 dc.keyPart as 'keyPart'
																																			FROM DogovorCred dc
																																			LEFT JOIN DogovorCred dc2 on dc.keyPart=dc2.keyPart AND dc.keyDZ<dc2.keyDZ
																																			INNER JOIN dbo.DogovorCredT dct ON dc.keyDZT = dct.keyDZT
																																			WHERE dc.Status = 3 AND dc2.keyDZ IS NULL AND dc.ToHome IN (5, 7) AND dc.SimpleI = 0 AND dct.NotNeedContact = 0
																																			ORDER BY dc.keyPart`)
		sql.close();
		return result1.recordsets[0][0]['keyPart'];
	}
	catch (err) {
		return null;
	}
};

// // -----Вытащить клиентов с 31 шагом - котрые проходят постоянные клиенты-----
// export const getKeypartTwo = async function () {
// 	try {
// 		await sql.connect(sqlConfigStage);
// 		const result2 = await sql.query(` SELECT TOP 1 dc.keyPart
// 															FROM dbo.DogovorCred dc
// 															LEFT JOIN dbo.sprOnline_StepList osl
// 															ON dc.Status = osl.Stat
// 															AND dc.StatusCard = osl.StatCard
// 															AND dc.ToHome = osl.ToHome
// 															JOIN dbo.SprAll1 sa1
// 															ON sa1.nom = osl.Step
// 															AND sa1.keyS = 195
// 															WHERE osl.Step = 31
// 		             ORDER BY dc.keyPart`)
// 		sql.close();
// 		return result2.recordsets[0][0]['keyPart'];
// 	} catch (err) {
// 		return null;
// 	}
// };

// -----Вытащить номер клиента----
export const getNumber = async function (client) {
	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`SELECT top 1 lr.LK_login as 'login'
													FROM dbo.LK_reg lr
													LEFT JOIN Partner p ON lr.keyPart = p.keyPart
													LEFT JOIN dbo.Partner_FIO pf ON p.keyFIO = pf.keyFIO
													WHERE lr.LK_Del = 0
													AND lr.keyPart = '${client}'`)
		sql.close();
		return result.recordsets[0][0]['login'];
	} catch (err) {
		return null;
	}
};

// --------Вытащить год рождения клиента---------
export const getData = async function (client) {
	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`SELECT top 1 convert(varchar(25), pf.DataB, 104) as 'Дата рождения'
													FROM dbo.LK_reg lr
													LEFT JOIN Partner p ON lr.keyPart = p.keyPart
													LEFT JOIN dbo.Partner_FIO pf ON p.keyFIO = pf.keyFIO
													WHERE lr.LK_Del = 0
													AND lr.keyPart = '${client}'`)
		sql.close();
		return result.recordsets[0][0]['Дата рождения'];
	} catch (err) {
		return null;
	}
};

// Вытащить код АСП зная кейпарт 
export const getAspkeyPart = async function (client) {
	try {
		await sql.connect(sqlConfigStage);
		const result = await sql.query(`SELECT top 1 dbo.f_DC(dca.ASPCode,'',1) AS asp
																																			FROM dbo.Dogovor_CodeASP dca
																																			WHERE dca.keyPart='${client}'
																																			ORDER BY dca.dateLastSend DESC`)
		sql.close();
		return result.recordsets[0][0]['asp'];
	} catch (err) {
		return null;
	}
};

// ------Асинхронная функция для пользования вытаскивания через кейпарт - номер телефона и дату рождения-----
export const dataClient = async function (client) {
	// Вытащить клиента с закрытым займом
	//  getKeypart1 - это клиент с 3 статусом (! но и тянет 3 кликовый)
	// getKeypart2 - это клиент на 31 шаге

	// // Исходя из клиента вытащить телефон
	const num = await getNumber(client);
	// console.log(num);
	// Исходя из клиента вытащить дату рождения
	const data = await getData(client);
	// console.log(data);

	return [num, data];
}

const delay = (time) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
};

// ---------------------------------------------------------------------------------------------------------
