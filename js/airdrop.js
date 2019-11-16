// JavaScript Document
var airdropContract;
var round1ContractAddress = "0x429A7e2Ec861A845d23fF7D1bC8913E836933936";
//10 participants in round1 / 880.0 tokens dropped
var round2ContractAddress = "0x2d6feb99021bc36f7e07e0571fdcef2670cd70e4";
var round3ContractAddress = "";
var airdropContractAddress = round2ContractAddress;
var airdropShown = false;
var airdropInfoShown = false;
var eligible = false;



var url = window.location.href;
var hash = url.substring(url.indexOf("#")+1);
if(hash == "airdropArea"){
	if(airdropShown == false){
		ToggleAirdrop();
	}
}

function ToggleAirdrop() {
	var toggleChev = document.getElementById("chevronIcon");
	var toggleDrop = document.getElementById("toggleAirdrop");
	var airdropPopOut = document.getElementById("airdropPopOut");
	if(!airdropShown) {
		toggleChev.classList.remove("fa-chevron-right");
		toggleChev.classList.add("fa-chevron-left");
		airdropPopOut.style.visibility = "visible";
		airdropPopOut.style.display = "block";
		airdropPopOut.classList.add("slideInRightAni");
		airdropShown = true;
	}
	else {
		airdropPopOut.classList.remove("slideInRightAni");
		toggleChev.classList.remove("fa-chevron-left");
		toggleChev.classList.add("fa-chevron-right");
		airdropPopOut.style.visibility = "collapse";
		airdropPopOut.style.display = "none";
		airdropShown = false;
	}
}

function AirdropInfo(){
	var elem = document.getElementById("airdropMoreInfo");
	elem.style.visibility = "visible";
	if(!airdropInfoShown) {
		elem.style.visibility = "visible";
		elem.style.display = "block";
		airdropInfoShown = true;
	}
	else {
		elem.style.visibility = "collapse";
		elem.style.display = "none";
		airdropInfoShown = false;
	}
}

ShowAirdropContractAddress(round1ContractAddress);
ShowAirdropContractAddress(round2ContractAddress);

function ShowAirdropContractAddress(adrs){
	var elem;
	if(adrs == round1ContractAddress){
		elem = document.getElementById("round1");
	}
	else if(adrs == round2ContractAddress){
		elem = document.getElementById("round2");
	}
	elem.innerHTML = adrs;
}

	
///////////////CHECK NETWORK/////////////
function NetworkValidationAirdrop()
{
	CheckAccount();
	CheckNetwork();
	if(sendok == true && eligible == true) {
		SubAirdrop(account);
	}
	else {
		document.getElementById("enterAirdropForm").innerHTML = "Something went wrong, refresh and try again!";
	}
}

