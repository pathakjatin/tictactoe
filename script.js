console.log("Hello! Welcome to my Tic Tac Toe")
let turn="X";
let ting= new Audio("ting.mp3");
let isgameover = false;
let mus = new Audio("gn.mp3");

//Function for turn change
const changeTurn = ()=>{
    return turn ==="X"? "O": "X"
}

//to check win
mus.play();
const checkWin=()=>{
    let boxtext = document.getElementsByClassName('boxtext')
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText==boxtext[e[1]].innerText)&&(boxtext[e[2]].innerText==boxtext[e[1]].innerText)&&(boxtext[e[0]].innerText!=="")){
            document.getElementsByClassName("turn")[0].innerText  = boxtext[e[0]].innerText+" WON!";
            isgameover=true
            document.querySelector('.celeb').style.width="250px";
        }
    })
}

//Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText ===''){
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("turn")[0].innerText  = "Turn is of " + turn;
            } 
        }
    })
})

// event listener for reset button

let reset = document.getElementsByClassName("reset")[0];
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{ 
        element.innerText=""
    });
    turn = "X";
    isgameover = false
    document.querySelector('.celeb').style.width="0px";
    document.getElementsByClassName("turn")[0].innerText  = "Turn is of " + turn;
})
