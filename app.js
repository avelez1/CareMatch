$( document ).ready(function() {
  var state = {gender:2,languages:new Set(),careNeeds:new Set(),schedule:new Set()}

  $(".day-button").click(function(e){
    dayNumber = this.id.substring(this.id.length-1,this.id.length)
    $("#"+this.id).toggleClass("day-selected")
    if ($("#"+this.id).hasClass("day-selected")){
      $("#slider-container-"+dayNumber).show()
      state.schedule.add(dayNumber)
    }else{
      $("#slider-container-"+dayNumber).hide()
      state.schedule.delete(dayNumber)
    }
  })

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
