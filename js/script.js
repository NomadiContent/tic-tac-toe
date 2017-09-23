(function() {
  //wait for content to load
  document.addEventListener("DOMContentLoaded", function(event) {

      //set player turn to 1. This variable is used in the check function to determine who is currently playing.
      //Turn is also used to determine which mouseover graphic should be shown.
      let turn = 1;
      // establish board as all of the li elements in with the .box class
      let board = $('.box');
      //find the number of squares in the board
      let boardLength = board.length;
      //initialize an empty array, where no moves on the board have been made.
      let boardStatus = [];

      //winning combinations of moves. Used in the check function.
      const winning = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ]

      //hide the board, hide the finish graphic
      $('#board').hide();
      $('#finish').hide();

      //when start button is clicked, hide the initial 'start' graphic and show the board.
      //Make player1 active
      $("#startButton").click(function(){
        $('#start').hide();
        $('#board').show();
        $("#player1").addClass('active');
      });



        // helper function to check if all values in an array are the same.
        Array.prototype.allValuesSame = function() {
        for(var i = 1; i < this.length; i++)
          {
            if((this[i] !== this[0]) || (this[0] === 'box'))
                return false;
          }
                return true;
        }

        function check() {
          for (let i = 0; i < boardLength; i++) {
              boardStatus.push(board.eq(i).attr('class'));
          }

          for (let x = 0; x < winning.length; x++) {
            //set variables' equal to associated winning moves for ease of writing.
            moveOne = winning[x][0];
            moveTwo = winning[x][1];
            moveThree = winning[x][2];
            //establish and then check the values on the board associated with a winning move to
            //if all values match then the game has been won.
            let moveSet = [boardStatus[moveOne], boardStatus[moveTwo], boardStatus[moveThree]];
            if (moveSet.allValuesSame()) {
              turn = 1;
              $("#player1").addClass('active');
              $("#player2").removeClass('active');
              $('#board').hide();
              $('#finish').show();
              if(boardStatus[moveOne] === "box box-filled-1") {
                $("#finish").addClass('screen-win-one');
                $('.message').html('Winner!')
              } else {
                $("#finish").addClass('screen-win-two');
                $('.message').html('Winner!')
              }
              $("#newGame").click(function(){
                $('#board').show();
                $('#finish').hide();
                $( "li" ).removeClass( "box-filled-2 box-filled-1" )
                $("#finish").removeClass('screen-win-one screen-win-two screen-win-tie')

              });
            }
          }
          //determine if the board is full and show a 'tie game' message if so.
          if (turn === 10) {
            turn = 1;

            $("#player1").addClass('active');
            $("#player2").removeClass('active');
            $('#board').hide();
            $('#finish').show();
            $("#finish").addClass('screen-win-tie');
            $('.message').html('It\'s a Tie!')
            $("#newGame").click(function(){
              $("#finish").removeClass('screen-win-one screen-win-two screen-win-tie')
              $('#board').show();
              $('#finish').hide();

            });
          }

          boardStatus = [];
        }


        //toggle between opponents and allow them to set their maker in an open square.
        $('.box').click(function(){
          if ($(this).hasClass('box-filled-2') || $(this).hasClass('box-filled-1')) {
              //console.log('occupied!');
          } else {
          if ((turn % 2) === 0) {
            $(this).addClass('box-filled-2')
            $("#player1").addClass('active');
            $("#player2").removeClass('active');
            turn += 1;

        } else {
            $(this).addClass('box-filled-1')
            $("#player2").addClass('active');
            $("#player1").removeClass('active');
            turn += 1;

          }
          console.log(check())
        }

      });

      //show player maker on mouseover
      $('.box').mouseover(function(){
        if ((turn % 2) === 0 && !($(this).hasClass('box-filled-2')) && !($(this).hasClass('box-filled-1'))) {
          $(this).css("background-image", `url(/Users/charleymontgomery/Desktop/tic-tac-toe-v3/img/x.svg)`);
        } else if (!($(this).hasClass('box-filled-2')) && !($(this).hasClass('box-filled-1'))){
          $(this).css("background-image", `url(/Users/charleymontgomery/Desktop/tic-tac-toe-v3/img/o.svg)`);
        }
      });

      $('.box').mouseleave(function(){
        $(this).css("background-image", "");
        $(this).css("background-color", '#EFEFEF')
      });

  });

}());
