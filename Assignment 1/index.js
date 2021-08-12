


//list of variables
var button = document.getElementById("solution").addEventListener("click", show_solution);
var button2 = document.getElementById("reset").addEventListener("click", reset_board);
var numTreasureLeft = 20;
var totalMoves =0;



window.onload = function(){
    generateBoard();
}

function generateBoard(){
    //var treasuremap = ["11111111--1----------1111-------------11111-----------------------11--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"]
    //var treasuremap = ["1", "-", "-", "1"];
    var treasuremap = generateTreasureMap()
    var grid = document.getElementById("boardgame")
    grid.className = "grid"
    idCount = 0;
    for(var r =0; r<20; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c<20; c++){
            var cell = tr.appendChild(document.createElement('td'));
            cell.addEventListener("click", on_click);
            cell.id = idCount;
            //cell.innerHTML = treasuremap[0].charAt(idCount);
            cell.innerHTML = treasuremap[idCount];
            idCount++;
            cell.classList.add("tile")
        }
    }
    document.body.appendChild(grid);
}



function on_click(){
   if(this.innerHTML == "1"){
    this.style.backgroundColor = "green";
    numTreasureLeft-=1
    totalMoves +=1
   }
   else{
    this.style.backgroundColor = "red";
    totalMoves +=1
   }

  // console.log(numTreasureLeft);

  if(numTreasureLeft ==0){
      alert("CONGRATULATIONS! You have made " + totalMoves + " moves");
  }
   
}


function show_solution(){
    var all_grids= document.querySelectorAll("td");
    for (i=0; i<all_grids.length; i++){
        if(all_grids[i].innerHTML == 1){
            all_grids[i].style.backgroundColor = "green";
        }
        else{
            all_grids[i].style.backgroundColor = "red";
        }
    }

    
}


function generateTreasureMap(){

    //Generate a list of where the treasure locations will be
    var treasureLocation = [];
    for(i=0; i<40; i++){
        let num = getRandomInt(0,399);
        treasureLocation.push(num);
    }

    var treasureList =[];
    for(i =0; i <400; i++){
        if(treasureLocation.includes(i)){
            treasureList.push("1");
        }
        else{
            treasureList.push("-");
        }
    }

    //console.log(treasureList);
    return treasureList
   
}


//Got this code from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Clear the previous board 
function reset_board(){
    //numTreasureLeft = 20;
    //location.reload();
    let cells = document.querySelectorAll("td");
    for(let i =0; i < cells.length; i++){
        cells[i].remove();
    }

    numTreasureLeft = 20;
    totalMoves = 0;
    generateBoard();
}