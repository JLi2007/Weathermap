import React, { useEffect, useState } from "react";
import countries from "../countries";
import Weather from "./Weather";
import Map from "./Map";

function Main() {
  async function handleClick(e) {
    e.preventDefault();

    const cityID: string | null = (
      document.getElementById("inputs") as HTMLInputElement
    )?.value;
    const countryID: string | null = (
      document.getElementById("country") as HTMLInputElement
    )?.value;
    console.log(`submitted ${cityID}, ${countryID}`);

    if (cityID && countryID) {
      const data: { cityID: string; countryID: string } = { cityID, countryID };
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const options2: RequestInit = { ...options };

      try {
        const fetching = await fetch("http://localhost:4000/weather", options);
        if (!fetching.ok) {
          throw new Error(`HTTP ERROR Status:${fetching.status}`);
        }
        const json = await fetching.json();
        console.log('json weather data', json.data)
        DisplayWeather(json.data.weatherData);

        const fetching2 = await fetch(
          "http://localhost:4000/location",
          options2
        );
        if (!fetching2.ok) {
          throw new Error(`HTTP ERROR Status:${fetching2.status}`);
        }

        const json2 = await fetching2.json();
        console.log('json location data', json2.data);
        ObtainCoords(json2.data.locationData[0]);
      } catch (e) {
        console.log("Error in fetch:", e);
        const output = document.querySelector(".output");
        if (output) {
          const err = document.createElement("p");
          err.innerHTML = "Entered city does not exist in selected country!";
          err.classList.add("error-class", "gradient-error");

          output.innerHTML = "";
          output.appendChild(err);
        }
      }
    }
  }

  async function DisplayWeather(data: any) {
    const output: HTMLSelectElement | null = document.querySelector(".output");
    const cityID: string = (
      document.querySelector("#inputs") as HTMLInputElement
    )?.value;
    const countryID: string = (
      document.getElementById("country") as HTMLInputElement
    )?.value;

    const city: HTMLHeadingElement = document.createElement("h1");
    const flag: HTMLImageElement = document.createElement("img");
    const flag2: HTMLImageElement = document.createElement("img");
    const temp: HTMLHeadingElement = document.createElement("h1");
    const main: HTMLHeadingElement = document.createElement("h2");
    const icon: HTMLImageElement = document.createElement("img");
    const minmax: HTMLHeadingElement = document.createElement("h4");
    const roots: HTMLDivElement = document.createElement("div");
    const cityContainer: HTMLDivElement = document.createElement("div");
    const mainContainer: HTMLDivElement = document.createElement("div");

    city.textContent = `${cityID?.toUpperCase()}`;
    temp.textContent = `Temperature : ${data.main.temp} °C`;
    if (countryID !== "QS") {
      flag.src = `https://flagsapi.com/${countryID}/shiny/64.png`;
      flag2.src = `https://flagsapi.com/${countryID}/shiny/64.png`;
    }
    main.textContent = `${data.weather[0].main} ⟶ ${data.weather[0].description}`;
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    minmax.textContent = `MIN: ${data.main.temp_min} °C ||| MAX: ${data.main.temp_max} °C`;

    city.classList.add("city-class");
    flag.classList.add("flag-class");
    flag2.classList.add("flag-class");
    temp.classList.add("temp-class");
    main.classList.add("main-class");
    icon.classList.add("icon-class");
    minmax.classList.add("min-class");
    roots.classList.add("roots-class");
    cityContainer.classList.add("city-container");
    mainContainer.classList.add("main-container");

    cityContainer.append(flag, city, flag2);
    mainContainer.append(temp, main, minmax, icon);
    roots.append(cityContainer, mainContainer);
    roots.classList.add("gradient-output");
    if (output) {
      output.innerHTML = "";
      output.appendChild(roots);
    }
  }
  const [markerPosition, newMarkerPosition] = useState([0.0, 0.0]);

  function ObtainCoords(data: any) {
    const lat: number = data.lat;
    const lon: number = data.lon;
    console.log("obtained coords:", lat, lon);
    newMarkerPosition([lat, lon]);
  }

  //populating select box with countries
  useEffect(() => {
    const select: HTMLSelectElement | null = document.querySelector("#country");
    if (select) {
      for (const country_code in countries) {
        const option = document.createElement("option");
        option.value = country_code;
        option.text = countries[country_code];
        select.add(option);
      }
    }
  }, []); // Empty dependency array means the effect runs only once on mount

  //input to upper case
  const [input, upperInput] = useState("");
  const upperCase = (event) => {
    const newValue = event.target.value.toUpperCase();
    upperInput(newValue);
  };

  return (
    <div id="all">
      <div id="top">
        <div className="container">
          <form action="">
            <h1 className="title-gradient">🌦️ WeatherMap 🌨️</h1>
            <br />
            <h4 className="gradient">
              Enter a city and the weather + location will be displayed!
            </h4>
            <div className="user-input">
              <input
                type="text"
                id="inputs"
                placeholder="Enter a City Here"
                name="cityID"
                style={{ color: "rgb(1, 17, 87)" }}
                onChange={upperCase}
                value={input}
              />
              <select id="country" style={{ color: "rgb(1, 17, 87)" }}></select>
              <button
                id="submit"
                onClick={handleClick}
                style={{ color: "rgb(1, 17, 87)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="bottom">
        <Weather />
        <Map position={markerPosition} />
      </div>
    </div>
  );
}

export default Main;
