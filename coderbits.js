;(function(window, document, undefined) {
	"use strict";
	var addCommas = function(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	};
	var request = function(url) {
		var script = document.getElementsByTagName("script")[0];
		var handler = document.createElement("script");
			handler.src = url;
		script.parentNode.insertBefore(handler, script);
	};
	var key = function(integer) {
		var key = String();
		var values = "1234567890";
		for(var i = 0; i < integer; i++) {
			key += values.charAt(Math.floor(Math.random() * values.length));
		}
		return key;
	};
	var noConflict = function(begin, count) {
		do {
			var current = key(count);
			var global = begin + current;
		} while(window[global]);
	};
})(window, document);
