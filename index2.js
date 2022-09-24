const api_key = "c9300235133a2c5efa2187f9fe40e879";

    async function getData() {
         let city = document.querySelector(".search-bar").value;
        
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

         let res = await fetch(url);
        // console.log(res);
         let data = await res.json();
        //  console.log(data);
        append(data);
     }

     function append(data) {

        let {name} = data;
        let {icon, description} = data.weather[0];
        let {temp,humidity} = data.main;
        let {speed} = data.wind;
        //console.log(name,icon, description,temp,humidity,speed);
        document.querySelector(".city").innerText="Weather in " + name;
        // document.querySelector(".icon").src = "https://openweathermap.org/img/wn" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = (temp-273.15) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + humidity + "km/h";

        //step 11-->set live map
        let iframe = document.getElementById("gmap_canvas");
        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

     }


    //  on location
    function getLocation() {
        navigator.geolocation.getCurrentPosition(success);
      
        function success(pos) {
          const crd = pos.coords;
      
          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
          getWatherAuto(crd.latitude, crd.longitude);
        }
      }

     function getWatherAuto(lat, lon) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c9300235133a2c5efa2187f9fe40e879 `;
      
        fetch(url)
          .then(function (res) {
            return res.json();
          })
          .then(function (res) {
            console.log(res);
            append(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      

