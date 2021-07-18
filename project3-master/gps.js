var map;
var markedLocations = [];
var index= -1;

// Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 35.344, lng: 35.036 },
    });
}



// Returns the city data from google maps geocoding api results array
function findCity(results) {
    if (!results || results.length <= 0) {
        return false;
    }

    var cityIndex = -1;
    for (let index = 0; index < results.length; index++) {
        if (results[index].types[0] == "administrative_area_level_1") {
            cityIndex = index;
            break;
        }
    }

    if (cityIndex < 0) {
        for (let index = 0; index < results.length; index++) {
            if (results[index].types[0] == "administrative_area_level_2") {
                cityIndex = index;
                break;
            }
        }
    }

    if (cityIndex >= 0 && cityIndex < results.length) {
        return results[cityIndex];
    }
    return false;
}

// Check if number is a number and is in range [min, max]
function withinRange(min, number, max) {
    return !isNaN(number) && number != "" && number >= min && number <= max;
}

// Check if lat and lng are valid coordinates
function validateCoordinates(lat, lng) {
    if (!withinRange(-90, lat, 90) || !withinRange(-180, lng, 180)) {
        alert(
            "Please enter numeric values between [-180, 180] for Longitude and [-90, 90] for Latitude."
        );
        return false;
    }
    return true;
}

// Reads the coordinates from input fields and validates them
function validateCoord() {
    var lng = document.getElementById("lngInput").value;
    var lat = document.getElementById("latInput").value;
    if (!validateCoordinates(lat, lng)) {
        return false;
    }
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
}

// Reads the coordinates from input fields and validates them
function getLat() {
    var lng = document.getElementById("lngInput").value;
    var lat = document.getElementById("latInput").value;
    if (!validateCoordinates(lat, lng)) {
        return false;
    }
    return lat;
}




// Shows the city of the input coordinates
function showCoord() {
    var pos = validateCoord();
    if (!pos) {
        return;
    }

    clearLocations();
    var city = "InvalidIndexError";
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results, status) => {
        var info = document.getElementById("info");
        var error = true;
        if (status === "OK") {
            city = findCity(results);
            if (city) {
                error = false;
                city = city.address_components[0].long_name;
                info.innerHTML = 'Your city is <b id="result">' + city + "</b>";

                var myLatlng = new google.maps.LatLng(pos);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                });
                map.setCenter(myLatlng);
                map.setZoom(6);
                markedLocations.push(marker);
            }
        }

        if (error) {
            info.innerHTML =
                '<b id="result" style="color: red">There are no cities nearby.</b>';
        }
    });
}

// function elevationHelper(location, elevator){

//     console.log(location);

//     elevator.getElevationForLocations({
//         locations: [location],
//     })
//     .then((results) =>{
//         var myLatlng = new google.maps.LatLng(location);
//         var marker = new google.maps.Marker({
//             position: myLatlng,
//             map: map,
//         });
//         map.setCenter(myLatlng);
//         map.setZoom(6);
//         markedLocations.push(marker);

//         console.log(results[0]);
//         //Retrieve the first result
//         if( results[0]) {
//             info.innerHTML = 'The elevation at this point is <b id="result">' + results[0].elevation + "</b>";

//         }
//         else{
//             info.innerHTML= '<b id="result" style="color: red">No elevation results found.</b>';
//         }
//     })
//     .catch((e) =>
//     info.innerHTML = 'Elevation service failed due to <b id="result">' + e + "</b>"
//     );


// }



function getElevation() {

    var pos = validateCoord();

    index= index + 1;
    
    if (!pos) {
        return;
    }

    clearLocations();
    
            var myLatlng = new google.maps.LatLng(pos);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
            });
            map.setCenter(myLatlng);
            map.setZoom(6);
            markedLocations.push(marker);

            const elevator = new google.maps.ElevationService();

            var requestElevation = {
                'locations': [markedLocations[index].getPosition()]
            };

           console.log(index);

            elevator.getElevationForLocations(requestElevation, function(results, status) {
                if (status == google.maps.ElevationStatus.OK) {
                    console.log("ok");
                  if (results[0]) {
                    distanceToEarthCore(results[0].elevation);
    
                  }
                }
              });
                
}

