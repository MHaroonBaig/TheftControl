
var win = Titanium.UI.createWindow({
	title:"Camera Preview",
	backgroundColor:'#FFFFFF',
	exitOnClose: true
});

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




/*
var winone = Ti.UI.createWindow(
	{
		title : 'MAIN APP.JS',
		backgroundColor : 'blue',
		exitOnClose : true
	}
);

var btn = Ti.UI.createButton(
	{
		title : 'Goto Cam',
		width:200,
		height:100,
		bottom:50
	}
);

btn.addEventListener('click', function(e)
{
	 	var winmain = Titanium.UI.createWindow(
	 	{
		url : 'cam.js',
		//title:"Camera Preview",
		//backgroundColor:'#FFFFFF',
		//exitOnClose: true
		});
	
	winmain.open();
}
);

winone.add(btn);
winone.open();

*/