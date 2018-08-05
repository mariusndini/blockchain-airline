var URL = 'https://blockchain.sapnait.com:40101/';
//var URL = 'http://blockchain.sapnait.com:40101/';

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
    hypeDocument.showSceneNamed('flyer', hypeDocument.kSceneTransitionPushRightToLeft, 0.2);
    $('#flyerName').html(GLOBALS.flyer.name);
    $('#flyerId').html(GLOBALS.flyer._id);
    $('#flyerWalletAddress').html(GLOBALS.flyer.reward.public);
    $('#flyerPoints').html( parseInt(GLOBALS.flyer.reward.balance) );

    $('#qrcode').qrcode({
        width: 100, height: 100,
		render	: "canvas",
		text	: GLOBALS.flyer.name+','+GLOBALS.flyer._id
    });
    
    $('#bigQR').qrcode({
        width:250 , height: 250,
		render	: "canvas",
		text	: GLOBALS.flyer.name+','+GLOBALS.flyer._id
	});


    
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

        nextItem.click(( event )=>{
            flyerTripTicket();
        })

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
                table.append('<tr onclick=\'loadUser('+ JSON.stringify(d[i]) +')\'><td><i class="far fa-user"></i></td><td>'+d[i].name+'</td><td>'+d[i].trips.length+'</td><td>'+ (parseInt(d[i].reward.balance) || '' )+'</td></tr>');
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
            loadUser(d);
        },
    });
}//end order ticket

function addLuggage(){
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
}//end order ticket


//top up reward program
function flyerTripTicket(){
    var hype = HYPE.documents["index"];
    GLOBALS.thisTicket = $('#'+event.currentTarget.id).find('#flyerTicketNumber').html();
    
    $.ajax({
        type: "GET",
        url: URL + 'ticket/' + GLOBALS.thisTicket,
        success: function(d){
            hype.showSceneNamed('ticket', hypeDocument.kSceneTransitionPushRightToLeft, 0.2);
            GLOBALS.thisTicket = d;
            console.log(GLOBALS.thisTicket);

            $('#ticketName').html(d.flyer);
            $('#ticketFrom').html(d.from.toUpperCase());

            var time = new Date(d.time);
            $('#ticketTo').html(d.to.toUpperCase());
            $('#ticketBoarding').html( time.getHours() + ':' + time.getMinutes());
            $('#ticketDate').html( (time.getMonth()+1)+'/'+time.getDate()+'/'+time.getFullYear() );
            $('#ticketFlight').html();


        },
    });
    
}//end flyer top-up



//top up reward program
function flyerTopUp(){
    $.ajax({
        type: "POST",
        url: URL + 'points/' + GLOBALS.flyer._id,
        success: function(d){
            GLOBALS.flyer = d;
            console.log(d);
            $('#flyerPoints').html( parseInt(GLOBALS.flyer.reward.balance) );

        },
    });
}//end flyer top-up


