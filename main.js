$(function(){
	
	var configKeys = {
	"googleKey" : "AIzaSyADWrDX-WhlWkVB4fi8BPcpF-FgTi3rmqg",
	"coopKey" : "PZ3qhqRVPvL9vFV"
};
	//google geocode vars
var url = "https://maps.googleapis.com/maps/api/geocode/json";
var googleKey = configKeys.googleKey;
var params = {"key": googleKey,
			"address": "1271 Boynton St., Glendale, CA"
			};

var varHolder = {};
//COOP vars
var coopKey = configKeys.coopKey;
var coopUrl = "https://api.co-opfs.org/locator/proximitySearch";
var coopParams = {
					
				 };
	//convert address to geocode
	$.getJSON(url,params,function(data){
		 $.each(data, function(key, val){
			 $.each(val, function(key, val){
				 varHolder["lat"] = val.geometry.location.lat;
				 varHolder["lng"] = val.geometry.location.lng; 	
				});
					
			$.ajax({
		url: coopUrl,
		type: "GET",
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function(xhr){xhr.setRequestHeader("Authorization", coopKey)},
		data: { "latitude" : varHolder["lat"],
			   "longitude": varHolder["lng"],
			   "loctype": "A",
			   "Authorization": coopKey},
		success: function(data){
			console.log(data);
		}
	});
		});
	});
	
	
	
});