<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>plustokens</title>
  <meta name="description" content="Use our 1-click ERC20 token creator and embark on your own crypto-mission!"/>
  <meta name="viewport" content="width=device-width, maximum-scale=1, user-scalable=no"/>
  <meta name="keywords" content="cryptocurrency, blockchain, ethereum, ethereum dapp, crypto creator"/>
  
  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">
  <link rel="manifest" href="manifest.json" />
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet"/>

  <!-- Bootstrap CSS File -->
  <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>

  <!-- Libraries CSS Files -->
  <link href="lib/fontawesome/css/all.css" rel="stylesheet"/>
  <link href="lib/animate/animate.min.css" rel="stylesheet"/>
  <link href="lib/slick/slick.css" rel="stylesheet"/>
  <link rel="stylesheet" type="text/css" href="lib/slick/slick-theme.css"/>
  <link href="css/style.css" rel="stylesheet"/>
	
<!-- ticker widget-->
<script type="text/javascript" src="https://files.coinmarketcap.com/static/widget/currency.js"></script>

</head>

<body>
	 <!-- Preloader
	============================================= -->
	<div id="preloader"><i><img id="preloaderLogo" class="animated" style="position: absolute;" src="img/logo.png" alt="Preloader Spinner"/></i></div>
	<div id="eventNotification"></div>
	<!--
<section id="walletSetup">
<center>   
    <h1>LightWallet</h1>
    <h2>New Wallet</h2>
    <div><input id="userEntropy" placeholder="Type random text to generate entropy" size="80" type="text" />
      <button onclick="newWallet()">Create New Wallet</button>
    </div>
    <h2>Restore Wallet</h2>
    <div><input id="seed" size="80" type="text" value="" />
      <button onclick="setSeed()">Restore wallet from Seed</button>
    </div>
    <h2>Show Addresses</h2>
    <div>Show <input id="numAddr" size="5" type="text" value="3" /> more address(es)
      <button onclick="newAddresses('')">Show</button>
    </div>
    <div id="addr"></div>
    <div>
      <button onClick='getBalances()'>Refresh</button>
    </div>
    <h2>Send Ether</h2>
    <div>From: <select id="sendFrom"></select></div>
    <div>To: <input id="sendTo" size="40" type="text" /></div>
    <div>Ether: <input id="sendValueAmount" type="text"></div>
    <div>
      <button onclick="sendEth()">Send Ether</button>
    </div>
    <h2>Show Seed</h2>
    <button onclick="showSeed()">Show Seed</button>
    <h2>Function Call</h2>
    <div>Caller: <select id="functionCaller"></select></div>
    <div>Contract Address: <input id="contractAddr" size="40" type="text" /></div>
    <div>Contract ABI: <input id="contractAbi" size="40" type="text" /></div>
    <div>Function Name: <input id="functionName" size="20" type="text" /></div>
    <div>Function Arguments: <input id="functionArgs" size="40" type="text" /></div>
    <div>Value (Ether): <input id="sendValueAmount" type="text"></div>
    <div>
      <button onclick="functionCall()">Call Function</button>
    </div>
