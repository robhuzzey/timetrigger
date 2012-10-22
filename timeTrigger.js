var TimeTrigger = function( eventsObj, tolerance ) {
	
	var _tolerance = tolerance;
	var _eventsObj = eventsObj;
	var _timings = undefined;

	// Set a default tolerance level
	if( _tolerance === undefined ) {
		_tolerance = 0.1;
	}

	// Gets the timings from event obj & sorts in order of time
	var _getTimings = function() {
		// Get the keys of our object & sort them in order (based on time)
		var keys = Object.keys( _eventsObj );		
		keys.sort(function( a, b ) {
			return parseFloat( a ) - parseFloat( b );
		});

		// Store the keys (times) in timings for later use
		_timings = keys;
	};

	// Resets the timings
	var _resetTimings = function() {
		_timings = undefined;
	};

	// This does the actual work
	this.trigger = function( time ) {

		// We only want to get & sort the timings the first time this is called
		if( _timings === undefined ) {
			_getTimings();
		}

		// Just to be sure we are dealing with the correct type
		var timeAsFloat = parseFloat( time );

		// Set the upper & lower bounds
		var upper = timeAsFloat + _tolerance;
		var lower = timeAsFloat - _tolerance;

		// Now we do our loop over the timings to see if our current time will trigger an event
		for( var i = 0, len = _timings.length; i < len; i++ ) {

			// Making sure we are dealing with the correct type
			var eventTime = parseFloat( _timings[i] );

			// No point trying to loop through the remainder of our array
			// if we know our event time goes outside our upper bounds
			if( eventTime > upper ) {			
				break;
			}	

			// check if this number is in our range
			if( eventTime <= upper && eventTime >= lower ) {

				// Execute the function if we have one
				if( typeof _eventsObj[_timings[i]] === 'function' ) {
						_eventsObj[_timings[i]]();
				}

				// Great, we've triggered that event, so we no longer need it
				// Rather than delete this timed event, remove all events before it as well
				// this way if user navigates through video to later point we
				// aren't unnecessarily looping through all timings to get to the one we want :)
				_timings = _timings.slice( ( i + 1 ) );
				break;
			}

		}

	};

	this.reset = function() {
		_resetTimings();
	};		

};