//MAKE TRANSACTION TO SUB TO AIRDROP//////////////////
 function SubAirdrop(account){
	 //hide draw btn
	 document.getElementById("enterAirdropBtn").remove();
	 //show loader
	 $("#loader").show();
	 $("#eventNotification").fadeIn();
	 if(isDeviceMobile()){
		 $("#eventNotification").html('<h4><i class="fa fa-2x fa-handshake"></i>&nbsp;Confirm the wallet notification to complete airdrop claim.</h4>');
	 } else {
		 $("#eventNotification").html('<h4><i class="fa fa-2x fa-handshake"></i>&nbsp;Confirm the Metamask notification to complete airdrop claim.</h4>');
	 }
	 var amount = 0;
	 airdropContract.methods.newSubscriber().send({from:account, value:amount}, function(error, transactionHash){
		 if (!error) {
			 $("#loader").hide();
			$("#eventNotification").fadeIn();
     	   $("#eventNotification").html('<h3>Awesome!</h3><p>Your <i class="fab fa-ethereum"></i> Address : ' + account + ' just claimed thier <b>TBL</b> tokens! <i class="fa fa-ticket-alt animated swing infinite"></i></p><p>You are now a TBL token holder, Congratulations! <i class="fa fa-thumbs-up animated tada" style="color:#2dc997;"></i></p><p><a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + ' - This is your TX hash.<br/>Click to see your transaction on EtherScan.io and wait for the TX to be mined!</a></p>');
			 setTimeout(function(){ $("#eventNotification").fadeOut(); }, 7000);
	 	} else {
			 $("#loader").hide();
			$("#eventNotification").fadeIn();
     	   $("#eventNotification").html('<h3 style="color:red;">Notice!</h3><p><i class="fa fa-thumbs-down"></i> It looks like something went wrong, don&apos;t worry, you have not yet claimed your tokens and your transaction will not be mined. You are welcome to <a href="#" onclick="window.location.reload(true);">refresh the page</a> and try again!<p>');
			 setTimeout(function(){ $("#eventNotification").fadeOut(); }, 7000);
	 	}
	 });
 }

var subCount;
var tokensPerSub;
var tblBalance;
if(typeof web3 !== "undefined") {
	airdropContract = new web3.eth.Contract([
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "msg",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "TokenDropped",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "ethRefund",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_receiverAddress",
				"type": "address"
			}
		],
		"name": "manualTokenDrop",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "newSubscriber",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "sweepEth",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "sweepTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "msg",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "subscriber",
				"type": "address"
			}
		],
		"name": "NewSubscriber",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "ContractMsg",
		"type": "event"
	},
	{
		"inputs": [
			{
				"name": "_airdropTokenAmount",
				"type": "uint256"
			},
			{
				"name": "_airdropRuntimeInSeconds",
				"type": "uint256"
			},
			{
				"name": "_maxAirdropSubscribers",
				"type": "uint256"
			},
			{
				"name": "_tokenContractAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractEthBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractTokenBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAirdropRuntime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNowTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeLeft",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimePassed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxSubscribers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myTokenBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfSubscribers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addressToQuery",
				"type": "address"
			}
		],
		"name": "queryERC20Balance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenContract",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], airdropContractAddress);
	setTimeout(function(){
		QueryAddressBalance();
		CallAirdropTimeLeft();
	},1500);
	setTimeout(function(){
		CallContractTokenBalance();
	},2000);
	setTimeout(function(){
		CallSubscriberCount();
	},2500);
	setTimeout(function(){
		CallAirdropAmount();
	},3000);
	setTimeout(function(){
		var tokensDroppedElem = document.getElementById("tokensDropped");
		var tokensDropped = subCount * tokensPerSub;
		tokensDroppedElem.innerHTML = ((parseInt(tokensDropped)+8800) / 10).toFixed(1);
		DisplayAirdropTimeLeft();
	},3500);
}
else{
	//no web3 found
	//no web3 compatible browser/provider found
	if(isDeviceMobile())
	{
		document.getElementById("enterAirdropForm").innerHTML = '<span style="color:red; text-shadow:0px 0px 1px lightgrey; position:relative; z-index:996"><strong>To interact with the blockchain, use a <a href="#compatibleBrowsers" target="_blank">compatible DApp browser.</a></strong></span>';
	}
	else
	{
		document.getElementById("enterAirdropForm").innerHTML = '<span style="color:red; text-shadow:0px 0px 1px lightgrey; position:relative; z-index:996"><strong>To interact with the blockchain, install and connect to <a href="https://metamask.io" target="_blank">MetaMask</a></strong></span>';
	}
}


// using the callback///////////////////
var airdropTimeLeftInSeconds;
var airdropCountdown = document.getElementById("airdropCountdown");
function CallAirdropTimeLeft(){
	airdropContract.methods.getTimeLeft().call({from:account}, function(error, result){	
		if(!error){
			airdropTimeLeftInSeconds = result;
		}
		else{
			console.log("Could not get timeLeft, trying again...");
			setTimeout(function(){
				CallAirdropTimeLeft();
			},1000);
		}
	});
}


function DisplayAirdropTimeLeft(){
    setInterval(function(){
		var timeLeftElem = document.getElementById("airdropCountdown");
		var seconds = (airdropTimeLeftInSeconds % 60).toFixed(0);
		var timeLeftInMinutes = airdropTimeLeftInSeconds / 60;
		var minutes = (timeLeftInMinutes % 60).toFixed(0);
		var timeLeftInHours = timeLeftInMinutes / 60;
		var hours = (timeLeftInHours % 24).toFixed(0);
		var timeLeftInDays = parseFloat(timeLeftInHours / 24);
		var days = Math.floor(timeLeftInDays);
		timeLeftElem.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
		timeLeftElem.style.fontSize = "1.2em";
		airdropTimeLeftInSeconds--;
		if(airdropTimeLeftInSeconds < 259200){
			airdropCountdown.style.color = "red";
		}
	},1000);
}

