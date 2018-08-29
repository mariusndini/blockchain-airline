var URL = 'https://blockchain.sapnait.com:40101/';
//var URL = 'http://blockchain.sapnait.com:40101/';

var GLOBALS = {};
let hypeDocument;

var video = document.createElement("video");
var isVideoSetUp = false;


function open(hype){
    console.log('change this to only run once');
    hypeDocument = hype;
    GLOBALS.food = 'food2';

    $.ajax({
        type: "GET",
        url: URL + 'flyer',
        success: function(d){
            GLOBALS.allFlyers = d;
            GLOBALS.flyer = d[0];
            GLOBALS.thisTicket = d[0].trips[0];
            GLOBALS.user = d;

        },
      });


}

function newFlyer(){
    if( $.trim($('#signupFlyerName').val()).length>0 && $.trim($('#signupFlyerAddress').val()).length>0 ){
        var data = {
            "name":$('#signupFlyerName').val(),
            "address": $('#signupFlyerAddress').val()
        }
        data.socketid = socket.id;
        data.msgType = 'newUser';

        $.ajax({
            type: "POST",
            url: URL + 'flyer',
            data: data,
            dataType: 'json',
            success: function(d){
                console.log(d);
                GLOBALS.flyer = d;
                $('#viewAcctBtn').show();
            },
        });
        
    }else{
        alert('Please Enter Flyer Name & Address');
    }//end if


}//end get flyer


function loadQR(){

    $('#qrcode').qrcode({
        width: 100, height: 100,
		render	: "canvas",
		text	: GLOBALS.qrText
    });
    
    $('#bigQR').qrcode({
        width:250 , height: 250,
		render	: "canvas",
		text	: GLOBALS.qrText
	});

}

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
    
    GLOBALS.qrText = JSON.stringify(qrText);

    loadQR();

    for(i = 0; i < flyer.trips.length; i++){
        //clone object
        var nextItem = $('#flyerTripIcon').clone();
        nextItem.attr('id','flyerTripIcon' + i );
        // change item
        nextItem.css({left: 113 + (105 *  i) });
        nextItem.find('#flyerTripLoc').html( (flyer.trips[i].to || 'JFK').toUpperCase() );
        nextItem.find('#flyerTicketNumber').html(flyer.trips[i]._id);

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
                console.log(i)

                table.append('<tr onclick=\'loadUser('+ JSON.stringify(d[i]) +')\'><td style="width:8%;text-align:center;vertical-align:middle;"><i style="font-size:30px" class="far fa-user"></i></td><td>'+d[i].name+'<br>Flights '+d[i].trips.length+'<br>Coins '+ (parseInt(d[i].reward.balance) || '' )+'</td></tr>');
            }
            GLOBALS.user = d;

        },
      });

}//end show flyers


function orderTickets(){
    var dataTo = { to: GLOBALS.ticketQuery.to, 
        from: GLOBALS.ticketQuery.from,
        date: GLOBALS.ticketQuery.toDate,
        price: GLOBALS.ticketQuery.price / 2
    }
    dataTo.socketid = socket.id;
    dataTo.msgType = 'tktTo';

    var dataReturn = { to: GLOBALS.ticketQuery.from, 
        from: GLOBALS.ticketQuery.to, 
        date: GLOBALS.ticketQuery.fromDate,
        price: GLOBALS.ticketQuery.price / 2
    }
    dataReturn.socketid = socket.id;
    dataReturn.msgType = 'tktFrom';

    // order ticket function
    function orderTicket(data){    
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: "POST",
                url: URL + 'ticket/' + GLOBALS.flyer._id,
                data: data,
                dataType: 'json',
                success: function(d){
                    GLOBALS.ticketConfirm = 0;
                    resolve(d.f)
                },
            });
        });
    }//end order ticket
    
    return orderTicket(dataTo).then((d)=>{
        console.log('To Ticket Ordered');
        return orderTicket(dataReturn)
    }).then((d)=>{
        console.log('From Ticket Ordered');
        GLOBALS.flyer = d;
        
    })

}//end order tickets

function orderTicketDashboard(){
    var dataTo = { to: 'CGN', 
        from: 'JFK',
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        price: 950 / 2
    }
    dataTo.socketid = socket.id;
    dataTo.msgType = 'newTicket';

    function orderTicket(data){    
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: "POST",
                url: URL + 'ticket/' + GLOBALS.flyer._id,
                data: data,
                dataType: 'json',
                success: function(d){
                    GLOBALS.ticketConfirm = 0;
                    GLOBALS.flyer = d.f;
                    console.log(d.f);
                    resolve(d.f)
                },
            });
        });
    }//end order ticket
    orderTicket(dataTo);

}//end order tickets

