var express = require('express');
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
var	mongoose = require('mongoose');
var flyerModel = require('../mongo/flyer');

//STELLER LIBS
var request = require('request');
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

let stellerPub = 'GDW2UJBKMXWXCY37NJN2A6BDYOXZIHA7UBSF2X4OU5CYWH7OELQLTOHE';
let stellerSec = 'SCH2PQBPISHZYJ6DBCCYHKNU3FGFKURHGIBSTN2TFZIIH75W7JMVL35Z';
 
//HYPERLEGER
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let NS = 'bc.air';
var admin = 'webAdminAir@airline';


 /*   -------   end dependencies --------------*/
/**********************************************/


// CONNECT TO MONGO DB
mongo.Promise = global.Promise; // for some BS reason I believe
mongoose.connect("mongodb://localhost:27017/airline", { useNewUrlParser: true } );

mongoose.connection.once('open', function(){
	console.log('Connected to MONGO');
}).on('error', function(error){
	console.log(error);
})





/*
GET - intro to APIs
*/
router.get('/apiDoc', function(req, res) {
	res.status(200).json([
		{"GET /flyer":" get all flyers"},
		{"GET /flyer/:id ":" get flyer by ID"},
		{"POST /flyer POST":" create flyer in db"},
		{"POST /ticket/:id ":" create new ticket in Blockchain and tie to flyer", payload: {"to":"cgn", "from":"jfk", "date":"2018-08-30T22:49:07.169Z"} },
		
		{"POST /luggage/:id/ticket/:ticket":" - add luggage to trip", payload: {"bag":{"w":1, "h":2, "l":3, "weight":4} }  },

	])

});


/**
 * https://blockchain.sapnait.com:40101/flyer/5b633d530981fc3685aa7cdb
 * 
 * Return a flyer from the MONGO db
 *
 * @returns {Flyer} from MONGO
 *{
    "reward": {
        "public": "GBBMYR6WJM7H5ZQV5OWU2ACXN5N5WTMDSWOVX7V6O5VVSZYPR5PBEWQV",
        "private": "SC2RGRQ2KOSBSVAQV3JFYQ6N4YQBC7XRJJHFG4XHUMHRPX76RVPGEZUR",
        "balance": "10000.0000000"
    },
    "_id": "5b6aebc41579305157bf34fa",
    "name": "Dilbert Flyer",
    "address": "123 Address st",
    "trips": []
  }
 *
 */
router.get('/flyer', function(req, res) {
	return flyerModel.find({})
	.then((f)=>{
		res.status(200).json(f);
	});

});





/**
 * https://blockchain.sapnait.com:40101/flyer/5b633d530981fc3685aa7cdb
 * 
 * Return a specific flyer from the MONGO db
 *
 * @returns {Flyer} from MONGO
 *{
    "reward": {
        "public": "GBBMYR6WJM7H5ZQV5OWU2ACXN5N5WTMDSWOVX7V6O5VVSZYPR5PBEWQV",
        "private": "SC2RGRQ2KOSBSVAQV3JFYQ6N4YQBC7XRJJHFG4XHUMHRPX76RVPGEZUR",
        "balance": "10000.0000000"
    },
    "_id": "5b6aebc41579305157bf34fa",
    "name": "Dilbert Flyer",
    "address": "123 Address st",
    "trips": []
  }
 *
 */
router.get('/flyer/:id', function(req, res) {
	return flyerModel.findById({_id: ObjectId(req.param('id'))})
	.then((f)=>{
		res.status(200).json(f);
	});


});



/**
 * https://blockchain.sapnait.com:40101/flyer
 *
 * Return a newly created flyer.
 * Flyer is also given a new Steller crypto account funded by the faucet (Friend) bot
 * init is 10k coins
 *
 * @returns {Flyer} from MONGO and steller network
 *{
    "reward": {
        "public": "GBBMYR6WJM7H5ZQV5OWU2ACXN5N5WTMDSWOVX7V6O5VVSZYPR5PBEWQV",
        "private": "SC2RGRQ2KOSBSVAQV3JFYQ6N4YQBC7XRJJHFG4XHUMHRPX76RVPGEZUR",
        "balance": "10000.0000000"
    },
    "_id": "5b6aebc41579305157bf34fa",
    "name": "Dilbert Flyer",
    "address": "123 Address st",
    "trips": []
  }
 *
 */
router.post('/flyer', function(req, res) {
	var pair = StellarSdk.Keypair.random();
	console.log('New Account: ', pair.publicKey(), pair.secret());

	request.get({
		url: 'https://friendbot.stellar.org',
		qs: { addr: pair.publicKey() },
		json: true
	}, 
	function(error, response, body) {
		var f = new flyerModel({name: req.body.name, address: req.body.address, reward: {public: pair.publicKey(), private: pair.secret(), balance: 100 } });
		
		return server.loadAccount(pair.publicKey())
		.then((account)=>{
			f.reward.balance = account.balances[0].balance;
			return;
		})
		.then(()=>{
			f.save();
		})
		.then(()=>{
			res.status(200).json(f);
		})

	});

	
});


