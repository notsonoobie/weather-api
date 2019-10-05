const request = require('request');
const chalk = require('chalk');
// API KEY FOR MAP BOX  : pk.eyJ1Ijoibm90c29ub29iaWUiLCJhIjoiY2sxYzh2aGRyMGYzaTNmbHI2NDNybXp4dyJ9.A7pj9TeHXzi5JMFipGu47g

const geocode = (place,callback) => {
    const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1Ijoibm90c29ub29iaWUiLCJhIjoiY2sxYzh2aGRyMGYzaTNmbHI2NDNybXp4dyJ9.A7pj9TeHXzi5JMFipGu47g`;
    try{
        request({ url: url_mapbox, json: true }, (e,response,body)=>{
            if(e){
                callback(chalk.red.bgWhite.inverse('Some Error Occurred during the operation, Please try Again !'),undefined);
            }else if(!(body.features.length)){
                callback(chalk.red.bgWhite.inverse('Please try Again with different and accurate inputs!'),undefined);        
            }else{
                const long  = body.features[0].center[0];
                const lat = body.features[0].center[1];
                const location = body.features[0].place_name;
                callback(undefined,{lat,long,location});
            }
        });
    }catch(e){
        callback(chalk.red.bgWhite.inverse('UNKNOWN ERROR !'),undefined);
    }
}
module.exports = geocode;