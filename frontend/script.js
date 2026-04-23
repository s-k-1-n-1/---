var API_KEY = "6621d791c953765135ab9152d86193f6";

async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();

    if (!city) {
        alert("Введите название города");
        return;
    }

    const domain = "https://api.openweathermap.org";
    const path = "/data/2.5/weather";
    const query = "?q=" + city + "&appid=" + API_KEY + "&units=metric&lang=ru";
    
    const url = domain + path + query;

    try {
        console.log("ПРОВЕРКА АДРЕСА:", url);
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            alert("Город не найден");
            return;
        }

        document.getElementById("temp").innerText = "Температура: " + Math.round(data.main.temp) + "°C";
        document.getElementById("desc").innerText = "Описание: " + data.weather[0].description;

        changeBackground(data.weather[0].main.toLowerCase());

    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка! Проверь, что в консоли адрес начинается с api.openweathermap.org");
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
    const container = document.getElementById('data-container');
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();
        if (container) {
            container.innerHTML = `
                <div style="border: 1px solid #ccc; padding: 10px; margin-top: 20px; border-radius: 10px; background: rgba(255,255,255,0.3);">
                    <h3>${result.data.title}</h3>
                    <p>${result.data.body}</p>
                    <small>Backend статус: OK ✅</small>
                </div>`;
        }
    } catch (e) {
        if (container) container.innerHTML = "<p style='color:gray'>Бэкенд ожидает запуска (node server.js)</p>";
    }
}

document.addEventListener('DOMContentLoaded', fetchData);