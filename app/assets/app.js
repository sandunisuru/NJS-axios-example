var platform = new H.service.Platform({
    'app_id': 'BFapqFtYq8Upb00ECaaw',
    'app_code': 'buocVykiOEOkcOiq3dMNuw'
  });

Neutralino.init({
    load: function() {
      document.getElementById("get").addEventListener('click', getData);
    }
});

function getData(){

    var city = document.getElementById("sel1").value;

    axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ city +',LK&appid=538e2cfc3ba9efaf487fe295796481ec')
        .then(function (response) {
    // handle success
            var coord = response.data.coord;
            loadMap(coord);
            document.getElementById("temp").innerHTML = parseInt(response.data.main.temp - 273) + "°C";
            document.getElementById("pressure").innerHTML = response.data.main.pressure + "mb";
            document.getElementById("humidity").innerHTML = response.data.main.humidity + "%";
            document.getElementById("wind").innerHTML = "Speed : " + response.data.wind.speed + " Km/h | Direction : " + response.data.wind.deg + "°";
            document.getElementById("weather").innerHTML = response.data.weather[0].main + " | " + response.data.weather[0].description;
    
        })
        .catch(function (error) {
    // handle error
            console.log(error);
        })
        .then(function () {
    // always executed
        });
}

function loadMap(coord){
    document.getElementById("map").innerHTML = "";
    var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,{
            zoom: 10,
            center: { lat: coord.lat, lng: coord.lon }
            });

    var icon = new H.map.Icon('https://image.ibb.co/eCr8yp/icon.png');
    var marker = new H.map.Marker({ lat: coord.lat, lng: coord.lon }, { icon: icon });
    map.addObject(marker);

}