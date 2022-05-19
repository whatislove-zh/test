window.addEventListener("load", () => {
  let long;
  let lad;
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const degreeSection = document.querySelector(".degree-section");
  const spanSection = document.querySelector(".degree-section span");
  
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3c562eb230c681fdf6a71a3ecf3f5378`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          let tempKelvin = data.main.temp;
          let countryTimezone = data.sys.country;
          let cityTimezone = data.name;
          let tempCelsium = Math.floor(tempKelvin - 273.15);
          let tempFarenhight = Math.floor(((tempKelvin - 273.15) * 9) / 5 + 32);

          temperatureDegree.textContent = Math.floor(tempCelsium);
          locationTimezone.textContent = `${countryTimezone} / ${cityTimezone}`;
          temperatureDescription.textContent = data.weather[0].description;

          //set icon
          setIcons(data.weather[0].icon, document.querySelector(".icon"));

          degreeSection.addEventListener("click", () => {
              if (spanSection.textContent == "°C") {
                  temperatureDegree.textContent = tempFarenhight
                  spanSection.textContent = "°F"
              } else{
                temperatureDegree.textContent = tempCelsium
                spanSection.textContent = "°C"
              }
          })

        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const curentIcon = `q${icon}`;
    skycons.play();
    return skycons.set(iconID, Skycons[curentIcon]);
  }
});
