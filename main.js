  
 var boxSection = document.querySelector('.box');
 var grids = document.querySelectorAll('.grid');
 var startGameButton = document.querySelector('.start');
 var winMessage = document.querySelector('.win-message');
 var player1Name = document.querySelector('.player1-text');
 var player2Name = document.querySelector('.player2-text');
 var player1Button = document.querySelector('.player1');
 var player2Button = document.querySelector('.player2');
 var player1Input = document.querySelector('.player1-name');
 var player2Input = document.querySelector('.player2-name');
 var player1Form = document.querySelector('.form1');
 var player2Form = document.querySelector('.form2');
 var player1Turn = document.querySelector('.player1-turn');
 var player2Turn = document.querySelector('.player2-turn');
 var player1, player2;
 var winAudio = new Audio('./win.mp3');
 var clickAudio = new Audio('./click.mp3');
 var bgAudio = new Audio('./bg.mp3');
 //declear a variable to count how many times I clicked 
 var clickCount = 0;
 var clickedId = [];
 var circleId = [];
 var crossId = [];
 var winOptions = [
     ["0","1","2"],
     ["3","4","5"],
     ["6","7","8"],
     ["0","3","6"],
     ["1","4","7"],
     ["2","5","8"],
     ["0","4","8"],
     ["2","4","6"]
 ];

 boxSection.addEventListener('click', playersClick);
 startGameButton.addEventListener('click', startGame);
 player1Button.addEventListener('click',confirmPlayer1Name);
 player2Button.addEventListener('click',confirmPlayer2Name);

//  boxSection.addEventListener('mouseover', function(event) {
//     var itemMouseover = event.target;
     
//     if (clickCount % 2 === 0) {
//         itemMouseover.style.backgroundImage = "url('./images/cross.png')";
//         itemMouseover.style.opacity = 0.3;
//     } else {
//         itemMouseover.style.backgroundImage = "url('./images/circle.png')";
//         itemMouseover.style.opacity = 0.3;
//     }
    
//    });
 


 function confirmPlayer1Name (event) {
     event.preventDefault();
     if (player1Input.value) {
         player1Name.textContent = player1Input.value;
     }
     player1Form.classList.add('no-show');
 }

 function confirmPlayer2Name (event) {
     event.preventDefault();
     if (player2Input.value) {
         player2Name.textContent = player2Input.value;
     }
     player2Form.classList.add('no-show');
 }
 // is there any way to make these two funtions into one function because they are nearly the same.

 function playersClick(event) {
     var itemClicked = event.target;
     // if the box had clicked, can not click again
     if (clickedId.includes(itemClicked.id)) {
         return
     }
     clickAudio.play();
     
     //when the game has a result, click will not work
     if (winMessage.textContent !== "Who will be the winner?") {
         itemClicked.classList.add('empty');
     } else {
         clickCount++;
         clickedId.push(itemClicked.id);
     //if clickCount is even number, show circle;
         if (isEven(clickCount)) {
         itemClicked.classList.add('circle');
         circleId.push(itemClicked.id);
         player1Turn.textContent = "Your turn!";
         player2Turn.textContent = " ";

         } else {
         itemClicked.classList.add('cross');
         crossId.push(itemClicked.id);
         player2Turn.textContent = "Your turn!";
         player1Turn.textContent = " ";
         }
     }
     //everytime, when I click, clickCount increase by 1   
     judgeWin (); 
     judgeDraw ();   
 }
     // judge who will win: if every items in the items of winOption array are the same as in circleId or crossId, the game will be end.  
 function judgeWin () {
     for (let i = 0; i < winOptions.length; i++) {
        console.log(winOptions[i]);
        if (circleId.includes(winOptions[i][0]) &&
            circleId.includes(winOptions[i][1]) &&
            circleId.includes(winOptions[i][2])) {
                winMessage.textContent = player2Name.textContent + " win"; 
                
                winAudio.play();
                setTimeout(function() {
                    bgAudio.pause();
                    bgAudio.currentTime = 0;
                 }, 5000);

                player1Turn.textContent = " ";
                player2Turn.textContent = " ";
                return true
        } 
        if (crossId.includes(winOptions[i][0]) &&
            crossId.includes(winOptions[i][1]) &&
            crossId.includes(winOptions[i][2])) {
               winMessage.textContent = player1Name.textContent + " win"; 
               
               winAudio.play();
               setTimeout(function() {
                bgAudio.pause();
                bgAudio.currentTime = 0;
             }, 5000);
               player1Turn.textContent = " ";
               player2Turn.textContent = " ";
               return true
        }   
        // playersConditions (circleId, player2Name);
        // playersConditions (crossId, player1Name);
        // function playersConditions (arr, name) {
        //     if (arr.slice(-3).sort().join() === (winOptions[i].join())) {
        //         winMessage.textContent = name.textContent + " win"; 
        //         player1Turn.textContent = " ";
        //         player2Turn.textContent = " ";
        //         return true
        //     }
        // }
    }
 }
 
 
    

 function judgeDraw () {
    if (clickCount === 9 && !judgeWin ()) {
        winMessage.textContent = "It's a draw!"
        player1Turn.textContent = " ";
        player2Turn.textContent = " ";
    }
 }
 
function startGame () {
     bgAudio.play();
     
     clickedId = [];
     circleId = [];
     crossId = [];
     clickCount = 0;
     winMessage.textContent = "Who will be the winner?";
     player1Form.className = 'form1';
     player2Form.className = 'form2';
     player1Name.textContent = 'Player 1';
     player2Name.textContent = 'Player 2';
     player1Input.value = ' ';
     player2Input.value = '';
     player1Turn.textContent = " ";
     player2Turn.textContent = " ";
     for (let i = 0; i < grids.length; i++) {
         grids[i].className = 'grid';
     }
 }
 function isEven(num) {
     return num % 2 === 0
}


