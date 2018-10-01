if (navigator.geolocation) {
  window.onload = (e) => {
    e.preventDefault()
    let curPos
    function getCurrentLocation (position) {
      curPos = position
      lat = curPos.coords.latitude
      lon = curPos.coords.longitude
  
      $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=4d3cf5c1f020da501ae42ae0c9ce6651`, (data) => {
        let rawJson = JSON.stringify(data)
        let json = JSON.parse(rawJson)
        let celsius = Math.round(json.main.temp - 273.15);
        let desc = `<span style="font-family: 'Montserrat', sans-serif; font-size: 20px; margin: 0 20px;">${json.weather[0].description}</span>`
        let weatherId = json.weather[0].id
        
        // if (celsius) {
        //   $("#temp").append(celcius)
        // }

        if (weatherId >= 200 && weatherId < 300) $("#wicon").attr("class", " wi wi-thunderstorm").append(desc)
        if (weatherId >= 300 && weatherId < 400) $("#wicon").attr("class", " wi wi-sprinkle").append(desc)
        if (weatherId >= 500 && weatherId < 600) {
          if (weatherId == 500 || weatherId >= 520) $("#wicon").attr("class", "wi wi-rain").append(desc)
          else $("#wicon").attr("class", " wi wi-showers").append(desc)
        }
        if (weatherId >= 600 && weatherId < 700) $("#wicon").attr("class", " wi wi-snow").append(desc)
        if (weatherId >= 700 && weatherId < 800) $("#wicon").attr("class", " wi wi-fog").append(desc)
        if (weatherId == 800) $("#wicon").attr("class", " wi wi-day-sunny").append(desc)
        if (weatherId == 801) $("#wicon").attr("class", " wi wi-day-sunny-overcast").append(desc)
        if (weatherId == 802) $("#wicon").attr("class", " wi wi-day-cloudy").append(desc)
        if (weatherId == 803 || weatherId == 804) $("#wicon").attr("class", " wi wi-cloudy").append(desc)
        if (weatherId == 900) $("#wicon").attr("class", " wi wi-tornado").append(desc)
        if (weatherId == 901 || weatherId == 960 || weatherId == 961) $("#wicon").attr("class", " wi wi-thunderstorm").append(desc)
        if (weatherId == 902 || weatherId == 962) $("#wicon").attr("class", " wi wi-hurricane").append(desc)
        if (weatherId == 903) $("#wicon").attr("class", " wi wi-snowflake-cold").append(desc)
        if (weatherId == 904) $("#wicon").attr("class", " wi wi-hot").append(desc)
        if (weatherId == 905) $("#wicon").attr("class", " wi wi-strong-wind").append(desc)
        if (weatherId == 906) $("#wicon").attr("class", " wi wi-hail").append(desc)
        if (weatherId == 951) $("#wicon").attr("class", "wi wi-day-sunny").append(desc)
        if (weatherId >= 952 && weatherId <= 956) $("#wicon").attr("class", "wi wi-windy").append(desc)
        if (weatherId >= 957 && weatherId <= 959) $("#wicon").attr("class", "wi wi-strong-wind").append(desc)
      })
    }
  navigator.geolocation.getCurrentPosition(getCurrentLocation)
  }
}

