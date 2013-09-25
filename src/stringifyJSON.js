// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function ( obj ) {
	// your code goes here
	function stringify ( param ) {
		var temp = '';
		if ( param === null ) {
			return 'null';
		}
		if ( typeof param === 'string' ) {
			return  '"' + param + '"';
		}
		if ( typeof param === 'number' || typeof param === 'boolean' ) {
			return param + '';
		}
		if ( Array.isArray( param ) ) {
			for ( var i = 0; i < param.length; i++ ) {
				temp += stringify( param[i] );
				temp += (i < param.length - 1) ? ',' : '';
			}
			return '[' + temp + ']';
		} else {
			for ( var p = Object.keys( param ), l = 0; l < p.length; l++ ) {
				if ( !( ["functions", "undefined"].indexOf( p[l] ) > -1) ) {
					temp += '"' + p[l] + '":' + stringify( param[p[l]] );
					temp += (l < p.length - 1) ? ',' : '';
				}
			}
			return '{' + temp + '}';
		}
	}

	return stringify( obj );

};
