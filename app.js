$( document ).ready(function() {
  var state = {gender:2,languages:{},careNeeds:{}}

  $(".gender-button").click(function(){
  })

  $("#gender-link").click(function(){hideAll();$("#gender-tab").show()})
  $("#care-needs-link").click(function(){hideAll();$("#care-needs-tab").show()})
  $("#language-link").click(function(){hideAll();$("#language-tab").show()})
  $("#schedule-link").click(function(){hideAll();$("#schedule-tab").show()})
});

var hideAll = function(){
  $(".tab").hide()
}
