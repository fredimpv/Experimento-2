'use strict';

// Initializes Parte2InstrucoesChat.
function SemJogadores(experimentoChave) {
  this.experimentoChave = experimentoChave;
  
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.link = document.getElementById('link');

  this.initFirebase();

  //setTimeout(startCountdown,1000);
}



// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte2InstrucoesChat.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte2InstrucoesChat.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte2InstrucoesChat.userName.textContent=snapshot.val().id;
    /*Parte2InstrucoesChat.link.setAttribute('href','parte2-chat.html?k='+QueryString.k+"&e="+QueryString.e);*/
  });
}


function startCountdown(){

}

function init() {

      uestionario.prototype.setGroup = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/').once('value', function(snapshot) {
    
    var participants = snapshot.val();
    var qtd=1;
    var numeroGrupo=1;
    
    for(var p in participants) {
      console.log("P: "+p);
      if(p == QueryString.k) {

        if(participants[p].group) {
          console.log('Participante já possuí grupo');
          return;
        }
        console.log("Qtd: "+qtd);
        console.log("Participante: "+p);
        console.log("Numero Grupo: "+numeroGrupo);
        break;
      }
      qtd++;
      if(qtd>3) {
        qtd=1;
        numeroGrupo++;
      }
    }
    
    var table = firebase.database().ref('/experiment/'+Questionario.experimentoChave+'/participant/'+QueryString.k+'/group');

    var tipoGrupo = (numeroGrupo%2)==0 ? 'PC' : 'NPC';


    var grupo = {
      number: numeroGrupo,
      tipo: tipoGrupo
    };
    table.set(grupo).then(function(snapshot) {
      console.log('Grupo criado');
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
    });



};