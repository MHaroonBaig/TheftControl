var lat = 0;
var longi = 0;
var currentTime = new Date();

function reportwindow()
{ 
	
	var rwindow = Ti.UI.createWindow(
		{ 
			title: 'Report!', 
			backgroundColor: '#FFFFFF', 
			barColor: '#3498db',
			fullscreen: true, 
			navBarHidden: true 
		});
	
	
	var btn = Ti.UI.createButton({
			title : 'Capture Kunda >>',
			font : 
			{
				fontSize : 17,
				fontWeight : 'bold',
				fontFamily : 'Helvetica Neue'
			},
			width : '80%',
			height : '30%',
			//top : '40%',
			bottom : '7%',
			color : '#ffffff',
			backgroundColor : '#3498db',
			borderRadius : 6,
		});
	
	btn.addEventListener('click', function(e)
	{
 	
	   //camwindow = createwindows(rwindow.width, rwindow.height);
	   var camwindow = createwindows();
	  
		
	   Titanium.Media.showCamera(
	   	{	
			success:function(e)
			{
				//var img = e.media;
				//var img2 = e.media.imageAsResized(300, 300);
				
				var imgcam = Ti.UI.createImageView(
				{
				    image: e.media,
				    //backgroundImage: 'KS_nav_views.png',
				    defaultImage: e.media,
				    backgroundColor: 'transparent',
				    width: 300,
				    height: 300,
				    transform: Ti.UI.create2DMatrix().rotate(90)
				});
				   
				var img = imgcam.toImage().media;				
				
				
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'temp.jpg');
				f.write(img);
				theimg = f.nativePath;
				
				Ti.API.info('PICsize: ' + img.height + " x " + img.width);
				
				camwindow.open();
				topview = genericview();
				topview.layout = 'horizontal';
				camwindow.add(topview);

				
				var imview = makeimview();
				imview.image = theimg;
				topview.add(imview);
				
				retakebtn = genericButton();
				topview.add(retakebtn);
				
				camwindow.add(topview);
				
				lowerview = genericview();
				lowerview.layout = 'vertical';
				lowerview.top = '35%';
				lowerview.height = Ti.UI.SIZE;
				lowerview.width = Ti.UI.SIZE;
				
				camwindow.add(lowerview);
				
				var details = textareasetup();
				lowerview.add(details);
				
				submitbtn = genericButton();
				submitbtn.title = 'Submit Report!';
				submitbtn.top = '4%';
				submitbtn.height = '20%';
				
				submitbtn.addEventListener('click', function(e)
				{
					submitbtn.enabled=false;
					
					var par = getparams();
					
					rclient = Titanium.Network.createHTTPClient();
					rclient.open("POST","http://nokunda.labandroid.com/api");
					rclient.setRequestHeader("Connection", "close");
					
					rclient.onload = function()
					{
					     alert("responseText: " + this.responseText);
					};
					
					rclient.onsendstream = function(e)
					{
					   //alert("Uploading. Check progress");
					   Ti.API.info('PROGRESS: ' + e.progress);
					};
					
					rclient.onerror = function(e) 
					{
						var db = Ti.Database.open("mydb");
						alert("Error Uploading. Locally saved!");
						db.execute('CREATE TABLE IF NOT EXISTS params(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, lat TEXT, longi TEXT, loc TEXT, pic TEXT);');
						db.execute('INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,?,?,?,?,?,?,?,?,?)', details.value, details.value, par.incident_date, par.incident_hour, par.incident_minute, par.incident_ampm, lat, longi, details.value, theimg);
						db.close();
					};
					
					var params = 
					{
						"task":"report",
						"incident_title": details.value,
						incident_description: details.value,
						incident_date: par.incident_date,
						incident_hour:par.incident_hour,
						incident_minute:par.incident_minute,
						incident_ampm:par.incident_ampm,
						incident_category:'1',
						latitude:lat,
						longitude:longi,
						location_name:details.value,
						//incident_photo:e.media
						"incident_photo[]" : img
					};
					rclient.send(params);

					
				});
				
				
				lowerview.add(submitbtn);
				

				
				
			},
			error:function(e)
			{
				alert("There was an error");
			},
			cancel:function(e)
			{
				alert("The event was cancelled");
			},
			saveToPhotoGallery:false,
			mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],
			showControls: true
		
		});  //camera function END

		
	   
	   
	   
	   //Ti.UI.currentTab.add(camwindow);
	   	
	});
	
	rwindow.add(btn);
	
	var nokundalabel = Titanium.UI.createLabel(
	{
		text:'NoKunda',
		font:
		{
			fontSize:28,fontFamily:'Helvetica Neue',fontWeight:'bold'
		},
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: '10%',
		width: Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		color: 'black',
		backgroundColor: '#FFFFFF'
	});
	rwindow.add(nokundalabel);
	

		 
	return rwindow;
	//return camwindow; 
};
module.exports = reportwindow;






