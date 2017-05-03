var currentState = "gender";

$( document ).ready(function() {
  var state = {gender:2,languages:new Set(),careNeeds:new Set(), scheduleDays:new Set()}

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

  $("#gender-link").click(function(){hideAll();$("#gender-tab").show();$(".button_link").css("background-color","white");  $("#gender-link").css("background-color", "powderblue");})
  $("#care-needs-link").click(function(){hideAll();$("#care-needs-tab").show(); $(".button_link").css("background-color","white"); $("#care-needs-link").css("background-color", "powderblue");})
  $("#language-link").click(function(){hideAll();$("#language-tab").show(); $(".button_link").css("background-color","white"); $("#language-link").css("background-color", "powderblue");})
  $("#schedule-link").click(function(){hideAll();$("#schedule-tab").show(); $(".button_link").css("background-color","white"); $("#schedule-link").css("background-color", "powderblue");})
});

var hideAll = function(){
  $(".tab").hide()
}

var undoSelected = function(className,selectedClassName){
  $(className).removeClass(selectedClassName)
}

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
      console.log(elem);
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

function drawState(state) {
  if ((state.gender == 1 || state.gender == 2) && caregiver1languageset.isSuperset(state.languages) && caregiver1careset.isSuperset(state.careNeeds)) {
    $("#careButton1").css('display', 'inline');
  } else {
    $("#careButton1").css('display', 'none');
  }
  if ((state.gender == 0 || state.gender == 2) && caregiver2languageset.isSuperset(state.languages) && caregiver2careset.isSuperset(state.careNeeds)) {
    $("#careButton2").css('display', 'inline');
  } else {
    $("#careButton2").css('display', 'none');
  }
  if ((state.gender == 1 || state.gender == 2) && caregiver3languageset.isSuperset(state.languages) && caregiver3careset.isSuperset(state.careNeeds)) {
    $("#careButton3").css('display', 'inline');
  } else {
    $("#careButton3").css('display', 'none');
  }
  if ((state.gender == 0 || state.gender == 2) && caregiver4languageset.isSuperset(state.languages) && caregiver4careset.isSuperset(state.careNeeds)) {
    $("#careButton4").css('display', 'inline');
  } else {
    $("#careButton4").css('display', 'none');
  }
}

//code modified from https://codepen.io/anon/pen/PmPbWd
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
