const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`✅ Сервер работает автономно на http://localhost:${PORT}`);
});