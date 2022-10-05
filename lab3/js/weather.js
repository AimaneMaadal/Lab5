export default class Wheather {
    constructor() {
        this.lat = 0;
        this.lat = 0;
        navigator.geolocation.getCurrentPosition(this.getCurrentPosition.bind(this));
    }

    getCurrentPosition(position) {
        if (localStorage.getItem("time") == null || localStorage.getItem("time") < Date.now() - 3600000) {
            localStorage.setItem("time", Date.now());
            navigator.geolocation.getCurrentPosition(this.getCurrentPosition.bind(this));
            this.getWheather();
        } else {
            this.lat = localStorage.getItem("lat");
            this.long = localStorage.getItem("long");
            this.getWheather();
        }
    }

    getWeather() {
        let url = `https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.long}&key=874c13ff5a3148c5a30393619777e45d&include=minutely`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let description = data.data[0].weather.description;
                document.querySelector(".temp").innerHTML = "The temperture is "+data.data[0].temp+"°C and the weather is "+description;
                console.log(description);
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
                this.getPlaylist(playlist);
                console.log(playlist);
            })
            .catch(err => {
                console.error(err);
            });
    }

    getPlaylist(playlist) {
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