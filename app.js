$( document ).ready(function() {
  var state = {gender:2,languages:new Set(),careNeeds:new Set()}

  $(".language-button").click(function(e){
    $("#"+this.id).toggleClass("language-selected")
    languageNumber = this.id.substring(this.id.length-1,this.id.length)
    if ($("#"+this.id).hasClass("language-selected")){
      state.languages.add(languageNumber)
    }else{
      state.languages.delete(languageNumber)
    }
  })

  $(".care-needs-button").click(function(e){
    $("#"+this.id).toggleClass("care-needs-selected")
    careNeedsNumber = this.id.substring(this.id.length-1,this.id.length)
    if ($("#"+this.id).hasClass("care-needs-selected")){
      state.careNeeds.add(careNeedsNumber)
    }else{
      state.careNeeds.delete(careNeedsNumber)
    }
  })

  $(".gender-button").click(function(e){
    undoSelected(".gender-button","gender-selected")
    $("#"+this.id).addClass("gender-selected")
    state.gender = this.id.substring(this.id.length-1,this.id.length)
  })


  $("#gender-link").click(function(){hideAll();$("#gender-tab").show()})
  $("#care-needs-link").click(function(){hideAll();$("#care-needs-tab").show()})
  $("#language-link").click(function(){hideAll();$("#language-tab").show()})
  $("#schedule-link").click(function(){hideAll();$("#schedule-tab").show()})
});

var hideAll = function(){
  $(".tab").hide()
}

var undoSelected = function(className,selectedClassName){
  $(className).removeClass(selectedClassName)
}

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