function getDashboardTicket(){
    var tickets = {};
    tickets.flights = [];

    for (let i = 0, p = Promise.resolve(); i < GLOBALS.flyer.trips.length; i++) {
        p = p.then(_ => new Promise(resolve =>
            $.ajax({
                type: "GET",
                url: URL + 'ticket/' + GLOBALS.flyer.trips[i]._id + '/flyer/' + GLOBALS.flyer._id,
                success: function(data){
                    tickets.flights.push(data);
                    $('#userHLJSON').html( renderjson(tickets) );
                    resolve()
                },
            })
        ));
        
    }//end for

    
    
}


//top up reward program
function flyerTripTicket(){
    GLOBALS.ticketID = $('#'+event.currentTarget.id).find('#flyerTicketNumber').html();
    
    $.ajax({
        type: "GET",
        url: URL + 'ticket/' + GLOBALS.ticketID + '/flyer/' + GLOBALS.flyer._id,
        success: function(d){
            GLOBALS.thisTicket = d;
            console.log(GLOBALS.thisTicket);
            hypeDocument.showSceneNamed('ticket', hypeDocument.kSceneTransitionPushRightToLeft, 0.2);
            loadTicket(d);
        },
    });
    
}//end flyer top-up

function loadTicket(d){

    $('#ticketName').html(d.flyer);
    $('#fromTicket').html(d.from.toUpperCase());
    $('#toTicket').html(d.to.toUpperCase());

    var time = new Date(d.time);
    $('#ticketBoarding').html( time.getHours() + ':' + ('00'+time.getMinutes()).slice(-2)) ;
    $('#ticketDate').html( (time.getMonth()+1)+'/'+time.getDate()+'/'+time.getFullYear() );
    
    var bagCounter = 0;
    for(i=0; i < d.luggage.length; i++){
        if(d.luggage[i].type == 1){
            $('#carryonCheck').show();
            $('#carryonAdd').hide();
        }else{
            bagCounter++
            $('#bag'+bagCounter+'Check').show();
            $('#bag'+bagCounter+'Add').hide();
        }

    }//end for
    

}



//top up reward program
function flyerTopUp(){
    var data = {}
    data.socketid = socket.id;
    data.msgType = 'topup';
    
    $.ajax({
        type: "POST",
        url: URL + 'points/' + GLOBALS.flyer._id,
        data: data,
        dataType: 'json',
        success: function(d){
            GLOBALS.flyer = d;
            console.log(d);
            
            $('#flyerPoints').html( parseInt(GLOBALS.flyer.reward.balance) );

        },
    });
}//end flyer top-up

var vidAnim;
function qrLogic(){ 
    if(!isVideoSetUp){
        isVideoSetUp = true;
        var canvasElement = document.getElementById("qrCanvas");
        var canvas = canvasElement.getContext("2d");

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;

            video.setAttribute("playsinline", true);
            video.play();
            //video.onpause = ()=>{alert('Paused')}
            vidAnim = requestAnimationFrame(tick);
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

                    cancelAnimationFrame(vidAnim);
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

        function stopVid(){
            video.srcObject.getTracks()[0].stop();
            isVideoSetUp = false;
        }

        if(data.type == 'flyer'){
            stopVid();
            hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('giftCoins', hypeDocument.kDirectionForward);
            transferPoints(GLOBALS.QR);
            
        }else if (data.type == 'bagcheck'){
            stopVid();
            hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('addBags', hypeDocument.kDirectionForward);
            addBagsToTicket(GLOBALS.QR);
        }

    } catch (e) {
        return false;
    }//end catch
}//end qr code scanned



function carryOnToTicket(){
    var data = { bag: { weight: 25, type: 1, beacon: false } };
    addBagsToTicket(data);
}

function firstLuggageToTIcket(){
    var data = { bag: { weight: 50, type: 0, beacon: bagBeacon } };
    addBagsToTicket(data);
}


function addLuggageDashboard(){
    var data = { bag: { weight: 50, type: 0, beacon: true } };
    
    GLOBALS.thisTicket = GLOBALS.flyer.trips[0] || GLOBALS.allFlyers[0].trips[0];
    addBagsToTicket(data);
    
}

