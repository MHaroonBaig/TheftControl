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
	return self; 
};
module.exports = mapwindow;
