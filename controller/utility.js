module.exports = {
    trova_pos: function(array1,array2){
    var array3=[];
    if (array1[0]==array2[0]){
        array3.push(0);
    } else if (array1[0]==array2[1]){
        array3.push(1);
    } else if (array1[0]==array2[2]){
        array3.push(2);
    } else if (array1[0]==array2[3]){
        array3.push(3);
    } else if (array1[0]==array2[4]){
        array3.push(4);
    } 
    if (array1[1]==array2[0]){
        array3.push(0);
    } else if (array1[1]==array2[1]){
        array3.push(1);
    } else if (array1[1]==array2[2]){
        array3.push(2);
    } else if (array1[1]==array2[3]){
        array3.push(3);
    } else if (array1[1]==array2[4]){
        array3.push(4);
    }
    if (array1[2]==array2[0]){
        array3.push(0);
    } else if (array1[2]==array2[1]){
        array3.push(1);
    } else if (array1[2]==array2[2]){
        array3.push(2);
    } else if (array1[2]==array2[3]){
        array3.push(3);
    } else if (array1[2]==array2[4]){
        array3.push(4);
    } 
    return array3;
},
    

}