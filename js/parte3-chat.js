'use strict';

// Initializes Parte3Chat.
function Parte3Chat(experimentoChave) {
  this.experimentoChave = experimentoChave;

  // Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages');
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.userName = document.getElementById('user-name');
  
  this.sala = document.getElementById('sala');
  //var buttonTRefresh = this.refresh.bind(this);
  //this.sala.addEventListener('keyup', this.refreshList.bind(this));

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  this.txtCountdown = document.getElementById('txtCountdown');
  this.btnProximo = document.getElementById('btnProximo');
  
  this.txtWatting = document.getElementById('txtWatting');

  // Template for messages.
  this.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"><div class="name"></div></div></div>' +
      '<br/><div class="message"></div>' +
    '</div>';

  this.naSala = false;

  this.initFirebase();
}

Parte3Chat.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    Parte3Chat.userName.textContent=snapshot.val().id;
    Parte3Chat.sala.value = snapshot.val().group.number;
    Parte3Chat.btnProximo.setAttribute('href','parte3-decisao.html?k='+QueryString.k+"&e="+QueryString.e);
    Parte3Chat.iAmHere();
  });
};

Parte3Chat.prototype.iAmHere = function() {
  var tableCtrlChat = firebase.database().ref('/experiment/'+Parte3Chat.experimentoChave+'/ctrlChat2/' + Parte3Chat.sala.value);
  tableCtrlChat.push(Parte3Chat.userName.textContent).then(function(snapshot) {
    console.log('CtrlChat Atualizado');
  }).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });

  firebase.database().ref('/experiment/'+Parte3Chat.experimentoChave+'/ctrlChat2/' + Parte3Chat.sala.value).on('value',function(snapshot) {
    var participantsHash={};
    var participants = snapshot.val();
    for(var p in participants) {
      if(!participantsHash[p]) {
        participantsHash[p]=true;
      }
    }


      

  var numerogrupo = firebase.database().ref('/experiment/'+Parte3Chat.experimentoChave+'/participant/' + QueryString.k + '/group/' + 'number').once('value').then(function(snapshot) {
       var group_number = snapshot.val();
       console.log('Numero do Grupo : ' + group_number);


       var adc = firebase.database().ref('/experiment/'+ Parte3Chat.experimentoChave + '/contadorchat2/' + group_number).once('value').then(function(snapshot) {
       var adc_number = snapshot.val();
       console.log('Inicial + 1   : ' + adc_number);
       var maisum = adc_number + 1 ;

       var acrescenta = firebase.database().ref('/experiment/'+ Parte3Chat.experimentoChave + '/contadorchat2/' + group_number);
        acrescenta.set(maisum);

      var ref = firebase.database().ref('/experiment/'+ Parte3Chat.experimentoChave + '/contadorchat2/' + group_number);
       ref.once("value", function(snapshot) {
  console.log(snapshot.val());
  var valorbolado = snapshot.val();
        


    if(valorbolado>=3) {
      firebase.database().ref('/experiment/'+Parte3Chat.experimentoChave+'/ctrlChat2/' + Parte3Chat.sala.value).off();
      Parte3Chat.startChat();
    }

    }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
    });
  });
  });
  });
};


// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte3Chat.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};

Parte3Chat.prototype.startChat = function() {
  Parte3Chat.loadMessages();
  Parte3Chat.txtWatting.remove();
  Parte3Chat.messageInput.disabled=false;
  Parte3Chat.txtCountdown.removeAttribute('hidden');
  setTimeout(startCountdown,1000);
};

Parte3Chat.prototype.refreshList = function() {
  this.messageList.textContent='';
  this.initFirebase();
};

// Loads chat messages history and listens for upcoming ones.
Parte3Chat.prototype.loadMessages = function() {
  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('/experiment/'+this.experimentoChave+'/messages2/'+this.sala.value);
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.participant, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
Parte3Chat.prototype.saveMessage = function(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
	//var currentUser = this.auth.currentUser;
    // Add a new message entry to the Firebase Database.
    this.messagesRef.push({
      participant: this.userName.textContent,//currentUser.displayName,
      text: this.messageInput.value,
    }).then(function() {
      // Clear message text field and SEND button state.
      Parte3Chat.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
};

// Resets the given MaterialTextField.
Parte3Chat.prototype.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// A loading image URL.
Parte3Chat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
Parte3Chat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = Parte3Chat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name+": ";
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
Parte3Chat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
    this.txtWatting.setAttribute('disabled', 'true');
  }
};

Parte3Chat.prototype.refresh = function() {
  this.messageList.value='';
};

var minuto = 2;
var segundo = 1;
var contagemRegressiva;
var zeroSegundo = "";

function startCountdown(){
  if(segundo==0) {
    segundo=60;
    minuto--;
  }
  if(minuto<0) {
    Parte3Chat.txtCountdown.setAttribute('style','display:none');
    Parte3Chat.btnProximo.removeAttribute('style');
    Parte3Chat.btnProximo.setAttribute('style','display:block');
    Parte3Chat.messageInput.disabled=true;
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
}

function init() {
  window.Parte3Chat = new Parte3Chat(QueryString.e);
};