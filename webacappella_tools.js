//hack
//waJSQuery est utilisÃ© par WA pa la place de jQuery pour eviter tout conflit avec des scripts externe
//webacappella_tools.js est utilisÃ© en meme temps par les sites WA et pour l'admin
try
{
	if (waJSQuery==undefined)
	{
		waJSQuery = jQuery
	}	
}
catch(e)
{
	waJSQuery = jQuery
}


// add support for Object.keys for old browser
if ( !Object.keys ) {
    Object.keys = function( obj ) {
        var keys = [], k;
        for ( k in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, k ) ) {
                keys.push( k );
            }
        }
		
        return keys;
    };
}

if ( !String.prototype.format ) {
	String.prototype.format = function() {
		var _formatted = this;
		
		for ( var _i = 0; _i < arguments.length; _i++ ) {
			var _regexp = new RegExp( '\\{'+ _i+'\\}', 'gi' );
			_formatted = _formatted.replace( _regexp, arguments[ _i ] );
		}
		
		return _formatted;
	};
}

if ( !String.prototype.startsWith ) {
	String.prototype.startsWith = function( str ) {
		return this.slice( 0, str.length ) == str;
	};
}

if ( !String.prototype.endsWith ) {
	String.prototype.endsWith = function( str ) {
		return this.slice( -str.length ) == str;
	};
}

function _objectKeysCount( _object ) {
	return _object == undefined ? 0 : Object.keys( _object ).length;
}

function _toJSON( _data, _silent ) {
	var _result = new Object();
	
	if ( _silent == undefined ) {
		_silent = true;
	}
	
	_result.success = false;
	_result.error = 'Unknown error';
	
	if ( _data.indexOf( '<?php' ) > -1 ) {
		if ( _silent != true ) {
			_result.error = Translator.tr( 'Error:No php on server' );
			WA_Dialog.alert( _result.error );
		}
		
		return _result;
	}
	
	try {

		///
        _result.json = waJSQuery.parseJSON( _data );
		_result.success = _result.json.success;
		_result.error = _result.json.error;
	}
	catch( e ) {
		_result.success = false;
		_result.error = e.message;
    }
	
	if ( _result.json == null ) {
		if ( _silent != true ) {
			_result.error = Translator.tr( 'Error:Malformed response !' );
			WA_Dialog.alert( _result.error );
		}
	}
	else {
		if ( _result.success != true ) {
			if ( _silent != true ) {
				WA_Dialog.alert( _result.error_message );
			}
		}
	}
	
	return _result;
}