function QueryAddressBalance(){
	airdropContract.methods.myTokenBalance().call({from:account}, function(error, result){
		tblBalance = result;
		var elem = document.getElementById("yourTokens");
			if(!error){
				elem.innerHTML = (parseInt(result) / 10).toFixed(1);
				console.log("Your Blotto(TBL) balance - " + result);
				if(result > 0){
					document.getElementById("dropFooter").remove();
					document.getElementById("enterAirdropBtn").remove();
					document.getElementById("enterAirdropForm").innerHTML = '<i style="color:rebeccapurple;" class="fa fa-thumbs-up"></i><div style="color:white;">Looks like you already own some TBL, <b>awesome!</b><br/><h5>You are one of <b>10,000</b> future token holders!</h5> <span style="font-size:12px;"><i style="color:red;" class="fa fa-exclamation-circle"></i>&nbsp;Sorry, but you are not eligible for another airdrop!</span></div>';
				}else {
					console.log("You are eligible for airdrop!");
					eligible = true;
				}
			}
			else{
				document.getElementById("dropFooter").remove();
				document.getElementById("enterAirdropBtn").remove();
				document.getElementById("enterAirdropForm").insertAdjacentHTML('beforeend','Something went wrong!');
				elem.innerHTML = '<i style="color:red;" class="fa fa-exclamation-circle"></i>';
				console.log(error);
			}
		});
}

function CallContractTokenBalance(){
	airdropContract.methods.contractTokenBalance().call({from:account}, function(error, result){
		var elem = document.getElementById("tokensLeft");
		if(!error){
			elem.innerHTML = (parseInt(result) / 10).toFixed(1);
		}else{
			elem.innerHTML = '<i style="color:red;" class="fa fa-exclamation-circle"></i>';
			console.log(error);
		}
	});
}


function CallSubscriberCount(){
	airdropContract.methods.numberOfSubscribers().call({from:account}, function(error, result){
		subCount = result;
		var elem = document.getElementById("currentParticipants");
		if(!error){
			elem.innerHTML = parseInt(result) + 10;//plus 10 from round 1 participants
		}else{
			elem.innerHTML = '<i style="color:red;" class="fa fa-exclamation-circle"></i>';
			console.log(error);
		}
	});
}

function CallAirdropAmount(){
	airdropContract.methods.tokenAmount().call({from:account}, function(error, result){
		tokensPerSub = result;
		var elem = document.getElementById("tokensClaimable");
		if(!error){
			if(tblBalance == 0){
				elem.innerHTML =  (parseInt(result) / 10).toFixed(1);
			}
			else{
				elem.innerHTML = '<i style="color:red;" class="fa fa-exclamation-circle"></i>';
			}	
		}else{
			elem.innerHTML = '<i style="color:red;" class="fa fa-exclamation-circle"></i>';
			console.log(error);
		}
	});
}

///////////////////////////

//using the promise/////////////////////////(not using these with airdrop, just testing the difference)
function GetAirdropAmount(){
	return airdropContract.methods.tokenAmount().call();
}

function GetMyTokenBalance() {
	return airdropContract.methods.myTokenBalance().call({from:account});
}

function GetSubscriberCount(){
	return airdropContract.methods.numberOfSubscribers().call();
}

function GetMaxSubscribers(){
	return airdropContract.methods.maxSubscribers().call();
}

function GetTokensRemaining(){
	return airdropContract.methods.contractTokenBalance().call();
}

function GetAirdropTimeLeft(){
	return airdropContract.methods.getTimeLeft().call();
}

function GetAirdropEndTime(){
	return airdropContract.methods.getEndTime().call();
}

function GetAirdropNowTime(){
	return airdropContract.methods.getNowTime().call();
}
