const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibm9kZS1jb3Vyc2Utd3AiLCJhIjoiY2tidnlhbWg4MDZlOTJ6bXNiMjZyN28wbCJ9.5DEIwJGpXhTUFbG9JXb_og&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(body.features.length===0){
            callback('unable to find location try another search!',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
//ll
module.exports=geocode

