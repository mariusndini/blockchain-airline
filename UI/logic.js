var URL = 'https://blockchain.sapnait.com:40101/';
var URL = 'http://blockchain.sapnait.com:40101/';

var GLOBALS = {};
let hypeDocument;

function open(hype){
    hypeDocument = hype;
}

function newFlyer(hypeDocument){
    var data = {
        "name":$('#signupFlyerName').val(),
        "address": $('#signupFlyerAddress').val()
    }
    
    $.ajax({
        type: "POST",
        url: URL + 'flyer',
        data: data,
        dataType: 'json',
        success: function(d){
            console.log(d);
            loadUser(d);
        },
    });

}//end get flyer


function loadUser(flyer){
    GLOBALS.flyer = flyer;
    hypeDocument.showSceneNamed('flyer', hypeDocument.kSceneTransitionPushRightToLeft, 0.2)
    $('#flyerName').html(GLOBALS.flyer.name);
    $('#flyerId').html(GLOBALS.flyer._id);

    for(i = 0; i < flyer.trips.length; i++){
        //clone object
        var nextItem = $('#flyerTripIcon').clone();
        nextItem.attr('id','flyerTripIcon' + i );
        // change item
        nextItem.css({left: 113 + (105 *  i) });
        
        nextItem.find('#flyerTripLoc').html('JFK' + i);
        
        nextItem.find('#flyerTicketNumber').show();
        nextItem.find('#flyerTicketNumber').html(flyer.trips[i].ticket);

        //insert item
        nextItem.find('#flyerAddSign').hide();
        nextItem.insertAfter( $('#flyerTripIcon') );

    }


}// end load user


function showFlyers(hypeDocument){
    $.ajax({
        type: "GET",
        url: URL + 'flyer',
        success: function(d){
            console.log(d);
            GLOBALS.allFlyers = d;

            var table = $('#flyersTable tbody');
            table.html(' ');

            for(i=0; i < d.length; i++){
                table.append('<tr onclick=\'loadUser('+ JSON.stringify(d[i]) +')\'><td>'+d[i].name+'</td><td>'+d[i].trips.length+'</td></tr>');
            }
            GLOBALS.user = d;

        },
      });

}//end show flyers

function orderTicket(){

    var data = { to: "jfk", 
                 from: "tia", 
                 date: "2018-08-30T22:49:07.169Z"}
    
    $.ajax({
        type: "POST",
        url: URL + 'ticket/' + GLOBALS.flyer._id,
        data: data,
        dataType: 'json',
        success: function(d){
            console.log(d);
        },
    });


}