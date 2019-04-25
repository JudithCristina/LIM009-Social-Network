// Este es el punto de entrada de tu aplicacion

import { config } from './lib/index.js';

firebase.initializeApp(config);

const logInBtn = document.getElementById('log-in-btn');
const signInBtn = document.getElementById('sign-in-btn');
const logOutBtn = document.getElementById('log-out-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const facebookBtn = document.getElementById('log-in-fb');

logInBtn.addEventListener('click', e => {
	const email = emailInput.value;
	const password  = passwordInput.value;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.message));
});

signInBtn.addEventListener('click', e => {
	const email = emailInput.value;
	const password  = passwordInput.value;
	// toDo: escribir funcion que valide el email y el password
	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.message));
});

logOutBtn.addEventListener('click', e => {
	firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged( firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
	} else {
		console.log('no logueado');
	}
});


// inicio de sesion con facebook
const authFacebook = () => {
	const provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(result => {
		console.log(result.user.displayName);
	})
	.catch(error => {
		console.log(error);
	});
}

facebookBtn.addEventListener('click', () => {
	authFacebook();
});


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '488881294982650',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    FB.AppEvents.logPageView();   
      
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
