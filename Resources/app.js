var win = Titanium.UI.createWindow({
	title : "Submit Report",
	//backgroundColor : '#bdc3c7',
	backgroundImage: "background.jpg",
	exitOnClose : true
});

var bannerTop = Titanium.UI.createLabel({
	text : 'sample guide text',
	font : {
		fontSize : 10,
		fontFamily : 'Helvetica Neue'		
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : '0%',
	width : '100%',
	height : '5%',
	color : '#7f8c8d',
	backgroundColor : '#ecf0f1',
	opacity: 0.85
});

var lat = 0;
var longi = 0;
var db = Ti.Database.open("mydb");
var currentTime = new Date();

function localized_db_entries() {
	var num = 1;
	var data = db.execute('SELECT title, description, date, hour, minute, ampm, long, lati, loc, pic FROM params');
	while (data.isValidRow()) {
		var a = data.fieldByName("title").toString();
		var b = data.fieldByName("description").toString();
		var c = data.fieldByName("date").toString();
		var d = data.fieldByName("hour").toString();
		var e1 = data.fieldByName("minute").toString();
		var f = data.fieldByName("ampm").toString();
		var g = data.fieldByName("long").toString();
		var h = data.fieldByName("lati").toString();
		var i = data.fieldByName("loc").toString();
		var j = data.fieldByName("pic").toString();
		var task_para = 'report';

		alert("Report # " + num.toString() + " \n" + a.toString() + "---" + b.toString() + "---" + c.toString() + "---" + d.toString() + "---" + e1.toString() + "---" + f.toString() + "---" + g.toString() + "---" + h.toString() + "---" + i.toString() + "---" + j.toString());

		if (Ti.Network.networkType != Ti.Network.NETWORK_NONE) {
			/*
			 Reports should be uploaded from here like:
			 
			 var rclient1 = Titanium.Network.createHTTPClient();
			 rclient1.timeout = 5000;
			 rclient1.setRequestHeader("Connection", "close");

			 var paramss = {
			 task : task_para,
			 incident_title : a,
			 incident_description : b,
			 incident_date : c,
			 incident_hour : d,
			 incident_minute : e1,
			 incident_ampm : f,
			 incident_category : '1',
			 latitude : g,
			 longitude : h,
			 location_name : i,
			 "incident_photo[]" : j
			 };

			 rclient1.onload = function() {
			 alert("responseText: " + this.responseText);

			 };

			 rclient1.onsendstream = function(e) {
			 coords.text = e.progress;
			 };

			 rclient1.onerror = function(e) {
			 alert('Transmission error: ' + e.error);
			 };

			 rclient1.open("POST", "http://nokunda.labandroid.com/api");

			 setTimeout(function(e) {
			 rclient1.send(paramss);
			 }, 12000);
			 */

		}

		data.next();
		num++;
	}

	data.close();
};

Titanium.Media.showCamera({
	success : function(e) {
		win.open();
		img = e.media.imageAsResized(300, 300);
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, currentTime.getMinutes().toString() + ".jpg");
		f.write(img);

		// The path to the actual image in the externel memory
		theimg = f.nativePath;

		//alert(theimg);

		var imagee = e.media;
		var imView = Titanium.UI.createImageView({
			image : theimg,
			width : 150,
			height : 105,
			borderRadius : 0,
			borderWidth: 3,
			borderColor: '#ffffff',
			top : '7%'
		});

		win.add(imView);
		var myview = Ti.UI.createView({
			layout : 'vertical',
			top : '30%',
			height : Titanium.UI.SIZE,
		});

		var title = Ti.UI.createTextArea({ //renamed TextField to TextArea for multi row field, may cause error on submission - test
			height : '15%',
			left : '2%',
			right : '2%',
			top : '5%',
			paddingLeft : 6,
			paddingRight : 6,
			paddingTop : 3,
			paddingBottom : 3,
			hintText : 'Extra details............',
			bubbleParent : false,
			opacity: 0.85,

			font : {
				fontSize : 13,
				fontFamily : 'Helvetica Neue'
			},
			color : '#2c3e50',
			backgroundColor : '#ecf0f1',
			borderRadius : 5,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderWidth: 3,
			borderColor: '#ffffff',
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DONE
		});
/* //removing the two textfields leaving just one
		title.addEventListener('return', function() {
			descr.focus();
		});

		var descr = Ti.UI.createTextField({
			height : '12%',
			left : '2%',
			right : '2%',
			top : '2%',

			paddingLeft : 6,
			paddingRight : 6,
			paddingTop : 3,
			paddingBottom : 3,
			hintText : 'Description (MUST)',
			font : {
				fontSize : 13,
				fontFamily : 'Helvetica Neue'
			},
			color : '#2c3e50',
			backgroundColor : '#ecf0f1',
			borderRadius : 10,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_NEXT
		});
		var loc = Ti.UI.createTextField({
			height : '12%',
			left : '2%',
			right : '2%',
			top : '2%',

			paddingLeft : 6,
			paddingRight : 6,
			paddingTop : 3,
			paddingBottom : 3,
			hintText : 'Location (MUST)',
			font : {
				fontSize : 13,
				fontFamily : 'Helvetica Neue'
			},
			color : '#2c3e50',
			backgroundColor : '#ecf0f1',
			borderRadius : 10,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DONE
		});

		loc.addEventListener('focus', function() {
			win.animate({
				bottom : '30%',
				duration : 100
			});
		});
		loc.addEventListener('blur', function() {
			win.animate({
				bottom : 0,
				duration : 100
			});
		});
		loc.addEventListener('return', function() {
			win.animate({
				bottom : 0,
				duration : 100
			});
		});
*/

		myview.add(title);
		//myview.add(descr);
		//myview.add(loc);
		win.add(bannerTop);

		var btn = Ti.UI.createButton({
			title : 'Submit Report!',
			font : {
				fontSize : 14,
				fontWeight : 'bold',
				fontFamily : 'Helvetica Neue'
			},
			width : '40%',
			height : '12%',
			top : '5%',
			paddingLeft : 10,
			paddingRight : 10,
			paddingTop : 3,
			paddingBottom : 3,
			color : '#ffffff',
			backgroundColor : '#3498db',
			borderRadius : 5,
		});

		var btn2 = Ti.UI.createButton({
			title : 'Saved Reports',
			font : {
				fontSize : 14,
				fontWeight : 'bold',
				fontFamily : 'Helvetica Neue'
			},
			width : '40%',
			height : '12%',
			top : '10%',
			paddingLeft : 10,
			paddingRight : 10,
			paddingTop : 3,
			paddingBottom : 3,
			color : '#ffffff',
			backgroundColor : '#3498db',
			borderRadius : 5
		});

		myview.add(btn);
		myview.add(btn2);

		btn.addEventListener('click', function(e) {
			if (lat == 0 && longi == 0) {
				coords.text = 'Wait for coordinates! Cant submit yet!';
				return;
			}

			var amPM = '';

			var hour = currentTime.getHours();
			var min = currentTime.getMinutes();
			var year = currentTime.getFullYear();

			var twomonth = ((currentTime.getMonth() + 1) >= 10) ? (currentTime.getMonth() + 1) : '0' + (currentTime.getMonth() + 1);
			var twoday = ((currentTime.getDate()) >= 10) ? (currentTime.getDate()) : '0' + (currentTime.getDate());
			var dateform = twomonth + "/" + twoday + "/" + year;

			if (hour < 12) {
				amPM = 'am';
			} else {
				amPM = 'pm';
			}

			//Converting 24hr format to 12 hr for Ushahidi
			if (hour == 0) {
				hour = 12;
			}

			if (hour > 12) {
				hour = hour - 12;
			}

			var rclient = Titanium.Network.createHTTPClient();
			rclient.open("POST", "http://nokunda.labandroid.com/api");
			rclient.setRequestHeader("Connection", "close");

			var params = {
				"task" : "report",
				"incident_title" : title.value,
				incident_description : title.value,
				incident_date : dateform,
				incident_hour : hour,
				incident_minute : min,
				incident_ampm : amPM,
				incident_category : '1',
				latitude : lat,
				longitude : longi,
				location_name : title.value,
				"incident_photo[]" : imagee
			};

			rclient.onload = function() {
				alert("responseText: " + this.responseText);

			};

			rclient.onsendstream = function(e) {
				coords.text = e.progress;
			};

			//////////////////////////////  Starts Here  ////////////////////////////////////////////////
			rclient.onerror = function(e) {
				//alert('Transmission error: ' + e.error);
				//alert("check for the service");
				alert("Your report is being saved");
				//db.execute('DROP TABLE IF EXISTS params');
				db.execute('CREATE TABLE IF NOT EXISTS params(title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, long TEXT, lati TEXT, loc TEXT, pic TEXT);');
				db.execute('INSERT INTO params (title, description, date, hour, minute, ampm, long, lati, loc, pic) VALUES (?,?,?,?,?,?,?,?,?,?)', title.value, descr.value, dateform, hour, min, amPM, lat, longi, loc.value, theimg);
				/*
				 var data = db.execute('SELECT title, description, date, hour, minute, ampm, long, lati, loc, pic FROM params');
				 while (data.isValidRow()) {
				 var a = data.fieldByName("title");
				 var b = data.fieldByName("description");
				 var c = data.fieldByName("date");
				 var d = data.fieldByName("hour");
				 var e1 = data.fieldByName("minute");
				 var f = data.fieldByName("ampm");
				 var g = data.fieldByName("long");
				 var h = data.fieldByName("lati");
				 var i = data.fieldByName("loc");
				 var j = data.fieldByName("pic");

				 alert(a.toString() + "---" + b.toString() + "---" + c.toString() + "---" + d.toString() + "---" + e1.toString() + "---" + f.toString() + "---" + g.toString() + "---" + h.toString() + "---" + i.toString() + "---" + j.toString());
				 data.next();
				 }

				 data.close();
				 //db.execute('DELETE FROM params');
				 //db.close();
				 */
			};
			////////////////////////////////  Ends Here //////////////////////////////////////////////////

			rclient.send(params);

			/////////////// Facebook Integration starts here ///////////////////

			var fb = require('facebook');
			fb.appid = 729171797119580;
			fb.permissions = ['publish_stream'];
			fb.forceDialogAuth = true;
			fb.addEventListener('login', function(e) {
				if (e.success) {
					alert('Logged In');
				} else if (e.error) {
					alert(e.error);
				} else if (e.cancelled) {
					alert("Canceled");
				}
			});
			fb.authorize();

			var f = Ti.Filesystem.getFile('alhamdulillah.jpg');
			var reward = f.read();
			var data = {
				message : 'Reported',
				picture : reward
			};
			fb.requestWithGraphPath('me/photos', data, 'POST', function(e) {
				if (e.success) {
					//alert("Success!  From FB: " + e.result);
					alert("Successfully posted to facebook");
				} else {
					if (e.error) {
						alert(e.error);
					} else {
						alert("Unkown result");
					}
				}
			});

			//////////// Integration over //////////////

		});

		btn2.addEventListener('click', function(e) {

			setTimeout(function(e) {
				localized_db_entries();
			}, 80);

			//db.execute('DELETE FROM params');
		});

		var coords = Titanium.UI.createLabel({
			font : {
				fontSize : 10,
				fontFamily : 'Helvetica Neue'
				
			},
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			top : '5%',
			width : '80%',
			height : '10%',
			color : '#7f8c8d',
			backgroundColor : '#ecf0f1',
			opacity: 0.85
		});

		myview.add(coords);
		win.add(myview);

		//listener to hide keyboard when clicked outside of a text field
		win.addEventListener('click', function(e) {
			if (e.source != '[object TiUITextField]') {
				title.blur();
				//descr.blur();
				//loc.blur();
			}
		});

		if (Ti.Platform.osname == "android") {
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
				name : Ti.Geolocation.PROVIDER_GPS,
				minUpdateDistance : 0,
				minUpdateTime : 0
			});

			Ti.Geolocation.Android.addLocationProvider(providerGps);
			Ti.Geolocation.Android.manualMode = true;

			/////////// from here ///////////
			var Rule = Ti.Geolocation.Android.createLocationRule({
				// Rule applies to GPS provider
				provider : Ti.Geolocation.PROVIDER_GPS,
				// Must be accurate to this value in meters
				accuracy : 8,
				// Location update should be no older than this value in milliseconds
				maxAge : 120,
				// Location updates should be no more frequent than this value in milliseconds
				minAge : 100
			});

			Titanium.Geolocation.Android.addLocationRule(Rule);
			/////////// till here ///////////

		}
		else {
			win.title = 'Camera Preview iOS';

			Ti.Geolocation.purpose = 'Get Current Location';
			Ti.Geolocation.distanceFilter = 1;
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		}

		Ti.Geolocation.addEventListener('location', function(e) {
			if (!e.success || e.error) {
				coords.text = 'Coordinates N/A right now... wait?';
				lat = 0;
				longi = 0;
				return;
			}
			coords.text = 'Lat: ' + e.coords.latitude + ' Long: ' + e.coords.longitude + ' Accu: ' + e.coords.accuracy + '\n Heading: ' + e.coords.heading + ' Speed: ' + e.coords.speed;
			lat = e.coords.latitude;
			longi = e.coords.longitude;

		});

	},

	error : function(e) {
		alert("There was an error");
	},
	cancel : function(e) {
		alert("The event was cancelled");
	},
	saveToPhotoGallery : true,
	mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],
	showControls : true
});
