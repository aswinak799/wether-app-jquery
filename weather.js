
        $(document).ready(()=>{
            $("#get-weather").click(async()=>{
                let city = $("#city").val()
                console.log(city);
                api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=7459ceb4613aab55e0cad63ac87a3793`
                const loc = await fetchApis(api);
                const [lat,long] = await [loc[0].lat,loc[0].lon]
                weatherDetails(lat,long)

            });

            $("#location").click(()=>{
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        weatherDetails(latitude,longitude);
                    });
                } else {
                console.log("Geolocation is not supported by this browser.");
                }
            })

            async function fetchApis(api) {

                const response = await fetch(api);
                const jsonData = await response.json();
                console.log(jsonData.length);
                // const [lat,long] =  [jsonData[0].lat,jsonData[0].lon]
                // console.log(lat,long);
                if(jsonData.length<1){
                    $(".show-weather").empty();
                    $("input").val("")
                    Swal.fire({
                    title: 'Alert',
                    text: "You are entered a iinvalid place!",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#d33',
                  })
                }
                return jsonData;
            }

            async function weatherDetails(lat,lon) {
                let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7459ceb4613aab55e0cad63ac87a3793`;
                const weather = await fetchApis(api);
                console.log(weather.weather[0]);

                const weatherType = weather.weather[0];
                const temp = weather.main;
                const wind = weather.wind;
                const place = weather.name
                console.log(wind);
                $(".show-weather").empty();
                $(".show-weather").append(`<div class="card">
                <div class="card-body">
                    <table>
                        <tr>
                            <td>
                                <i class="bi bi-thermometer-snow"></i>

                            </td>
                            <td>
                                <h5 class="card-title mt-1" id="temp">${Math.floor(temp.temp-273.15)+"°C"}</h5>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <i class="bi bi-geo-alt" ></i>
                            </td>
                            <td>
                                <h6 class="card-subtitle mb-2 text-muted" id="place">${place}</h6>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="bi bi-droplet"></i>
                            </td>
                            <td>
                                <h6 class="card-subtitle mb-2 text-muted" id="humidity">${"Humidity: "+temp.humidity}</h6>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="bi bi-wind"></i>
                            </td>
                            <td>
                                <h6 class="card-subtitle mb-2 text-muted" id="wind-speed">${"Wind speed: "+wind.speed}</h6>
                            </td>
                        </tr>
                    </table>
                </div>  
                </div>`);
            }
        });
    