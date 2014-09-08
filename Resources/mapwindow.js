function mapwindow()
{ 
	var self = Ti.UI.createWindow(
		{ 
			title: 'Map of Kundas', 
			backgroundColor: '#FFFFFF', 
			barColor: '#3498db',
			fullscreen: true,
			navBarHidden: true 
		});
		
	var Map = require('ti.map');
	//var mapview = Map.createView({mapType:Map.NORMAL_TYPE});
	
	var annon = Map.createAnnotation(
	{
    latitude:33.9939,
    longitude:71.5147,
    title:"Psh Airport",
    subtitle:'Peshawar',
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
	});
	
	var mapview = Map.createView(
	{
    mapType: Map.NORMAL_TYPE,
    region: {latitude:34.0167, longitude:71.5833,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    width:Ti.UI.FILL,
    height:Ti.UI.FILL,
    //regionFit:true,
    //userLocation:true,
    annotations:[annon]
	});
	
	self.add(mapview);
	rc = Map.isGooglePlayServicesAvailable();
	if ( rc == Map.SUCCESS )
	{
		Ti.API.info('GooG Play Services INSTALLED on Phone!!');
	}
	else
	{
		Ti.API.info('Google Play services NOT INSTALLED!');
	}
	
	return self; 
};
module.exports = mapwindow;
