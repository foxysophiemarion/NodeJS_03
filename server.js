const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counters.json');

// Функция для чтения счетчиков из файла
function readCounters() {
	if (fs.existsSync(COUNTER_FILE)) {
		const data = fs.readFileSync(COUNTER_FILE);
		return JSON.parse(data);
	}
	return {};
}

// Функция для записи счетчиков в файл
function writeCounters(counters) {
	fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters, null, 2));
}

// Инициализация счетчиков
let counters = readCounters();

// Обработчик для главной страницы
app.get('/', (req, res) => {
	const url = '/';
	counters[url] = (counters[url] || 0) + 1;
	writeCounters(counters);
	res.send(`
        <h1>Главная страница</h1>
        <p>Счетчик просмотров: ${counters[url]}</p>
        <button onclick="location.href='/about'">Перейти на страницу "О нас"</button>
    `);
});

// Обработчик для страницы "О нас"
app.get('/about', (req, res) => {
	const url = '/about';
	counters[url] = (counters[url] || 0) + 1;
	writeCounters(counters);
	res.send(`
        <h1>Страница "О нас"</h1>
        <p>Счетчик просмотров: ${counters[url]}</p>
        <button onclick="location.href='/'">Вернуться на главную страницу</button>
    `);
});

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});