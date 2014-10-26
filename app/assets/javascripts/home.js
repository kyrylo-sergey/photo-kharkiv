$(function(){
    function resize_map(map){
	var cont = $(map.getContainer());
	cont.width($(document).width());
	cont.height($(document).height()-100); // TODO: unhardcode this
	map.invalidateSize();
    }

    var map = L.map('map');
    map.setView([50.0139, 36.2253], 14);
    L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'All rights reserved',
        maxZoom: 18,
	subdomains: '',
    }).addTo(map);
    resize_map(map);
});
