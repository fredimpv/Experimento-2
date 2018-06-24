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





  document.getElementById('somio').style.visibility = 'hidden';
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
          document.getElementById('somio').style.visibility = 'visible';
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




var numeroconsulta = document.getElementById('message');
var consulta = numeroconsulta.value;



  var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;
     console.log(id_partida);


     /*var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
     idparticipante.orderByKey() .on("child_added", function(data) {

     var id_participante = data.key;*/

    /* var numerogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      numerogrupo.orderByChild('/group/') .once("child_added", function(data) {

      var group_number = data.val().number;

      var tipogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      tipogrupo.orderByChild('/group/') .once("child_added", function(data) {

      var group_type = data.val().tipo;*/

      var msg_var = firebase.database() .ref('/experiment/'+id_partida+'/messages/' + consulta);
      msg_var.orderByKey() .on("child_added", function(data) {

      var msg = data.val();



    
      var msgpart = msg.text;
      var idpart = msg.participant;

      if(msgpart == undefined || idpart == undefined || msgpart == '[object Object]' || idpart == '[object Object]')
      {
          
          return;
      }
      else
      {

    var local=document.getElementById('tabela');
    var tblBody = local.tBodies[0];
    var newRow = tblBody.insertRow(-1);
    var newCell0 = newRow.insertCell(0);
    newCell0.innerHTML = '<td>'+ consulta + '</td>';
    var newCell1 = newRow.insertCell(1);
    newCell1.innerHTML = '<td>'+ idpart + '</td>'; 
    var newCell2 = newRow.insertCell(2);
    newCell2.innerHTML = '<td>'+ msgpart + '</td>';
    }

     });
     });
           });
   });
               });
   });


}
function limpar()
{
  window.location.reload()
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

function fnExcelReport()
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('tabela'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);
}