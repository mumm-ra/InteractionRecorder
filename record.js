Recorder = {

  record: function(event){
    event.stopPropagation();
    if(event.type == "click") {
      console.log("click", event.target);
    } else {
      var code = (event.keyCode ? event.keyCode : event.which);
      console.log("key", code ,event.target);
    }
    return true;
  }
}


$(document).ready(function(){

  chrome.extension.sendMessage({record: "running"}, function(response) {
    if(response.record == "started") {
      $('body').on('click','*', Recorder.record);   
    }
  });
});





chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.record == "start") {
      console.log("Record Started");
      $('body').on('click keypress','*', Recorder.record);
      sendResponse({farewell: "goodbye"});
    } else if (request.record == "stop") {
      console.log("Record Stopped");
      $('body').off('click keypress','*', Recorder.record);
      sendResponse({farewell: "goodbye"});
    }
  });