function getElevationAuto() {

 
    var pos;
    index= index + 1;
    clearLocations();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
            var myLatlng = new google.maps.LatLng(pos);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
            });
            map.setCenter(myLatlng);
            map.setZoom(6);
            markedLocations.push(marker);

            const elevator = new google.maps.ElevationService();

            var requestElevation = {
                'locations': [markedLocations[index].getPosition()]
            };

           console.log(index);

            elevator.getElevationForLocations(requestElevation, function(results, status) {
                if (status == google.maps.ElevationStatus.OK) {
                    console.log("ok");
                  if (results[0]) {
                    distanceToEarthCoreAuto(pos, results[0].elevation);
    
                  }
                }
              });
                

            },
            () => {
                handleLocationError(true, infoWindow);
            }
        );
    }

}

function distanceToEarthCoreAuto(pos, elevation){


    var lat = pos.lat;
    if (!lat) {
        return;
    }

    var earthRadiusInMetersAtSeaLevel = 6378.137;
    var earthRadiusInMetersAtPole = 6356.752;

    var r1 =  earthRadiusInMetersAtSeaLevel ;
    var r2 = earthRadiusInMetersAtPole;

   // formula based on finding centre of earth with regards to 
    var a = Math.pow((Math.pow(r1,2) * Math.cos(lat)),2);
    var b = Math.pow((Math.pow(r2,2) * Math.sin(lat)),2);
    var c = Math.pow((r1* Math.cos(lat)),2);
    var d = Math.pow((r2* Math.sin(lat)),2);

    var e = (a+b)/(c+d);
    var result = Math.sqrt(e);

    result = result + elevation;
    result = roundToTwo(result);
    info.innerHTML = 'The distance to the earths core is <b id="result">' + result + " km"  + "</b>";
}



function distanceToEarthCore(elevation){


    var lat = getLat();
    if (!lat) {
        return;
    }

    var earthRadiusInMetersAtSeaLevel = 6378.137;
    var earthRadiusInMetersAtPole = 6356.752;

    var r1 =  earthRadiusInMetersAtSeaLevel ;
    var r2 = earthRadiusInMetersAtPole;

   // formula based on finding centre of earth with regards to 
    var a = Math.pow((Math.pow(r1,2) * Math.cos(lat)),2);
    var b = Math.pow((Math.pow(r2,2) * Math.sin(lat)),2);
    var c = Math.pow((r1* Math.cos(lat)),2);
    var d = Math.pow((r2* Math.sin(lat)),2);

    var e = (a+b)/(c+d);
    var result = Math.sqrt(e);

    result = result + elevation;
    result = roundToTwo(result);
    info.innerHTML = 'The distance to the earths core is <b id="result">' + result + " km" + "</b>";
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

// Clear the markers shown on map
function clearLocations() {
    for (const marker of markedLocations) {
        marker.setMap(null);
    }
}

// Handle browser not supporting geolocation api
function handleLocationError(browserHasGeolocation, infoWindow) {
    infoWindow.setPosition(map.getCenter());
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// Calculate distance in kilometers between two coordinates on Earth.
function distanceEarthCoord(lat1, lon1, lat2, lon2) {

   

    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}


// Shows distance from your location to the big ben
function showDistanceToBen(mode) {
    clearLocations();
    var info = document.getElementById("info");
    info.innerText = "";
    var pos;
    if (navigator.geolocation && mode === "auto") {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                showDistanceToBenHelper(pos);
            },
            () => {
                handleLocationError(true, infoWindow);
            }
        );
    } else if (mode === "manual") {
        pos = validateCoord();
        if (!pos) {
            return;
        }

        showDistanceToBenHelper(pos);
    } else {
        handleLocationError(false, infoWindow);
    }
}

// Shows distance to the center of the world
function showDistanceToBenHelper(pos) {
    var marker = new google.maps.Marker({
        map: map,
        position: pos,
    });
    markedLocations.push(marker);

    var marker2 = new google.maps.Marker({
        map: map,
        position: { lat: 51.51, lng: -0.116 },
    });
    map.setCenter({ lat: 51.51, lng: -0.116 });
    markedLocations.push(marker2);

    var distance = distanceEarthCoord(
        pos.lat,
        pos.lng,
        51.51,
        -0.116
    );

    distance = roundToTwo(distance);

    var info = document.getElementById("info");
    info.innerHTML =
        'Your distance to the Big Ben is <b id="result">' +
        distance +
        " km</b>.";
}
