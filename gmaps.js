const request = require('request');

var getAddress = (address, callback) => {
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + encodeURIComponent(address) + '&key=AIzaSyC2vjWxCmGpF5fRSDewmg7BGecZrqN0hiU',
        json: true
    }, (error, response, body) => {
    	if (error) {
    		callback('Cannot connect to Google Maps');
    		//console.log('Cannot connect to Google Maps');
    	} else if (body.status === 'ZERO_RESULTS') {
    		callback('Cannot find requested address');
    	} else if (body.status === 'OK') {
    		callback(undefined, {
    			lat: body.results[0].geometry.location.lat,
    			lng: body.results[0].geometry.location.lng
    		});
    	}

    	//console.log(`Your requested venue: ${address}`);
    	//console.log(`Address: ${body.results[0].formatted_address}`);
    	//console.log(`Type: ${body.results[0].types[0]}`);
    });
};

var getTemperature = (address, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/84295bc4cdad5c0a9f5c99add5f27c9e/42.3601,-71.0589',
        json: true
    }, (error, response, body) => {
    	if (error) {
    		callback('Cannot connect to darksky');
    		//console.log('Cannot connect to Google Maps');
    	} else if (body.status === 'ZERO_RESULTS') {
    		callback('Cannot find requested address');
    	} else if (body.status === 'OK') {
    		callback(undefined, {
    			address: body.results[0]
    		});
    	}

    	//console.log(`Your requested venue: ${address}`);
    	//console.log(`Address: ${body.results[0].formatted_address}`);
    	//console.log(`Type: ${body.results[0].types[0]}`);
    });
};



module.exports = {
	getAddress,
	getTemperature
};