var mongo = require('mongodb'),
    moment = require('moment');

module.exports.formatObj = function fObj(obj) {
    //Loop through all keys in the object 
    for(var k in obj) {
        //If the object at the current key is of type object recursively call fObj
        if(typeof(obj[k]) === 'object') {
            obj[k] = fObj(obj[k]);
        } else {
            //If user searches on the _id or a date then make sure to convert the string value to an ObjectID or Date value
            if(k === "_id") {
                obj[k] = new mongo.ObjectID(obj[k]);
            } else if(moment(obj[k], moment.ISO_8601).isValid()) { 
                obj[k] = new Date(obj[k]);
            }
        }
    }

    return obj;
};
