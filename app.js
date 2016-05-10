$(document).ready(function(){
  //get audio//
  var bell_g=document.getElementById("bell_g");
  var bell_r=document.getElementById("bell_r");
  var bell_y=document.getElementById("bell_y");
  var bell_b=document.getElementById("bell_b");

  ///css formatting//
  var hgth = $('.circle_out').width();
$('.circle_out').css({'height':hgth+'px'});

  //random square selector function///
  function random(aclass){
    return Math.floor(Math.random() * $(aclass).length)};

  ////event function-glow, beep///
  $(".square").click(function(){
    var id=$(this).attr("id");
    var light_up="lite_" + id;
    var bell=document.getElementById("bell_"+id);
    bell.duration="0.1";
   bell.play();
    $(this).addClass(light_up);
    setTimeout(function(){$(".square").removeClass(light_up);bell.pause();bell.currentTime=0;}, 500);
  });

   ///opening declarations//
    var round=1;
    var turn="player";
    var toMatch=[];
    var memory=[];

  ////start/restart game click////
    $("#start").click(function(){
     round=1;
    turn="cpu";
    toMatch.length=[];
    memory.length=[];
      setTimeout(startGame(),1000);
    });


    //function to choose a new square///
    function newSelect(){
random_square=$('.square').eq(random('.square'));
 memory.push(random_square.attr("id"));
    }


    ////function-computer play new and past moves//
     function fullRound(){
     newSelect();
      for(i = 0; i <memory.length; i++){
    (function(i){
        setTimeout(function(){
            $("#"+memory[i]).click();
        }, 1000 * i);
         }(i))
      }
        turn="player";
        toMatch = $.merge([], memory);
     }


    ///player's turn///
  $(".square").click(function(e){
 if(e.hasOwnProperty('originalEvent')&&turn==="player"){

      if($(this).attr("id")===toMatch[0]){
          toMatch.shift();
          if(toMatch.length===0){
           round+=1;
         $(".round_display").html(round);
            turn="cpu";
           setTimeout(function(){fullRound();},1500);
          }
       }
      else{
        ////beep beep! bad memory!///
       $(".square").click();
        $(".round_display").html("!!!");
       turn="cpu";
         ///replay//
        setTimeout(function(){
         $(".round_display").html(round);
       toMatch = $.merge([], memory);
        for(j = 0; j <memory.length; j++){
    (function(j){
        setTimeout(function(){
           $("#"+memory[j]).click();
        }, 1000 * j);
      turn="player";
         }(j))
      }
        },1000);
     }
    }
  });


  ////game function////
  function startGame(){
    //start conditions///
    $("#start").html("Restart");
    $(".round_display").html(round);
  ///first call//
    setTimeout(function(){fullRound();},1000);
  };
});
