// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function ( obj ) {
	// your code goes here
	var result = '';
	var reserved = ["functions", "undefined"];

	return (function stringify ( param ) {

		if ( param === null ) {
			result += 'null,';
			return result;
		}
		if ( typeof param === 'string' ) {
			var temp = '"' + param + '",';
			result += temp;
			return result;
		}
		if ( typeof param === 'number' || typeof param === 'boolean' ) {
			result += param + ',';
			return result;
		}
		if ( Array.isArray( param ) ) {
			result += '[';
			for ( var i = 0; i < param.length; i++ ) {
				stringify( param[i] );
			}
			if ( param.length > 0 ) {
				result = result.slice( 0, -1 );
			}
			result += '],';
			return result;
		} else {
			result += '{';
			var flag = false;
			for ( var p in param ) {
				if ( !( reserved.indexOf( p ) > -1) ) {
					flag = true;
					result += '"' + p + '":';
					stringify( param[p] );
				}
			}
			if ( flag ) {
				result = result.slice( 0, -1 );
			}
			result += '},';
			return result;
		}
	})( obj ).slice( 0, -1 );

};
