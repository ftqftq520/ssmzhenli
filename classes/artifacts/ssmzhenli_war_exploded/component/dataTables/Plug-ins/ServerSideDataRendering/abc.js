fnServerObjectToArray = function ( aElements )
{
    return function ( sSource, aoData, fnCallback ) {
        $.ajax( {
        	"contentType" : "application/json",
            "dataType": 'json',
            "type": "POST",
            "url": sSource,
            "data": aoData,
            "success": function (json) {
            	console.info(json);
                var a = [];
                for ( var i=0, iLen=json.aaData.length ; i<iLen ; i++ ) {
                    var inner = [];
                    for ( var j=0, jLen=aElements.length ; j<jLen ; j++ ) {
                        inner.push( json.aaData[i][aElements[j]] );
                    }
                    a.push( inner );
                }
                json.aaData = a;
                console.info(a);
                fnCallback(json);
            }
        } );
    }
}