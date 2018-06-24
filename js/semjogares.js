/*var tid = setInterval(init, 2000);*/

function aguarde(experimentoChave) {
   this.experimentoChave = experimentoChave;

   this.loading = document.getElementById("loading");

   this.userName = document.getElementById('user-name');
   this.link = document.getElementById('link');
   this.initFirebase();

}

aguarde.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};

aguarde.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    aguarde.userName.textContent=snapshot.val().id;

  });
}

function init() {
  window.aguarde = new aguarde(QueryString.e);

  console.log(aguarde.experimentoChave);

  var numerogrupo = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/' + QueryString.k + '/group/' + 'number').once('value').then(function(snapshot) {
       var group_number = snapshot.val();
       console.log('Numero do Grupo : ' + group_number);


   var estorou = firebase.database().ref('/experiment/'+ aguarde.experimentoChave +'/ctrlplayers/'+ group_number+'/jogador/');
        estorou.set(10);
});

}


