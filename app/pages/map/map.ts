import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class HomePage {
  map;
  geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
    var address = 'edmonton, ab, canada';
    this.mapAddress(address);
  }

  mapAddress(address: string) {
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.mapLocation(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  }

  mapLocation = (position: google.maps.LatLng) => {
    {

      let mapOptions = {
        center: position,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // this.map.setCenter(position);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position
      });
    }

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(this.map, marker);
    });

  }

}
