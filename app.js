var place;
var currentState = "gender";
var currentIndex = 0
var indices = {
  "gender":0,
  "schedule":1,
  "care-needs":2,
  "language":3
}
var languages = {
  "English":0,
  "Cantonese":1,
  "Spanish":2,
  "French":3,
  "Mandarin":4,
  "German":5,
  "Portuguese":6,
  "Tagalog":7
}
var careNeeds = {
  "Bathing/Hygiene":0,
  "Shopping":1,
  "Medicine":2,
  "Transportation":3,
  "Eating":4,
  "Strength Training":5,
  "Mobility":6,
  "Socializing":7,
}
var genders = {
  "Male":0,
  "Female":1,
  "No Preference":2
}
var tabNames = _.invert(indices)
var state = {gender:2,languages:new Set(),careNeeds:new Set(), scheduleDays:new Set()}

$( document ).ready(function() {
  $("#location-tag").html(sessionStorage.getItem("address"))

  $(".language-button").click(function(e){
    $("#"+this.id).toggleClass("language-selected")
    languageNumber = this.id.substring(this.id.length-1,this.id.length)
    if ($("#"+this.id).hasClass("language-selected")){
      state.languages.add(languageNumber)
    }else{
      state.languages.delete(languageNumber)
    }
    drawState(state);
  })

  $(".care-needs-button").click(function(e){
    $("#"+this.id).toggleClass("care-needs-selected")
    careNeedsNumber = this.id.substring(this.id.length-1,this.id.length)
    if ($("#"+this.id).hasClass("care-needs-selected")){
      state.careNeeds.add(careNeedsNumber)
    }else{
      state.careNeeds.delete(careNeedsNumber)
    }
    drawState(state);

  })

  $(".gender-button").click(function(e){
    undoSelected(".gender-button","gender-selected")
    $("#"+this.id).addClass("gender-selected")
    state.gender = this.id.substring(this.id.length-1,this.id.length)
    drawState(state);

  })

  $(".schedule-button").click(function(e){
    $("#"+this.id).toggleClass("days-selected")
    scheduleDaysNumber = this.id.substring(this.id.length-1,this.id.length)
    if ($("#"+this.id).hasClass("days-selected")){
      state.scheduleDays.add(scheduleDaysNumber)
      $("#time-range"+scheduleDaysNumber).show()
    }else{
      state.scheduleDays.delete(scheduleDaysNumber)
      $("#time-range"+scheduleDaysNumber).hide()
    }
  })

  $("#reset-languages").click(function(){
    for(var i = 0; i<8; i++){
      language = $("#language-"+i)
      if (language.hasClass("language-selected")){
        language.toggleClass("language-selected")
        languageNumber = String(i);
        state.languages.delete(languageNumber)
      }
    }
    drawState(state);
  })

  $("#reset-care-needs").click(function(){
    for(var i = 0; i<8; i++){
      careNeed = $("#care-needs-"+i)
      if (careNeed.hasClass("care-needs-selected")){
        careNeed.toggleClass("care-needs-selected")
        careNeedsNumber = String(i);
        state.careNeeds.delete(careNeedsNumber)
      }
    }
    drawState(state);
  })


  $(".button-link").click(function(e){
    hideAll();
    var tabName = this.id.substring(0,this.id.length-5)
    currentIndex = indices[tabName]
    $("#"+tabName+"-tab").show();
    $(".button-link").removeClass("selected");
    $("#"+tabName+ "-link").addClass("selected");
  })
  $("#back-tab").click(function(){
    cycleTab(-1)
  })
  $("#forward-tab").click(function(){
    cycleTab(1)
  })
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
  document.onkeyup = function(e){
    e.preventDefault()
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '37'){
      cycleTab(-1)
    }else if(keyCode == '39'){
      cycleTab(1)
    }
  }
});

var cycleTab = function(direction){
  if (1==direction || -1==direction ){
    currentIndex+=direction
    if(currentIndex <0){
      currentIndex = 3;
    }
    if(currentIndex >3){
      currentIndex = 0
    }
    hideAll();
    var tabName = tabNames[currentIndex]
    $("#"+tabName+"-tab").show();
    $(".button-link").removeClass("selected");
    $("#"+tabName+ "-link").addClass("selected");
  }
}

var hideAll = function(){
  $(".tab").hide()
}

var undoSelected = function(className,selectedClassName){
  $(className).removeClass(selectedClassName)
}

