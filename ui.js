$(document).ready(function () {
    alert("hi");
$('#calculating').hide()





//This is where I am doing all the visualization
var canvas = document.getElementById("myCanvas");

var loc1 = canvas.getContext("2d");

function setUpCanvas() {
    loc1.fillStyle = 'purple'
    loc1.strokeStyle = 'purple';

    loc1.clearRect(0,0,450,300);
    loc1.strokeRect(140, 45, 25, 25);
    loc1.font = "18px Arial";
    loc1.fillText("L1", 140, 40);


    loc1.strokeRect(50, 200, 25, 25);
    loc1.font = "18px Arial";
    loc1.fillText("L4", 20, 215);


    loc1.strokeRect(225, 85, 25, 25);
    loc1.font = "18px Arial";
    loc1.fillText("L2", 220, 75);


    loc1.strokeRect(225, 220, 25, 25);
    loc1.font = "18px Arial";
    loc1.fillText("L3", 255, 235);
}

setUpCanvas();

var size = 5;

function drawLine(depA,depB,thickness){
    loc1.strokeStyle = 'blue';
    loc1.beginPath();
    if(depA==1 && depB==2){
        loc1.moveTo(152,57);
        loc1.lineTo(237,97);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();
    }
    else if(depA==1 && depB==3){
        loc1.moveTo(152,57);
        loc1.lineTo(237,232);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();
    }
    else if(depA==1 && depB==4){
        loc1.moveTo(152,57);
        loc1.lineTo(67,212);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();
    }
    else if(depA==2 && depB==3){
        loc1.moveTo(237,97);
        loc1.lineTo(237,232);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();
    }
    else if(depA==2 && depB==4){
        loc1.moveTo(237,97);
        loc1.lineTo(67,212);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();
    }
    else if(depA==3 && depB==4){
        loc1.moveTo(237,232);
        loc1.lineTo(67,212);
        if(thickness==1){
            loc1.lineWidth=1;
        }
        else if(thickness==2){
            loc1.lineWidth=4;
        }
        else if(thickness==3){
            loc1.lineWidth=7;
        }
        else if(thickness==4){
            loc1.lineWidth=10;
        }
        loc1.stroke();

    }


}
function placeDepartment(loc, title){
    loc1.fillStyle = 'green';
    if(loc == 1 ){
        loc1.fillText(title, 140, 20);
        }
    else if(loc == 2){
        loc1.fillText(title, 220, 55);
        }
    else if(loc ==3){
        loc1.fillText(title, 240, 205);
        }
    else if(loc ==4){
        loc1.fillText(title, 15, 245);
        }

}
function startDisplay(){
    for(var i=1;i<size;i++){
        for(var j=i;j<size;j++){
            if(flows[($('#sel'+i).val())][($('#sel'+j).val())]!=0){
                drawLine(i,j,flows[($('#sel'+i).val())][($('#sel'+j).val())]);
            }
        }
        placeDepartment(i, departments[$('#sel'+i).val()])
    }

    loc1.fillStyle = 'green';
    //location 1
    loc1.fillRect(141, 46, 23,23);

    //location 4
    loc1.fillRect(51, 201, 23, 23);

    //location 2
    loc1.fillRect(226, 86, 23, 23);

    // location 3
    loc1.fillRect(226, 221, 23, 23);


}

$('#reset').click(function(){
    for(var i=1; i < size; i++){
        $('#sel'+i).val('None');
    }
    $('#cost').text('0');
});

function getLocation(index){
    for(var i = 1; i<size; i++){
        if($('#sel' + i).val() == index){
            return i-1;
        }
    }
}
function calculate(){
    $('#calculating').hide();
    var total = 0;
    for(var i =0; i < size-1; i++){
        for(var j=0; j< size-1; j++){
            total = total + (flows[i][j] * distances[getLocation(i)][getLocation(j)]);
        }
    }

    $('#cost').text(total);
}
$('#compute').click(function(){
    var repeated = false,
        noselect = false;
    for(var i =1; i < size; i++){
        if($('#sel' + i).val() == null){
            noselect=true;
            i = size; j = size;
        }
        for(var j = i+ 1; j<size; j++){
            if($('#sel' + j).val() == null){
                noselect=true;
                i=size; j=size;
            }
           if($('#sel' + i).val() == $('#sel'+ j).val()){
                repeated = true;
               i=size; j=size;
            }

        }

    }
    if(repeated == true){$('#error').replaceWith('<p class="error">One department per location please</p>');}
    else if(noselect == true){$('#error').replaceWith('<p class="error">Select a department for all locations</p>');}
    else{
        $('#calculating').show();
        setTimeout(calculate, 1000);
        setUpCanvas();
        startDisplay();
    }
});

var permArr = [],
    usedChars = [],
    permutations = [];

function permute(input){
    var i, ch;
    for(i=0; i < input.length; i++){
        ch = input.splice(i,1)[0];
        usedChars.push(ch);
        if(input.length==0){
            permutations.push({'perm': usedChars.slice(), 'cost': optimize(usedChars.slice())});
            //permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i,0,ch);
        usedChars.pop();
    }
    //return permArr;
};

function getLocationb(dep, input){
    for(var i = 0; i < size-1; i++){
        if( input[i] == dep+1){
            return i;
        }
    }
}
function optimize(input){
    var cost = 0;
    for(var i = 0; i < size-1; i++){
        for(var j = 0; j < size -1; j++){
           cost = cost +(flows[i][j] * distances[getLocationb(i, input)][getLocationb(j, input)]);
        }
    }
    return cost;
}

$('#optimal').click(function(){
    permute([1,2,3,4]);
    $('#cost').text(permutations[findLowest()]['cost']);
    for(var i = 1; i < size; i++){
        $('#sel' + i).val(permutations[findLowest()]['perm'][i-1]-1);
    }
    setUpCanvas();
    startDisplay();
});

function findLowest(){
    var lowIndex = 0;
    for(var i = 0; i < permutations.length; i++){
        if(permutations[lowIndex]['cost'] > permutations[i]['cost']){
            lowIndex = i;
        }
    }
    return lowIndex;
}

});