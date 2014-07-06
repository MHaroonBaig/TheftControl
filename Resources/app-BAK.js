var win1 = Titanium.UI.createWindow(
{  
    title:'Welcome To NoKunda',
    backgroundColor:'#191919'
});
var myview = Ti.UI.createView(
{
	layout: 'vertical',
	top : '8%',
	bottom:'8%',
	left:'4%',
	right:'4%',
	backgroundColor : 'black'
});

var coordss = Titanium.UI.createLabel(
{
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	//textAlign:'center',
	width:'auto'
});

myview.add(coordss);

win1.add(myview);

win1.open();
    //Ti.Geolocation.purpose = 'Get Current Location';
    //Ti.Geolocation.distanceFilter = 7;
	//Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    //Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;


    Ti.Geolocation.addEventListener('location', function(e)
    {
       if (!e.success || e.error)
       {
       	  coordss.text = 'Coordinates N/A right now... wait?';
//          alert('error ' + JSON.stringify(e.error));
			return;
       } 
       
       coordss.text = 'Lat: ' + e.coords.latitude + ' Long: ' + e.coords.longitude + ' Accu: ' + e.coords.accuracy + '\n Heading: ' + e.coords.heading + ' Speed: ' + e.coords.speed;
       
    });

/*
if ( isLocationAuthorized() ) 
{
  getLocation();
} 
else 
{
	alert('Cannot use GPS! :/');
};
*/