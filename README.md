Time Trigger
============

A simple way to trigger events based on a loose time (fuzzy time).

Usage
-----

### Create a new instance
	var timeTrigger = new TimeTrigger( eventsObj );

### Trigger an event
	timeTrigger.trigger( time );

Time Trigger expects an events object that has times as keys (has to be strings unfortunately) and functions as values.

	{
		"12.00" : function() {
			// code
		},
		"16.32" : function() {
			// code
		}
	}

