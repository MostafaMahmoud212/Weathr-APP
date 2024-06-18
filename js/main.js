const myCity = document.querySelector(".queryInput input");
// console.log(myCity);
const BusURL = "https://api.weatherapi.com"
const endPoint = "v1/forecast.json"
const apiKey = '936c23ea2b274d3589a155132241406';
const apidays = 3;

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthe = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];



async function getSearch(value) {
  let requst = await fetch(`${BusURL}/${endPoint}?key=${apiKey}&q=${value}&days=${apidays}`);
  if( requst.ok == true && requst.status >= 200 && requst.status < 300) {
    let data = await requst.json();
    displayCurrentToDay(data.location, data.current);
    displayFutcherDay(data.forecast.forecastday);
  }
}

myCity.addEventListener("input", function(event) {
  getSearch(event.target.value);
})

      getSearch("cairo");


// function Wether today
function displayCurrentToDay(location, current) {
  let data = new Date(current.last_updated);
  let recipies = "";

    recipies += `<!-- today -->
      <div class="ch1 m-lg-0">
        <div class="chHead d-flex justify-content-between align-items-center p-2 ">
          <p class="m-0">${day[data.getDay()]}</p>
          <p>${data.getDay()} ${monthe[data.getMonth()]}</p>
        </div>
        <div class="chContant px-3">
          <h5 class="my-2 fs-4">${location.name}</h5>
          <div class="tempratcehr d-flex align-items-center flex-row flex-lg-column">
            <h1 >${current.temp_c}<span>°</span>C</h1>
            <img src="https:${current.condition.icon}" class="im" alt="Sun">
          </div>
          <p class="text-info mb-2">${current.condition.text}</p>
          <div class="ended d-flex justify-content-between mb-3">
            <div class="umperla d-flex gap-1">
              <img src="./images/a.png" alt="">
              <p> 20%</p>
            </div>
            <div class="spead d-flex gap-1">
              <img src="./images/g.png" alt="">
              <p> 18Km/h</p>
            </div>
            <div class="location d-flex gap-1">
              <img src="./images/s.png" alt="">
              <p> East</p>
            </div>
          </div>
        </div>
      </div>
      `

    document.querySelector('.today').innerHTML = recipies;

  }



  // function + 2 days
function displayFutcherDay(forecastDay) {
  let DataForecast = "";
  for (let i = 1; i < forecastDay.length; i++) {
    let data = new Date(forecastDay[i].date);
    console.log(forecastDay[i]);
    DataForecast += `
      <!-- After foreast day -->
      <div class="col-12 col-lg-6 my-5 pb-4 m-lg-0 ">
        <div class="ch2">
          <div class="chHead d-flex justify-content-between align-items-center p-2 ">
            <p class="m-0">${day[data.getDay()]}</p>
            <p>${data.getDay()} ${monthe[data.getMonth()]}</p>
          </div>
          <div class="chContant px-3  text-center  my-5">
            <img src="https:${forecastDay[i].day.condition.icon}" class="im"  alt="Sun">
            <h5 class="fs-2">${forecastDay[i].day.mintemp_c}<span>°</span>C</h5>
            <p class="text-secondary my-2 fw-bold">${forecastDay[i].day.maxtemp_c}</p>
            <p class="text-info my-2 fw-bold">${forecastDay[i].day.condition.text}</p>
          </div>
        </div>
      </div>`
  }

  document.querySelector('.forecastDay').innerHTML = DataForecast;

}