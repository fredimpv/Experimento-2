'use strict';

// Initializes Parte3Instrucoes.
function Parte3Instrucoes(experimentoChave) {
  this.experimentoChave = experimentoChave;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.msgCerta1 = document.getElementById('msg-certa1');
  this.msgErrada1 = document.getElementById('msg-errada1');
  this.msgCerta2 = document.getElementById('msg-certa2');
  this.msgErrada2 = document.getElementById('msg-errada2');

  this.resposta1 = document.getElementById('resposta1');
  this.resposta2 = document.getElementById('resposta2');

  this.link = document.getElementById('link');

  this.buttonVerify = document.getElementById('verificar-resposta');
  this.buttonVerify.addEventListener('click', this.verify);

  this.tipoGrupo = document.getElementById('tipo-grupo');

  this.qtdTentativa = 0;

  this.initFirebase();
}

// A loading image URL.
Parte3Instrucoes.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte3Instrucoes.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte3Instrucoes.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte3Instrucoes.userName.textContent=snapshot.val().id;
    Parte3Instrucoes.link.setAttribute('href','parte3-lancamento.html?k='+QueryString.k+"&e="+QueryString.e);
  });
}

 var ok = 0;
// Saves a new message on the Firebase DB.
Parte3Instrucoes.prototype.verify = function() {
  
  Parte3Instrucoes.qtdTentativa = Parte3Instrucoes.qtdTentativa+1;

  Parte3Instrucoes.msgCerta1.setAttribute('hidden','');
  Parte3Instrucoes.msgErrada1.setAttribute('hidden','');
  Parte3Instrucoes.msgCerta2.setAttribute('hidden','');
  Parte3Instrucoes.msgErrada2.setAttribute('hidden','');  

 

  // valores para NPC
  var resposta1Certa=6;
  var resposta2Certa=6;


  if(Parte3Instrucoes.tipoGrupo.value=='PC') {
    resposta2Certa=0;
  }

  if(Parte3Instrucoes.resposta1.value==resposta1Certa) {
    Parte3Instrucoes.msgCerta1.removeAttribute('hidden');
    ok++;
  } else {
    Parte3Instrucoes.msgErrada1.removeAttribute('hidden');
    ok = 0;
  }
  
  if(Parte3Instrucoes.resposta2.value==resposta2Certa) {
    Parte3Instrucoes.msgCerta2.removeAttribute('hidden');
    ok++;
  } else {
    Parte3Instrucoes.msgErrada2.removeAttribute('hidden');
    ok = 0;
  }
console.log(ok);
  if(ok==2) {
    firebase.database().ref('/experiment/'+Parte3Instrucoes.experimentoChave+'/participant/'+QueryString.k+'/answer/parte2QtdTentativas')
    .set(Parte3Instrucoes.qtdTentativa).then(function(snapshot) {
      des();
        Parte3Instrucoes.link.removeAttribute('hidden');
        Parte3Instrucoes.buttonVerify.setAttribute('hidden','');
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
    });    
  }
};

function init() {
  window.Parte3Instrucoes = new Parte3Instrucoes(QueryString.e);
};

function des()
{
  if(ok==2){
  var coe = document.getElementById('verificar-resposta');
        coe.disabled=true;
}
}
