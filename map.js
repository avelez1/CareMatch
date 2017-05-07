function initMap() {
  var harvardBridge = {lat: 42.3545392, lng: -71.09164};
  var alyssaLocation = {lat: 42.362416, lng: -71.063582};
  var benLocation = {lat: 42.351241, lng: -71.079019};
  var ivannaLocation = {lat: 42.357172, lng: -71.110556};
  var lemLocation = {lat: 42.361191, lng: -71.086576};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: harvardBridge
  });
  
  var alyssaMarker = new google.maps.Marker({
    position: alyssaLocation,
    map: map
  });
  var benMarker = new google.maps.Marker({
    position: benLocation,
    map: map
  });
  var ivannaMarker = new google.maps.Marker({
    position: ivannaLocation,
    map: map
  });
  var lemMarker = new google.maps.Marker({
    position: lemLocation,
    map: map
  });
  
  google.maps.event.addListener(alyssaMarker, 'click', function() {
    $('#caregiver1').modal('show');
  });
  google.maps.event.addListener(benMarker, 'click', function() {
    $('#caregiver2').modal('show');
  });
  google.maps.event.addListener(ivannaMarker, 'click', function() {
    $('#caregiver3').modal('show');
  });
  google.maps.event.addListener(lemMarker, 'click', function() {
    $('#caregiver4').modal('show')
  });
}