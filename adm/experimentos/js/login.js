    document.getElementById('loading').style.visibility = 'hidden';

  var config = {
    apiKey: "AIzaSyA2xoeMIlwYI3s-HPcyACI8SukJcOBzkRY",
    authDomain: "experimento-parte2.firebaseapp.com",
    databaseURL: "https://experimento-parte2.firebaseio.com",
    projectId: "experimento-parte2",
    storageBucket: "experimento-parte2.appspot.com",
    messagingSenderId: "355842770689"
  };
  firebase.initializeApp(config);



function logar()
{

var u_suario = document.getElementById('user');
var usuario = u_suario.value;
var p_ass = document.getElementById('pass');
var pass = p_ass.value;


var admin = firebase.database().ref('/administrador/' +'usuario').once('value').then(function(snapshot) {
       var a_dmin = snapshot.val();

var password = firebase.database().ref('/administrador/'+ 'senha').once('value').then(function(snapshot) {
       var p_assword = snapshot.val();

       if(usuario == a_dmin && pass == p_assword)
       {
          /*var chave = firebase.database() .ref('/administrador/' + 'login/');
          chave.orderByKey().on("value", function(snapshot) {
          var key = snapshot.key;*/

          document.getElementById('user').style.visibility = 'hidden';
          document.getElementById('pass').style.visibility = 'hidden';
          document.getElementById('escondido').style.visibility = 'hidden';
          document.getElementById('escondido2').style.visibility = 'hidden';
          document.getElementById('loading').style.visibility = 'visible';


          criar();

          var oi = firebase.database().ref('/administrador/'+ 'login/').limitToLast(1);
          oi.once('child_added').then(function(snapshot) {
          var x = snapshot.key
           setTimeout(function(){
          window.localStorage.setItem('Usuario', a_dmin);
          window.localStorage.setItem('senha', p_assword);
          window.localStorage.setItem('key', x);
          window.location.href="menu.html"
           }, 3000);
          
          });  
       }
       else
       {
        alert('USUÁRIO OU SENHA INCORRETO!')
        window.location.href="index.html"
       }

});
  });

};

function criar()
{
  var logado = firebase.database().ref('/administrador/' + 'login');
        logado.push({
          login: true
        });
}