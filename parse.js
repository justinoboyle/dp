"use strict";
module.exports = function(inData) {

    if(!inData.includes(','))
        return {};

    let tokens = inData.trim().split(',');
    let labels = [];

    if(tokens.length < 2)
        return {};

    if(tokens[0].includes('@'))
        labels = tokens[0].split('@')[1].split(';');

    if(isNaN(tokens[0].split('@')[0]))
        return {};

    let dimSize = parseInt(tokens[0].split('@')[0]),
        points = [],
        buffer = {},
        tempCount = 0;

    for(let i = 1; i < tokens.length; i++) {

        let val = parseFloat(tokens[i]);
    
        let label = typeof(labels[tempCount]) !== 'undefined' ? labels[tempCount] : tempCount;

        buffer[label] = val;
        tempCount++;

       if((tempCount) >= dimSize || (i+1) === tokens.length) {
            points.push(buffer);
            buffer = {};
            tempCount = 0;
        }
    }
    return points;
};