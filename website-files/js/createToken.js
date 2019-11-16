// JavaScript Document
////////////
////////////////DEV DONATE///////////


var tokenName;
var tempSupply;
var tokenSupply;
var tokenSymbol;
var tokenDecimals;
var devPercentage;
var creatorContractAddress = "0x2E2270057f5010cBC29a025e9D3f32EC8AB37672";
var devDonateCont = document.getElementById("devDonateCont");
var devDonateInput = document.getElementById("devDonateInput");
var tokenForm = document.getElementById('tokenForm');
var formElements = tokenForm.elements;
var createTokenBtn = document.getElementById('createTokenBtn');

function ShowContractAddress(adrs){
	var elem = document.getElementById("contractAddress");
	elem.innerHTML = adrs;
}

function CheckDevDonate(checkBox){
	if(checkBox.checked){
		devDonateCont.style.visibility = "visible";
	}
	else{
		devDonateCont.style.visibility = "collapse";
		devDonateInput.value = 0;
	}
}

function digits_count(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
}


function ShowSupply(){
	    var tokenS = document.getElementById("tokenSupply").value;
		var tokenD = document.getElementById("tokenDecimals").value;
		if(tokenD > 0){
			if(tokenD > 18){
				tokenD = 18;
				document.getElementById("tokenDecimals").value = 18;
			}
			if(tokenD < 0){
				tokenD = 0;
				document.getElementById("tokenDecimals").value = 0;
			}
			else if (tokenS > 0){
				for(var i = 0; i < tokenD; i++){
				   tokenS /= 10;
				}
				tempSupply = tokenS;
				//document.getElementById("supplyInfo").innerHTML = 'You will receive '+tempSupply+ 'tokens.<br/>';
			}
		}
}
	
function CheckForm(){
		
		tokenDecimals = document.getElementById("tokenDecimals").value;
		if(tokenDecimals > 18){
				tokenDecmials = 18;
				document.getElementById("tokenDecimals").value = 18;
			}
		else if(tokenDecimals < 0){
				tokenDecimals = 0;
				document.getElementById("tokenDecimals").value = 0;
			}
		tokenSupply = document.getElementById("tokenSupply").value;
		tokenName = document.getElementById("tokenName").value;

		tokenSymbol = document.getElementById("tokenSymbol").value;
		devPercentage = document.getElementById("devDonateInput").value;
		if(devPercentage > 100){
			devPercentage = 100;
			document.getElementById("devDonateInput").value = 100;
		}
		else if(devPercentage < 0){
			devPercentage = 0;
			document.getElementById("devDonateInput").value = 0;
		}
		console.log(tokenSupply);
		console.log(tokenDecimals);
		console.log(tokenName);
		console.log(tokenSymbol);
		console.log(devPercentage);
	    if(tokenName == "" || tokenSupply <= 0 || tokenDecimals == "" || tokenSymbol == ""){
			///don't create
				 $("#eventNotification").fadeIn();
    			 $("#eventNotification").html('<h3 style="color:red;">Notice!</h3><p><i class="fa fa-thumbs-down"></i> Please check the form!<br/>Something went wrong, don&apos;t worry, no funds have been deducted and your token has not been created. This transaction will not be mined. Check the form and try again!</p>');
				 setTimeout(function(){ $("#eventNotification").fadeOut(); }, 5000);
		} else {
			createTokenBtn.disabled = true;
			for (var i = 0, len = formElements.length; i < len; ++i) {
				formElements[i].readOnly = true;
			}
			$("#eventNotification").fadeIn();
			$("#eventNotification").html('<h4><i class="fa fa-2x fa-handshake"></i>&nbsp;Confirm the wallet notification to complete token creation.</h4>');
			NetworkValidation();
		}
}
///////CHECK NETWORK//////////////
function NetworkValidation() {
	CheckAccount();
	CheckNetwork();
	if(sendok == true) {
		CreateTokenTransaction(account);
	}
	else{
		$("#eventNotification").fadeIn();
		$("#eventNotification").html('<i class="fa fa-2x thumbs-down"></i>&nbsp;Something went wrong, try again!');
		setTimeout(function(){ $("#eventNotification").fadeOut(); }, 3000);
		return;
	}
}

