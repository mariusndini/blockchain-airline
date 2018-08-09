var URL = 'https://blockchain.sapnait.com:40101/';
//var URL = 'http://blockchain.sapnait.com:40101/';

var GLOBALS = {};
let hypeDocument;
var video = document.createElement("video");

var isVideoSetUp = false;


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
    
    var qrText = {};
    qrText.type = 'flyer';
    qrText.flyer = GLOBALS.flyer.name;
    qrText.id = GLOBALS.flyer._id;
    
    qrText = JSON.stringify(qrText);

    $('#qrcode').qrcode({
        width: 100, height: 100,
		render	: "canvas",
		text	: qrText
    });
    
    $('#bigQR').qrcode({
        width:250 , height: 250,
		render	: "canvas",
		text	: qrText
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
            console.log(d.f);
            GLOBALS.ticketConfirm = 0;

            loadUser(d.f);
        },
    });
}//end order ticket

//https://blockchain.sapnait.com:40101/luggage/flyer/5b634374e3d93e36e35022bf/ticket/5b699ca5b14f222794fe2e4b
//change to match above
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


function qrLogic(){ 
    if(!isVideoSetUp){
        isVideoSetUp = true;
        var canvasElement = document.getElementById("qrCanvas");
        var canvas = canvasElement.getContext("2d");

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
            video.srcObject = stream;

            video.setAttribute("playsinline", true);
            video.play();
            //video.onpause = ()=>{alert('Paused')}
            requestAnimationFrame(tick);
        });
        
        function tick() {

            function drawLine(begin, end, color) {
                canvas.beginPath();
                canvas.moveTo(begin.x, begin.y);
                canvas.lineTo(end.x, end.y);
                canvas.lineWidth = 7;
                canvas.strokeStyle = color;
                canvas.stroke();
            }

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvasElement.hidden = false;

                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#F0AB02");
                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#F0AB02");
                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#F0AB02");
                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#F0AB02");

                    qrCodeScanned(code);
                } 
            }
            requestAnimationFrame(tick);
        }
    }//end check if this is already set up. 

}


function qrCodeScanned(code){
    var json = code.data;

    try {
        data = JSON.parse(json);
        GLOBALS.QR = data;

        if(data.type == 'flyer'){
            video.srcObject.getTracks()[0].stop();
            isVideoSetUp = false;

            hypeDocument.startTimelineNamed('giftCoins', hypeDocument.kDirectionForward)
            transferPoints(GLOBALS.QR);
            
        }

    } catch (e) {
        return false;
    }//end catch
}//end qr code scanned


//https://blockchain.sapnait.com:40101/points/transfer/5b699642982fc87199a119dd
function transferPoints(data){
    
    $('#qrAction').html('Gift Coins');
    $('#sendToRecipient').html(data.flyer);
    $('#sendToID').html(data.id);

    $('#qrConfirmButton').html('Gift to ' + data.flyer);
    
    $('#qrConfirmButton').removeAttr('disabled'); //enable button push

    $('#qrConfirmButton').click({input: data}, (event)=>{
        $('#qrConfirmButton').attr('disabled', 'disabled');//disable button push

        var data = {"to": event.data.input.id,  "amount": $('#sendToAmount').val() };
        
        $.ajax({ //send Coins transaction
            type: "POST",
            url: URL + 'points/transfer/' + GLOBALS.flyer._id,
            data: data,
            dataType: 'json',
            success: function(d){
                console.log(d);
                hypeDocument.startTimelineNamed('giftCoins', hypeDocument.kDirectionReverse);
                closePay();
            },
        });//end ajax call
        
    })//end qr onclick

}//end transfer points function



function openPay(){
    isPayOpen = false;
    hypeDocument.startTimelineNamed('showPay', hypeDocument.kDirectionForward);

}

function closePay(){
    video.srcObject.getTracks()[0].stop(); //stop using the camera
    isPayOpen = true;
    isVideoSetUp = false;

    hypeDocument.startTimelineNamed('showPay', hypeDocument.kDirectionReverse);
    
}













