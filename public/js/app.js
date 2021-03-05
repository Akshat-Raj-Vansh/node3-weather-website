const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");

const getWeather = (location) => {
    fetch("http://localhost:3000/weather?address=" + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    console.log(data.error);
                } else {
                    messageOne.textContent = data.Location;
                    messageTwo.textContent = "Weather: " + data.Weather;
                    messageThree.textContent = "Temperature: " + data.Temperature + "°C";
                    messageFour.textContent = "Feels Like: " + data.FeelsLike + "°C";
                    console.log(data);
                }
            });
        }
    );
};

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageOne.textContent = "Fetching Data...";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    messageFour.textContent = "";
    getWeather(search.value);
});