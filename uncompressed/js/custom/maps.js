/**
 * Google Maps Initialisation
 */

var containerId = 'mapCanvas';
var mapZoom;
var mapLat;
var mapLng;
var mapOffsetX;
var mapOffsetY;
var customMarkerIcon = false;// '../images/customIcon.png';

// Parse mapLat
if ( 'undefined' != typeof window.mapLat ) {
	mapLat = parseFloat( window.mapLat );
} else {
	mapLat = false;
}

// Parse mapLng
if ( 'undefined' != typeof window.mapLng ) {
	mapLng = parseFloat( window.mapLng );
} else {
	mapLng = false;
}

// Parse mapZoom
if ( 'undefined' != typeof window.mapZoom ) {
	mapZoom = parseFloat( window.mapZoom );
} else {
	mapZoom = 12;
}

// Parse mapOffsetX
if ( 'undefined' != typeof window.mapOffsetX ) {
	mapOffsetX = parseFloat( window.mapOffsetX );
} else {
	mapOffsetX = 0;
}

// Parse mapOffsetY
if ( 'undefined' != typeof window.mapOffsetY ) {
	mapOffsetY = parseFloat( window.mapOffsetY );
} else {
	mapOffsetY = 0;
}

function initialize() {

	// Setup the Google Maps variable
	var map;
	var marker;

	// Call in the target latitude and longitude
	var testingLat = mapLat;
	var testingLng = mapLng;

	// Call in the desired offset, and setup the offset latitude and longitude
	var testingOffsetLat = testingLat + mapOffsetX;
	var testingOffsetLng = testingLng + mapOffsetY;

	// Declare map centre position
	var currentTarget = new google.maps.LatLng( testingLat, testingLng );

	// Declare marker position
	var currentCentre = new google.maps.LatLng( testingOffsetLat, testingOffsetLng );

	// Setup map options
	var mapOptions = {
		center:currentCentre,
		zoom: mapZoom,
		scrollwheel: false,
		mapTypeId:google.maps.MapTypeId.MAP
	};

	// Make the map
	map = new google.maps.Map( document.getElementById( containerId ), mapOptions );

	// Set the marker marker
	if ( customMarkerIcon ) {

		// If we have a custom marker icon, use it.
		marker = new google.maps.Marker({
			position: currentTarget,
			map: map,
			icon: customMarkerIcon
		});
	} else {

		// Otherwise, build with standard marker icon.
		marker = new google.maps.Marker({
			position: currentTarget,
			map: map
		});
	}

}

// Only trigger the `initialize` function if we have lat & lng values.
if ( mapLat && mapLng ) {

	// The standard Google Maps load trigger
	google.maps.event.addDomListener( window, 'load', initialize );
}
