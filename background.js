 var recording = false;

 chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    $('#xpath').html(request.xpath);
  });


 chrome.browserAction.onClicked.addListener(function(tab) {
	if(recording) {
		record_message = "stop";
		recording = false;
		chrome.browserAction.setIcon({path: 'icon.png'})
	} else {
		record_message = "start";
		recording = true;
		chrome.browserAction.setIcon({path: 'icon2.png'})
	}

	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {record: record_message}, function(response) {
	    console.log(response.farewell);
	  });
	});
 });



 chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.record == "running")
    	if(recording){
      		sendResponse({record: "started"});
      	} else {
      		sendResponse({record: "stopped"});
      	}
  });