$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchCity = urlParams.get("city");

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

  const alpha2list = `Afghanistan,AF
  Albania,AL
  Algeria,DZ
  American Samoa,AS
  Andorra,AD
  Angola,AO
  Anguilla,AI
  Antarctica,AQ
  Antigua and Barbuda,AG
  Argentina,AR
  Armenia,AM
  Aruba,AW
  Australia,AU
  Austria,AT
  Azerbaijan,AZ
  Bahamas,BS
  Bahrain,BH
  Bangladesh,BD
  Barbados,BB
  Belarus,BY
  Belgium,BE
  Belize,BZ
  Benin,BJ
  Bermuda,BM
  Bhutan,BT
  Bolivia,BO
  Bonaire,BQ
  Bosnia and Herzegovina,BA
  Botswana,BW
  Bouvet Island,BV
  Brazil,BR
  British Indian Ocean Territory,IO
  Brunei Darussalam,BN
  Bulgaria,BG
  Burkina Faso,BF
  Burundi,BI
  Cabo Verde,CV
  Cambodia,KH
  Cameroon,CM
  Canada,CA
  Cayman Islands,KY
  Central African Republic,CF
  Chad,TD
  Chile,CL
  China,CN
  Christmas Island,CX
  Cocos Islands,CC
  Colombia,CO
  Comoros,KM
  Congo,CD
  The Congo,CG
  Cook Islands,CK
  Costa Rica,CR
  Croatia,HR
  Cuba,CU
  Curaçao,CW
  Cyprus,CY
  Czechia,CZ
  Côte d'Ivoire,CI
  Denmark,DK
  Djibouti,DJ
  Dominica,DM
  Dominican Republic,DO
  Ecuador,EC
  Egypt,EG
  El Salvador,SV
  Equatorial Guinea,GQ
  Eritrea,ER
  Estonia,EE
  Eswatini,SZ
  Ethiopia,ET
  Falkland Islands,FK
  Faroe Islands,FO
  Fiji,FJ
  Finland,FI
  France,FR
  French Guiana,GF
  French Polynesia,PF
  French Southern Territories,TF
  Gabon,GA
  Gambia,GM
  Georgia,GE
  Germany,DE
  Ghana,GH
  Gibraltar,GI
  Greece,GR
  Greenland,GL
  Grenada,GD
  Guadeloupe,GP
  Guam,GU
  Guatemala,GT
  Guernsey,GG
  Guinea,GN
  Guinea-Bissau,GW
  Guyana,GY
  Haiti,HT
  Heard Island and McDonald Islands,HM
  Holy See,VA
  Honduras,HN
  Hong Kong,HK
  Hungary,HU
  Iceland,IS
  India,IN
  Indonesia,ID
  Iran,IR
  Iraq,IQ
  Ireland,IE
  Isle of Man,IM
  Israel,IL
  Italy,IT
  Jamaica,JM
  Japan,JP
  Jersey,JE
  Jordan,JO
  Kazakhstan,KZ
  Kenya,KE
  Kiribati,KI
  North Korea,KP
  South Korea,KR
  Kuwait,KW
  Kyrgyzstan,KG
  Lao People's Democratic Republic,LA
  Latvia,LV
  Lebanon,LB
  Lesotho,LS
  Liberia,LR
  Libya,LY
  Liechtenstein,LI
  Lithuania,LT
  Luxembourg,LU
  Macao,MO
  Madagascar,MG
  Malawi,MW
  Malaysia,MY
  Maldives,MV
  Mali,ML
  Malta,MT
  Marshall Islands,MH
  Martinique,MQ
  Mauritania,MR
  Mauritius,MU
  Mayotte,YT
  Mexico,MX
  Micronesia (Federated States of),FM
  Moldova (the Republic of),MD
  Monaco,MC
  Mongolia,MN
  Montenegro,ME
  Montserrat,MS
  Morocco,MA
  Mozambique,MZ
  Myanmar,MM
  Namibia,NA
  Nauru,NR
  Nepal,NP
  Netherlands,NL
  New Caledonia,NC
  New Zealand,NZ
  Nicaragua,NI
  Niger,NE
  Nigeria,NG
  Niue,NU
  Norfolk Island,NF
  Northern Mariana Islands,MP
  Norway,NO
  Oman,OM
  Pakistan,PK
  Palau,PW
  "Palestine, State of",PS
  Panama,PA
  Papua New Guinea,PG
  Paraguay,PY
  Peru,PE
  Philippines,PH
  Pitcairn,PN
  Poland,PL
  Portugal,PT
  Puerto Rico,PR
  Qatar,QA
  Republic of North Macedonia,MK
  Romania,RO
  Russian Federation,RU
  Rwanda,RW
  Réunion,RE
  Saint Barthélemy,BL
  "Saint Helena, Ascension and Tristan da Cunha",SH
  Saint Kitts and Nevis,KN
  Saint Lucia,LC
  Saint Martin,MF
  Saint Pierre and Miquelon,PM
  Saint Vincent and the Grenadines,VC
  Samoa,WS
  San Marino,SM
  Sao Tome and Principe,ST
  Saudi Arabia,SA
  Senegal,SN
  Serbia,RS
  Seychelles,SC
  Sierra Leone,SL
  Singapore,SG
  Sint Maarten,SX
  Slovakia,SK
  Slovenia,SI
  Solomon Islands,SB
  Somalia,SO
  South Africa,ZA
  South Georgia and the South Sandwich Islands,GS
  South Sudan,SS
  Spain,ES
  Sri Lanka,LK
  Sudan,SD
  Suriname,SR
  Svalbard and Jan Mayen,SJ
  Sweden,SE
  Switzerland,CH
  Syrian Arab Republic,SY
  Taiwan,TW
  Tajikistan,TJ
  "Tanzania, United Republic of",TZ
  Thailand,TH
  Timor-Leste,TL
  Togo,TG
  Tokelau,TK
  Tonga,TO
  Trinidad and Tobago,TT
  Tunisia,TN
  Turkey,TR
  Turkmenistan,TM
  Turks and Caicos Islands,TC
  Tuvalu,TV
  Uganda,UG
  Ukraine,UA
  United Arab Emirates,AE
  United Kingdom,GB
  United States Minor Outlying Islands,UM
  USA,US
  Uruguay,UY
  Uzbekistan,UZ
  Vanuatu,VU
  Venezuela,VE
  Viet Nam,VN
  Virgin Islands (British),VG
  Virgin Islands (US),VI
  Wallis and Futuna,WF
  Western Sahara,EH
  Yemen,YE
  Zambia,ZM
  Zimbabwe,ZW
  Åland Islands,AX`;

  function getCountryName(alpha2Code) {
    const countryCodes = {};
    const lines = alpha2list.split("\n");

    // Parse CSV data and populate the countryCodes object
    lines.forEach((line) => {
      const [countryName, code] = line.split(",");
      countryCodes[code.trim()] = countryName.trim();
    });

    return countryCodes[alpha2Code];
  }

  function centralizeWeather(weatherCondition) {
    switch (weatherCondition) {
      case "Clouds":
      case "overcast":
      case "overcast clouds":
      case "partly_sunny":
      case "partly sunny":
      case "scattered clouds":
      case "few clouds":
      case "broken clouds":
      case "partly_clear":
      case "partly clear":
      case "mostly_cloudy":
      case "mostly cloudy":
      case "cloudy":
        return "Cloudy";
        break;

      case "Mist":
      case "mist":
      case "fog":
        return "Misty";
        break;

      case "Rain":
      case "light_rain":
      case "light rain":
      case "rain":
      case "freezing_rain":
      case "freezing rain":
      case "psbl_freezing_rain":
      case "psbl freezing rain":
      case "hail":
      case "moderate rain":
      case "heavy intensity rain":
      case "psbl_rain":
      case "psbl rain":
      case "rain_shower":
      case "rain shower":
      case "psbl_freezing_rain_(night)":
      case "rain_shower_(night)":
        return "Rainy";
        break;

      case "Snow":
      case "light_snow":
      case "light snow":
      case "snow":
      case "psbl_snow":
      case "psbl snow":
      case "snow_shower":
      case "snow shower":
      case "rain_and_snow":
      case "rain and snow":
      case "psbl_rain_and_snow":
      case "psbl rain and snow":
      case "snow_shower_(night)":
      case "rain_and_snow_(night)":
        return "Snowy";
        break;

      case "Sunny":
      case "sunny":
      case "mostly_sunny":
      case "mostly sunny":
        return "Sunny";
        break;
      case "clear_(night)":
      case "clear":
      case "clear sky":
      case "mostly_clear_(night)":
      case "mostly_clear":
      case "mostly clear":
        return "Clear";
        break;

      case "Thunderstorm":
      case "thunderstorm":
      case "local_thunderstorms":
      case "local thunderstorms":
        return "Stormy";
        break;

      default:
        return "Caution";
    }
  }

  function round(temp) {
    return Math.round(temp * 100) / 100;
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
    let w;
    let weather_city = $("#weather_city").val();
    let api_key1 = `67f150577d5c2f04c43b563826480c3f`;
    let api_key2 = `9o32eyttz0vrjrohq3yygwzd3pztmvnf2qc2esnm`;

    const settings1 = {
      async: true,
      crossDomain: true,
      url: `https://api.openweathermap.org/data/2.5/weather?q=${weather_city}&appid=${api_key1}&units=metric`,
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

        weather = centralizeWeather(w.weather[0].description);

        if (w.dt > w.sys.sunset || w.dt < w.sys.sunrise) {
          if (weather === "Clear") {
            $("body").css("background-image", 'url("../img/bg5.svg")');
          } else {
            $("body").css("background-image", 'url("../img/bg4.svg")');
          }
        } else if (weather === "Sunny") {
          $("body").css("background-image", 'url("../img/bg1.svg")');
        } else if (weather === "Stormy") {
          $("body").css("background-image", 'url("../img/bg3.svg")');
        } else if (weather === "Caution") {
          $("body").css("background-image", 'url("../img/bg6.svg")');
        } else {
          $("body").css("background-image", 'url("../img/bg2.svg")');
        }

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
          url: `https://www.meteosource.com/api/v1/free/point?lat=${w.coord.lat}&lon=${w.coord.lon}&sections=all&timezone=auto&language=en&units=auto&key=${api_key2}`,
          method: "GET",
          dataType: "jsonp",
        };

        $.ajax(settings2).done(function (response) {
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