/*
Delete -> Not set yet
probably not needed. 
maybe delete later. 


*/
router.delete('/flyer/:id', function(req, res) {
	res.status(200).json({ d : req.param('id') + ' - Will be deleted' });

});


/**
 * https://blockchain.sapnait.com:40101/ticket/5b699642982fc87199a119dd
 * 
 * Create a new ticket and assign to flyer
 * Ticket is created in Hyperledger and ticket number is saved to mongo tied to Flyer
 * Buying ticket will spend ticket value in reward points from Steller network
 *
 * @returns {Flyer} from MONGO and steller network
 * @param {JSON} JSON below - {"to":"jfk", "from":"tia", "date":"2018-08-30T22:49:07.169Z"}
 * 		takes to, from and flight date to insert into Hyperledger.
 *
 */
router.post('/ticket/:id', function(req, res) {
	var client;
	var flyer;
	var db;
	let businessNetworkConnection = new BusinessNetworkConnection();
	var factory;
	let ticket;
	var amount = 1200; // needs to be updated from front end - not eveyr ticket is 1200
	var sourceKeypair;
	var stellerTx;

	return flyerModel.findById({_id: ObjectId(req.param('id'))})
	.then((f)=>{
		flyer = f;
		return businessNetworkConnection.connect(admin);

	}).then((hyperledger)=>{
		factory = businessNetworkConnection.getBusinessNetwork().getFactory();
		ticket = factory.newResource(NS, 'ticket', 'T' + Date.now());
		ticket.flyer = flyer.name;
		ticket.to = req.body.to;
		ticket.from = req.body.from;
		ticket.gate = 'E11';

		ticket.time = new Date(req.body.date);
		ticket.airline = 'Lufthansa';

		return businessNetworkConnection.getAssetRegistry(NS + '.ticket');

	})
	.then((ar)=>{
		var trip = {}
		trip.ticket = ticket.id
		flyer.trips.push(trip);

		return ar.add(ticket);

	})
	//Make the sale at this point
	.then(()=>{
		//take coins away from reward program
		sourceKeypair = StellarSdk.Keypair.fromSecret( flyer.reward.private );
		var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
		return server.loadAccount(flyer.reward.public);

	})
	.then((account)=>{
		var transaction = new StellarSdk.TransactionBuilder(account)
			.addOperation(StellarSdk.Operation.payment({
			destination: stellerPub,
			asset: StellarSdk.Asset.native(),
			amount: amount.toString(),
		}))
		.addMemo(StellarSdk.Memo.text('Ticket Purchase TX'))
		.build();

		transaction.sign(sourceKeypair);
		transaction.toEnvelope().toXDR('base64');

		return server.submitTransaction(transaction);
			
	})
	.then((tx)=>{
		console.log(tx);
		stellerTx = tx;
		return server.loadAccount(flyer.reward.public)
	})
	.then((account)=>{
		flyer.reward.balance = account.balances[0].balance;
		console.log('Purchased Ticket');

	})
	.then(()=>{
		flyer.save();
	}).then(()=>{
		flyer.tx = stellerTx;
		res.status(200).json({f:flyer, tx:stellerTx});

	})
	.catch(function(e) {
		console.error(e);
		res.status(500).json(e);
	});

});



/**
 * https://blockchain.sapnait.com:40101/ticket/T1533236709184
 * GET new ticket and assign to flyer
 * Ticket is created in Hyperledger and ticket number is saved to mongo tied to Flyer
 * Buying ticket will spend ticket value in reward points from Steller network
 *
 * @returns {Ticket} from Hyperledger (& Mongo) 
 * {
    "$class": "bc.air.ticket",
    "id": "T1533236709184",
    "flyer": "test",
    "to": "jfk",
    "from": "tia",
    "gate": "E11",
    "time": "2018-08-30T22:49:07.169Z",
    "airline": "Lufthansa",
    "tripComplete": false
    }
 *
 */
router.get('/ticket/:id', function(req, res) {
	let businessNetworkConnection = new BusinessNetworkConnection();
	var ser;

	return businessNetworkConnection.connect(admin)
	.then((hyperledger)=>{
		ser = hyperledger.getSerializer();
		return businessNetworkConnection.getAssetRegistry(NS + '.ticket');

	})
	.then((ar)=>{
		return ar.get( req.param('id') );

	})
	.then((ticket)=>{
		res.status(200).json( ser.toJSON(ticket) );

	})


})







