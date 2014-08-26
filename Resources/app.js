
/*
Create first window for first time app launch. Create db n set a value to check it
Create two imageviews, one for tutorial, 2nd for button. 
Add click listener to 2nd imgview which has button's pic. Set URL to camera.js
The next window would be the tabs one.
Create 3 tabs etc.
*/


//Ti.App.Properties.getString('PLAYER_NAME', '')  -> Properties, on 1st app startup check empty string?
var title = 'Saved rep 1';
var title2= 'Second saved report, AFG Colony';
var listpic = 'thumbkunda.jpg';

var db = Ti.Database.open("mydb");
//db.file.setRemoteBackup(false);    //for iOS excess icloud backups
db.execute('DROP TABLE IF EXISTS params');
db.execute('CREATE TABLE IF NOT EXISTS params(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, hour TEXT, minute TEXT, ampm TEXT, lat TEXT, longi TEXT, loc TEXT, pic TEXT);');
db.execute("INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,'zzK','OK','NOO','Ok','aaK','lll','pok','no','KS_nav_views.png')", title);
db.execute("INSERT INTO params (title, description, date, hour, minute, ampm, lat, longi, loc, pic) VALUES (?,'zzK','OK','NOO','Ok','aaK','lll','pok','no',?)", title2, listpic);
db.close();	
	
var wintut = Titanium.UI.createWindow({
	//title:"Camera Preview",
	backgroundColor:'#FFFFFF',
	navBarHidden: true,
	exitOnClose: true
});

var tut = Ti.Filesystem.getFile('tutorial.jpg');

var imviewtutorial = Ti.UI.createImageView(
{
	image: tut,
	width: '100%',
	height: '85%',
	top: '0%'
});

wintut.add(imviewtutorial);

var startbtn = Titanium.UI.createButton(
{
	title:"START REPORTING",
		width: '100%',
		height: '15%',
		top: '85%',
		font: {
				fontSize : 14,
				fontWeight : 'bold',
				fontFamily : 'Helvetica Neue'
		},
		backgroundColor: '#3498db'	
});

startbtn.addEventListener ("click", function(e)
{
	var wintabs = require('tabs')();
	/*var tabswin = Ti.UI.createWindow(
		{
		url: "tabs.js",
		//title:'NoKunda Getting GPS!',
		//backgroundColor:'#191919'
		});
		tabswin.open();
	*/
});

wintut.add(startbtn);
wintut.open();


/*	
	Titanium.Media.showCamera(
		{	
			success:function(e)
			{
				//img = e.media;
				img = e.media.imageAsResized(1024, 1024);
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'temp.jpg');
				f.write(img);
				theimg = f.nativePath;
				
					var imView = Titanium.UI.createImageView(
						{
						image:theimg,
						width:290,
						height:220,
						top:15,
						zIndex:1
					});
					
					win.add(imView);
					
					var button = Titanium.UI.createButton(
					{
						title:"Next...(GPS)",
						width:100,
						height:100,
						bottom:15,
						zIndex:2
					});
					button.addEventListener ("click", function(e)
					{
						var gpsWindow = Ti.UI.createWindow(
							{
								url: "gps.js",
								title:'NoKunda Getting GPS!',
    							backgroundColor:'#191919'
							});
							gpsWindow.open();
					});
					
					win.add(button);
					
					win.open();
				
			},

			error:function(e)
			{
				alert("There was an error");
			},
			cancel:function(e)
			{
				alert("The event was cancelled");
			},
			//allowEditing:true,
			saveToPhotoGallery:true,
			mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],
			showControls: true
		});
*/
