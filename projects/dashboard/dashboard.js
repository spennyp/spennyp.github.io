const baseImgPath = "../../img/dashboard/" 

window.onload = function() {
    startClock();
    refreshPage();
}

function startClock() {
    var updateRate = 1000; // Update every 1000ms
    var today = new Date();

    // Convert to 12 hour clock
    var h = today.getHours() % 12;
    if (h == 0) {
        h = 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = formatTime(m);
    s = formatTime(s);
    document.getElementById('time').innerHTML = h + ":" + m;
    var t = setTimeout(startClock, updateRate);
}

// add zero in front of numbers < 10
function formatTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

async function refreshPage() {
    document.getElementById("searchText").select(); // Make the cursor select the search box on load
    setName();
    setTimeOfDay();
    updateBackgroundImg();
    updateWeather();
}

function setName() {
    var name = getUrlParam("name");
    if (name == undefined) {
        name = "{pass name parameter}"
    }
    document.getElementById('yourName').innerHTML = name;
}

function getUrlParam(paramName) {
    var pageUrl = window.location.search.substring(1);
    var urlVars = pageUrl.split('&');
    for (var i = 0; i < urlVars.length; i++) {
        var name = urlVars[i].split('=');
        if (name[0] == paramName) {
            return name[1];
        }
    }
}

function setTimeOfDay() {
    const today = new Date();
    const h = today.getHours();
    var TOD = "evening"
    if (h >= 5 && h < 12) {
        TOD = "morning"
    } else if (h >= 12 && h <= 17) {
        TOD = "afternoon"
    }

    const day = today.getDate();
    const monthIndex = today.getMonth();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[monthIndex];
    document.getElementById('TOD').innerHTML = TOD;
    document.getElementById('month').innerHTML = month;
    document.getElementById('day').innerHTML = day;
    document.getElementById('date').style.opacity = 0;
}
  
// Images are retieved from unsplash, using regular images as they seem like the best time/quality tradeoff
function updateBackgroundImg() {
    const collections = ""

    // Three different accounts for testing (keep running out of requests)
    var clientId = "c_Mh-IYia-rRAxpMVjEXew6rcrvySdE3lVI3xnG4Vrk";
    // var clientId = "9i_xH3I1PGmz4bSd5TjXVViHg7hq2WUz9iVEyq74POA";
    // var clientId = "0K6ecqqXYKMvm7wJt8GpZ0qA6tpvbkqjNrQ8e6qKpP0";

    var url = "https://api.unsplash.com/photos/random/?client_id=" + clientId + "&orientation=landscape&collections=" + collections;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const urls = data["urls"];
            const {raw, regular, full, small} = urls;
            const url = "url(" + regular + ")"
            document.body.style.backgroundImage = url; // Update background image
        })
        .catch(() => {
            console.log("Error");
        });
}

function updateWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function getWeather(position) {
    const apiKey = "a68f7eba17ff810319e0698eb480852e";
    var folderImgPath = baseImgPath + "weather/" 

    // Rounding to 2 decimal places for privacy reasons     
    var lat = position.coords.latitude.toFixed(2);
    var long = position.coords.longitude.toFixed(2);

    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {main, name, sys, weather} = data;
            var type = weather[0]["main"];
            var {sunrise, sunset} = sys;
            var now = new Date(); // Unix time since epoche

            // Set to clear night or clear day (for sun or moon)
            if (type == "Clear") {
                if (now > sunrise && now < sunset) {
                    type = "Clearday";
                } else {
                    type = "Clearnight";
                }
            }
            
            var iconDict = {};
            iconDict["Thunderstorm"] = "thunderStorm.svg";
            iconDict["Drizzle"] = "drizzle.svg";
            iconDict["Rain"] = "rain.svg";
            iconDict["Snow"] = "snow.svg";
            iconDict["Clouds"] = "clouds.svg";
            iconDict["Clearnight"] = "clearNight.svg";
            iconDict["Clearday"] = "clearDay.svg";

            if (type in iconDict) {
                weatherIconExtension = iconDict[type];
            } else { // Then it is mist/smoke/fog/etc. (haze)
                weatherIconExtension = "hazy.svg";
            }

            document.getElementById('city').innerHTML = name;
            document.getElementById('temp').innerHTML = main.temp.toFixed(0) + "&deg";
            var imgUrl = folderImgPath + weatherIconExtension;
            document.getElementById('weatherIcon').src = imgUrl;
        }) 
        .then(_ => { // Fade in weather, quote, and date once weather data filled
            var fadeElements = [document.getElementById("weather"), document.getElementById("date")];
            fadeIn(fadeElements);
        })
        .catch(() => {
            console.log("Error");
        });
}  

// This is currently not being used
function updateQuote() {
    categories = ["inspire", "life", "funny", "students"];
    category = categories[randomNumber(categories.length)]

    url = "https://quotes.rest/qod?category=" + category + "&language=en"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {quote, author} = data["contents"]["quotes"][0]               
            document.getElementById('quote').innerHTML = quote;
        })
        .catch(() => {
            console.log("Error");
        });
}

function fadeIn(elements) {
    var op = 0.1;
    // element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        for (element of elements) {
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        }
        op += op * 0.1;
    }, 50);
}

// Returns a random number between 0 and n-1
function randomNumber(n) {
    return Math.floor(Math.random() * n);
}

 