var currentLocation = {lat: parseFloat(sessionStorage.getItem("latitude")), lng: parseFloat(sessionStorage.getItem("longitude"))};
var centerLocation = currentLocation;
var mapHeight = 0.02
var mapWidth = 0.04
var alyssaLocation = {lat: centerLocation.lat+mapHeight*0.2, lng: centerLocation.lng+mapWidth*-0.3};
var benLocation = {lat: centerLocation.lat+mapHeight*-0.2, lng: centerLocation.lng+mapWidth*+0.4};
var ivannaLocation = {lat: centerLocation.lat+mapHeight*0.3, lng: centerLocation.lng+mapWidth*+0.5};
var lemLocation = {lat: centerLocation.lat-mapHeight*0.2, lng: centerLocation.lng+mapWidth*+0.1};
var map, alyssaMarker, benMarker, ivannaMarker, lemMarker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: centerLocation,
    keyboardShortcuts: false
  });

  var icons = []
  for(var i =1; i<=4;i++){
    icons.push(new google.maps.MarkerImage(
      'images/caregiver-thumbnail'+i+'.jpg',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(102, 68)
    ))
  }

  alyssaMarker = new google.maps.Marker({
    position: alyssaLocation,
    map: map,
    title: "Alyssa P. Hacker",
    icon: icons[0]
  });
  benMarker = new google.maps.Marker({
    position: benLocation,
    map: map,
    title: "Ben Bitdiddle",
    icon: icons[1]
  });
  ivannaMarker = new google.maps.Marker({
    position: ivannaLocation,
    map: map,
    title: "Ivanna D. Bugyu",
    icon: icons[2]
  });
  lemMarker = new google.maps.Marker({
    position: lemLocation,
    map: map,
    title: "Lem E. Tweakit",
    icon: icons[3]
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
};

var caregiver1languageset = new Set(["0", "2"]);
var caregiver1careset = new Set(["2", "5", "6"]);
var caregiver2languageset = new Set(["0"]);
var caregiver2careset = new Set(["2", "6", "7"]);
var caregiver3languageset = new Set(["0", "2"]);
var caregiver3careset = new Set(["0", "1", "3"]);
var caregiver4languageset = new Set(["0", "6", "7"]);
var caregiver4careset = new Set(["2", "6", "7"]);

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
Set.prototype.isSuperset = function(subset) {
  for (var elem of subset) {
    if (!this.has(elem)) {
      return false;
    }
  }
  return true;
}

var noMatches =function showModal(){
  var numCaregivers = 4;
  var numDisplayed = 0
  for(var i = 0; i <numCaregivers; i++){
    if($("#caregiver"+i).hasClass('in')){
      numDisplayed+=1;
    }

  }
  if(numCaregivers == numDisplayed){
    return true;
  }
  return false;
}

function drawState(state) {
  var counter = 0;
  if ((state.gender == 1 || state.gender == 2) && caregiver1languageset.isSuperset(state.languages) && caregiver1careset.isSuperset(state.careNeeds)) {
    alyssaMarker.setMap(map);
  } else {
    alyssaMarker.setMap(null);
    counter += 1;
  }
  if ((state.gender == 0 || state.gender == 2) && caregiver2languageset.isSuperset(state.languages) && caregiver2careset.isSuperset(state.careNeeds)) {
    benMarker.setMap(map);
  } else {
    benMarker.setMap(null);
    counter += 1;
  }
  if ((state.gender == 1 || state.gender == 2) && caregiver3languageset.isSuperset(state.languages) && caregiver3careset.isSuperset(state.careNeeds)) {
    ivannaMarker.setMap(map);
  } else {
    ivannaMarker.setMap(null);
    counter += 1;
  }
  if ((state.gender == 0 || state.gender == 2) && caregiver4languageset.isSuperset(state.languages) && caregiver4careset.isSuperset(state.careNeeds)) {
    lemMarker.setMap(map);
  } else {
    lemMarker.setMap(null);
    counter += 1;
  }
  var modal = document.getElementById('myModal');
  if(counter == 4){
    $("#myModal").modal('show');

  }
  else{
    modal.style.display = "hidden";
  }

  var summary = "<b>Gender:</b> "
  summary+= _.invert(genders)[state.gender]
  summary+= getListString(state.careNeeds,careNeeds)
  summary+= getListString(state.languages,languages)
  document.getElementById("summary").innerHTML = summary
}


var getListString =function(set,lookup){
  ret = ""
  if (set.size==0){
    return ""
  }else{
    var maxIndex = set.size
    if (set.size>3){
      maxIndex = 3
    }
    ret+="<br>"
    ret+="  <b>Languages:</b> "
    Array.from(set).slice(0,maxIndex+1).forEach(function(elt){
      ret += _.invert(lookup)[elt]
      ret += ", "
    })
    ret = ret.substring(0,ret.length-2)
    if (set.size>4){
      ret+="..."
    }
  }
  return ret
}

// code stolen from https://codepen.io/anon/pen/PmPbWd
function createslide(sliderID){
  $(sliderID).slider({
    range: true,
    min: 0,
    max: 1440,
    step: 15,
    values: [540, 1020],
    slide: function (e, ui) {
      var hours1 = Math.floor(ui.values[0] / 60);
      var minutes1 = ui.values[0] - (hours1 * 60);

      if (hours1.length == 1) hours1 = '0' + hours1;
      if (minutes1.length == 1) minutes1 = '0' + minutes1;
      if (minutes1 == 0) minutes1 = '00';
      if (hours1 >= 12) {
        if (hours1 == 12) {
          hours1 = hours1;
          minutes1 = minutes1 + " PM";
        } else {
          hours1 = hours1 - 12;
          minutes1 = minutes1 + " PM";
        }
      } else {
        hours1 = hours1;
        minutes1 = minutes1 + " AM";
      }
      if (hours1 == 0) {
        hours1 = 12;
        minutes1 = minutes1;
      }



      $("#time-start"+sliderID.slice(-1)).html(hours1 + ':' + minutes1);

      var hours2 = Math.floor(ui.values[1] / 60);
      var minutes2 = ui.values[1] - (hours2 * 60);

      if (hours2.length == 1) hours2 = '0' + hours2;
      if (minutes2.length == 1) minutes2 = '0' + minutes2;
      if (minutes2 == 0) minutes2 = '00';
      if (hours2 >= 12) {
        if (hours2 == 12) {
          hours2 = hours2;
          minutes2 = minutes2 + " PM";
        } else if (hours2 == 24) {
          hours2 = 11;
          minutes2 = "59 PM";
        } else {
          hours2 = hours2 - 12;
          minutes2 = minutes2 + " PM";
        }
      } else {
        hours2 = hours2;
        minutes2 = minutes2 + " AM";
      }

      $("#time-end"+sliderID.slice(-1)).html(hours2 + ':' + minutes2);
    }
  });
}