function addBagsToTicket(data){

    if(data.bag.beacon){
        data.socketid = socket.id;
        data.msgType = 'bagBeacon';
    }

    $.ajax({
        type: 'POST',
        url: URL + 'luggage/flyer/' + GLOBALS.flyer._id +'/ticket/' + GLOBALS.thisTicket._id,
        data: data,
        dataType: 'json',
        success: function(d){
            console.log(d);
            
            if(!bagBeacon){
                hypeDocument.goToTimeInTimelineNamed(0.05, 'bagOptions')
                hypeDocument.continueTimelineNamed('bagOptions', hypeDocument.kDirectionReverse)
            }
           
            GLOBALS.thisTicket.luggage = d.luggage;
            //loadTicket(GLOBALS.thisTicket);
            
        },
    });//end ajax call


}//end transfer points function


function addfood(foodID){

    if(foodID == null){
        foodID = GLOBALS.food;
    }


    var data = { food: 'Pasta', paid: true, id:1 };
    if(foodID == 'food1'){
        data.food = 'Beef Stew'
        data.paid = false;
        data.id = 1;
    }else if (foodID == 'food2'){
        data.food = 'Chicken Pasta'
        data.paid = true;
        data.id = 2;
    }else if (foodID == 'food3'){
        data.food = 'Veggie'
        data.paid = false;
        data.id = 3;
    }else if (foodID == 'food4'){
        data.food = 'Sushi'
        data.paid = true;   
        data.id = 4;
    }else if (foodID == 'food5'){
        data.food = 'Steak'
        data.paid = true;       
        data.id = 5;
    }else if (foodID == 'food6'){
        data.food = 'Tuna'
        data.paid = true;     
        data.id = 6;
    }

    if(data.paid){
        data.socketid = socket.id;
        data.msgType = 'food';
    }

    $.ajax({
        type: 'POST',
        url: URL + 'food/flyer/' + GLOBALS.flyer._id +'/ticket/' + GLOBALS.thisTicket._id,
        data: data,
        dataType: 'json',
        success: function(d){
            console.log(d);
            $('#foodCheck' + data.id).show();
            //hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('addBags', hypeDocument.kDirectionReverse);
            GLOBALS.flyer = d;
            //loadTicket(GLOBALS.thisTicket);
            
        },
    });//end ajax call


}//end transfer points function

function transferPoints(data){
    
    $('#qrAction').html('Gift Coins');
    $('#sendToRecipient').html(data.flyer);
    $('#sendToID').html(data.id);

    $('#qrConfirmButton').html('Gift to ' + data.flyer);
    
    $('#qrConfirmButton').removeAttr('disabled'); //enable button push

    $('#qrConfirmButton').click({input: data}, (event)=>{
        $('#qrConfirmButton').unbind("click");
        $('#qrConfirmButton').attr('disabled', 'disabled');//disable button push

        var data = {"to": event.data.input.id,  "amount": $('#sendToAmount').val() };
        
        $.ajax({ //send Coins transaction
            type: "POST",
            url: URL + 'points/transfer/' + GLOBALS.flyer._id,
            data: data,
            dataType: 'json',
            success: function(d){
                console.log(d);
                hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('giftCoins', hypeDocument.kDirectionReverse);
                closePay();
            },
        });//end ajax call
        
    })//end qr onclick

}//end transfer points function



function openPay(){
    isPayOpen = false;
    //hypeDocument.startTimelineNamed('showPay', hypeDocument.kDirectionForward);
    hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('showPay', hypeDocument.kDirectionForward);

}

function closePay(){
    video.srcObject.getTracks()[0].stop(); //stop using the camera
    isPayOpen = true;
    isVideoSetUp = false;

    //hypeDocument.startTimelineNamed('showPay', hypeDocument.kDirectionReverse);
    hypeDocument.getSymbolInstanceById('payBar').startTimelineNamed('showPay', hypeDocument.kDirectionReverse);
}

function setTestQr(code){
    var qrText = {};
    
    if(code == 1){
        qrText.type = 'bagcheck';
        qrText.id = '1';
        qrText = JSON.stringify(qrText);
    
    }else if (code == 2){
        qrText.type = 'flyer';


    }

    $('#qrTests').qrcode({
        width: 200, height: 200,
		render	: "canvas",
		text	: qrText
    });


}


function handleCheckboxChange(box){
    if($('#luggageTracking').prop('checked')){
        $('#baggageTrackCoins').show();
    }else{
        $('#baggageTrackCoins').hide();
    }
}//end handle baggage change






var socket = io('https://blockchain.sapnait.com:40101/');
		
socket.on('connect', function () { 
    console.log('connected', socket.id);
});

socket.on('disconnect', function () { 
    console.log('disconnected');
});

