/*var tid = setInterval(init, 2000);*/

function aguarde(experimentoChave) {
   this.experimentoChave = experimentoChave;

   this.loading = document.getElementById("loading");

   this.userName = document.getElementById('user-name');
   this.link = document.getElementById('link');

}

aguarde.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.initFirebase();
  /*this.getID();*/
};

/*aguarde.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    aguarde.userName.textContent=snapshot.val().id;

  });
}
*/

  function init() {

  document.getElementById('escondido').style.visibility = 'hidden';
  document.getElementById('escondido2').style.visibility = 'hidden';
  document.getElementById('escondido3').style.visibility = 'hidden';
  document.getElementById('escondido4').style.visibility = 'hidden';
  document.getElementById('loading').style.visibility = 'visible';


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

var numeroconsulta = document.getElementById('message');
var consulta = numeroconsulta.value;



  var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {
     var id_partida = data.key;

     /*var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
     idparticipante.orderByKey() .on("child_added", function(data) {
     
     var id_participante = data.key;*/

    /* var numerogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      numerogrupo.orderByChild('/group/') .once("child_added", function(data) {
     
      var group_number = data.val().number;

      var tipogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      tipogrupo.orderByChild('/group/') .once("child_added", function(data) {
     
      var group_type = data.val().tipo;*/

      var msg_var = firebase.database() .ref('/experiment/'+id_partida+'/participant/');
      msg_var.orderByKey() .on("child_added", function(data) {
      var msg = data.val();


      var idpart = msg.id;



      if(idpart == consulta)
      {
             var soma = msg.resultado
      }
      if(soma== undefined)
      {
        return;
      }

    
      /*var msgpart = msg.text;
      var idpart = msg.participant

      if(msgpart == undefined || idpart == undefined)
      {
          return;
      }
      else
      {
*/if(soma == 1){


    var local=document.getElementById('tabela');
    var tblBody = local.tBodies[0];
    var newRow = tblBody.insertRow(-1);
    var newCell0 = newRow.insertCell(0);
    newCell0.innerHTML = '<td>'+ consulta +' Real </td>';
    var newCell1 = newRow.insertCell(1);
    newCell1.innerHTML = '<td>'+ soma +'</td>';
    }
    else
    {
      var local=document.getElementById('tabela');
    var tblBody = local.tBodies[0];
    var newRow = tblBody.insertRow(-1);
    var newCell0 = newRow.insertCell(0);
    newCell0.innerHTML = '<td>'+ consulta +' </td>';
    var newCell1 = newRow.insertCell(1);
    newCell1.innerHTML = '<td>'+ soma +' Reais </td>';
    }

     });
     });


}
/*function limpar()
{
  window.location.reload()
}*/

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


function limpar( ){
tbl = document.getElementById('tabela');
objRow = tbl.getElementsByTagName('td');
    objRowSize = objRow.length - 1;
    for( i = objRowSize; i >= 0; i-- ){ // faz um loop de baixo pra cima em todas as linhas
      //alert(i); // mostra uma caixa de alerta. para testes somente
      tbl.deleteRow(i/2);  
    }
}