////////////MAKE TRANSACTION////////////
function CreateTokenTransaction(acc){
		var sender = acc;
		var creationPrice = 100000000000000000;
	    tokenCreatorContract.methods.createToken(tokenSupply, tokenName, tokenDecimals, tokenSymbol, devPercentage).send({from: sender, value: creationPrice}, function(error, transactionHash){
		console.log(transactionHash); 
		if (!error) {
	 		$("#loader").hide();
			$("#eventNotification").fadeIn();
        	$("#eventNotification").html('<h3>Success!</h3><p>Your <i class="fab fa-ethereum"></i> Address : ' + sender + ' just created a new token! <i class="fa fa-circle animated swing infinite"></i> <i class="fa fa-thumbs-up animated tada" style="color:#2dc997;"></i></p><p><a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + ' - This is your TX hash.<br/>Click to see your transaction on EtherScan.io.</a><br/>Bear in mind, you must wait for the TX to be mined &amp; confirmed, you will then be able to access your tokens!</p><p style="font-size:0.8em">If you requested an email regarding token information, this will be sent shortly.</p>');
			 setTimeout(function(){ 
				 createTokenBtn.disabled = false;
				 for (var i = 0, len = formElements.length; i < len; ++i) {
				 	formElements[i].readOnly = false;
				 }
				 $("#eventNotification").fadeOut();
				 var tokenSubmit = document.getElementById('tokenSubmit');
				 var txHashElem = document.getElementById('txHash');
				 tokenSubmit.value = true;
				 txHashElem.value = transactionHash;
				 tokenForm.method = "POST";
				 tokenForm.action = "includes/createToken.inc.php";
				 tokenForm.submit();
			}, 10000);
		} else {
			createTokenBtn.disabled = false;
			for (var i = 0, len = formElements.length; i < len; ++i) {
				formElements[i].readOnly = false;
			}
			$("#loader").hide();
			$("#eventNotification").fadeIn();
    		$("#eventNotification").html('<h3 style="color:red;">Notice!</h3><p><i class="fa fa-thumbs-down"></i> It looks like something went wrong, don&apos;t worry, no funds have been deducted and your token has not been created. This transaction will not be mined. You are welcome to <a href="#" onclick="window.location.reload(true);">refresh the page</a> and try again!<p>');
			setTimeout(function(){ 
				$("#eventNotification").fadeOut(); 
			}, 7000);
		  }
		});
}

function GetContractOwner(){
	return tokenCreatorContract.methods.owner().call();
}

function NumberOfTokensCreated(){
	return tokenCreatorContract.methods.allTokensCreated().call();
}

function GetTokenContractBalance(){
	return tokenCreatorContract.methods.contractBalance().call();
}

function GetLastTokenByUser(){
	return tokenCreatorContract.methods.myLastToken().call({from: account});
}

function GetAllTokenAddresses(index){
	return tokenCreatorContract.methods.tokenContractAddresses(index).call({from: account});
}


if(typeof web3 !== "undefined") 
{
	var tokenCreatorContract = new web3.eth.Contract([
		{
			"constant": false,
			"inputs": [
				{
					"name": "_initialAmount",
					"type": "uint256"
				},
				{
					"name": "_tokenName",
					"type": "string"
				},
				{
					"name": "_decimalUnits",
					"type": "uint8"
				},
				{
					"name": "_tokenSymbol",
					"type": "string"
				},
				{
					"name": "_devPercentage",
					"type": "uint256"
				}
			],
			"name": "createToken",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "deleteContract",
					"type": "bool"
				}
			],
			"name": "destroyContract",
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
					"name": "message",
					"type": "string"
				}
			],
			"name": "ContractMsg",
			"type": "event"
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
					"name": "t_name",
					"type": "string"
				},
				{
					"indexed": false,
					"name": "msg2",
					"type": "string"
				},
				{
					"indexed": false,
					"name": "tokenContractAddress",
					"type": "address"
				}
			],
			"name": "NewToken",
			"type": "event"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newPrice",
					"type": "uint256"
				}
			],
			"name": "setPrice",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "sweepContract",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "allTokensCreated",
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
			"name": "contractBalance",
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
			"name": "getPrice",
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
			"name": "myLastToken",
			"outputs": [
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "uint256"
				},
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
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tokenContractAddresses",
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
	], creatorContractAddress);
	ShowContractAddress(creatorContractAddress);
	GetContractOwner().then(function(result){
		var ownerAddress = result;
		console.log("Developer Address - " + ownerAddress);
		ownerAddressElem.innerHTML = "&nbsp;&nbsp;Developer Donations Welcome - " + ownerAddress;
	});
	//interval for account change
	web3.eth.getAccounts(function(err, accounts){
		activeAccount = accounts[0];
		setInterval(function () {
			console.log("Active Wallet = " + activeAccount);
			web3.eth.getAccounts(function(err, accounts){
				if (accounts[0] !== activeAccount) {
					console.log("Wallet change detected, refreshing page...");
					activeAccount = accounts[0];
					location.reload();
				}
			});
		}, 1000);
	});


	var tokensCreated; 
	setTimeout(function() {
		NumberOfTokensCreated().then(function(result) {
			tokensCreated = result;
			console.log('All Tokens Created - ' + tokensCreated);
			document.getElementById("tokensCreated").innerHTML = tokensCreated;
		});
		
		
		GetTokenContractBalance().then(function(result) {
			var balance = result;
			console.log('Current token creator contract balance in Wei - ' + balance);
		});
		
		
		var decimalDivision = 1;
		GetLastTokenByUser().then(function(result) {
			var tokenInfo = result;
			console.log(tokenInfo);
			if(tokenInfo[0] !== ""){
				document.getElementById("lastTokenName").innerHTML = tokenInfo[0];
				document.getElementById("lastTokenSymbol").innerHTML = tokenInfo[1];
				for(var i=0; i < tokenInfo[3]; i++){
					decimalDivision = decimalDivision * 10;
				}
				document.getElementById("lastTokenSupply").innerHTML = (parseInt(tokenInfo[2]) / decimalDivision).toFixed(tokenInfo[3]);
				document.getElementById("lastTokenDecimals").innerHTML = tokenInfo[3];
				document.getElementById("lastTokenAddress").innerHTML = '<a style="color:darkviolet; text-shadow:0px 0px 1px purple;" href="https://etherscan.io/token/'+tokenInfo[6]+'" target="_blank">'+tokenInfo[6]+'<b style="font-size:0.8em; color:#2dc997; text-shadow:0px 0px 0px white;"> - See token on Etherscan.io</b></a>';
				var tokenCount = parseInt(tokenInfo[5]) + 1;
				document.getElementById("myTokenCreationAmount").innerHTML = (tokenCount);
			}else{
				document.getElementById("lastTokenInfo").innerHTML = '<h6>Looks like you have not created any tokens yet <i class="fa fa-2x fa-thumbs-down"></i></h6><h5>Use the <a class="tokenStatList" href="#tokenForm">&apos;Token Creator&apos;</a> form to get started!</h5>';
			}
		});
		
		
		
		
		var scrollElem = document.getElementById("tokenAddressScrollBox");
		var iterations = 0;
		var clearIntervalID = setInterval(function() {
			GetAllTokenAddresses(iterations).then(function(result){
				var tokenAddress = result;
				console.log("Printing to scrollbox = " + tokenAddress);
				scrollElem.insertAdjacentHTML('afterBegin', '<div style="border-bottom: 1px solid lightgrey;"><span style="font-size:0.6em; color:black">Token Address : </span><a style="font-size:0.8em; font-weight: 700; word-wrap: break-word; letter-spacing: 1px;" href="https://etherscan.io/token/'+tokenAddress+'" target="_blank">'+tokenAddress+'</a></div>');	
				iterations++;
				if(iterations >= tokensCreated){
					clearInterval(clearIntervalID);
				}
			});
		}, 2500);
	}, 2000);
}
else{
	//no web3 found
	//no web3 compatible browser/provider found
	var message = 'You must install a <a href="#compatibleBrowsers" target="_blank">compatible DApp browser.</a>';
	document.getElementById("noWeb3Error").innerHTML = '<span style="color:red; text-shadow:0px 0px 1px lightgrey; position:relative; z-index:996"><strong>To interact with the blockchain, use a <a href="#compatibleBrowsers" target="_blank">compatible DApp browser.</a></strong></span>';
	errorMessage("You must install and browse with a <a href='#compatibleBrowsers'>compatible DApp browser.</a>");
	document.getElementById("lastTokenInfo").innerHTML = '<h6 style="color:red; font-weight:700">We can&apos;t display your token info <i class="fa fa-2x fa-thumbs-down"></i></h6><h5>Use a compatible <a class="tokenStatList" href="index.php#compatibleBrowsers">DApp browser</a> and try again!</h5>';
	document.getElementById("tokensCreated").innerHTML = '<h6 style="color:red; font-weight:700">We can&apos;t access the blockchain from this browser <i class="fa fa-2x fa-thumbs-down"></i></h6>';
}
