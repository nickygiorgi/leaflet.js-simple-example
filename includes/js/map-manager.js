var mapManager = {

	map: null, 
	baseLayers: {},
	overlays: {}, 
	mapLayersMenu: null,

	init: function (divID, center, zoom) {
		
		// create base layers
		
		// openstreetmap initialization
		var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';

		// openstreetmap base layers (greyscale, streets)	
		var grayscale = L.tileLayer(mbUrl, { id: 'examples.map-20v6611k', attribution: mbAttr }),
			streets = L.tileLayer(mbUrl, { id: 'examples.map-i875mjb7', attribution: mbAttr }),
			// google base layers (satellite, roadmap, hybrid, terrain)
			googleSat = new L.Google('SATELLITE'),
			googleRoadmap = new L.Google('ROADMAP'),
			googleHybrid = new L.Google('HYBRID'),
			googleTerrain = new L.Google('TERRAIN');
		
		// create map - set default base layer to google satellite
		this.map = L.map(divID, {
			center: center,
			zoom: zoom,
			layers: [googleSat],
			scrollWheelZoom: 'center'
		});

		// create basic list of base layers to be inserted in menu 
		this.baseLayers = {
			"Google Roadmap": googleRoadmap,
			"Google Satellite": googleSat,
			"Google Hybrid": googleHybrid,
			"Google Terrain": googleTerrain,
			"Grayscale": grayscale,
			"Streets": streets
		};

		// move zoom control to the bottom right corner of the map
		$('.leaflet-control-zoom').detach().appendTo('#custom-zoom-control'); 
	},

	// add WMS overlay 
	addWMSOverlay: function (overlayName, wmsAddress, wmsParams) {
		var layer = L.tileLayer.wms(wmsAddress, wmsParams);
		this.overlays[overlayName] = layer;
	},

	// insert baselayers and overlays (if any) in upper right menu 
	addLayersControl: function () { 
		if (isEmptyJSObj(this.overlays))
			this.mapLayersMenu = L.control.layers(this.baseLayers).addTo(this.map);
		else
			this.mapLayersMenu = L.control.layers(this.baseLayers, this.overlays).addTo(this.map);    
	},

	// insert markers on the map
	// position is array [lat, long]
	// iconSize is array [width, height] (pixels)
	addMarker: function (relativeIconUrl, position, iconSize, popupHtmlContents) { 
		var defaultMapIcon = L.Icon.extend({
			options: {
				iconSize: iconSize,
				iconAnchor: [15, 15],
				popupAnchor: [-3, -3],
			}
		});

		var myMarker = new defaultMapIcon({ iconUrl: getBaseUrl() + relativeIconUrl });
		L.marker(position, { icon: myMarker }).bindPopup(popupHtmlContents).addTo(this.map);
	}

}