function createwindows()
{
	if (!(Ti.Platform.osname == "android"))
		{ var tabGroup = Ti.UI.createTabGroup(); }		
 
   win = Ti.UI.createWindow(
   {
   		//navBarHidden: true,
   		title: 'Submitting Report',
   		backgroundColor: '#FFFFFF',
   		//width: rwidth,
   		//height: rheight	   		 
   });
   
	if (!(Ti.Platform.osname == "android"))
	{
		var tab = Ti.UI.createTab({
		    title:"Submitting Report",
		    window: win
		});
		tabGroup.addTab(tab);
	}
	
	var bannerTop = Titanium.UI.createLabel(
	{
		text:'Photo Preview',
		font:{fontSize:10,fontFamily:'Helvetica Neue'},
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: '0%',
		width: '100%',
		height : '5%',
		color: '#7f8c8d',
		backgroundColor: '#ecf0f1'
	});
	win.add(bannerTop);
	
	if (Ti.Platform.osname == "android")
	{ 
		return win; 
	}
	else
	{ 
		return tabGroup; 
	}

}

function genericview()
{
	var myview = Ti.UI.createView(
		{
		//layout: 'vertical', 
		top : '6%',
		//bottom:'1%',
		left:'3%',
		right:'3%',
		height: '28%',
		});
	return myview;
}


function makeimview()
{
	var imView = Ti.UI.createImageView(
	{
	
		//image:theimg,
		transform: Ti.UI.create2DMatrix().rotate(90),
		width:'52%',
		height:'100%',
		autorotate: true,
		//top:'%',					
		borderRadius:3,
		//top:'7%'
	});
	return imView;
}

function genericButton()
{
	
var btn = Ti.UI.createButton(
	{
		title : 'Retake Photo',
		font : {
			fontSize : 14,
			fontWeight : 'bold',
			fontFamily : 'Helvetica Neue'
		},
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : '38%',
		height : '28%',
		enabled: true,
		//top : '10%',
		//right : '3%',
		//left : '56%',
		//paddingLeft : 7,
		//paddingRight : 7,
		//paddingTop : 7,
		//paddingBottom : 7,
		color : '#ffffff',
		backgroundColor : '#3498db',
		borderRadius : 6,
	});
	return btn;
}


function textareasetup()
{
	var title = Ti.UI.createTextArea(
	{ //renamed TextField to TextArea for multi row field, may cause error on submission - test
		height : '27%',
		width : '100%',
		//left : '3%',
		//right : '2%',
		//top : '5%',
		paddingLeft : 2,    //pad text from borders..
		paddingRight : 2,
		paddingTop : 2,
		paddingBottom : 2,
		hintText : 'Enter name of location / details....',
		bubbleParent : false,
		opacity: 0.85,

		font : 
		{
			fontSize : 13,
			fontFamily : 'Helvetica Neue'
		},
		color : 'black',
		backgroundColor : '#FFFFFF',
		borderRadius : 5,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderWidth: 3,
		borderColor: '#ecf0f1',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DONE
	});
	return title;
}


function getparams()
{
	var amPM = '';
	var hour = currentTime.getHours();
	var min = currentTime.getMinutes();
	var year = currentTime.getFullYear();
	var twomonth=((currentTime.getMonth()+1)>=10)? (currentTime.getMonth()+1) : '0' + (currentTime.getMonth()+1);  
	var twoday=((currentTime.getDate())>=10)? (currentTime.getDate()) : '0' + (currentTime.getDate());
	
	var dateform = twomonth + "/" + twoday + "/" + year; 
	
	if(hour<12)
        {
            amPM = 'am';
        }
     else
        {
            amPM = 'pm';
        }
		
	//Converting 24hr format to 12 hr for Ushahidi 
      if (hour == 0) 
      {
         hour = 12;
      }
 
     if (hour > 12)
          {
           hour = hour - 12;
      }
      
	
	var para = 
	{
		"task":"report",
		"incident_title": title,
		incident_description: title,
		incident_date: dateform,
		incident_hour:hour,
		incident_minute:min,
		incident_ampm:amPM,
		incident_category:'1',
		latitude:lat,
		longitude:longi,
		location_name:title,
		//incident_photo:e.media
		"incident_photo[]" : 'blah'
	};

	return para;

}

