window.onscroll = function() {
  stickyHeader()
}

var navbar = document.getElementById("myNavbar");
var sticky = navbar.offsetTop;

function stickyHeader(){
  if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
  }
  else {
      navbar.classList.remove("sticky");
  }
}


function myFunction()
{
  var x = document.getElementById("myTopnav");
  if(x.className === "navbar")
  {
    x.className += " responsive";
  }
  else{
    x.className = "navbar";
  }
}



// MODALS ///////////////
$(document).ready(function(){
  $(document).load(function(){
    $("#myModal").modal("show");
  });
});




// ANIMATIONS ///

// Model _SECTION ///

$(document).ready(function () {
    $(window).scroll(function () {
      $("#model-headings").fadeIn(2500);
    });
  });



$(document).ready(function () {
  $("#spaceShip").click(function () {
    $("#spaceShip-h3").fadeIn(1000);
    $("#spaceShip-p").fadeIn(1200);
  });
});


$(document).ready(function () {
  $("#spaceShip").click(function () {
   $("#spaceShip").animate({
     top: '5%'
   });
 });
});




$(document).ready(function () {
  $("#rocketM").click(function () {
    $("#rocketMh3").fadeIn(1000);
    $("#rocketMp").fadeIn(1200);
  });
});


$(document).ready(function () {
  $("#rocketM").click(function () {
    $("#rocketM").animate({
      top: '5%'
    });
  });
});

// button animation //////////////////////////////////
$(document).ready(function () {
  $("#btn-models").mouseover(function () {
    $("#btn-models").animate({
      width: '320px',
      height: '100px',
      fontSize: '40px',
      opacity: '0.6',

    });
    $("#btn-models").css('background-color', '#ff3333');
    $("#btn-models").css('border', '5px solid black');
    $("#btn-models").css('border-radius', '35px');
  });
});

$(document).ready(function () {
  $("#btn-models").mouseleave(function () {
    $("#btn-models").animate({
      width: '250px',
      height: '80px',
      fontSize: '30px',
      opacity: '1',

    });
    $("#btn-models").css('background-color', '#66b3ff');
    $("#btn-models").css('border', '3px solid black');
    $("#btn-models").css('border-radius', '18px');
  });
});

// Game _SECTION////////////////////////////////
$(document).ready(function () {
  $(window).scroll(function () {
    $("#game-headings").fadeIn(1500);
  });
});


$(document).ready(function () {
 $("#rocketFrenzy").click(function () {
  $("#rocketFrenzy").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#rocketFrenzy").click(function () {
  $("#rocketh3").fadeIn(1000);
  $("#rocketp").fadeIn(1200);
});
});




$(document).ready(function () {
$("#invaderKill").click(function () {
  $("#invaderKill").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#invaderKill").click(function () {
  $("#invaderh3").fadeIn(1000);
  $("#invaderp").fadeIn(1200);
});
});





$(document).ready(function () {
$("#hacker").click(function () {
  $("#hackerh3").fadeIn(1000);
  $("#hackerp").fadeIn(1200);
});
});


$(document).ready(function () {
$("#hacker").click(function () {
  $("#hacker").animate({
    top: '5%'
  });
});
});

// button animation //////////////////////////////////
$(document).ready(function () {
$("#btn-games").mouseover(function () {
  $("#btn-games").animate({
    width: '320px',
    height: '100px',
    fontSize: '40px',

    opacity: '0.6'
  });
  $("#btn-games").css('background-color', '#00b300');
  $("#btn-games").css('border', '5px solid black');
  $("#btn-games").css('border-radius', '35px');
});
});

$(document).ready(function () {
$("#btn-games").mouseleave(function () {
  $("#btn-games").animate({
    width: '250px',
    height: '80px',
    fontSize: '30px',
    opacity: '1',

  });
  $("#btn-games").css('background-color', '#66b3ff');
  $("#btn-games").css('border', '3px solid black');
  $("#btn-games").css('border-radius', '18px');
});
});


////////////////Design Section////////////////////

$(document).ready(function () {
  $(window).scroll(function () {
    $("#design-headings").fadeIn(5000);
  });
});


$(document).ready(function () {
 $("#design1").click(function () {
  $("#design1").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#design1").click(function () {
  $("#design1-h3").fadeIn(1000);
  $("#design1-p").fadeIn(1200);
});
});




$(document).ready(function () {
$("#design2").click(function () {
  $("#design2").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#design2").click(function () {
  $("#design2-h3").fadeIn(1000);
  $("#design2-p").fadeIn(1200);
});
});





$(document).ready(function () {
$("#design3").click(function () {
  $("#design3-h3").fadeIn(1000);
  $("#design3-p").fadeIn(1200);
});
});


$(document).ready(function () {
$("#design3").click(function () {
  $("#design3").animate({
    top: '5%'
  });
});
});

// button animation //////////////////////////////////
$(document).ready(function () {
$("#btn-designs").mouseover(function () {
  $("#btn-designs").animate({
    width: '320px',
    height: '100px',
    fontSize: '40px',
    opacity: '0.6',

  });
  $("#btn-designs").css('background-color', '#262626');
  $("#btn-designs").css('border', '5px solid black');
  $("#btn-designs").css('border-radius', '35px');
});
});

$(document).ready(function () {
$("#btn-designs").mouseleave(function () {
  $("#btn-designs").animate({
    width: '250px',
    height: '80px',
    fontSize: '30px',
    opacity: '1',
  });
  $("#btn-designs").css('background-color', '#66b3ff');
  $("#btn-designs").css('border', '3px solid black');
  $("#btn-designs").css('border-radius', '18px');
});
});


// MERCH SECTION////////////////////////////////



$(document).ready(function () {
 $("#merch1").click(function () {
  $("#merch1").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#merch1").click(function () {
  $("#design4-h3").fadeIn(1000);
  $("#design4-p").fadeIn(1200);
});
});




$(document).ready(function () {
$("#merch2").click(function () {
  $("#merch2").animate({
    top: '5%'
  });
});
});



$(document).ready(function () {
$("#merch2").click(function () {
  $("#design5-h3").fadeIn(1000);
  $("#design5-p").fadeIn(1200);
});
});





$(document).ready(function () {
$("#merch3").click(function () {
  $("#design6-h3").fadeIn(1000);
  $("#design6-p").fadeIn(1200);
});
});


$(document).ready(function () {
$("#merch3").click(function () {
  $("#merch3").animate({
    top: '5%'
  });
});
});

// button animation //////////////////////////////////
$(document).ready(function () {
$("#btn-merch").mouseover(function () {
  $("#btn-merch").animate({
    width: '320px',
    height: '100px',
    fontSize: '40px',
    opacity: '0.6',

  });
  $("#btn-merch").css('background-color', '#cccccc');
  $("#btn-merch").css('border', '5px solid black');
  $("#btn-merch").css('border-radius', '35px');
});
});

$(document).ready(function () {
$("#btn-merch").mouseleave(function () {
  $("#btn-merch").animate({
    width: '250px',
    height: '80px',
    fontSize: '30px',
    opacity: '1',
  });
  $("#btn-merch").css('background-color', '#66b3ff');
  $("#btn-merch").css('border', '3px solid black');
  $("#btn-merch").css('border-radius', '18px');
});
});
