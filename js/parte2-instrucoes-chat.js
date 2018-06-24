/*'use strict';*/

// Initializes Parte2InstrucoesChat.
function Parte2InstrucoesChat(experimentoChave) {
  this.experimentoChave = experimentoChave;
  
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.link = document.getElementById('link');

  this.initFirebase();

  startCountdown();

  //setTimeout(startCountdown,1000);
}

// A loading image URL.
Parte2InstrucoesChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte2InstrucoesChat.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte2InstrucoesChat.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte2InstrucoesChat.userName.textContent=snapshot.val().id;
    Parte2InstrucoesChat.idjogador = snapshot.val().id;
    /*Parte2InstrucoesChat.link.setAttribute('href','parte2-chat.html?k='+QueryString.k+"&e="+QueryString.e);*/
  });
}

/*var minuto = 0;
var segundo = 20;
var contagemRegressiva;
var zeroSegundo = "";

function startCountdown(){
  if(segundo==0) {
    segundo=60;
    minuto--;
  }
  if(minuto<0) {
    Parte2InstrucoesChat.link.removeAttribute('hidden');
  } else {
    segundo--;
    if(segundo<10) {
      zeroSegundo="0";
    } else {
      zeroSegundo="";
    }
    numberCountdown.innerText = '0' + minuto + ':' + zeroSegundo + segundo;
    setTimeout(startCountdown,1000);
  }
}*/

function init() {
  window.Parte2InstrucoesChat = new Parte2InstrucoesChat(QueryString.e);
  var qualgrupo = firebase.database() .ref("/experiment/" + Parte2InstrucoesChat.experimentoChave+'/participant/' + QueryString.k + '/group/');
      qualgrupo.orderByChild("number") .once("child_added", function(data) {
     var y = data.val();
   
     var k = y.toString();

  var qualgrupo = firebase.database() .ref('/experiment/' + Parte2InstrucoesChat.experimentoChave + /ctrlplayers/ + k );
      qualgrupo.orderByChild('/jogador/') .once("child_added", function(data) {
     var z = data.val();

     if( z == 3)
     {  
         /* window.location.href="parte2-chat.html?k="+QueryString.k+"&e="+QueryString.e;*/
         Parte2InstrucoesChat.link.setAttribute('href','parte2-chat.html?k='+QueryString.k+"&e="+QueryString.e);

     }
          if( z == 2)
     {  
         /* window.location.href="parte2-chat.html?k="+QueryString.k+"&e="+QueryString.e;*/
         Parte2InstrucoesChat.link.setAttribute('href','semjogadores2.html?k='+QueryString.k+"&e="+QueryString.e);

     }

     else
     {
        var jogadoreson = firebase.database().ref('/experiment/'+Parte2InstrucoesChat.experimentoChave+'/ctrlplayers/' + k + '/jogador').once('value').then(function(snapshot) {
      var numon = snapshot.val();
        if(numon >= 10)
        {
          Parte2InstrucoesChat.link.setAttribute('href','semjogadores3.html?k='+QueryString.k+"&e="+QueryString.e);
        }
        if(numon <= 2)
        {
            Parte2InstrucoesChat.link.setAttribute('href','semjogadores1.html?k='+QueryString.k+"&e="+QueryString.e);
        }
   

         });
     }

    
   });
});

};


var minuto = 00;
var segundo = 00;
var contagemRegressiva;
var zeroSegundo = "";

function startCountdown(){

  if(segundo==60) {
    segundo=00;
    minuto++;
    startCountdown();
  } else {
    segundo++;

    setTimeout(startCountdown,500);
  }

                var desativa = firebase.database().ref('/Contatempo/' + Parte2InstrucoesChat.experimentoChave + '/paginainstrucao1/'+ Parte2InstrucoesChat.idjogador);
            desativa.set(minuto+':'+segundo);
}