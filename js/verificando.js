/*var tid = setInterval(init, 2000);*/

function Parte2Instrucoes(experimentoChave) {
   this.experimentoChave = experimentoChave;

   this.loading = document.getElementById("loading");

   this.userName = document.getElementById('user-name');
   this.link = document.getElementById('link');
  this.initFirebase();
}

Parte2Instrucoes.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};

Parte2Instrucoes.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte2Instrucoes.userName.textContent=snapshot.val().id;

  });
}

function init() {
  window.Parte2Instrucoes = new Parte2Instrucoes(QueryString.e);
  var div = document.getElementById("teste").innerHTML = "Verificando jogares disponiveis.";
  var qualgrupo = firebase.database() .ref("/experiment/" + Parte2Instrucoes.experimentoChave+'/participant/' + QueryString.k );
      qualgrupo.orderByChild("number") .on("child_added", function(data) {
      console.log('Numero do grupo: ' + data.val() .number);
     var y = data.val() .number;

  var playersRef = firebase.database() .ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/group/' + y ).limitToFirst(1);

  playersRef.orderByKey() .on("child_added", function(data) {
   console.log('KEY:' + data.key);

   var z= data.key;

   var qualgrupo1 = firebase.database() .ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/group/' + y );
      qualgrupo1.orderByChild(z) .on("child_added", function(data) {
      console.log('Grupo : ' + data.val());
      var f = data.val();

      var qualgrupo2 = firebase.database() .ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/participant/' + f + '/answer/parte' );
      qualgrupo2.orderByChild('/decisaodaparte1/') .on("child_added", function(data) {
      console.log('decisaodaparte1 :' + data.val());

     /* var contador = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/');
        contador.set(1);*/

        var contagem = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/geral/');

        var n = y.toString();
      console.log('Valor do Grupo: ' + n)

      contagem.transaction(function(contador) {
      return contador = contador +1 ;
      });
      var va =1;
      var vb =2;
      var vc =3;
      var vd =4;
      var ve =5;
      var vf =6;
      var um = 0;
      var dois=0;
      var tres=0;
      var quatro=0;
      var cinco=0;
      var seis=0;
      var cont=0

      if(data.val()== va){
        var contagemA = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/um/');

      contagemA.transaction(function(contador) {
      return contador = contador +1 ;
      });
    }
      if (data.val()== vb){
        var contagemB = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/dois/');

      contagemB.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (data.val()== vc){
        var contagemC = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/tres/');

      contagemC.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (data.val()== vd){
        var contagemD = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/quatro/');

      contagemD.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (data.val()== ve){
        var contagemE = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/cinco/');

      contagemE.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (data.val()== vf){
        var contagemF = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+ '/' + n + '/seis/');

      contagemF.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }

      

      var geralresult= firebase.database() .ref("/experiment/" + Parte2Instrucoes.experimentoChave+'/contador/'+ n + '/' + QueryString.k + '/');
      geralresult.orderByChild(n) .once("child_added", function(data) {
      console.log('valor geral: ' + data.val() .geral);
      var geralres = data.val() .geral;
      var umres= data.val() .um;
      var doisres= data.val() .dois;
      var tresres= data.val() .tres;
      var quatrores= data.val() .quatro;
      var cincores= data.val() .cinco;
      var seisres= data.val() .seis;
      console.log('Valor geral : '+ geralres);




      if(geralres==3){
                
        
        var div = document.getElementById("teste").innerHTML = "Montando Grupo";
        setTimeout(function(){
        window.location.href="parte-final.html?k="+QueryString.k+"&e="+QueryString.e;
        }, 5000);
          
      }
      if(geralres>3)
      {
        var zerargeral = firebase.database().ref('/experiment/'+Parte2Instrucoes.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/geral/');
        zerargeral.set(0);
        window.location.href="verificando.html?k="+QueryString.k+"&e="+QueryString.e;
      }
      else
      {
        setTimeout(function(){
          Parte2Instrucoes.loading.setAttribute('hidden','');
          window.location.href="verificando.html?k="+QueryString.k+"&e="+QueryString.e;
        }, 10000);
      }
    

    });
  });
   });
      });
   });

}


/*var tid = setInterval(init, 2000);
function abortTimer() { //Não há necessidade de lembrar a função (é um intervalo, ele vai entrar em loop contínuo) 
  clearInterval(tid);
}*/