socket.on('newTicket', function (data) { 
    if(data.message.step == 0){
        for(i=1; i <= 7; i++){
            $('#newTicketStep' + i).css('background-color', '#D3CDAF');
        }
    }else{
        $('#newTicketStep' + data.message.step).css('background-color', '#bbd3af');
    }


})


socket.on('tktTo', function (data) { 
    if(data.message.step == 0){
        hypeDocument.startTimelineNamed('toTicketSteps', hypeDocument.kDirectionForward)
    }else if(data.message.complete == true){
        $('#orderReturnTIcketButton').prop('disabled', false)
        $('#orderReturnTIcketButton').click(()=>{
            hypeDocument.continueTimelineNamed('toTicketSteps', hypeDocument.kDirectionForward)
        })

    }else{
        $('#toTicket' + data.message.step).css('background-color', '#16a085');
    }

})

socket.on('tktFrom', function (data) { 
    //console.log(data);
    if(data.message.step == 0){
        //hypeDocument.continueTimelineNamed('toTicketSteps', hypeDocument.kDirectionForward)
    }else if(data.message.complete == true){
        $('#orderHomeTIcketButton')
        .prop('disabled', false)
        .click(()=>{
            loadUser(GLOBALS.flyer);
        })

    }else{
        $('#fromTicket' + data.message.step).css('background-color', '#16a085');
    }
})


socket.on('newUser', function (data) { 
    console.log(data);
    if(data.message.step == 0){
        for(i=1; i <= 4; i++){
            $('#newUserStep' + i).css('background-color', '#D3CDAF');
        }

    }else{
        $('#newUserStep' + data.message.step).css('background-color', '#bbd3af');
    }

    if(data.message.complete == true){
        /*
        $('#newUserButton')
        .prop('disabled', false)
        .click(()=>{
            loadUser(GLOBALS.flyer);
        })
        */
    }

})


socket.on('bagBeacon', function (data) { 
    console.log(data);
    if(data.message.step == 0){
        //$('#bagBeaconButton').prop('disabled', true)
        //$('#bagOptionsHeader').html('Checking Your Luggage In<br>With Bag Tracking');
        for(i=1; i <= 4; i++){
            $('#bagStep' + i).css('background-color', '#D3CDAF');
        }

        hypeDocument.continueTimelineNamed('bagOptions', hypeDocument.kDirectionForward)
    }else{
        $('#bagStep' + data.message.step).css('background-color', '#bbd3af');
    }

    if(data.message.complete == true){
        /*
        $('#bagBeaconButton')
        .prop('disabled', false)
        .click(()=>{
            hypeDocument.goToTimeInTimelineNamed(0.005, 'bagOptions')
            hypeDocument.continueTimelineNamed('bagOptions', hypeDocument.kDirectionReverse)

        })
        */
    }

})


socket.on('food', function (data) { 

    console.log(data);
    if(data.message.step == 0){
       //$('#bagBeaconButton').prop('disabled', true)
        //$('#bagOptionsHeader').html('Placing Your Food Order');
        for(i=1; i <= 4; i++){
            //$('#bagStep' + i).css('background-color', '#D3CDAF');
            $('#foodStep' + i).css('background-color', '#D3CDAF');
        }
        hypeDocument.goToTimeInTimelineNamed(1, 'bagOptions')

    }else{
        //$('#bagStep' + data.message.step).css('background-color', '#bbd3af');
        $('#foodStep' + data.message.step).css('background-color', '#bbd3af');
    }

    if(data.message.complete == true){
        /*
        $('#bagBeaconButton')
        .prop('disabled', false)
        .click(()=>{
            hypeDocument.goToTimeInTimelineNamed(0.05, 'bagOptions')
            hypeDocument.continueTimelineNamed('bagOptions', hypeDocument.kDirectionReverse)

        })
        */
    }
})


socket.on('topup', function (data) { 
    //console.log(data);

    if(data.message.step == 0){
        resetSteps();
        $('#topupButton').prop('disabled', true);
        hypeDocument.continueTimelineNamed('topUpSteps', hypeDocument.kDirectionForward)
    }else{
        $('#topup' + data.message.step).css('background-color', '#16a085');
    }

    if(data.message.complete == true){
        $('#topupButton')
        .prop('disabled', false)
        .click(()=>{
            hypeDocument.continueTimelineNamed('topUpSteps', hypeDocument.kDirectionReverse)
        })
    }

})

function resetSteps(){
    $('.step').css('background-color', '#D3CDAF');

}



