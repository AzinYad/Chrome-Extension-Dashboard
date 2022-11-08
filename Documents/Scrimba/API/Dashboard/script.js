const bckImageAuthor = document.querySelector(".bckImage-author");
const cryptoThumb = document.querySelector(".crypto-thumb");
const cryptoName = document.querySelector(".crypto-name");
let weatherStatus = document.querySelector(".weather-status");
let time = document.querySelector(".time");

function getCurrentTime() {
  const date = new Date();
  time.innerText = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let celsius = ((data.main.temp - 32) * 5) / 9;
      document.querySelector(".weather-temp").innerText =
        Math.round(celsius) + "°";
      weatherStatus.innerHTML = `<img  class="weather-icon" src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> 
                                 <p class="temp"> ${Math.round(celsius)} °</p>
                                 <p class="city">${data.name}</p>`;
    })
    .catch((err) => console.error(err));
});

const getBckImageData = fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(`url(${data.urls.full})`);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    bckImageAuthor.innerText = `By: ${data.user.name}`;
  })
  .catch((err) => {
    console.error(err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    console.log(res.status);
    return res.json();
  })
  .then((data) => {
    cryptoName.innerText = `${data.name}`;
    cryptoThumb.setAttribute("src", `${data.image.small}`);

    document.querySelector(".crypto-flex").innerHTML += `
            <p>🎯 : £ ${data.market_data.current_price.gbp}</p>
            <p>⬆️ : £ ${data.market_data.high_24h.gbp}</p>
            <p>⬇️ : £${data.market_data.low_24h.gbp}</p>
        `;
  })
  .catch((err) => console.error(err));

setInterval(getCurrentTime, 1000);
