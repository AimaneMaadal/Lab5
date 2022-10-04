export default class Wheather {
    constructor() {
        this.lat = 0;
        this.lat = 0;
        navigator.geolocation.getCurrentPosition(this.getCurrentPosition.bind(this));
    }

    getCurrentPosition(position) {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(this.lat);
        console.log(this.long);
        this.getWheather();
    }

    getWheather() {
        let url = `https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.long}&key=874c13ff5a3148c5a30393619777e45d&include=minutely`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let description = data.data[0].weather.description;
                console.log(description);
            })
    }



}