</center>
</section>-->
	<?php 
	require("includes/airdrop.inc.html");
	require("includes/nav.inc.html");	
	?>
	<section style="border-bottom:2px lightgrey solid;" id="createTokenIntro">
	<div id="hero" style="padding:100px 5px 25px 5px;" class="container">
		<center><div class="fa wow fadeInDownBig logoCont"><img class="mainLogoSpinner" src="img/logo.png" alt="Logo Spinner"/><!--<h1 style="font-weight: 700; margin-top: 100px;">plustokens</h1>--></div>
		<br/><br/>
		<h2 style="font-weight: 300"><i style="color:darkgray" class="fab fa-ethereum"></i>&nbsp;ERC20 Token Creator</h2>
		<h3>Your own Ethereum token, in 1-click&nbsp;<i class="fa fa-mouse-pointer fa-flip-horizontal"></i></h3>
		</center>
		<div id="noWeb3Error"></div>
	</div>
	</section>
	

    <div style="padding:25px 5px 25px 5px;" class="container">
	<div class="forms row justify-content-center">
	<div class="col-xs-12 col-lg-6">
	<div style="padding:10px; border:1px lightgrey solid;">
		<h1 style="text-align: left; font-weight: 700;"><i style="color:rebeccapurple" class="fa fa-magic"></i>&nbsp;TOKEN CREATOR</h1>
		<hr/>
      <form id="tokenForm">
		<div class="form-group">
          <input type="email" id="userEmail" name="email" class="form-control" placeholder="Your Email (not required)"/>
			<i style="font-weight: 200; font-size:0.8em;">* Enter your email if you want to receive token information after creation.</i>
        </div>
        <div class="form-group">
          <input type="text" id="tokenName" name="tokenName" class="form-control" placeholder="Token Name (Ethereum)" required/>
        </div>
        <div class="form-group">
          <input type="text" id="tokenSymbol" name="tokenSymbol" maxlength="6" class="form-control" placeholder="Token Symbol (ETH)" required/>
        </div>
        <div class="form-group">
          <input type="number" id="tokenSupply" name="tokenSupply" min="100" class="form-control" placeholder="Token Supply" required/>
        </div>
		<div class="form-group">
          <input type="number" id="tokenDecimals" name="tokenDecimals" min="0" max="18" class="form-control" placeholder="Token Decimals (0-18)" required/>
        </div>
		 <div class="form-group">
		  <label>Developer Donation?<br/><em style="font-weight: 200; font-size:0.8em;"> * Choose percentage of token supply as a gift to developer!</em></label><br/><input type="checkbox" id="devDonate" onclick="CheckDevDonate(this)"/>
        </div>
		 <div id="devDonateCont" class="form-group">
		  <input id="devDonateInput" type="number" name="devDonation" class="form-control" min="0" max="100" placeholder="Thanks! Please enter donation amount in %"/>
         </div>
		  <center><div id="loader"><img width="100px" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif" alt="Loading spinner"></div></center>
		<?php 
		  if(isset($_GET["token_create"]) && $_GET["token_create"] == "success"){
			  echo('<div class="confirmationMsg"><h4>Token Created Successfully!</h4>');
		  }else if(isset($_GET["mail"]) && $_GET["mail"] == "failed"){
			  echo('<h4>Token Created Successfully!</h4><span style="font-size:0.8em">Unfortunately your requested email failed to send. We have logged this error and will do our best to rectify it.</span>');
		  }
		  if(isset($_GET["tx_hash"])){
			  echo('<p>See your token creation transaction here - <a style="word-wrap:break-word;" href="https://etherscan.io/tx/'.$_GET["tx_hash"].'" target="_blank">'.$_GET["tx_hash"].'</a></p></div>');
		  }
		  ?>
		  <span id="supplyInfo"></span>
		  <input type="hidden" id="txHash" name="txHash" value=""/>
		  <input type="hidden" id="tokenSubmit" name="tokenSubmit" value=""/>
      </form>
		<div id="formCont" class="text-center">
		<div style="width:100%;"><button style="box-shadow: 0px 0px 5px grey;" id="createTokenBtn" class="btn btn-success enterDrawBtn" onclick="CheckForm()"><img src="img/logo.png" style="width:50px;">&nbsp;Create Token</button></div>
		</div>
		<br/>
		<div style="text-align:right"><i class="fa fa-dollar-sign"></i>&nbsp;Token Creation Cost - <i class="fab fa-ethereum"></i>&nbsp;<strong>0.1 ETH</strong></div><br/>
		<div style="text-align:right; font-size:0.8em"><i>* You will receive a TX confirmation before any funds are deducted.</i></div>
    </div>
	</div>
	<div class="col-xs-12 col-lg-6">
	<div style="padding:10px; border:1px lightgrey solid;">
		<h1 style="text-align: right; font-weight: 700;">CONTRACT STATS&nbsp;<i style="color:rebeccapurple" class="fa fa-chart-line"></i></h1>
		<hr/>
		<h2>Total ERC20 tokens created : <span class="tokenStatList" id="tokensCreated">0</span></h2>
		<div id="tokenAddressScrollBox">
		</div>
		<hr/>
		<div id="lastTokenInfo">
			<h3>See your latest created ERC20 token info below...</h3>
			<ul>
			<li>Token Name - <span class="tokenStatList" id="lastTokenName">N/A</span></li>
			<li>Token Symbol - <span class="tokenStatList" id="lastTokenSymbol">N/A</span></li>
			<li>Token Supply - <span class="tokenStatList" id="lastTokenSupply">N/A</span></li>
			<li>Token Decimals - <span class="tokenStatList" id="lastTokenDecimals">N/A</span></li>
			<li>Token Contract Address - <span style="word-break: break-all; word-wrap: break-word;" class="tokenStatList" id="lastTokenAddress">N/A</span></li>
			<hr/>
			<label><i class="fa fa-chevron-up"></i>You have created <span class="tokenStatList" id="myTokenCreationAmount">0</span> ERC20 token/s so far...</label>
			</ul>
		</div>
	</div>
	</div>
	</div>
			<hr/>
		<div class="row">
			<div class="col-12 col-lg-6">
				<span>Token Creator Contract Address</span><em class="fa fa-chevron-down"></em><br/>
				<a href="https://etherscan.io/address/0x2E2270057f5010cBC29a025e9D3f32EC8AB37672" target="_blank"><span id="contractAddress">0x2E2270057f5010cBC29a025e9D3f32EC8AB37672</span></a>
				<p style="font-size:0.8em;"><i>* Follow the address above to see the token creator contract on Etherscan.io.</i></p>
			</div>
			<div class="col-12 col-lg-6">
				<span>Your Ethereum Wallet Address</span><em class="fa fa-chevron-down"></em><br/>
				<span style="font-weight: 700" id="userAddress">N/A</span><br/>
				<i class="fa fa-chevron-up"></i><span style="font-size:0.9em;">Tokens created will be sent here! *</span><br/>
				<p style="font-size:0.8em;"><i>* If this is not correct, select the desired account in your wallet and refresh the page.</i></p>
			</div>
		</div>
		<div class="col-12 col-lg-8 float-right">
		<h3 style="text-align:right"><i  style="color:rebeccapurple" class="fa fa-info-circle"></i>&nbsp;Token Creation Information</h3>
	<p style="text-align:right; font-size:1em; border-top:1px solid lightgrey; padding-top:10px;">The address shown above will be the <strong>contract owner</strong> address, the <strong>entire supply</strong> of created ERC20 tokens will be transferred directly to this wallet upon <strong>contract creation.</strong> Your token contract address will be displayed after creation, you can see all token activity on <a href="https://etherscan.io" target="_blank">EtherScan</a>. Allow for block confirmation times before checking your tokens on the blockchain.</p>
	</div>
	<div id="compatibleBrowsers" class="col-12 col-lg-6 float-left">
				<hr/>
		<h3 style="text-align:left"><i  style="color:rebeccapurple" class="fa fa-globe"></i>&nbsp;Compatible Browsers</h3>
		<ul>
		<li><a href="https://www.opera.com/">Opera Browser&nbsp;<i class="fa fa-mobile"></i>&nbsp;<i class="fa fa-desktop"></i>&nbsp;<i class="fab fa-opera"></i></a></li>
		<li><a href="https://metamask.io">Metamask Extension&nbsp;<i class="fa fa-desktop"></i>&nbsp;<i class="fab fa-chrome"></i>&nbsp;<i class="fab fa-firefox"></i></a></li>
		<li><a href="https://brave.com/the653">Brave Browser&nbsp;<i class="fa fa-desktop"></i></a></li>
		<li><a href="https://wallet.coinbase.com/">Coinbase Wallet App&nbsp;<i class="fa fa-mobile"></i></a></li>
		</ul>
	</div>
		<div class="col-12 col-lg-6 float-right">
				<hr/>
		<h3 style="text-align:left"><i  style="color:rebeccapurple" class="fab fa-ethereum"></i>&nbsp;Purchase Ethereum</h3>
		<ul>
		<li><a href="https://www.coinbase.com/join/593523168a9af501805a5e6d">Coinbase</a></li>
		<li><a href="https://www.binance.com/?ref=10061212">Binance</a></li>
		<li><a href="https://old.changelly.com/?ref_id=f0b20b7298a8">Changelly</a></li>
		</ul>
	</div>
	<div class="text-center"><a href="https://www.ledgerwallet.com/r/c5c8"><img class="ledgerBanner" alt="Ledger Nano S - The secure hardware wallet" src="https://www.ledgerwallet.com/images/promo/nano-s/ledger_nano-s_7-2-8x9-0.jpg"></a></div>
	<hr/>
	<section class="row">
	<div class="col-lg-12 background order-lg-2 order-1 col-xl-12">
		<h2 style="text-align: center;" class="metamaskTitle">Don't Miss It!</h2>

		<a href="index.php#airdropArea"><div class="animated tada infinite" style="width:90%; margin:auto; text-align: center"><h2 class="airdropLink" style="font-weight: 700;  color:rebeccapurple; text-align:center">TOKEN AIRDROP!<i style="color:black;" class="fa fa-hand-point-left animated pulse infinite"></i></h2></div>
		</a>
    </div>
	</section>
	</div>
	<hr/>
		<center><h3><i style="color:#222222" class="fa fa-handshake"></i>&nbsp;Affiliates</h3></center>
	<div class="affiliateSlick">
		<div>
			<a class="affiliateLink" href="https://brave.com/the653"><img style="margin:auto; height:50px;" alt="Brave Browser - secure your browsing" src="img/braveLogo.svg"/></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://www.ledger.com?r=c5c8"><img style="margin:auto; height:50px;" alt="Ledger Nano S - The secure hardware wallet" src="https://www.ledgerwallet.com/images/promo/nano-s/ledger_nano-s_3-2-0x5-0.jpg"></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://unstoppabledomains.com/r/064b09101909467"><img style="margin:auto; height:50px;" alt="Unstoppable Domains by Zilliqa" src="img/unstoppableDomains.svg"/></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://www.bitmex.com/register/d3Z0mh"><img style="margin:auto; height:40px; margin-bottom:5px; margin-top:5px;" alt="Trade upto 100x leverage on BitMex" src="img/bitmexLogo.png"/></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://www.binance.com/?ref=10061212"><img style="margin:auto;height:50px;" alt="Trade 100s of cryptocurrencys on Binance, the world largest exchange" src="img/binanceLogo.svg"/></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://old.changelly.com/?ref_id=f0b20b7298a8"><img style="margin:auto;height:50px;" alt="Instantly exchange cryptocurrency with Changelly" src="img/changellyLogo.svg"/></a>
		</div>
		<div>
			<a class="affiliateLink" href="https://click.tunnelbear.com/aff_c?offer_id=36&aff_id=7740"><img style="margin:auto; height:40px; margin-bottom:5px; margin-top:5px;" alt="Browse privately with TunnelBear" src="img/tunnelbearLogo.svg"/></a>
		</div>
	</div>
	<footer style="width:100%; text-align:right;" id="footer">
    <span style="word-wrap: break-word;" id="ownerAddress"></span>
 	</footer>

  <!-- JavaScript Libraries -->
  <script type="text/javascript" src="lib/jquery/jquery.min.js"></script>
  <script type="text/javascript" src="lib/jquery/jquery-migrate.min.js"></script>
  <script type="text/javascript" src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script type="text/javascript" src="lib/wow/wow.min.js"></script>
  <script type="text/javascript" src="lib/slick/slick.min.js"></script>
  <!-- Custom Scripts -->
  <script type="text/javascript" src="js/main.js"></script>
  <!--Web3-->
 <script type="text/javascript" src="js/web3.min.js"></script>
 <script type="text/javascript" src="js/web3Connect.js"></script>
 <script type="text/javascript" src="js/createToken.js"></script>
 <script type="text/javascript" src="js/airdrop.js"></script>
 <!--web wallet-->
<!-- <script type="text/javascript" src="lib/async.js"></script>
 <script type="text/javascript"src="lib/lightwallet.min.js"></script>
 <script type="text/javascript" src="lib/store.js/store.legacy.min.js"></script>
 <script type="text/javascript" src="js/hooked-web3-provider.js"></script>
 <script type="text/javascript" src="js/wallet.js"></script>

	<script>
		//store.set('user', { name:'Marcus' })
		//store.get('user').name == 'Marcus'
	</script>-->

	<script>
	$(window).on('load', function () {
	  /////////////PRELOADER REMOVE///////////////
	  var preloader = $("#preloader");
	  preloader.fadeOut(500, function() {
	  	preloader.remove();
	   });
      $('#header').addClass('header-fixed');
	   });
	  $('.affiliateSlick').slick({
		arrows: false,
   		infinite: true,
   		speed: 300,
   		slidesToShow: 1,
   		adaptiveHeight: true,
   		autoplay: true,
   		autoplaySpeed: 700
  	});
		new WOW().init();
	  $("#eventNotification").hide();
	  $("#loader").hide();
		setTimeout(function(){
			askForNotificationPerm();
		},10000);


	</script>
</body>
</html>