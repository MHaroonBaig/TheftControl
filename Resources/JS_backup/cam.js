
var win = Ti.UI.currentWindow;
win.title = "Camera Preview";
win.backgroundColor = 'black';

	Titanium.Media.showCamera(
		{	
			success:function(e)
			{
				img = e.media.imageAsResized(1024, 1024);
				//img = e.media;
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.jpg');
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
					
					//win.open();
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
								url: "app-BAK.js",
								title:'NoKunda Getting GPS!',
								backgroundColor:'#191919'
							});
							gpsWindow.open();
					});
					
					win.add(button);

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

//})();