// //js file
// $(function(){
//   $('.custom-modal').click(function(e){
//     e.preventDefault();
//     var mymodal = $('#joinModal');
//     mymodal.find('.modal-title').text('Try a Tiny Tigers Class');
//     mymodal.modal('show');
    
//   });
// })

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

  var messageAppReference = firebase.database();

  $(document).ready(function() {
    

    $('#submit-btn').click(function(event) {
      event.preventDefault();
      console.log('inhere')
      // by default a form submit reloads the DOM which will subsequently reload all our JS
      // to avoid this we preventDefault()
      

      // grab user message input
      var userName = $('#senders-name').val();
      var lastName = $('#senders-last-name').val();
      var message = $('#message-text').val();
      var emailAddress = $('#emailAddress').val();
      console.log('userName', userName)

      // clear message input (for UX purposes)
      $('#message-text').val('');
      $('#senders-name').val('');
      $('#senders-last-name').val('');
      $('#emailAddress').val('');

      // create a section for messages data in your db
      var messagesReference = messageAppReference.ref('messages');
      //close modal
      $('#joinModal').modal('hide');
      // use the set method to save data to the messages
      messagesReference.push({
        firstName: userName,
        lastName: lastName,
        email: emailAddress,
        message: message
      });
    });
});

function getSignUpInfo() {

  // use reference to appgit st database to listen for changes in messages data

  messageAppReference.ref('messages').on('value', function(results) {

    // iterate through results coming from database call; messages

    results.forEach(function (info) {
      var messaged = info.val().message;
      var firstName = info.val().userName;
      var lastName = info.val().lastName;
      console.log('messaged', messaged)
      // bind the results to the DOM
      var mymodal = $('#joinModal');
      mymodal.find('.modal-title').text(firstName);
    });
  })
}