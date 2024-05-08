import React, { useEffect } from 'react';
import countries from '../countries';


function Main(){
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
    }, []);
    
    return(
        <div className='container'> 
            <form action="">
                <h1>Weather App</h1><br/>
                <h4>Enter a city and the weather + location will be displayed!</h4>
                <input type="text" id="inputs" placeholder="Enter a City Here" name="cityID"/>
                <select id="country"></select>
                <button id="submit">Submit</button>
            </form>
        </div>
    )
}

export default Main