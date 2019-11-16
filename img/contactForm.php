<section id="contact">
      <div class="container">
        <div class="section-header">
          <h3 class="section-title">Contact</h3>
          <hr>
          <p class="section-description">Feel free to contact The Blockchain Lottery!</p>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-center">

          <div class="col-lg-5 col-md-6">

            <div class="info">
              <div>
                <i class="fa fa-globe"></i>
                <p style="color:#222222;">Worldwide Participation,<br>Developed in the UK</p>
              </div>

              <div>
                <i class="fa fa-envelope"></i>
                <p><a style="color:#222222;" href="mailto:contact@theblockchainlottery.win">contact@theblockchainlottery.win</a></p>
              </div>
            </div>

            <div class="social-links">
              <a href="https://t.me/theblockchainlottery" target="_blank" class="instagram"><i class="fab fa-telegram"></i></a>
              <a href="https://twitter.com/play_tbl" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/theblockchainlottery/" target="_blank" class="instagram"><i class="fab fa-instagram"></i></a>
			  <a href="https://github.com/theblockchainlottery" target="_blank" class="instagram"><i class="fab fa-github"></i></a>
            </div> 
			<hr/>
			<center><h3><i style="color:#222222" class="fa fa-handshake"></i>&nbsp;Affiliates</h3></center>
			<div class="affiliateSlick row">
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
			<hr/>
			<br/>
			<link rel="stylesheet" href="https://old.changelly.com/widget.css"/>
			  <center><a id="changellyButton" href="https://old.changelly.com/widget/v1?auth=email&from=BTC&to=ETH&merchant_id=f0b20b7298a8&address=&amount=1&ref_id=f0b20b7298a8&color=00cf70" target="_blank"> <img style="border-radius:5px; box-shadow:0px 5px 5px black" src="img/changelly.png" /> </a>
			  </center>
			  <div id="changellyModal"> 
				  <div class="changellyModal-content"> <span class="changellyModal-close">x</span>
					  <iframe src="https://old.changelly.com/widget/v1?auth=email&from=BTC&to=ETH&merchant_id=f0b20b7298a8&address=&amount=1&ref_id=f0b20b7298a8&color=00cf70" width="600" height="500" class="changelly" scrolling="no" style="overflow-y: hidden; border: none" > Can't load widget </iframe> </div> 
				  <script type="text/javascript"> 
					  var changellyModal = document.getElementById('changellyModal'); var changellyButton = document.getElementById('changellyButton'); var changellyCloseButton = document.getElementsByClassName('changellyModal-close')[0]; changellyCloseButton.onclick = function() { changellyModal.style.display = 'none'; }; changellyButton.onclick = function widgetClick(e) { e.preventDefault(); changellyModal.style.display = 'block'; }; 
				  </script> 
			  </div>
			  <br/>
			 <hr/>
          </div>
          <script>
		////////////////CAPTCHA CHECK/////////////////
		function CheckContactCaptcha(){
			var reCaptchaID = GetReCaptchaID("formGoogleCaptcha"); //GetReCaptchaID function in main.js
			var response = grecaptcha.getResponse(reCaptchaID);
			if (response.length === 0) {
				$('#eventNotification').fadeIn();
				$('#eventNotification').html('<h4><i class="fab fa-2x fa-google"></i>&nbsp;reCAPTCHA is invalid, try again!</h4>');
				setTimeout(function(){ $("#eventNotification").fadeOut(); }, 1500);
				return;
			} else {
				console.log('reCaptcha Valid');
				if(!$('#contactForm')[0].checkValidity()){
  					// If the form is invalid, submit it. The form won't actually submit;
  					// this will just cause the browser to display the native HTML5 error messages.
					$('<input type="submit">').hide().appendTo('#contactForm').click().remove();
				}
				else{
					//form valid
					$('<input type="submit" name="submit">').hide().appendTo('#contactForm').click();
				}
			}	
		}	
		  </script>
          <div class="col-lg-5 col-md-6">
            <div class="form">
              <form id="contactForm" action="mail.php" method="post" class="contactForm">
                <div class="form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div class="form-group">
                  <input type="email" name="email" class="form-control" id="email" placeholder="Your Email" required/>
                </div>
                <div class="form-group">
                  <input type="text" name="subject" class="form-control" id="subject" placeholder="Subject" required/>
                </div>
                <div class="form-group">
                  <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div class="text-center">
					<div id="formGoogleCaptcha" class='g-recaptcha' data-sitekey='6LeJrDkUAAAAANhx3vcRAcfb2a-Vc08ojBJetjyU'></div><br/>
				 </div>
				  <input type="button" class="btn btn-get-started contactBtn" onclick="CheckContactCaptcha()" value="Send Message"/>
              </form>
				
            </div>
          </div>

        </div>

      </div>
    </section>
