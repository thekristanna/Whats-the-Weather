$(document).ready(function () {
  $("#look").click(function (x) {
    let w;
    let weather_city = $("#weather_city").val();
    let api_key1 = `67f150577d5c2f04c43b563826480c3f`;
    let api_key2 = `9o32eyttz0vrjrohq3yygwzd3pztmvnf2qc2esnm`;

    function centralizeWeather(weatherCondition) {
      switch (weatherCondition) {
        case "Clouds":
        case "overcast":
        case "overcast clouds":
        case "partly_sunny":
        case "scattered clouds":
        case "few clouds":
        case "broken clouds":
        case "partly_clear":
        case "mostly_cloudy":
        case "cloudy":
          return "Cloudy";
          break;

        case "Mist":
        case "fog":
          return "Misty";
          break;

        case "Rain":
        case "light_rain":
        case "rain":
        case "freezing_rain":
        case "psbl_freezing_rain":
        case "hail":
        case "moderate rain":
        case "heavy intensity rain":
        case "psbl_rain":
        case "rain_shower":
        case "psbl_freezing_rain_(night)":
        case "rain_shower_(night)":
          return "Rainy";
          break;

        case "Snow":
        case "light_snow":
        case "snow":
        case "psbl_snow":
        case "snow_shower":
        case "rain_and_snow":
        case "psbl_rain_and_snow":
        case "snow_shower_(night)":
        case "rain_and_snow_(night)":
          return "Snowy";
          break;

        case "Sunny":
        case "sunny":
        case "mostly_sunny":
        case "clear_(night)":
        case "clear":
        case "clear sky":
        case "mostly_clear_(night)":
        case "mostly_clear":
          return "Clear";
          break;

        case "Thunderstorm":
        case "thunderstorm":
        case "local_thunderstorms":
        case "local_hunderstorms":
          return "Thunderstorms";
          break;

        default:
          return "Atmospheric Phenomenon";
      }
    }

    const settings1 = {
      async: true,
      crossDomain: true,
      url: `https://api.openweathermap.org/data/2.5/weather?q=${weather_city}&appid=${api_key1}&units=metric`,
      method: "GET",
    };

    function round(temp) {
      return Math.round(temp * 100) / 100;
    }

    function enochToReadable(timestamp) {
      let date = new Date(timestamp * 1000);
      let formattedTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
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

    $.ajax(settings1).done(function (response) {
      console.log(response);
      w = response;

      // Displaying time in 12-hour format
      let formattedTime = enochToReadable(w.dt);
      let formattedSunrise = enochToReadable(w.sys.sunrise);
      let formattedSunset = enochToReadable(w.sys.sunset);
      let direction = degreesToDirection(w.wind.deg);

      let formattedTimezone = w.timezone / 3600;
      if (formattedTimezone >= 0) {
        formattedTimezone = `+${formattedTimezone}`;
      }
      temp = round(w.main.temp);
      feels_like = round(w.main.feels_like);
      temp_min = round(w.main.temp_min);
      temp_max = round(w.main.temp_max);

      weather = centralizeWeather(w.weather[0].description);

      $("#city").text(w.name);
      $("#country").text(w.sys.country);
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

      console.log(weather);
      console.log(w.weather[0].description);

      const settings2 = {
        async: true,
        crossDomain: true,
        url: `https://www.meteosource.com/api/v1/free/point?lat=${w.coord.lat}&lon=${w.coord.lon}&sections=all&timezone=auto&language=en&units=auto&key=${api_key2}`,
        method: "GET",
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
          }
        }

        hourlyTable();
        dailyBoxes();
      });
    });
    x.preventDefault();
  });
});
