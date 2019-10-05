const request = require('request');
// API KEY FOR DARK SKY : 822b2ad40fb6c705e56c48c587f86aa9

const weatherStats = (lat,long,callback) => {
    try{
        const url_darksky = `https://api.darksky.net/forecast/822b2ad40fb6c705e56c48c587f86aa9/${encodeURIComponent(lat)},${encodeURIComponent(long)}`;        
        request({ url: url_darksky, json: true }, (e,response,body)=>{
            if(e){
                callback('Some Error Occurred during the operation, Please try Again !',undefined);
            }else if(response.body.error){
                callback(response.body.code,response.body.error,undefined);        
            }else{
                callback(undefined,response.body.currently);
            }
        });
    }catch(e){
        callback('UNKNOWN ERROR !',undefined);
    }
}

module.exports = weatherStats;