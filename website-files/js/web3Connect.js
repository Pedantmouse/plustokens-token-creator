// JavaScript Document
var activeAccount
var account;
var sendok;
var detectedProvider;
var entriesElem = document.getElementById("entries");
var upForGrabsElem = document.getElementById("upForGrabs");
var winningChanceElem = document.getElementById("winningChance");
var isFundingElem = document.getElementById("isStillFunding");
var timeLeftElem = document.getElementById("drawTimeLeft");
var timeEndElem = document.getElementById("drawEndTime");
var lastWinningsElem = document.getElementById("lastWinnings");
var lastWinnerElem = document.getElementById("lastWinner");
var bigWinElem = document.getElementById("biggestWinnings");
var hasEnteredElem = document.getElementById("hasEntered");
var previousDrawsElem = document.getElementById("previousDraws");
var ownerAddressElem = document.getElementById("ownerAddress");

var isDeviceMobile = function() {
	//check for mobile or desktop
	if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
	{ //mobile
		return true;
	}
	else
	{//desktop
		return false;
	}
}

var checkProvider = function() {
	if (web3.currentProvider.isMetaMask === true) 
	{
	    return "metamask";	
	}
	else if(typeof(mist) !== "undefined") {
		return "mist";
	}
	else if(web3.currentProvider.isTrust === true) 
	{
	    return "trust";
	}
	else if(typeof window.__CIPHER__ !== 'undefined')
	{
		return "cipher";
	}
	else if(typeof window.SOFA !== 'undefined')
	{
		return "toshi";
	}
	else 
	{
		//errorMessage("Error detecting provider");
		return "";
	}
}
///////////////////////////////////////////////////////////////////////
if(typeof web3 !== "undefined") 
{
	// Modern dapp browsers...
    if (window.ethereum) {
        web3 = new Web3(ethereum);
		console.log("Window Ethereum");
        try {
            // Request account access if needed
            ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3 = Web3(window.web3.currentProvider);
		console.log(web3.currentProvider);
        // Accounts always exposed
    }
    // Non-dapp browsers...
    else {
      //non detected;
    }
	console.log("Web3 Found!");
	console.log(web3.version);
	CheckAccount();
	CheckNetwork();
	ShowUserAddress();
}
else 
{//no web3 provider found
	console.log("Web3 Not Found");
}

function CheckAccount() {
	//get available accounts
	web3.eth.getAccounts(function(err, accounts){
	    if (err !== null)
	    {
	    	errorMessage("An error occurred: "+ err);
	    } 
	    else if (accounts.length == 0)//is user logged in?
	    {
			var errorString;
		    errorString = "Login to your wallet and allow permissions to interact with the smart-contract";
			errorMessage(errorString);
	    }
	    else
	    {
	       account = accounts[0];
		   web3.eth.defaultAccount = account;
	    }
	});	
}
//////////
function CheckNetwork() {
	web3.eth.net.getId().then(netId => {
		switch (netId) {
	 		case 1:
	 		console.log('Connected to Mainnet');
			sendok = true;
			return true;
	 		break
	 		case 2:
	 		errorMessage("You are using the deprecated Morden testnet, please change to MainNet");
	 		console.log('Connected to deprecated Morden test network.');
			return false;
	 		break
	 		case 3:
	 		errorMessage("You are using the Ropsten testnet, please change to MainNet");
	 		console.log('Connected to Ropsten test network.');
			return false;
	 		break
	 		case 4:
			errorMessage("You are using the Rinkeby testnet, please change to MainNet");
	 		console.log('Connected to Rinkeby test network.');
			return false;
	    	break
	 		case 42:
	 		errorMessage("You are using the Kovan testnet, please change to MainNet");
	 		console.log('This is the Kovan test network.');
			return false;
	 		break
	 		default:
	 		errorMessage("You are using an unknown network, please change to MainNet");
	 		console.log('This is an unknown network.');
			return false;
	  	}
	});
}

function errorMessage(text) {
   var fc = document.getElementById("formCont");
   fc.style.color=("red");
   fc.style.letterSpacing=(1);
   fc.style.textAlign = ("center");
   fc.style.fontWeight = (700);
   fc.innerHTML='<i class="fa fa-2x fa-exclamation-circle exclamText"></i><br/>' + text;
}

function ShowUserAddress(){
	var elem = document.getElementById("userAddress");
	if(web3 != "undefined"){
	 web3.eth.getAccounts(function(err, accounts){
	 if (accounts.length != 0)
	 	{
	 		elem.textContent = accounts[0];
	 		console.log('Detected Account - ' + accounts[0].toString());
	 	}
	 });
	}
}