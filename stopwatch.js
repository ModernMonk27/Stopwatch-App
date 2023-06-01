$(function(){
    //variables
    var mode = 0;//App mode
    var timeCounter = 0;//time counter
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load show start and lap buttons
    hideshowButtons("#startbutton","#lapbutton");
    //click on startButton
    $("#startbutton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopbutton","#lapbutton");
        //start counter
        startAction();
    });
    //on clicing stop button

    $("#stopbutton").click(function(){

      //show resume and reset buton

      hideshowButtons("#resumebutton","#resetbutton");

      //stop counter

      clearInterval(action);


    });

    //on clicking reset button 
    $("#resetbutton").click(function(){

      //reload the page

      location.reload();
    });

    // on clicking resume button

    $("#resumebutton").click(function(){

      //show stop and lap buttons

      hideshowButtons("#stopbutton","#lapbutton");

      //start the counter time
      startAction();
    });

    // on clicking lap button

    $("#lapbutton").click(function(){

      //if mode is on
      if(mode){
        // stop the time
        clearInterval(action);
        //reset the lap time to 0

        lapCounter = 0;

        addLap();

       

        startAction();

      }

      

      




    });

      


    







    //functions
    //hideshowButtons function shows two buttons
    function hideshowButtons(x,y){
      $(".control").hide();
      $(x).show();
      $(y).show();
  }
  
  //start the counter
  function startAction(){
      action = setInterval(function(){
          timeCounter++;
          if(timeCounter == 100*60*100){
              timeCounter = 0;   
          }
          lapCounter++;
          if(lapCounter == 100*60*100){
              lapCounter = 0;   
          }
          updateTime();
      },10);
  }
  
  //updateTime: converts counters to min,sec,centisec
  function updateTime(){
      //1min=60*100centiseconds=6000centiseconds
      timeMinutes = Math.floor(timeCounter/6000);
      //1sec=100centiseconds
      timeSeconds = Math.floor((timeCounter%6000)/100);
      timeCentiseconds = (timeCounter%6000)%100;
      $("#timemin").text(format(timeMinutes));
      $("#timesec").text(format(timeSeconds));
      $("#timecentisec").text(format(timeCentiseconds));
      
      //1min=60*100centiseconds=6000centiseconds
      lapMinutes = Math.floor(lapCounter/6000);
      //1sec=100centiseconds
      lapSeconds = Math.floor((lapCounter%6000)/100);
      lapCentiseconds = (lapCounter%6000)%100;
      $("#lapmin").text(format(lapMinutes));
      $("#lapsec").text(format(lapSeconds));
      $("#lapcentisec").text(format(lapCentiseconds));
  }
  
  //format numbers
  function format(number){
      if(number<10){
          return '0'+number;   
      }else{
          return number;   
      }
  }
   //addLap function: print lap details inside the lap box
   function addLap(){
    lapNumber++;
       var myLapDetails =
           '<div class="lap">'+
                '<div class="laptimetitle">'+
                    'Lap'+ lapNumber +
                '</div>'+
                '<div class="laptime">'+
                    '<span>'+ format(lapMinutes) +'</span>'+
                    ':<span>'+ format(lapSeconds) +'</span>'+
                    ':<span>'+ format(lapCentiseconds) +'</span>'+
                '</div>'+
           '</div>';
    $(myLapDetails).prependTo("#laps");
}

 
});