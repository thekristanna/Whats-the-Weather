$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchCity = urlParams.get("city");
  const openWeatherAPIKey = "67f150577d5c2f04c43b563826480c3f";
  const meteoSourceAPIKey = "9o32eyttz0vrjrohq3yygwzd3pztmvnf2qc2esnm";
  let w;

  // If 'city' parameter exists, perform the search
  if (searchCity) {
    // Set the value of the input field with the retrieved city
    $("#weather_city").val(searchCity);

    // Trigger the form submission programmatically
    $("#weatherForm").submit();

    setTimeout(function () {
      $("#look").trigger("click");
    }, 100); // 500 milliseconds delay (adjust as needed)
  }

  const weatherCategories = {
    Clouds: "Cloudy",
    overcast: "Cloudy",
    "overcast clouds": "Cloudy",
    partly_sunny: "Cloudy",
    "partly sunny": "Cloudy",
    "scattered clouds": "Cloudy",
    "few clouds": "Cloudy",
    "broken clouds": "Cloudy",
    partly_clear: "Cloudy",
    "partly clear": "Cloudy",
    mostly_cloudy: "Cloudy",
    "mostly cloudy": "Cloudy",
    cloudy: "Cloudy",
    Mist: "Misty",
    mist: "Misty",
    fog: "Misty",
    Rain: "Rainy",
    "shower rain": "Rainy",
    light_rain: "Rainy",
    "light rain": "Rainy",
    rain: "Rainy",
    freezing_rain: "Rainy",
    "freezing rain": "Rainy",
    psbl_freezing_rain: "Rainy",
    "psbl freezing rain": "Rainy",
    hail: "Rainy",
    "moderate rain": "Rainy",
    "heavy intensity rain": "Rainy",
    psbl_rain: "Rainy",
    "psbl rain": "Rainy",
    rain_shower: "Rainy",
    "rain shower": "Rainy",
    "psbl_freezing_rain_(night)": "Rainy",
    "rain_shower_(night)": "Rainy",
    Snow: "Snowy",
    light_snow: "Snowy",
    "light snow": "Snowy",
    snow: "Snowy",
    psbl_snow: "Snowy",
    "psbl snow": "Snowy",
    snow_shower: "Snowy",
    "snow shower": "Snowy",
    rain_and_snow: "Snowy",
    "rain and snow": "Snowy",
    psbl_rain_and_snow: "Snowy",
    "psbl rain and snow": "Snowy",
    "snow_shower_(night)": "Snowy",
    "rain_and_snow_(night)": "Snowy",
    Sunny: "Sunny",
    sunny: "Sunny",
    mostly_sunny: "Sunny",
    "mostly sunny": "Sunny",
    "clear_(night)": "Clear",
    clear: "Clear",
    "clear sky": "Clear",
    "mostly_clear_(night)": "Clear",
    mostly_clear: "Clear",
    "mostly clear": "Clear",
    Thunderstorm: "Stormy",
    thunderstorm: "Stormy",
    local_thunderstorms: "Stormy",
    "local thunderstorms": "Stormy",
    default: "Caution",
  };

  const countryCodes = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BQ: "Bonaire",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cabo Verde",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos Islands",
    CO: "Colombia",
    KM: "Comoros",
    CD: "Congo",
    CG: "The Congo",
    CK: "Cook Islands",
    CR: "Costa Rica",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czechia",
    CI: "Côte d'Ivoire",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    SZ: "Eswatini",
    ET: "Ethiopia",
    FK: "Falkland Islands",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and McDonald Islands",
    VA: "Holy See",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia (Federated States of)",
    MD: "Moldova (the Republic of)",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestine, State of",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    MK: "Republic of North Macedonia",
    RO: "Romania",
    RU: "Russia",
    RW: "Rwanda",
    RE: "Réunion",
    BL: "Saint Barthélemy",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    UM: "United States Minor Outlying Islands",
    US: "USA",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands (British)",
    VI: "Virgin Islands (US)",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Åland Islands",
  };

  function getCountryName(alpha2Code) {
    return countryCodes[alpha2Code] || "Unknown Country";
  }

  function centralizeWeather(weatherCondition) {
    return weatherCategories[weatherCondition] || weatherCategories.default;
  }

  function round(temp) {
    return Math.round(temp * 100) / 100;
  }

  function setBackgroundImage(weather, time) {
    let backgroundImage;

    if ((time > w.sys.sunset || time < w.sys.sunrise) && weather === "Clear") {
      backgroundImage = 'url("../img/bg5.svg")';
    } else if (weather === "Sunny") {
      backgroundImage = 'url("../img/bg1.svg")';
    } else if (weather === "Stormy") {
      backgroundImage = 'url("../img/bg3.svg")';
    } else if (weather === "Caution") {
      backgroundImage = 'url("../img/bg6.svg")';
    } else {
      backgroundImage = 'url("../img/bg2.svg")';
    }

    $("body").css({
      "background-image": backgroundImage,
      transition: "background-image 300ms ease-in-out", // Add the transition property
    });
  }

  function offsetToTimezone(offset) {
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 3600);
    const minutes = Math.floor((absOffset % 3600) / 60);
    const sign = offset >= 0 ? "+" : "-";
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function enochToReadable(timestamp, timezoneOffset) {
    const timezone = offsetToTimezone(timezoneOffset);
    let date = new Date(timestamp * 1000);
    let formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timezone,
    });

    return formattedTime;
  }

  function degreesToDirection(degrees) {
    // Ensure the degrees are within the range [0, 360)
    degrees = ((degrees % 360) + 360) % 360;

    if (degrees >= 337.5 || degrees < 22.5) {
      return "North";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "Northeast";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "East";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "Southeast";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "South";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "Southwest";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "West";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return "Northwest";
    }
  }

  $("#look").click(function (x) {
    let weather_city = $("#weather_city").val();

    const settings1 = {
      async: true,
      crossDomain: true,
      url: `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${weather_city}&appid=${openWeatherAPIKey}&units=metric`,
      method: "GET",
      dataType: "jsonp",
    };

    $.ajax(settings1)
      .done(function (response) {
        console.log(response);
        w = response;

        // Displaying time in 12-hour format
        let formattedTime = enochToReadable(w.dt, w.timezone);
        let formattedSunrise = enochToReadable(w.sys.sunrise, w.timezone);
        let formattedSunset = enochToReadable(w.sys.sunset, w.timezone);
        let direction = degreesToDirection(w.wind.deg);
        let country = getCountryName(w.sys.country);

        let formattedTimezone = w.timezone / 3600;
        if (formattedTimezone >= 0) {
          formattedTimezone = `+${formattedTimezone}`;
        }
        let temp = round(w.main.temp);
        let feels_like = round(w.main.feels_like);
        let temp_min = round(w.main.temp_min);
        let temp_max = round(w.main.temp_max);

        let weather = centralizeWeather(w.weather[0].description);

        setBackgroundImage(weather, w.dt);

        $("#city").text(w.name);
        $("#country").text(country);
        $("#time").text(`${formattedTime} | UTC${formattedTimezone}`);
        $("#rise_set").text(
          `Sunrise: ${formattedSunrise} | Sunset: ${formattedSunset}`
        );
        $("#weather_id").text(weather);
        $("#windSpeed").text(`${w.wind.speed}m/s`);
        $("#direction").text(direction);
        $("#humidity").text(`${w.main.humidity}%`);
        $("#temp").text(`${temp}°C`);
        $("#feels_like").text(`${feels_like}°C`);
        $("#temp_min").text(`${temp_min}°C`);
        $("#temp_max").text(`${temp_max}°C`);
        $("#pressure").text(`${w.main.pressure} hPa`);
        $("#main_img").attr(`src`, `../img/${weather.toLowerCase()}.png`);

        console.log(weather);
        console.log(w.weather[0].description);

        const settings2 = {
          async: true,
          crossDomain: true,
          url: `https://www.meteosource.com/api/v1/free/point?lat=${w.coord.lat}&lon=${w.coord.lon}&sections=all&timezone=auto&language=en&units=auto&key=${meteoSourceAPIKey}`,
          method: "GET",
        };

        $.ajax(settings2)
          .done(function (response) {
            console.log(response);

            const hourlyData = response.hourly.data.map((hour) => ({
              hour: new Date(hour.date).getHours(),
              temperature: hour.temperature,
              weather: hour.weather,
            }));

            // Log the extracted data (you can use it as needed)
            console.log(hourlyData);
            function hourlyTable() {
              for (let i = 1; i < 7; i++) {
                const hour = hourlyData[i];
                hour.weather = centralizeWeather(hour.weather);
                let ampm = "AM"; // Default to AM

                if (hour.hour === 0) {
                  hour.hour = 12; // Midnight is 12:00 AM
                } else if (hour.hour >= 12) {
                  ampm = "PM";
                  // Convert to 12-hour format
                  hour.hour = hour.hour % 12 || 12;
                }

                $(`#hour${i}`).text(hour.hour + ampm);
                $(`#hour${i}img`).attr(
                  `src`,
                  `../img/${hour.weather.toLowerCase()}.png`
                );
                $(`#hour${i}temp`).text(`${hour.temperature} °C`);
              }
              //     const row = document.createElement("tr");
              //     row.innerHTML = `
              //       <td>${hour.hour} ${ampm}</td>
              //       <td>${hour.temperature}</td>
              //       <td>${hour.weather}</td>`;
              //     tableBody.appendChild(row);
              //   }
            }

            const dailyData = response.daily.data.map((day) => ({
              day: new Date(day.day).getDay(),
              temperature: day.all_day.temperature,
              weather: day.all_day.weather,
            }));

            // Log the extracted data (you can use it as needed)
            console.log(dailyData);

            // Call the function to populate the table
            function dailyBoxes() {
              function getDayName(dayIndex) {
                const daysOfWeek = [
                  "SUN",
                  "MON",
                  "TUE",
                  "WED",
                  "THU",
                  "FRI",
                  "SAT",
                ];

                if (dayIndex === -1) {
                  return "YTD";
                } else if (dayIndex === 0) {
                  return "TDY";
                } else if (dayIndex === 1) {
                  return "TOM";
                } else {
                  // If dayIndex is greater than 1, use days of the week array
                  const nextDayIndex = (dayIndex - 2) % 7;
                  return daysOfWeek[nextDayIndex];
                }
              }

              // Your existing loop
              for (let i = 1; i < 5; i++) {
                const day = dailyData[i];
                day.weather = centralizeWeather(day.weather);
                const dayName = getDayName(i); // Get the day name using the getDayName function
                $(`#day${i}`).text(dayName);
                $(`#daytemp${i}`).text(`${day.temperature} °C`);
                $(`#dayimg${i}`).attr(
                  `src`,
                  `../img/${day.weather.toLowerCase()}.png`
                );
              }
            }

            hourlyTable();
            dailyBoxes();
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error in MeteoSource API request:", errorThrown);
            showError();
          });
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Handle failure
        console.error("Error: ", errorThrown);
        function showError() {
          // Display the floating message with the error
          var floatingMessage = document.getElementById("floatingMessage");
          floatingMessage.style.display = "block";

          // Fade out the message after 6 seconds
          setTimeout(function () {
            floatingMessage.style.opacity = "0";
          }, 6000);

          // Hide the message after the fade out animation completes
          setTimeout(function () {
            floatingMessage.style.display = "none";
            floatingMessage.style.opacity = "1"; // Reset opacity for future messages
          }, 6500);
        }

        // Example usage: Call showError function with an error message
        showError();
      });
    x.preventDefault();
  });
});

// sun animation
window.addEventListener("load", function () {
  var img = document.getElementById("main_img");

  function updateImageClass() {
    var imgSrc = img.getAttribute("src");
    if (imgSrc.endsWith("img/sunny.png")) {
      img.classList.add("sunny-animation");
    } else {
      img.classList.remove("sunny-animation");
    }
  }
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "src") {
        updateImageClass();
      }
    });
  });
  observer.observe(img, { attributes: true });
  updateImageClass();
});

// home button
function goHome() {
  window.location.href = "../index.html";
}
