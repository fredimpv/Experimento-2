window.onload(logado());

function dados()
{
	window.location.href="aguarde.html"
}

function logchat()
{
	window.location.href="logchat.html"
}

function premio()
{
	window.location.href="premio.html"
}

function admjogo()
{
	window.location.href="admjogo.html"
}

function logado()
{
  document.getElementById('escondido').style.visibility = 'hidden';
  document.getElementById('escondido2').style.visibility = 'hidden';
  document.getElementById('escondido3').style.visibility = 'hidden';
  document.getElementById('escondido4').style.visibility = 'hidden';
  document.getElementById('loading').style.visibility = 'visible';


	  var config = {
    apiKey: "AIzaSyA2xoeMIlwYI3s-HPcyACI8SukJcOBzkRY",
    authDomain: "experimento-parte2.firebaseapp.com",
    databaseURL: "https://experimento-parte2.firebaseio.com",
    projectId: "experimento-parte2",
    storageBucket: "experimento-parte2.appspot.com",
    messagingSenderId: "355842770689"
  };
  firebase.initializeApp(config);

  var admin = firebase.database().ref('/administrador/' +'usuario').once('value').then(function(snapshot) {
       var a_dmin = snapshot.val();

  var password = firebase.database().ref('/administrador/'+ 'senha').once('value').then(function(snapshot) {
       var p_assword = snapshot.val();

  var oi = firebase.database().ref('/administrador/'+ 'login/').limitToLast(1);
          oi.once('child_added').then(function(snapshot) {
          var x = snapshot.key

          if(x == null || x =='null')
          {
            alert('Um Usuário não autorizado tentou acessar essa página, por favor faça login novamente!');
           var desativa = firebase.database().ref('/administrador/' + 'login/');
            desativa.set(false);
            localStorage.clear();
            window.location.href="index.html"
          }

  var log_ado = firebase.database().ref('/administrador/'+'login/' + x + '/login').once('value').then(function(snapshot) {
       var lo_gado = snapshot.val();

       
       if(lo_gado == true)
       {
        var usr = window.localStorage.getItem('Usuario');
        var pass = window.localStorage.getItem('senha');
        var key = window.localStorage.getItem('key');
        if( usr == a_dmin && pass == p_assword && key == x)
        {
          document.getElementById('loading').style.visibility = 'hidden';
          document.getElementById('escondido').style.visibility = 'visible';
          document.getElementById('escondido2').style.visibility = 'visible';
          document.getElementById('escondido3').style.visibility = 'visible';
          document.getElementById('escondido4').style.visibility = 'visible';
          
        }
       }


       if(lo_gado != true)
       {
        window.location.href="index.html"

        }
        else{
        var usr = window.localStorage.getItem('Usuario');
        var pass = window.localStorage.getItem('senha');
        var key = window.localStorage.getItem('key');
        
        if(usr != a_dmin || pass != p_assword || key != x){
            var desativa = firebase.database().ref('/administrador/' + 'login/'+ key + '/login/');
            desativa.set(false);
          window.location.href="index.html"

        
       }
       }
     });
   });
           });
   });
}

function deslogar()
{
    var admin = firebase.database().ref('/administrador/' +'usuario').once('value').then(function(snapshot) {
       var a_dmin = snapshot.val();

  var password = firebase.database().ref('/administrador/'+ 'senha').once('value').then(function(snapshot) {
       var p_assword = snapshot.val();

  var oi = firebase.database().ref('/administrador/'+ 'login/').limitToLast(1);
          oi.once('child_added').then(function(snapshot) {
          var x = snapshot.key


  var log_ado = firebase.database().ref('/administrador/'+'login/' + x + '/login').once('value').then(function(snapshot) {
       var lo_gado = snapshot.val();


               var key = window.localStorage.getItem('key');
       var desativa = firebase.database().ref('/administrador/' + 'login/'+ key + '/login/');
            desativa.set(false);

      localStorage.clear();


  window.location.href="index.html"
       });
   });
           });
   });
}

function voltamenu()
{
  window.location.href="menu.html"
}