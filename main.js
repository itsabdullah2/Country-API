let countryField = document.getElementById("country");
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", countriesInfoAPI);
countryField.addEventListener("keyup", sendSearchValueOnEnter);

// Function to search on enter btn
function sendSearchValueOnEnter(e) {
  if (e.key === "Enter") {
    countriesInfoAPI();
  }
}

// Function to get the country info
function countriesInfoAPI() {
  let countryName = countryField.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  // console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `<img src="${data[0].flags.svg}" class="flag-img">
      <h2 class="country-name">${data[0].name.common}</h2>
      <div class="wrapper">
      <div class="content">
        <h4>Continent: <span>${data[0].continents[0]}</span></h4>
      </div>
      </div>
      <div class="wrapper">
      <div class="content">
        <h4>Capital: <span>${data[0].capital[0]}</span></h4>
      </div>
      </div>
      <div class="wrapper">
      <div class="content">
        <h4>Population: <span>${data[0].population}</span></h4>
      </div>
      </div>
      <div class="wrapper">
      <div class="content">
        <h4>Currency: <span>${
          data[0].currencies[Object.keys(data[0].currencies)].name
        } - ${Object.keys(data[0].currencies)[0]}</span></h4>
      </div>
      </div>
      <div class="wrapper">
      <div class="content">
        <h4>Common Languages: <span>${Object.values(data[0].languages)
          .toString()
          .split(",")
          .join(", ")}</span></h4>
      </div>
      </div>
      `;
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The field can not be empty</h3>`;
      } else {
        result.innerHTML = `<h3>Please Enter a valid name</h3>`;
      }
    });
}
