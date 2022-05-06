// Initialize and add the map
//reference (update map): https://stackoverflow.com/questions/12662469/google-maps-javascript-api-marker-setposition-issue
var my_dot;
var my_lat , my_lng;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
    console.log("fuck2023")
    return null;
};

function updatePosition(position) {
    if (position) {
        my_lat = position.coords.latitude;
        my_lng = position.coords.longitude;
    }
}

function currentLocation() {
    return { lat: my_lat, lng: my_lng };
};


function init_GMap() {
    const ncku = { lat: 22.996040, lng: 120.221030 };
    //center
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: ncku,
    });
    //******************************marker with messages******************************
    const ncku_bounds = {
        //https://www.latlong.net/
        //右下22.993484, 120.224516
        //左下22.995640,120.212999
        //左上23.004085,120.215050
        //右上23.002302,120.225065
        north: 23.004085,
        south: 22.993484,
        east: 120.215050,
        west: 120.225065,
    };
    const secretMessages = ["station name\n# of Scooter : 50", "station name\n# of Scooter : 35", "station name\n# of Scooter : 10", "station name\n# of Scooter : 20", "station name\n# of Scooter : 33", "station name\n# of Scooter : 48", "station name\n# of Scooter : 2", "station name\n# of Scooter : 3", "station name\n# of Scooter : 11", "station name\n# of Scooter : 50", "station name\n# of Scooter : 50", "station name\n# of Scooter : 50"];
    const lngSpan = ncku_bounds.east - ncku_bounds.west;
    const latSpan = ncku_bounds.north - ncku_bounds.south;
    //map.fitBounds(ncku_bounds);
    //******************************marker with messages******************************


    //******************************current location***********************************
    //infoWindow = new google.maps.InfoWindow();
//
    //const locationButton = document.createElement("button");
//
    //locationButton.textContent = "Your Location";
    //locationButton.classList.add("custom-map-control-button");
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    //locationButton.addEventListener("click", () => {
    //    // Try HTML5 geolocation.
    //    if (navigator.geolocation) {
    //        navigator.geolocation.getCurrentPosition(
    //            (position) => {
    //                const pos = {
    //                    lat: position.coords.latitude,
    //                    lng: position.coords.longitude,
    //                };
//
    //                infoWindow.setPosition(pos);
    //                infoWindow.setContent("Your Location");
    //                infoWindow.open(map);
    //                //若有enable current location (set to center)
    //                map.setCenter(pos);
    //            },
    //            () => {
    //                handleLocationError(true, infoWindow, map.getCenter());
    //            }
    //        );
    //    } else {
    //        // Browser doesn't support Geolocation
    //        handleLocationError(false, infoWindow, map.getCenter());
    //    }
    //});
    //******************************current location***********************************

    //******************************marker with messages******************************
    //日後enable json
    for (let i = 0; i < secretMessages.length; ++i) {
        const marker = new google.maps.Marker({
            position: {
                lat: ncku_bounds.south + latSpan * Math.random(),
                lng: ncku_bounds.west + lngSpan * Math.random(),
            },
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' , 
            map: map,
        });

        attachSecretMessage(marker, secretMessages[i]);
        marker.addListener("click", toggleBounce);
    }
    
    //******************************marker with messages******************************
    
    //******************************create polygons*********************************
    // Define the LatLng coordinates for the polygon's path.
    const square_Coords = [
        /*
        //右下22.993484, 120.224516
        //左下22.995640,120.212999
        //左上23.004085,120.215050
        //右上23.002302,120.225065
        */ 
        { lat: 22.993484, lng: 120.224516 },
        { lat: 22.995640, lng: 120.212999 },
        { lat: 23.004085, lng: 120.215050 },
        { lat: 23.002302, lng: 120.225065 },
    ];
    // Construct the polygon.
    const ncku_poly = new google.maps.Polygon({
        paths: square_Coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });
    ncku_poly.setMap(map);
    //******************************create polygons*********************************

    /*******************************real time gps *******************************/
    //init
    updatePosition(getLocation());
    my_dot = new google.maps.Marker(
    {
        position: {
            lat: 22.993484,
            lng: 120.224516,
        },
        //icon: 'https://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png',
        map: map,
    });

    /*******************************real time gps *******************************/

}

////模擬 22.993484 120.224516
my_lat = 22.993484
my_lng = 120.224516
setInterval(function () {
    //updatePosition(getLocation());
    console.log(my_lat);
    console.log(my_lng);
    //模擬 22.993484 120.224516
    //my_lat += 0.03
    //my_lng += 0.02
    myLatlng = new google.maps.LatLng(my_lat, my_lng);
    my_dot.setPosition(myLatlng);
}, 1500);


//******************************current location***********************************
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}






//******************************current location***********************************

//******************************marker with messages******************************
function attachSecretMessage(marker, secretMessage) {
    const infowindow = new google.maps.InfoWindow({
        content: secretMessage,
    });

    marker.addListener("click", () => {
        infowindow.open(marker.get("map"), marker);
    });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
//******************************marker with messages******************************

//window.initMap = init_GMap;