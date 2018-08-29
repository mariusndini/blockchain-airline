var stellerURL = 'https://horizon-testnet.stellar.org/';

renderjson.set_show_to_level(1);
renderjson.set_icons('+', '-');

function getUserAccount(){
    $.ajax({
        type: "GET",
        url: stellerURL + 'accounts/' + GLOBALS.flyer.reward.public,
        success: function(data){
            console.log(data);

            $('#userStellerJSON').html( renderjson(data) );
            $('#userMongoJSON').html( renderjson(GLOBALS.flyer) );
            getDashboardTicket();
        },
    });
}//end get flyer


function getUserTransactionsDashboard(){
    $.ajax({
        type: "GET",
        url: stellerURL + 'accounts/' + GLOBALS.flyer.reward.public +'/transactions',
        success: function(data){
            $('#userStellerJSON').html( renderjson(data._embedded.records) );

        }
    })

}

function getUserTransactions(){
    $.ajax({
        type: "GET",
        url: stellerURL + 'accounts/' + GLOBALS.flyer.reward.public +'/transactions',
        success: function(data){
			console.log(data)
            var cnt = 0;
            
            var nextItem = $('#transaction0').clone();
            $('#transaction0').hide();
            nextItem.attr('id','transaction'+cnt);

            $('#transactionBody').html(' ');
            $('#transactionBody').append(nextItem);

            for(i = data._embedded.records.length; i > 0; i--){
                if(data._embedded.records[i] !== undefined){
                    var hash = data._embedded.records[i].hash;
                    var memo = data._embedded.records[i].memo;

                    nextItem = $('#transaction0').clone();
                    nextItem.attr('id','transaction' + cnt );

                    nextItem.css({top: (55 *  cnt) });
                    nextItem.find('#txMemo').html( memo );
                    nextItem.find('#txHash').html( hash );

                    nextItem.find('#flyerAddSign').hide();

                    nextItem.click({id:hash, txt: memo},( event )=>{
                        getTransactionOperation(event.data.id, event.data.txt);
                        hypeDocument.startTimelineNamed('txData', hypeDocument.kDirectionForward)

                    })
					
                    nextItem.insertAfter( $('#transaction0') );
                    cnt++
                }



            }
        },
    });
}//end get flyer


function getTransactionOperation(hash, memo){

    $.ajax({
        type: "GET",
        url: stellerURL + 'transactions/' + hash + '/operations',
        success: function(data){
            var record = data._embedded.records[0];
            var amount = record.amount;
            var createDate = record.created_at;
            var type = record.type;

            $('#txClickDate').html(createDate);
            $('#txClickMemo').html(memo);
            $('#txClickAmount').html(amount);
            $('#txInfoHash').html(hash);

            //get accounting data for this record
            $.ajax({
                type: "GET",
                url: record._links.effects.href,
                success: function(data){
                    console.log(data._embedded.records);
                    var debitTable = $('#debitTable tbody');
                    var creditTable = $('#creditTable tbody');

                    debitTable.html('<tr><td>Account</td><td align="right">Debit</td></tr>');
                    creditTable.html('<tr><td>Account</td><td align="right">Credit</td></tr>');

                    for(i=0; i < data._embedded.records.length; i++){
                        
                        if(data._embedded.records[i].type == 'account_credited'){
                            var tr = '<tr>';
                            tr += '<td colspan="2">' + JSON.stringify(data._embedded.records[i].account).substring(1, 25)+'...' + '</td>';
                            tr += '</tr>';

                            tr += '<tr>';
                            tr += '<td colspan="2" align="right">' + data._embedded.records[i].amount + '</td>';
                            tr += '</tr>';

                            creditTable.append(tr);

                        }else if(data._embedded.records[i].type == 'account_debited'){
                            var tr = '<tr>';
                            tr += '<td colspan="2">' + JSON.stringify(data._embedded.records[i].account).substring(1, 25)+'...' + '</td>';
                            tr += '</tr>';

                            tr += '<tr>';
                            tr += '<td colspan="2" align="right">' + data._embedded.records[i].amount + '</td>';
                            tr += '</tr>';
                            debitTable.append(tr);

                        }
                        
                        

                    }



                },
            });
            

        },
    });


}



