var service = Titanium.Android.currentService;
var intent = service.intent;
Titanium.API.info("Service Started !");

if (Ti.Network.networkType != Ti.Network.NETWORK_NONE) {
	//THEY HAVE A CONNECTION
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
	Titanium.API.info("Helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");

	var rclient = Titanium.Network.createHTTPClient();
	rclient.open("POST", "http://nokunda.labandroid.com/api");
	rclient.setRequestHeader("Connection", "close");

	rclient.onload = function() {
		Titanium.API.info("responseText: " + this.responseText);

	};

	rclient.onsendstream = function(e) {
		displaydata.text = e.progress;
	};
	rclient.onerror = function(e) {
		Titanium.API.info('Transmission error: ' + e.error);
	};
	var params = {
		"task" : "report",
		"incident_title" : "Hello",
		incident_description : "Hellooooooo",
		incident_date : "01/01/2010",
		incident_hour : "8",
		incident_minute : "53",
		incident_ampm : "am",
		incident_category : '1',
		latitude : "-1.00384764",
		longitude : "36.48587550",
		location_name : "Meow Island",
		//"incident_photo[]" : imagee
	};

	rclient.send(params);

} else {
	//THEY DONT HAVE A CONNECTION

}

