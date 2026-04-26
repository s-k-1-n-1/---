async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();

    if (!city) {
        alert("Введите название города");
        return;
    }

    const url = `http://localhost:3000/api/weather?city=${city}`;

    try {
        console.log("Запрос к backend:", url);

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
    document.getElementById("temp").innerText = "";
    document.getElementById("desc").innerText = "Город не найден";
    return;
}

        document.getElementById("temp").innerText =
            "Температура: " + Math.round(data.main.temp) + "°C";

        document.getElementById("desc").innerText =
            "Описание: " + data.weather[0].description;

        changeBackground(data.weather[0].main.toLowerCase());

    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка подключения к серверу");
    }
}

function changeBackground(weather) {
    const body = document.body;
    body.classList.remove("clear", "clouds", "rain", "snow");
    if (weather === "clear") body.classList.add("clear");
    else if (weather === "clouds") body.classList.add("clouds");
    else if (weather.includes("rain") || weather.includes("drizzle")) body.classList.add("rain");
    else if (weather === "snow") body.classList.add("snow");
}

async function fetchData() {
    const container = document.getElementById('result');

    try {
        console.log("Запрос к backend...");

        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();

        console.log("Ответ:", result);

        if (container) {
            container.innerHTML = `
                <div>
                    <h3>${result.data.title}</h3>
                    <p>${result.data.body}</p>
                    <small>Backend статус: OK ✅</small>
                </div>
            `;
        }

    } catch (e) {
        console.error("Ошибка:", e);

        if (container) {
            container.innerHTML = "<p style='color:red'>Ошибка подключения к backend</p>";
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchData);
document.getElementById("temp").innerText = "Загрузка...";