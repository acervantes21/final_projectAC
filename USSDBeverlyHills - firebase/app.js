//js file
$(function(){
  $('.custom-modal').click(function(e){
    e.preventDefault();
    var mymodal = $('#joinModal');
    mymodal.find('.modal-title').text('Try a Tiny Tigers Class');
    mymodal.modal('show');
    
  });
})

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyAK-1lFr2Xfu4csW7-h-ZytxpxyEhHx_yo",
    authDomain: "beverlyhillskarate-1323c.firebaseapp.com",
    databaseURL: "https://beverlyhillskarate-1323c.firebaseio.com",
    projectId: "beverlyhillskarate-1323c",
    storageBucket: "beverlyhillskarate-1323c.appspot.com",
    messagingSenderId: "672169467312"
  };
  firebase.initializeApp(config);

  $(document).ready(function() {
  var messageAppReference = firebase.database();

  $('#message-form').submit(function(event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault();

    // grab user message input
    var message = $('#message').val();

    // clear message input (for UX purposes)
    $('#message').val('');

    // create a section for messages data in your db
    var messagesReference = messageAppReference.ref('messages');

    // use the set method to save data to the messages
    messagesReference.push({
      message: message,
      votes: 0
    })
  })
})