var parseJSON = (function () {

    function Error ( msg, errorName ) {
        this.message = msg;
        this.name = errorName;
    }

    function isNum ( c ) {
        return (c <= '9' && c >= '0') || c === '-' || c === '.';
    }

    var reserved = [ "true", "false", "null" ],
        jsonArray = [],
        jsonObj = {},
        thisChar,

        setJSONString = function ( str ) {
            jsonArray = str.split( '' );
            jsonObj = {};
        },

        isWhiteChar = function ( c ) {
            return [' ', '\t'].indexOf( c ) > -1;
        },

        readCh = function () {
            return jsonArray[0];
        },

        getCh = function ( expected ) {
            if ( typeof expected !== 'undefined' ) {
                while ( isWhiteChar( readCh() ) ) {
                    jsonArray.shift();
                }

                thisChar = jsonArray.shift();
                if ( thisChar !== expected ) {
                    throw new Error( 'Unexpected ' + thisChar + ' Expected: ' + expected, 'ParseError' );
                }
            } else {
                thisChar = jsonArray.shift();
            }
            return thisChar;
        },

        parseReserved = function(char) {

            if (char === 't') {
                getCh('r');
                getCh('u');
                getCh('e');
                return true;
            } else if (char === 'f') {
                getCh('a');
                getCh('l');
                getCh('s');
                getCh('e');
                return false;
            } else if (char === 'n') {
                getCh('u');
                getCh('l');
                getCh('l');
                return null;
            } else {
                Error('Unrecognized reserved word', 'ParseError');
            }
        },

        parseString = function () {
            var string = '', c = '';
            while ( c !== '"' ) {
                string += c;
                c = getCh();
            }
            return string;
        },

        parseNumber = function(num) {
            num += '';
            while( isNum( readCh() ) ) {
                num += getCh();
            }
            return (num.indexOf('.') > -1 ) ?  parseFloat(num) :  +num;
        },

        parseArray = function () {

            var array = [];

            while ( readCh() !== undefined ) {
                if (readCh() === ']') {
                    getCh();
                    return array;
                }
                array.push( parse() );
                if (readCh() === ',') getCh(',');
            }
            getCh(']');
            return array;
        },

        parseObject = function() {
            var val,
                key,
                obj={};
          while( readCh() !== undefined ) {
            if (readCh() === '}') {
                getCh();
                return obj
            }
            getCh('"');
            key = parseString();
            getCh(':');
            val = parse();
            obj[key] = val;
              if (readCh() === ',') getCh(',');
          }
          getCh('}');
          return obj;
        },

        parse = function () {
            thisChar = getCh();
            switch ( thisChar ) {
                case '"':
                    return parseString();
                case '[':
                    return parseArray();
                case '{':
                    return parseObject();
                case ' ' :
                    return parse();
                case '\t' :
                    return  parse();
                default :
                    return isNum( thisChar ) ? parseNumber(thisChar) : parseReserved(thisChar);
            }
        },

        main = function ( str ) {
            setJSONString( str );
            jsonObj = parse();
            return jsonObj;
        };

    return main;
})();