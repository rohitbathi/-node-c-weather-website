const request=require('postman-request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5e376fc97a1aef632d75d1533574fccd&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=m'

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            if(body.current.weather_descriptions.length===0){
                body.current.weather_descriptions[0]='unable to determine weather'
            }
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.\nThe humidity outside is '+body.current.humidity+' percent.\nPrecipitation is '+body.current.precip+' millimetres.\nHave a nice time!\n:-)')
        }
    })
}
//..
module.exports=forecast