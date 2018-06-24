'use strict';

// Initializes Parte2Decisao.
function Parte2Decisao(experimentoChave) {
  this.experimentoChave = experimentoChave;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.decisao = document.getElementById('decisao');

  this.msgErrada = document.getElementById('msg-errada');
  this.msgErrada2 = document.getElementById('msg-errada2');
  this.msgCerta = document.getElementById('msg-certa');
  this.error = document.getElementById('error');

  this.buttonVerify = document.getElementById('save');
  this.buttonVerify.addEventListener('click', this.save);

  this.link = document.getElementById('link');

  this.initFirebase();
}

// A loading image URL.
Parte2Decisao.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte2Decisao.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte2Decisao.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte2Decisao.userName.textContent=snapshot.val().id;
    /*Parte2Decisao.link.setAttribute('href','parte-final.html?k='+QueryString.k+"&e="+QueryString.e);*/
  });
}

Parte2Decisao.prototype.save = function() {
  Parte2Decisao.msgCerta.setAttribute('hidden','');
  Parte2Decisao.msgErrada.setAttribute('hidden','');
  Parte2Decisao.error.setAttribute('hidden','');
  if(Parte2Decisao.decisao.value=='') {
    Parte2Decisao.msgErrada.removeAttribute('hidden');
  } else if(Parte2Decisao.decisao.value>6 || Parte2Decisao.decisao.value<=0) {
    Parte2Decisao.msgErrada2.removeAttribute('hidden');    
  } else {
    this.table = firebase.database().ref('/experiment/'+Parte2Decisao.experimentoChave+'/participant/'+QueryString.k+'/answer/parte/decisaodaparte1');

    this.table.set(Parte2Decisao.decisao.value).then(function(snapshot) {

       


      Parte2Decisao.msgCerta.removeAttribute('hidden');
      Parte2Decisao.link.removeAttribute('hidden');
      Parte2Decisao.decisao.setAttribute('disabled','true');
      Parte2Decisao.buttonVerify.setAttribute('hidden','')

      var qualgrupo1 = firebase.database() .ref("/experiment/" + Parte2Decisao.experimentoChave+'/participant/' + QueryString.k + '/group/');
      qualgrupo1.orderByChild('number') .once("child_added", function(data) {
      var numerobanco = (data.val());
      console.log('Numero do Grupo: '+ numerobanco);

      var numerobancostring = numerobanco.toString();

       var q_lider = firebase.database().ref('/experiment/'+ Parte2Decisao.experimentoChave +'/sorteado/'+ numerobanco ).once('value').then(function(snapshot) {
       var sorteado = snapshot.val();
       console.log('Numero Sorteado   : ' + sorteado);


     /* var quallider = firebase.database() .ref('/experiment/'+Parte2Decisao.experimentoChave +'/sorteado/');
      quallider.orderByChild(numerobancostring) .once("child_added", function(data) {
      console.log('Numero Sorteado: ' + data.val());
      var sorteado=data.val();*/

      var adc = firebase.database().ref('/experiment/'+ Parte2Decisao.experimentoChave +'/ctrlider/'+ numerobanco + '/lideres/' + QueryString.k + '/'+ numerobanco).once('value').then(function(snapshot) {
       var t = snapshot.val();
       console.log('seu numero   : ' + t);


      var qualgrupo = firebase.database() .ref("/experiment/" + Parte2Decisao.experimentoChave+'/participant/' + QueryString.k + '/group/').limitToLast(1);
      qualgrupo.orderByChild("tipo") .once("child_added", function(data) {
      var qgrupo =data.val();
      console.log('Tipo de Grupo:' + qgrupo);
  
   if(qgrupo == "PC"){
    if(t==sorteado){
        console.log("Sorteado lider PC");
        /*window.location.href="aguardept1-lider.html?k="+QueryString.k+"&e="+QueryString.e;*/
        Parte2Decisao.link.setAttribute('href','aguardept1-lider.html?k='+QueryString.k+"&e="+QueryString.e);  
    }
    else
    {
      console.log("Sorteadoado nao lider PC")
     /* window.location.href="aguardept1.html?k="+QueryString.k+"&e="+QueryString.e;*/
     Parte2Decisao.link.setAttribute('href','aguardept1.html?k='+QueryString.k+"&e="+QueryString.e);
   }
   }
   else{
    if (t==sorteado) {
      console.log("Sorteado lider NPC")
       /*window.location.href="parte3-instrucoes-npc-lider.html?k="+QueryString.k+"&e="+QueryString.e;*/
       Parte2Decisao.link.setAttribute('href','parte3-instrucoes-npc-lider.html?k='+QueryString.k+"&e="+QueryString.e);
    }
    else{
      console.log("sorteado nao lider NPC")
       /*window.location.href="parte3-instrucoes-npc.html?k="+QueryString.k+"&e="+QueryString.e;*/
        Parte2Decisao.link.setAttribute('href','parte3-instrucoes-npc.html?k='+QueryString.k+"&e="+QueryString.e);
    }
   }
   
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
        Parte2Decisao.error.removeAttribute('hidden');
    });
    });
    });
    });
    });
  }
}

function init() {
  window.Parte2Decisao = new Parte2Decisao(QueryString.e);
};

