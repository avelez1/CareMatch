// From http://marcneuwirth.com/blog/2010/02/21/using-a-jquery-ui-slider-to-select-a-time-range/

function getTime(hours, minutes) {
  var time = null;
  minutes = minutes + "";
  if (hours < 12) {time = "AM";}
  else {  time = "PM";}
  if (hours == 0) {hours = 12;}
  if (hours > 12) {hours = hours - 12; }
  if (minutes.length == 1) {minutes = "0" + minutes;}
  return hours + ":" + minutes + " " + time;
}

[0,1,2,3,4,5,6].forEach(function(id){
  var startTime;
  var endTime;
  $("#slider-"+id).slider({
    range: true, min: 0, max: 1440, values: [540, 1020], step:15, slide: slideTime
  });
  function slideTime(event, ui){
    var val0 = $("#slider-"+id).slider("values", 0),
      val1 = $("#slider-"+id).slider("values", 1),
      minutes0 = parseInt(val0 % 60, 10),
      hours0 = parseInt(val0 / 60 % 24, 10),
      minutes1 = parseInt(val1 % 60, 10),
      hours1 = parseInt(val1 / 60 % 24, 10);
    startTime = getTime(hours0, minutes0);
    endTime = getTime(hours1, minutes1);
    $("#time-"+id).text(startTime + ' - ' + endTime);
  }
  slideTime();
})
