$(document).ready(function(){
  var baseUrl =  'http://devpoint-ajax-example-server.herokuapp.com/api/v1/'
  
  function addToList(id, name){
    return('<li><a class="user_item" href=' + id + '>' + name + '</a><br /><button class="user_edit">Edit</button> - <button class="user_delete">Delete</button></li>')
  }

  $.ajax(baseUrl + 'users', {
    type:'GET',
    success: function(data) {
      // data.users = array
      // interate data.users
      if(data.users.length){
        for(var i = 0; i < data.users.length; i++){
          var user = data.users[i];
        // populate users_list with each users first name
        // use the jQuery append method on Users_list
          $('#users_list').append(addToList(user.id, user.first_name));
        }
      }  else{
         $('#message_div').text('No users found. Please add one!').slideToggle();  
      }
    },
    error: function(data){
      debugger
    }
  });

  $(document).on('click', '.user_delete', function(e){
    var $parent = $(this).parent();
    var userId = $parent.find('.user_item').attr('href');
    $.ajax(baseUrl + 'users/' + userId, {
      type: 'DELETE',
      success: function(data) {
        $parent.slideToggle();
      },
      error: function(data) {
        alert('The user was not deleted. Please try again.');
      }
    });
  });

  // $('.user_item').click(function(e){
  //   e.preventDefault();
  // });

  $(document).on('click', '.user_item', function(e){
    e.preventDefault();
    var userId = $(this).attr('href');
    $.ajax(baseUrl + 'users/' + userId, {
      type: 'GET',
      success: function(data){
        var user = data.user;
        $('#user_name').text(user.first_name + ' ' + user.last_name);
        $('#user_phone').text(user.phone_number);
      },
      error: function(data){
        debugger
      }
    });
  });
  $('#create_user_form').submit(function(e){
    e.preventDefault();
    var formData = $(this).serializeArray();
    $.ajax(baseUrl + 'users', {
      type: 'POST',
      data: formData,  // data: {'user':{'first_name': $('#user_first_name').val(), 'last_name': $('#user_last_name').val(), 'phone_number': $('#user_phone_number').val() }},
      success: function(data){
        $('#user_list').append(addToList(data.user.id, data.user.first_name));
        $('#create_user_form')[0].reset();
      },
      error: function(data){
        console.log(data);
      }
    });
  });

  $(document).on('click', '.user_edit', function(){ 
    var userId = $(this).siblings('a').attr('href');
    $.ajax(baseUrl + 'users/' + userId, {
      type: 'GET',
      success: function(data) {
        $('#edit_user_form').slideToggle();
        $('#edit_user_first_name').val(data.user.first_name);
        $('#edit_user_last_name').val(data.user.last_name);
        $('#edit_user_phone_number').val(data.user.phone_number);
      },
      error: function(data) {
  
      } 
     });
  });

  $('#edit_user_form').submit(function(e){
    e.preventDefault
    var formData = $(this).serializeArray();
    
    // var userId = 
  });

  // $(document).on('click', '.user_delete', function(e){
  //   var $parent = $(this).parent();
  //   var userId = $parent.find('.user_item').attr('href');
  //   $.ajax(baseUrl + 'users/' + userId, {
  //     type: 'DELETE',
  //     success: function(data) {
  //       $parent.slideToggle();
  //     },
  //     error: function(data) {
  //       alert('The user was not deleted. Please try again.');
  //     }
  //   });
  // });
});