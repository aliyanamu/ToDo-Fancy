function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/api/google-signin`,
    data: {
      googleToken: id_token
    }
  })
    .done(function(data) {
      if (data.token) {
        localStorage.setItem('token', data.token)
        $('.backLeft').css({
          "width": "200%",
          "background": "#f9f9f9",
          "transition": "all 0.5s ease"
        })
        $('#logOut').show()
        $('.backRight').hide()
        $('#slideBox').animate({
          'marginLeft' : '100%'
        }, 1000)
        $('.topLayer').animate({
          'marginLeft' : '0'
        }, 1000)
        $("#home").show().trigger(getTodos())
      }
      else alertify.alert("Sorry, your connection to database is interrupted")
    })
    .fail(err => {
      alertify.alert(err.message)
    })
} 

//NOt recommended
// function onSignIn(googleUser) {

//   let profile = googleUser.getBasicProfile()
//   $.ajax({
//     method: "POST",
//     url: `http://localhost:3000/api/google-signin`,
//     data: {
//       email: profile.getEmail(),
//       name: profile.getName()
//     }
//   })
//     .done(function(data) {
//       if (data.token) {
//         localStorage.setItem('token', data.token)
//         $('.backLeft').css({
//           "width": "200%",
//           "background": "#f9f9f9",
//           "transition": "all 0.5s ease"
//         })
//         $('#logOut').show()
//         $('.backRight').hide()
//         $('#slideBox').animate({
//           'marginLeft' : '100%'
//         }, 1000)
//         $('.topLayer').animate({
//           'marginLeft' : '0'
//         }, 1000)
//         $("#home").show()
//       }
//       else alertify.alert("Sorry, your connection to database is interrupted")
//     })
//     .fail(err => {
//       console.log(err, "masuk")
//       alertify.alert(err.message)
//     })
// }

function signOut() {
  let auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
}