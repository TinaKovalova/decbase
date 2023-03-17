function initMap() {
  const location= { lat: -34.99840951410172, lng: -71.34458488163182 };

    const map = new google.maps.Map(document.getElementById("location"), {
      center: location,
      zoom: 15,
    });

    const contentInfo =`<div>
    <h5>CorreosChile Sagrada Familia</h5>
    <p>Portal Santa Elena, local 13, Sagrada Familia, Maule, Чилі</p>
    </div>`
    const infoWindow = new google.maps.InfoWindow({
      content:contentInfo,
      arialLable:location
    })
    createMapMarker(location, map, infoWindow);
    
  }


function createMapMarker({lat, lng}, map, infoWindow){
    const marker = new google.maps.Marker({
      position:{lat, lng},
      map
    })
    if(infoWindow){
      marker.addListener("click", ()=>{
        infoWindow.open({
          anchor : marker,
          map
        });
      });
    }
}
 