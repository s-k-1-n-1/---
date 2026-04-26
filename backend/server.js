console.log(" ЗАПУЩЕН НОВЫЙ SERVER.JS");
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

const API_KEY = "6621d791c953765135ab9152d86193f6";

app.use(cors());
app.use(express.json());


app.get('/api/data', (req, res) => {
    console.log("Запрос получен! Отправляю локальные данные...");
    
    res.json({
        data: {
            title: "Интеграция успешно завершена!",
            body: "Этот текст пришел с собственного Node.js сервера."
        }
    });
});


app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );

        res.json(response.data);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Ошибка получения погоды" });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Сервер работает на http://localhost:${PORT}`);
});