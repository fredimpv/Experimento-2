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

  /*Pegando o número do grupo do participante */

var qual_grupo = firebase.database().ref("/experiment/" + aguarde.experimentoChave+'/participant/' + QueryString.k +'/group/number' ).once('value').then(function(snapshot) {
       var qualgrupo = snapshot.val();
       console.log('Numero do Grupo : ' + qualgrupo);
       y= qualgrupo;
       console.log('GGGGGGGGGGGGGGGGGG:'+y);

  /*var qualgrupo = firebase.database() .ref("/experiment/" + aguarde.experimentoChave+'/participant/' + QueryString.k );
      qualgrupo.orderByChild("number") .on("child_added", function(data) {
      console.log(data.val() .number);
     var y = data.val() .number;*/

     /*      ------------------------------------------->     */

     /* Pegando DataKey dos Players */

  var playersRef = firebase.database() .ref('/experiment/'+aguarde.experimentoChave+'/group/' + y ).limitToFirst(1);

  playersRef.orderByKey() .on("child_added", function(data) {
   console.log("DATA KEY DO CANDANGO: " + data.key);

   var z= data.key;

    /* Y - Número do grupo */
    /* Z - Data Key dos Players */
   /*---------------------------------------------------> */


      /* Pegando Qual grupo do usuário */
   var qualgrupo1 = firebase.database() .ref('/experiment/'+aguarde.experimentoChave+'/group/' + y );
      qualgrupo1.orderByChild(z) .on("child_added", function(data) {
      console.log("DATA VERDADEIRA?:" + data.val());
      var f = data.val();
      console.log("FRED BURRO :" + f);


    /* Y - Número do grupo */
    /* Z - Data Key dos Players */
    /* F - Grupo do Player */
   /*---------------------------------------------------> */


      /* Pegando qual foi a decisão da parte 1 */


      var qualgrupo2 = firebase.database() .ref('/experiment/'+aguarde.experimentoChave+'/participant/' + f + '/answer/parte' );
      qualgrupo2.orderByChild('/decisaodaparte1/') .once("child_added", function(data) {
      console.log('Decisao 1: ' + data.val());
      var hola = data.val();
      console.log('holaaa:' + hola);



      var qualgrupo3 = firebase.database() .ref('/experiment/'+aguarde.experimentoChave+'/participant/' + f + '/answer/parte' ).limitToLast(1);
      qualgrupo3.orderByChild('/decisaodaparte2/') .once("child_added", function(data) {
      console.log('Decisao 2 : ' + data.val());
      var hola2 = data.val();
      console.log('holaaa2 :' + hola2);
    /* Y - Número do grupo */
    /* Z - Data Key dos Players */
    /* F - Grupo do Player */
   /*---------------------------------------------------> */

      
      var qualgrupo1 = firebase.database() .ref("/experiment/" + aguarde.experimentoChave+'/participant/' + QueryString.k + '/group/');
      qualgrupo1.orderByChild('number') .once("child_added", function(data) {
      var numerobanco = (data.val());
      console.log('Numero do Grupo: '+ numerobanco);

      var numerobancostring = numerobanco.toString();


      var numerolider = firebase.database() .ref('/experiment/'+ aguarde.experimentoChave +'/ctrlider/'+ numerobanco + '/lideres/' + QueryString.k);
      numerolider.orderByChild(numerobancostring) .once("child_added", function(data) {
      console.log(data.val());
      var t = data.val();
      console.log('Seu número: ' + t);

     /* var contador = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/');
        contador.set(1);*/

        var contagem = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+ '/' + y + '/geral/');

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

      if(hola == va){
        var contagemA = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+ '/' +y + '/um/' );

      contagemA.transaction(function(contador) {
       return contador = contador +1 ;
      });
    }
      if (hola == vb){
        var contagemB = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/dois/');

      contagemB.transaction(function(contador) {
       return contador = contador +1 ;
      });
      }
      if (hola  == vc){
        var contagemC = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/tres/');

      contagemC.transaction(function(contador) {
       return contador = contador +1 ;
      });
      }
      if (hola  == vd){
        var contagemD = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/quatro/');

      contagemD.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (hola  == ve){
        var contagemE = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/cinco/');

      contagemE.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }
      if (hola  == vf){
        var contagemF = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/seis/');

      contagemF.transaction(function(contador) {
      return contador = contador +1 ;
      });
      }

      var n = y.toString();


      var geralresult= firebase.database() .ref("/experiment/" + aguarde.experimentoChave+'/contador1/'+ y + '/' + QueryString.k);
      geralresult.orderByChild(n) .once("child_added", function(data) {
      console.log('Caminho : experiment / '+ aguarde.experimentoChave+'/contador1/'+ y + '/' + QueryString.k +'/'+ n + '/' );
      console.log('Geral: ' + data.val() .geral);
      var geralres = data.val() .geral;
      var umres= data.val() .um;
      var doisres= data.val() .dois;
      var tresres= data.val() .tres;
      var quatrores= data.val() .quatro;
      var cincores= data.val() .cinco;
      var seisres= data.val() .seis;
      console.log('UM: '+data.val() .um);
      console.log('DOIS: '+data.val() .dois);
      console.log('TRES: '+data.val() .tres);
      console.log('QUATRO: '+data.val() .quatro);
      console.log('CINCO: '+data.val() .cinco);
      console.log('SEIS: '+data.val() .seis);




      if(geralres==3){
          if(umres >= 3 || doisres >= 3 || tresres >= 3 || quatrores >= 3 || cincores >= 3 || seisres >= 3){
        var nzerei = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/'+QueryString.k+'/answer/vaizerarpt1');
        nzerei.set(false);
         window.location.href="parte3-instrucoes-pc-lider.html?k="+QueryString.k+"&e="+QueryString.e;

          }
          else
            {
        var zerei = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/'+QueryString.k+'/answer/vaizerarpt1');
        zerei.set(true);
        console.log('PAGINA FINAL')
        window.location.href="parte3-instrucoes-pc-lider.html?k="+QueryString.k+"&e="+QueryString.e;
        /*window.location.href="parte3-instrucoes-pc.html?k="+QueryString.k+"&e="+QueryString.e;*/


            } 
      }
      if(geralres>3)
      {
        console.log("ENTROU NO RES > 3 ")
        var zerargeral = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/geral/');
        zerargeral.set(0);
        var zerarum = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/um/');
        zerarum.set(0);
        var zerardois = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/dois/');
        zerardois.set(0);
        var zerartres = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/tres/');
        zerartres.set(0);
        var zerarquatro = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/quatro/');
        zerarquatro.set(0);
        var zerarcinco = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/cinco/');
        zerarcinco.set(0);
        var zerarseis = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador1/'+y+'/'+QueryString.k+'/'+ y + '/seis/');
        zerarseis.set(0);
        console.log('ZEROU TUDO E ATUALIZOU')
        window.location.href="aguardept1-lider.html?k="+QueryString.k+"&e="+QueryString.e;
      }
      if(geralres>=1)
      {


          console.log("ENTROU NO RES 1");
         var var_msg = firebase.database().ref('/experiment/'+ aguarde.experimentoChave + '/contador1/' + y+'/' + QueryString.k+ '/' + y).once('child_changed').then(function(snapshot) {
          var msg = snapshot.val();
          console.log('Menssagens : ' + msg);
          if(msg == 2)
          {
            var var_msg = firebase.database().ref('/experiment/'+ aguarde.experimentoChave + '/contador1/' + y+'/' + QueryString.k+ '/' + y).once('child_changed').then(function(snapshot) {
          var msg = snapshot.val();
          console.log('Menssagens : ' + msg);
          
       
            if(msg ==3)
            {
            aguarde.loading.setAttribute('hidden','');
           window.location.href="aguardept1-lider.html?k="+QueryString.k+"&e="+QueryString.e;

            }
             });
          }
        /*var zerargeral = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/geral/');
        zerargeral.set(0);
        var zerarum = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/um/');
        zerarum.set(0);
        var zerardois = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/dois/');
        zerardois.set(0);
        var zerartres = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/tres/');
        zerartres.set(0);
        var zerarquatro = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/quatro/');
        zerarquatro.set(0);
        var zerarcinco = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/cinco/');
        zerarcinco.set(0);
        var zerarseis = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/contador/'+y+'/'+QueryString.k+'/'+ y + '/seis/');
        zerarseis.set(0);*/
          
 
        });


    }
      else
      {
        console.log("ENTROU NO ELSE");
        setTimeout(function(){
          aguarde.loading.setAttribute('hidden','');
          console.log('ATUALIZOU SEM ZERAR')
           window.location.href="aguardept1-lider.html?k="+QueryString.k+"&e="+QueryString.e;
        }, 10000);
      }
    

    });
  });
   });
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