// //js file
// $(function(){
//   $('.tigers-modal').click(function(e){
//     // e.preventDefault();
//     var mymodal = $('#joinModal');
//     mymodal.find('.modal-title').text('Try a Tiny Tigers Class');
//     mymodal.modal('show');
//   });
//   $('.dragons-modal').click(function(e){
//     // e.preventDefault();
//     var mymodal = $('#joinModal');
//     mymodal.find('.modal-title').text('Try a Little Dragons Class');
//     mymodal.modal('show');
//   });
//   $('.flying-modal').click(function(e){
//     // e.preventDefault();
//     var mymodal = $('#joinModal');
//     mymodal.find('.modal-title').text('Try a Flying Tigers Class');
//     mymodal.modal('show');
//   });
//   $('.adult-modal').click(function(e){
//     // e.preventDefault();
//     var mymodal = $('#joinModal');
//     mymodal.find('.modal-title').text('Try an Adult Class');
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
      

      // grab user info input
      var userName = $('#senders-name').val();
      var lastName = $('#senders-last-name').val();
      var message = $('#message-text').val();
      var emailAddress = $('#emailAddress').val();

      // clear message input (for UX purposes)
      $('#message-text').val('');
      $('#senders-name').val('');
      $('#senders-last-name').val('');
      $('#emailAddress').val('');

      // create a section for userInfo data in your db
      var messagesReference = messageAppReference.ref('userInfo');
      //close modal
      $('#joinModal').modal('hide');
      // use the set method to save data to the messages
      messagesReference.push({
        firstName: userName,
        lastName: lastName,
        email: emailAddress,
        message: message
      });
      getSignUpInfo();
    });

});

function getSignUpInfo() {
  // retrieve sender info when on .on(0)
  // use reference to appgit st database to listen for changes in messages data
  messageAppReference.ref('userInfo').on('value', function(results) {
    // iterate through results coming from database call; messages
    
    results.forEach(function (info) {
      console.log('ingo', info.val().message)
      var messaged = info.val().message;
      var firstName = info.val().firstName;
      var lastName = info.val().lastName;
      var successMod = $('#successModal');
      console.log('info received' , firstName)
      successMod.find('.modal-title').html('USSD Beverly Hills');
      successMod.find('.modal-body').html('Thank you for contacting us ' + firstName +'.  You will hear from us shortly');
      successMod.modal('show');
    });
    
  }, function(error){
       console.log(error)
  })
  
}