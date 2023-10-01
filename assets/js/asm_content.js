// JavaScript Document


	var gaid = asmconfig.gaid;
	var exdays = 365;

	var studiosoleveil_cookie_consent = getCookie("studiosoleveil_cookie_consent");
	var consent = 0;
	var accepted = false;

	var ad_not_acepted = asmconfig.ad_not_acepted;
	var ad_acepted = asmconfig.ad_acepted;
	var ad_acepted_stats = asmconfig.ad_acepted_stats;
	var aviso = asmconfig.aviso;
	var aviso2 = asmconfig.aviso2;
	var pie = asmconfig.pie;

	if(studiosoleveil_cookie_consent == "1") consent = 1;
	if(studiosoleveil_cookie_consent == "2") consent = 2;


	// GOOGLE TAG CONFIGURATION
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	// if we have consent (by cookie) granted, if not, denied.
	if(consent == 1) gtag('consent', 'default', {analytics_storage: "granted"});
	if(consent == 2) gtag('consent', 'default', {'ad_storage': 'granted', analytics_storage: "granted"});
	if(consent == 0) gtag('consent', 'default', {'ad_storage': 'denied', analytics_storage: "denied"});

	// TODO:  Problem configuring this is analytics but it need to be changed to GTM
//gtag('config', gaid);
	// END OF GOOGLE TAG CONFIGURATION

	document.write('<div class="aviso hidden" id="aviso" style=""><span class="close-lightbox si-cross" id="closeams" style="display:none;" onclick="hide_popup();"></span>' + aviso + '<button type="button" class="thm-btn" id="acepta"  onclick="aceptar(2);" >' + asmconfig.taceptar3 + '</button></div>');

	// if there is no consent we show the popup, if we have it, we will not display it.
	if(!studiosoleveil_cookie_consent) popup('show');

	if(consent) {
		document.addEventListener('DOMContentLoaded', function() {
			aceptar(consent);
		});
	}

	function popup(option) {
		var el = document.getElementById("aviso");
		if(option == 'show') el.classList.remove("hidden");
		else el.classList.add("hidden");
		return '';
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
		}
		return "";
	}

	function loadjs(file, child = '') {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = file;
		script.onload = function(){
			if(child) {
				var scripts = document.getElementsByTagName('script');
				for (var i = 0; i < scripts.length; i++) {
					if(scripts[i].type == 'text/plain' && scripts[i].	dataset.main == child) {
						console.log('econtrado child:' + child);
						eval(scripts[i].innerHTML);
					}
				}
			}
		};
		document.body.appendChild(script);
	}

	function aceptar(modo) {

		document.getElementById("closeams").style.display = "block";

		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		document.cookie = "studiosoleveil_cookie_consent=" + modo + "; expires="+exdate.toUTCString() + ";path=/";

		if(!accepted){

			//UPDATE GTAG
			if(modo==1) gtag('consent', 'update', {'analytics_storage': 'granted'});
			if(modo==2) gtag('consent', 'update', {'ad_storage': 'granted', 'analytics_storage': 'granted'});

			if(modo==2) {

				//HERE YOU CAN ENTER YOUR OWN SCRIPTS
				//loadjs('/media/aceptar.js');

				/* insert code here */

				// alert('hello world this is cookie mode 2');

				/* end code */

				var scripts = document.getElementsByTagName('script');
				for (var i = 0; i < scripts.length; i++) {
					if(scripts[i].type == 'text/plain' && !scripts[i].dataset.main) {
						if (scripts[i].src) loadjs(scripts[i].src, scripts[i].dataset.child);
						else eval(scripts[i].innerHTML);
					}
				}

			}

		}

		accepted = true;
		popup('hide');
		return;
	}

	function rechazar() {
		document.getElementById("acepta1").style.display = "inline-block";
		document.getElementById("acepta2").style.display = "inline-block";
		document.getElementById("acepta1").style.fontSize = "14px";
		document.getElementById("acepta2").style.fontSize = "14px";
		document.getElementById("acepta").style.fontSize = "14px";
		document.getElementById("rechaza").style.display = "none";
		return;
	}


	function solo_necesarias() {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		document.cookie = "studiosoleveil_cookie_consent=0; expires="+exdate.toUTCString() + ";path=/";
		popup('hide');
		return;
	}


	function show_popup() { popup('show'); };
	function hide_popup() { popup('hide'); };
