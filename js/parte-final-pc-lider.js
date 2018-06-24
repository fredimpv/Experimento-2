'use strict';

// Initializes Geral.
function ParteFinal(experimentoChave) {
  this.experimentoChave = experimentoChave;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');
  this.pontos = document.getElementById('pontos');
  this.valorReceber = document.getElementById('valor-receber');
  this.buttonLink = document.getElementById('button-link');

  this.loading = document.getElementById("loading");

  this.initFirebase();
}

// A loading image URL.
ParteFinal.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
ParteFinal.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
  this.getPontos();
};

ParteFinal.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    ParteFinal.userName.textContent=snapshot.val().id;
  });
}
ParteFinal.prototype.getPontos = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+ QueryString.k+'/answer').once('value').then(function(snapshot) {
    ParteFinal.loading.setAttribute('hidden','');

    console.log(snapshot.val().vaizerarpt1);

    if(snapshot.val().vaizerarpt1==true & snapshot.val().vaizerarpt2==false)
    {

      firebase.database().ref('/experiment/'+ParteFinal.experimentoChave+'/participant/'+ QueryString.k+'/answer/parte').once('value').then(function(snapshot) {    

    var pontosParte1 = 0;

    var pontosParte2 = 0;
    if(snapshot.val().decisaodaparte2) {
      pontosParte2 = parseInt(snapshot.val().decisaodaparte2);
    }    
    var pontos = pontosParte1+(pontosParte2*2);
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+QueryString.k + '/resultado/');
        resultadofinal.set(pontos);
  });
        
    }
    if(snapshot.val().vaizerarpt1==false & snapshot.val().vaizerarpt2==true)
    {
      firebase.database().ref('/experiment/'+ParteFinal.experimentoChave+'/participant/'+ QueryString.k+'/answer/parte').once('value').then(function(snapshot) {    

    var pontosParte2 = 0;

    var pontosParte1 = 0;
    if(snapshot.val().decisaodaparte1) {
      pontosParte1 = parseInt(snapshot.val().decisaodaparte1);
    }    
    var pontos = pontosParte1+pontosParte2;
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+QueryString.k + '/resultado/');
        resultadofinal.set(pontos);
  });
    }
    if(snapshot.val().vaizerarpt1==false & snapshot.val().vaizerarpt2==false)
    {
      firebase.database().ref('/experiment/'+ParteFinal.experimentoChave+'/participant/'+ QueryString.k+'/answer/parte').once('value').then(function(snapshot) {    

    var pontosParte2 = 0;
    if(snapshot.val().decisaodaparte2) {
      pontosParte2 = parseInt(snapshot.val().decisaodaparte2);
    } 
    var pontosParte1 = 0;
    if(snapshot.val().decisaodaparte1) {
      pontosParte1 = parseInt(snapshot.val().decisaodaparte1);
    }    
    var pontos = pontosParte1+(pontosParte2*2);
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+QueryString.k + '/resultado/');
        resultadofinal.set(pontos);
  });
    }
    if(snapshot.val().vaizerarpt1==true & snapshot.val().vaizerarpt2==true)
    {
      var pontosParte1 = 0;
      var pontosParte2 = 0;
    var pontos = pontosParte1+(pontosParte2)*2;
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+QueryString.k + '/resultado/');
        resultadofinal.set(pontos);
    }

    });
  this.dateEnd = new Date();
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+QueryString.k+'/end/')
    .set(this.dateEnd.getTime()).then(function(snapshot) {
        console.info('Finish');
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
    });
}

function init() {
  window.ParteFinal = new ParteFinal(QueryString.e);

     
}