function _HTMLEntities( _text ) {
	//_text = _text.replace(/"/g,'&quot;'); // 34 22
	_text = _text.replace(/&/g,'&amp;'); // 38 26
	_text = _text.replace(/\'/g,'&#39;'); // 39 27
	_text = _text.replace(/</g,'&lt;'); // 60 3C
	_text = _text.replace(/>/g,'&gt;'); // 62 3E
	_text = _text.replace(/\^/g,'&circ;'); // 94 5E
	_text = _text.replace(/â€˜/g,'&lsquo;'); // 145 91
	_text = _text.replace(/â€™/g,'&rsquo;'); // 146 92
	_text = _text.replace(/â€œ/g,'&ldquo;'); // 147 93
	_text = _text.replace(/â€/g,'&rdquo;'); // 148 94
	_text = _text.replace(/â€¢/g,'&bull;'); // 149 95
	_text = _text.replace(/â€“/g,'&ndash;'); // 150 96
	_text = _text.replace(/â€”/g,'&mdash;'); // 151 97
	_text = _text.replace(/Ëœ/g,'&tilde;'); // 152 98
	_text = _text.replace(/â„¢/g,'&trade;'); // 153 99
	_text = _text.replace(/Å¡/g,'&scaron;'); // 154 9A
	_text = _text.replace(/â€º/g,'&rsaquo;'); // 155 9B
	_text = _text.replace(/Å“/g,'&oelig;'); // 156 9C
	_text = _text.replace(/Â/g,'&#357;'); // 157 9D
	_text = _text.replace(/Å¾/g,'&#382;'); // 158 9E
	_text = _text.replace(/Å¸/g,'&Yuml;'); // 159 9F
	// _text = _text.replace(/ /g,'&nbsp;'); // 160 A0
	_text = _text.replace(/Â¡/g,'&iexcl;'); // 161 A1
	_text = _text.replace(/Â¢/g,'&cent;'); // 162 A2
	_text = _text.replace(/Â£/g,'&pound;'); // 163 A3
	//_text = _text.replace(/ /g,'&curren;'); // 164 A4
	_text = _text.replace(/Â¥/g,'&yen;'); // 165 A5
	_text = _text.replace(/Â¦/g,'&brvbar;'); // 166 A6
	_text = _text.replace(/Â§/g,'&sect;'); // 167 A7
	_text = _text.replace(/Â¨/g,'&uml;'); // 168 A8
	_text = _text.replace(/Â©/g,'&copy;'); // 169 A9
	_text = _text.replace(/Âª/g,'&ordf;'); // 170 AA
	_text = _text.replace(/Â«/g,'&laquo;'); // 171 AB
	_text = _text.replace(/Â¬/g,'&not;'); // 172 AC
	_text = _text.replace(/Â­/g,'&shy;'); // 173 AD
	_text = _text.replace(/Â®/g,'&reg;'); // 174 AE
	_text = _text.replace(/Â¯/g,'&macr;'); // 175 AF
	_text = _text.replace(/Â°/g,'&deg;'); // 176 B0
	_text = _text.replace(/Â±/g,'&plusmn;'); // 177 B1
	_text = _text.replace(/Â²/g,'&sup2;'); // 178 B2
	_text = _text.replace(/Â³/g,'&sup3;'); // 179 B3
	_text = _text.replace(/Â´/g,'&acute;'); // 180 B4
	_text = _text.replace(/Âµ/g,'&micro;'); // 181 B5
	_text = _text.replace(/Â¶/g,'&para'); // 182 B6
	_text = _text.replace(/Â·/g,'&middot;'); // 183 B7
	_text = _text.replace(/Â¸/g,'&cedil;'); // 184 B8
	_text = _text.replace(/Â¹/g,'&sup1;'); // 185 B9
	_text = _text.replace(/Âº/g,'&ordm;'); // 186 BA
	_text = _text.replace(/Â»/g,'&raquo;'); // 187 BB
	_text = _text.replace(/Â¼/g,'&frac14;'); // 188 BC
	_text = _text.replace(/Â½/g,'&frac12;'); // 189 BD
	_text = _text.replace(/Â¾/g,'&frac34;'); // 190 BE
	_text = _text.replace(/Â¿/g,'&iquest;'); // 191 BF
	_text = _text.replace(/Ã€/g,'&Agrave;'); // 192 C0
	_text = _text.replace(/Ã/g,'&Aacute;'); // 193 C1
	_text = _text.replace(/Ã‚/g,'&Acirc;'); // 194 C2
	_text = _text.replace(/Ãƒ/g,'&Atilde;'); // 195 C3
	_text = _text.replace(/Ã„/g,'&Auml;'); // 196 C4
	_text = _text.replace(/Ã…/g,'&Aring;'); // 197 C5
	_text = _text.replace(/Ã†/g,'&AElig;'); // 198 C6
	_text = _text.replace(/Ã‡/g,'&Ccedil;'); // 199 C7
	_text = _text.replace(/Ãˆ/g,'&Egrave;'); // 200 C8
	_text = _text.replace(/Ã‰/g,'&Eacute;'); // 201 C9
	_text = _text.replace(/ÃŠ/g,'&Ecirc;'); // 202 CA
	_text = _text.replace(/Ã‹/g,'&Euml;'); // 203 CB
	_text = _text.replace(/ÃŒ/g,'&Igrave;'); // 204 CC
	_text = _text.replace(/Ã/g,'&Iacute;'); // 205 CD
	_text = _text.replace(/ÃŽ/g,'&Icirc;'); // 206 CE
	_text = _text.replace(/Ã/g,'&Iuml;'); // 207 CF
	_text = _text.replace(/Ã/g,'&ETH;'); // 208 D0
	_text = _text.replace(/Ã‘/g,'&Ntilde;'); // 209 D1
	_text = _text.replace(/Ã’/g,'&Ograve;'); // 210 D2
	_text = _text.replace(/Ã“/g,'&Oacute;'); // 211 D3
	_text = _text.replace(/Ã”/g,'&Ocirc;'); // 212 D4
	_text = _text.replace(/Ã•/g,'&Otilde;'); // 213 D5
	_text = _text.replace(/Ã–/g,'&Ouml;'); // 214 D6
	_text = _text.replace(/Ã—/g,'&times;'); // 215 D7
	_text = _text.replace(/Ã˜/g,'&Oslash;'); // 216 D8
	_text = _text.replace(/Ã™/g,'&Ugrave;'); // 217 D9
	_text = _text.replace(/Ãš/g,'&Uacute;'); // 218 DA
	_text = _text.replace(/Ã›/g,'&Ucirc;'); // 219 DB
	_text = _text.replace(/Ãœ/g,'&Uuml;'); // 220 DC
	_text = _text.replace(/Ã/g,'&Yacute;'); // 221 DD
	_text = _text.replace(/Ãž/g,'&THORN;'); // 222 DE
	_text = _text.replace(/ÃŸ/g,'&szlig;'); // 223 DF
	_text = _text.replace(/Ã /g,'&aacute;'); // 224 E0
	_text = _text.replace(/Ã¡/g,'&aacute;'); // 225 E1
	_text = _text.replace(/Ã¢/g,'&acirc;'); // 226 E2
	_text = _text.replace(/Ã£/g,'&atilde;'); // 227 E3
	_text = _text.replace(/Ã¤/g,'&auml;'); // 228 E4
	_text = _text.replace(/Ã¥/g,'&aring;'); // 229 E5
	_text = _text.replace(/Ã¦/g,'&aelig;'); // 230 E6
	_text = _text.replace(/Ã§/g,'&ccedil;'); // 231 E7
	_text = _text.replace(/Ã¨/g,'&egrave;'); // 232 E8
	_text = _text.replace(/Ã©/g,'&eacute;'); // 233 E9
	_text = _text.replace(/Ãª/g,'&ecirc;'); // 234 EA
	_text = _text.replace(/Ã«/g,'&euml;'); // 235 EB
	_text = _text.replace(/Ã¬/g,'&igrave;'); // 236 EC
	_text = _text.replace(/Ã­/g,'&iacute;'); // 237 ED
	_text = _text.replace(/Ã®/g,'&icirc;'); // 238 EE
	_text = _text.replace(/Ã¯/g,'&iuml;'); // 239 EF
	_text = _text.replace(/Ã°/g,'&eth;'); // 240 F0
	_text = _text.replace(/Ã±/g,'&ntilde;'); // 241 F1
	_text = _text.replace(/Ã²/g,'&ograve;'); // 242 F2
	_text = _text.replace(/Ã³/g,'&oacute;'); // 243 F3
	_text = _text.replace(/Ã´/g,'&ocirc;'); // 244 F4
	_text = _text.replace(/Ãµ/g,'&otilde;'); // 245 F5
	_text = _text.replace(/Ã¶/g,'&ouml;'); // 246 F6
	_text = _text.replace(/Ã·/g,'&divide;'); // 247 F7
	_text = _text.replace(/Ã¸/g,'&oslash;'); // 248 F8
	_text = _text.replace(/Ã¹/g,'&ugrave;'); // 249 F9
	_text = _text.replace(/Ãº/g,'&uacute;'); // 250 FA
	_text = _text.replace(/Ã»/g,'&ucirc;'); // 251 FB
	_text = _text.replace(/Ã¼/g,'&uuml;'); // 252 FC
	_text = _text.replace(/Ã½/g,'&yacute;'); // 253 FD
	_text = _text.replace(/Ã¾/g,'&thorn;'); // 254 FE
	_text = _text.replace(/Ã¿/g,'&yuml;'); // 255 FF
	return _text;
}

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function _parseUri( _str ) {
	var	_o   = _parseUri.options,
		_m   = _o.parser[ _o.strictMode ? "strict" : "loose" ].exec( _str ),
		_uri = {},
		_i   = 14;

	while ( _i-- ) {
		_uri[ _o.key[ _i ] ] = _m[ _i ] || "";
	}

	_uri[ _o.q.name ] = {};
	_uri[ _o.key[ 12 ] ].replace( _o.q.parser, function( $0, $1, $2 ) {
		if ( $1 ) {
			_uri[ _o.q.name ][ $1 ] = $2;
		}
	} ) ;

	return _uri;
};

_parseUri.options = {
	strictMode: false,
	key: [ "source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor" ],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
