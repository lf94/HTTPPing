function nextIP(currentIP) {
	var quadrants = currentIP.split(".");
	quadrants[quadrants.length-1]++;
	
	for(var i = quadrants.length-1; i > 0; i--){
		if(quadrants[i] >= 255) {
			quadrants[i] = 0;
			quadrants[i-1]++;
		}
	}
	currentIP = quadrants.join(".");
	return currentIP;
}

function httpPing(range) {
	console.log("started");
	var currentIP = range["start"];
	var httpReq;

	while(currentIP < range["end"]) {
		httpReq =  new XMLHttpRequest();
		httpReq.onreadystatechange = function() {
			if(httpReq.readyState == 2) {
				console.log("GOOD->"+currentIP);
			} else if(httpReq.readyState == 0)
				console.log("BADX"+currentIP);
		};
		httpReq.open("GET", "http://"+currentIP);
		httpReq.send();
		currentIP = nextIP(currentIP);
	}
	console.log("finished");
}

httpPing({start:"70.48.58.0", end:"70.48.59.0"});