/**
 * https://blockchain.sapnait.com:40101/luggage/flyer/5b634374e3d93e36e35022bf/ticket/5b699ca5b14f222794fe2e4b

 * Add luggage to flyers ticket
 * JSON added directly to MONGO (nothing readlly edited - ease of access )
 *
 * @returns {Flyer} 
	{"bag":{"w":1, "h":2, "l":3, "weight":4, "type":"0"} } 
 * where type 0 = luggage    type 1 = carryon
 */
router.post('/luggage/flyer/:id/ticket/:ticket', function(req, res) {
	//var db;
	//console.log('ID', req.param('id'), 'ticket', ObjectId(req.param('ticket'))  );

	return flyerModel.findById({_id: ObjectId( req.param('id') )})
	.then((flyer)=>{
		flyer.trips.id( req.param('ticket') ).luggage.push( req.body.bag );
		return flyer.save();

	})
	.then((flyer)=>{
		res.status(200).json({flyer})

	});



});




/**
 * https://blockchain.sapnait.com:40101/points/5b699642982fc87199a119dd
 
 * TOP-UP user account from Friend Bot when account points are low
 * Requests points/crypto from Steller Friend Bot
 *
 * @returns {Flyer} updated MONGO balance
 */
router.post('/points/:id', function(req, res) {
	var pair = StellarSdk.Keypair.random();
	//console.log(pair.publicKey(), pair.secret());
	var flyer; 

	request.get({
		url: 'https://friendbot.stellar.org',
		qs: { addr: pair.publicKey() },
		json: true
	}, 
	function(error, response, body) {
		if (error || response.statusCode !== 200) {
			console.error('ERROR!', error || body);

		}else {
			console.log( new Date(), '1');
			return flyerModel.findById({_id: ObjectId(req.param('id'))})
			.then((f)=>{
				flyer = f;
				return server.loadAccount(pair.publicKey());
			})
			.then((account)=>{
				console.log( new Date(), '2');

				var transaction = new StellarSdk.TransactionBuilder(account)
					.addOperation(StellarSdk.Operation.payment({
					destination: flyer.reward.public,
					asset: StellarSdk.Asset.native(),
					amount: (account.balances[0].balance - (account.balances[0].balance * .2) ).toString() //account.balances[0].balance.toString(),
				}))
				.addMemo(StellarSdk.Memo.text('Top-Up From Faucet'))
				.build();

				transaction.sign(pair);
				transaction.toEnvelope().toXDR('base64');

				return server.submitTransaction(transaction);

			})
			.then((tx)=>{
				console.log( new Date(), '3');

				return server.loadAccount(flyer.reward.public);
			})
			.then((flyerAccount)=>{
				console.log( new Date(), '4');
				flyer.reward.balance = flyerAccount.balances[0].balance;
				return flyer.save();
			})
			.then(()=>{
				console.log( new Date(), '5');
				res.status(200).json(flyer);

			})

		}//end else

	});//end get request

})




/**
 * https://blockchain.sapnait.com:40101/points/transfer/5b699642982fc87199a119dd
 
 * Transfer points from one user account to another
 * @returns {Flyer} updated MONGO balance for both accounts
 * {"to":"5b6aebc41579305157bf34fa",  "amount":200}


 */
router.post('/points/transfer/:id', function(req, res) {
	var keyPair; 
	var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
	
	var fromAccount;
	var toAccount;

	return flyerModel.findById({_id: ObjectId(req.param('id'))})
	.then((f)=>{
		fromAccount = f;
		return flyerModel.findById({_id: ObjectId(req.body.to)})
	})
	.then((t)=>{
		toAccount = t;
		//console.log(fromAccount);
		//console.log(toAccount);
		return server.loadAccount( fromAccount.reward.public );
	})
	.then((account)=>{
		keyPair = StellarSdk.Keypair.fromSecret( fromAccount.reward.private );

		var transaction = new StellarSdk.TransactionBuilder(account)
			.addOperation(StellarSdk.Operation.payment({
				destination: toAccount.reward.public,
				asset: StellarSdk.Asset.native(),
				amount: ( req.body.amount ).toString() //account.balances[0].balance.toString(),
			}))
			.addMemo(StellarSdk.Memo.text('Point Transfer --> Friend'))
			.build();

		transaction.sign(keyPair);
		transaction.toEnvelope().toXDR('base64');

		return server.submitTransaction(transaction);

	})
	.then(( )=>{
		return server.loadAccount(toAccount.reward.public);

	})
	.then((tAccount)=>{
		toAccount.reward.balance = tAccount.balances[0].balance;
		return toAccount.save();
	})
	.then(( )=>{
		return server.loadAccount(fromAccount.reward.public);

	})
	.then((fAccount)=>{
		fromAccount.reward.balance = fAccount.balances[0].balance;
		return fromAccount.save();
	})

	.then((fAccount)=>{
		res.status(200).json(fAccount);
	})	
	




})

module.exports = router;














