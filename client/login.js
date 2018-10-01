$(document).ready(function(){
  let token = localStorage.getItem('token')
  if (token) {
    $("#entrance").hide()
    $("#home").show()
    $('#logOut').show()
  } else {
    $("#entrance").show()
    $("#home").hide()
    $('#logOut').hide()
  }
  
  $('#goRight').on('click', function(){
    $('.backRight').show()
    $('#slideBox').animate({
      'marginLeft' : '0'
    })
    $('.topLayer').animate({
      'marginLeft' : '100%'
    })
  })
  $('#signUp').on('click', function(e){
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: `http://localhost:3000/api/register`,
      data: {
        name: $('#username-signup').val(),
        email: $('#email-signup').val(),
        password: $('#password-signup').val()
      },
      dataType: "json"
    })
      .done(data => {
        console.log(data.token)
        localStorage.setItem('token', data.token)
        $('.backLeft').css({
          "width": "200%",
          "background": "#f9f9f9",
          "transition": "all 0.5s ease"
        })
        $('#logOut').show()
        $('.backRight').hide()
        $('#slideBox').animate({
          'marginLeft' : '-100%'
        }, 1000)
        $('.topLayer').animate({
          'marginLeft' : '-200%'
        }, 1000)
        $("#home").show()
        setTimeout(function() { window.location = window.location}, 1000)
      })
      .fail(err => {
        let res = err.responseJSON.message, errlist = []
        res = res.substring(24, res.length).split(',')
        res.forEach(elem => {
          elem = elem.split(': ')
          errlist.push(elem[1])
        })

        let errStr = errlist.join(', ')
        alertify.alert(errStr.substr(0, errStr.length-1))
      })
  })
  $('#logIn').on('click', function(e){
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: `http://localhost:3000/api/login`,
      data: {
        email: $('#email-login').val(),
        password: $('#password-login').val()
      },
      dataType: "json"
    })
      .done(data => {
        console.log(data.token)
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
        $("#home").show()
        setTimeout(function() { window.location = window.location}, 1000)
      })
      .fail(err => {
        console.log(err, "error login")
        alertify.alert(err.responseJSON.message)
      })
  })
  $('#logOut').on('click', function(e){
    e.preventDefault()
    $('#slideBox').animate({
      'marginLeft' : '50%'
    }, 1000)
    $('.topLayer').animate({
      'marginLeft' : '0'
    })
    $('#logOut').hide()
    $("#home").hide()
    setTimeout(function() { window.location = window.location; localStorage.clear()}, 1000)
  })
  $('#goLeft').on('click', function(){
    if (window.innerWidth > 769){
      $('#slideBox').animate({
        'marginLeft' : '50%'
      })
    }
    else {
      $('#slideBox').animate({
        'marginLeft' : '20%'
      })
    }
    $('.topLayer').animate({
      'marginLeft': '0'
    })
  })
})
