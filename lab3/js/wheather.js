export default class Wheather {
    constructor() {
        this.lat = 0;
        this.lat = 0;
        navigator.geolocation.getCurrentPosition(this.getCurrentPosition.bind(this));
    }

    getCurrentPosition(position) {
        if (localStorage.getItem("lat") && localStorage.getItem("long")) {
            let lat = localStorage.getItem("lat");
            let long = localStorage.getItem("long");
            let time = localStorage.getItem("time");
            let now = new Date().getTime();
            let diff = now - time;
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            if (minutes > 80) {
                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;
                localStorage.setItem("lat", this.lat);
                localStorage.setItem("long", this.long);
                localStorage.setItem("time", new Date().getTime());
            } else {
                this.lat = lat;
                this.long = long;
            }
        } else {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            localStorage.setItem("lat", this.lat);
            localStorage.setItem("long", this.long);
            localStorage.setItem("time", new Date().getTime());
        }
        this.getWeather();




    }

    getWeather() {
        if (localStorage.getItem("weather") && localStorage.getItem("time")) {
            let weather = localStorage.getItem("weather");
            let time = localStorage.getItem("time");
            let now = new Date().getTime();
            let diff = now - time;
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            if (minutes > 60) {
                this.fetchWeather();
                console.log("fetching new weather");
            } else {
                this.renderWeather(weather);
                console.log("fetching old weather");
            }
        } else {
            this.fetchWeather();
        }
    }

    renderWeather(weather) {
        let data = JSON.parse(weather);
        let description = data.data[0].weather.description;
        document.querySelector(".temp").innerHTML = "The temperture is <b>" + data.data[0].temp + "°C</b> and the weather is <b>" + description+"</b>";
        this.getPlaylist(description);
    }

    fetchWeather() {
        let url = `https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.long}&key=874c13ff5a3148c5a30393619777e45d&include=minutely`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("weather", JSON.stringify(data));
                localStorage.setItem("time", new Date().getTime());

                let weather = localStorage.getItem("weather");
                this.renderWeather(weather);
            })
    }

    getPlaylist(description) {
        let playlist = "";
        switch (description) {
            case "Clear sky":
                playlist = "37i9dQZF1DX1BzILRveYHb";
                break;
            case "Few clouds":
                playlist = "6IKQrtMc4c00YzONcUt7QH";
                break;
            case "Scattered clouds":
                playlist = "6cQikvBTHpNlXUEmhsLIb2";
                break;
            case "Broken clouds":
                playlist = "37i9dQZF1DXdpVnIAppzRq";
                break;
            case "Shower rain":
                playlist = "37i9dQZF1DX2UgsUIg75Vg";
                break;
            case "Rain":
                playlist = "37i9dQZF1DXbvABJXBIyiY";
                break;
            case "Thunderstorm":
                playlist = "37i9dQZF1EQnqst5TRi17F";
                break;
            case "Snow":
                playlist = "37i9dQZF1DX0Yxoavh5qJV";
                break;
            case "Mist":
                playlist = "37i9dQZF1DXdbkmlag2h7b";
                break;
        }
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5d892729bdmsh4e13c9a937c7879p18f0efjsn3fd1ff502a15',
                'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
            }
        };
        fetch(`https://spotify81.p.rapidapi.com/playlist?id=${playlist}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let playlist = data.description;
                let playlistName = data.name;
                let playlistImage = data.images[0].url;
                let playlistUrl = data.external_urls.spotify;
                let playlistHtml = `<div class="playlist" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${playlistImage})">
                <img src="${playlistImage}" class="cd" alt="playlist image">
                <div class="playlist-info">
                    <h2>${playlistName}</h2>
                    <p>${playlist}</p>
                    <a href="${playlistUrl}" target="_blank">Listen on Spotify</a>
                </div></div>`;
                document.querySelector(".playlist").innerHTML = playlistHtml;
            })

            .catch(err => {
                console.error(err);
            });
    }
}