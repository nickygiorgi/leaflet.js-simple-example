$( document ).ready(function() {
	CreateMap();
	// add a marker - a scottish flag icon will be shown on the coordinates for Edinburgh (latitude 55.95, longitude -3.19)
	// the icon size is 30 X 23 (width X height)
	// when clicking on the marker a popup will be shown with the text "Edinburgh!"
	mapManager.addMarker('/includes/images/edinburgh.png', [55.95, -3.19], [30, 23], 'Edinburgh!');
	// London marker
	mapManager.addMarker('/includes/images/london.png', [51.50, -0.12], [30, 18], 'London!');
	// Dublin marker
	mapManager.addMarker('/includes/images/dublin.png', [53.34, -6.26], [30, 19], 'Dublin!');
});


function CreateMap() {
    
    // create and initialize an empty map centered in [53.38, -1.47] (latitude, longitude) with zoom 6
	// map comes with a bunch of base layers (google, openstreetmap, etc...)
    mapManager.init('map', [53.38, -1.47], 6);
   
    // add a WMS (web map service) overlay - this one shows values of air temperature in different areas (points on the map) 
    mapManager.addWMSOverlay("Air Temp (deg F) - noaa",
       "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs", {
           format: "image/png",
           transparent: true,
           layers: "OBS_MET_TEMP"
       });
	//  add a WMS (web map service) overlay - this one shows a heatmap on air temperature
    mapManager.addWMSOverlay("Air Temp (heatmap) - geomet",
       "http://geo.weather.gc.ca/geomet/", {
           format: "image/png",
           transparent: true,
           opacity: 0.5,
           layers: "GDPS.PRES_TT"
       });
    
    // add a basic control panel (menu) in the upper right corner of the map with base layers and overlays
    mapManager.addLayersControl();   

}


