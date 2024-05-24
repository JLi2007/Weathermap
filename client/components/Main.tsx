import React, { useEffect } from 'react';
import countries from '../countries';
// import { handleClick } from './utils'

function Main(){
    async function handleClick(e){
        e.preventDefault();

        const cityID: string | null = (document.getElementById('inputs') as HTMLInputElement)?.value;
        const countryID: string | null = (document.getElementById('country') as HTMLInputElement)?.value;
        console.log(`submitted ${cityID}, ${countryID}`);

        if (cityID && countryID){
            const data : {cityID:string; countryID:string} = {cityID , countryID};
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            const options2: RequestInit = { ...options};

            try{
                const fetching = await fetch('http://localhost:4000/weather', options);
                if (!fetching.ok) {
                    throw new Error(`HTTP ERROR Status:${fetching.status}`);
                }
                const json = await fetching.json();
                console.log(`json data: ${json}`);
                DisplayWeather(json.data.weatherData);

                const fetching2 = await fetch('http://localhost:4000/location', options2);
                if (!fetching2.ok) {
                    throw new Error(`HTTP ERROR Status:${fetching2.status}`);
                }

                const json2 = await fetching2.json();
                console.log(`json data: ${json2}`);
                ObtainCoords(json2.data.locationData[0]);

            }catch(e){
                console.log('error in fetching', e)
            }
        }
    }

    async function DisplayWeather(data:any){
        console.log('weather:', data);
    }

    async function ObtainCoords(data:any){
        console.log('location:', data);
    }
    
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
    
    return(
        <div className='container'> 
            <form action="">
                <h1>Weather App</h1><br/>
                <h4>Enter a city and the weather + location will be displayed!</h4>
                <input type="text" id="inputs" placeholder="Enter a City Here" name="cityID"/>
                <select id="country"></select>
                <button id="submit" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Main