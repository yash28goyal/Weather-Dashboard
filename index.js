const apikey = "80398a865ba345028f955310242502";
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=";

const arrayvalue = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];

const maincontent = document.getElementById("main-content");
const errorcontent = document.getElementById("error-content");
const waitLoc = document.getElementById("target")

const temp = document.getElementById("temp");
const text = document.getElementById("text");
const icon = document.getElementById("icon");
const currentcity = document.getElementById("currentcity");
const currentdate = document.getElementById("currentdate");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const gust = document.getElementById("gust");
const feel = document.getElementById("feel");
const speed = document.getElementById("speed");

const searchbar = document.getElementById("searchbar");
const searchbtn = document.getElementById("searchbtn");

const hourly_display = document.getElementById("hourly_display");

async function checkWeather(City){
    try {
        const response = await fetch(apiUrl + apikey + "&q=" + City);
        const data = await response.json();
        
            waitLoc.style.display="block";
            errorcontent.style.display="none";
            maincontent.style.display="none";
            
        
        setTimeout(() => {
            errorcontent.style.display="none";
            waitLoc.style.display="none";
            maincontent.style.display="block";
            if(!data.current){
                errorcontent.style.display="block";
                waitLoc.style.display= "none";
                maincontent.style.display="none";
            }
            
            temp.innerText=data.current.temp_c + "°c";
            text.innerHTML=data.current.condition.text;
            icon.style.display='block';
            icon.src=data.current.condition.icon;
            
            const D = new Date();
            currentcity.innerText=data.location.name + ", " + data.location.region + ", " + data.location.country;
            currentdate.innerHTML=data.current.last_updated.split(" ")[0] +  " ," + arrayvalue[D.getDay()] +"<br>"+  " Time: " +  data.current.last_updated.split(" ")[1] ;
            
            sunrise.innerText=data.forecast.forecastday[0].astro.sunrise;
            sunset.innerText=data.forecast.forecastday[0].astro.sunset;

            pressure.innerText=data.current.pressure_mb + " hPa";
            humidity.innerText=data.current.humidity + "%"
            visibility.innerText= data.current.vis_km + " KM"
            feel.innerText=data.current.feelslike_c + '°c';
            gust.innerText=data.current.gust_kph + 'Km/hr'; 
            speed.innerText=data.current.wind_kph + 'Km/hr';

            console.log(data);

            var hourly_data = data.forecast.forecastday[0].hour;
            hourly_data.map((data)=>{
                const temporary = document.createElement(`div`);
                temporary.innerHTML=`<div class="contain-hourly-data-child p-2 color2 flex2 vertical-align">
                <img src="${data.condition.icon}" alt="" height="100" width="100">
                <h2>${data.condition.text}</h2>
                <h2>${data.temp_c} &deg;c</h2>
                <h2 id="date&time">${data.time.split(' ')[1]}</h2>
                <h5>Chance of Rain : <span id="rain">${data.chance_of_rain}</span></h5>
                <h5>Chance of Snow : <span id="snow">${data.chance_of_snow}</span></h5>
                </div>`;
                hourly_display.appendChild(temporary);

            })
        }, 1000);

    }catch(err) {
        console.log(err)
    }
} 

searchbar.addEventListener("keypress", function (e){
    if (e.key === "Enter"){
        checkWeather(searchbar.value);
        searchbar.value="";
    }
})

searchbtn.addEventListener('click',()=>{
    checkWeather(searchbar.value);
    searchbar.value="";
})

function fetchlocation(){
    checkWeather("rajpura");
}

checkWeather("sri ganganagar");