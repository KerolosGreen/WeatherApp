import React , {useState,useEffect} from "react";
import axios from "axios";

function Container(){
    const [data,setdata]=useState({});
    const [location,setlocation]=useState('');
    const [locationdata,setlocationdata]=useState({});
    // const url='https://api.weatherapi.com/v1/current.json?key=19a2c5e9ede743739a595703230608&q=cairo';
    // const locationurl='https://api.openweathermap.org/geo/1.0/direct?q='+location+'&appid=2e82a3f2ec28eac87096d549e531b9b6';
    const url='https://api.weatherapi.com/v1/forecast.json?key=19a2c5e9ede743739a595703230608&q='+location+'&days=0';
    const date= new Date();
    const now=date.getHours();
    const minutes=date.getMinutes();
    const [livetime,setlivetime]=useState(now%12+':'+minutes);

    useEffect(() => {
        
        setTimeout(() => {
            setlivetime((now)>12?(now)%12+':'+(minutes<10?'0'+minutes:minutes)+"PM":(now)%12+':'+(minutes<10?'0'+minutes:minutes)+"AM");
            if(data.location!=undefined && location.length>3){
                axios.get(url).then(
                (Response) =>{
                    setdata(Response.data);
                })
                console.log("Updated");
            }
            
            
          }, 20000);
      });
      
    function getweather(){
           axios.get(url).then(
        (Response) =>{
            setdata(Response.data)
        }
    )
    }

    function onchangelocation(event){
        setlocation(event.target.value);
    }
    // {(now)>12?(now)%12+':'+minutes+"PM":(now)%12+':'+minutes+"AM"}

    // axios.get(locationurl).then(
    //     (Response) =>{
    //         setlocationdata(Response.data)
    //     }
    // )

    // <p>{data.location ? data.location.name :null}</p>
    // <p>Cairo</p>
    // <h1>{data.current ? data.current.temp_c:null}°C</h1>
    return(
        <>
        <div className="container" >
            {data.location==undefined &&
            <div className="welcoming-div"> 
            <h1>Welcome</h1>
            <h1>This Is Weather Web App</h1>
            <h1>Search Your location Now!</h1>
            <div className="search">
            <input type="Text" className="form-control w-75 mx-auto m-2" id="exampleFormControlInput1" placeholder="Search For Location" onChange={onchangelocation} />
            <button type="submit" className="btn btn-dark w-25 m-2" onClick={getweather}>Search</button>
            </div>
            <div className="about">
                <a href=""><i className="fab fa-github"></i>GitHub</a>
                <a href=""><i className="fab fa-linkedin"></i>Linked In</a>
            </div>
            </div>
            }

            


            
            
            
            {/** Only shows When User Searches For Specific Location**/}
            {data.location!=undefined&&
            <div className="top">
                <p>{data.location?data.location.name:null} , <span>{data.location?data.location.country:null}</span></p>
                <h1>{data.current?data.current.temp_c.toFixed():null}°C<sub> {data.forecast?data.forecast.forecastday[0].day.mintemp_c.toFixed():null}°C</sub></h1>
                <p>{livetime}</p>
                <p></p>
            </div>
            }
            
            {/** Only shows When User Searches For Specific Location**/}
            {data.location!=undefined &&
            <div className="right">
                <div className="info">
                    <div className="hour">
                        <p>{(now+1)>12?(now+1)%12+"PM":(now+1)%12+"AM"}</p>
                        <p>{data.forecast?data.forecast.forecastday[0].hour[(now+1)].temp_c.toFixed()+"°C":null}</p>
                    </div>

                    <div className="hour">
                        <p>{(now+2)>12?(now+2)%12+"PM":(now+2)%12+"AM"}</p>
                        <p>{data.forecast?data.forecast.forecastday[0].hour[(now+2)].temp_c.toFixed()+"°C":null}</p>
                    </div>
                    <div className="hour">
                        <p>{(now+3)>12?(now+3)%12+"PM":(now+3)%12+"AM"}</p>
                        <p>{data.forecast?data.forecast.forecastday[0].hour[(now+3)].temp_c.toFixed()+"°C":null}</p>
                    </div>
                    <div className="hour">
                        <p>{(now+4)>12?(now+4)%12+"PM":(now+4)%12+"AM"}</p>
                        <p>{data.forecast?data.forecast.forecastday[0].hour[(now+4)].temp_c.toFixed()+"°C":null}</p>
                    </div>
                </div>
                <div className="rotated">
                    <p>
                        {data.current?data.current.condition.text:null}
                        </p>
                </div>
            </div>
            }
            
                                    {/** Only shows When User Searches For Specific Location**/}
                                    {data.location!=undefined &&
                                    <div className="bottom">
                                        <div className="real-feel">
                                            <h2>Real</h2>
                                            <p>{data.current?data.current.feelslike_c:null}°C</p>
                                        </div>
                                            <div className="rain">
                                                <h2>Rain Chance</h2>
                                                <p>{data.forecast?data.forecast.forecastday[0].day.daily_chance_of_rain:null}%</p>
                                            </div>
                                            <div className="wind-speed">
                                                <h2>Wind Speed</h2>
                                                <p>
                                                {data.current?data.current.wind_kph:null} Km/h</p>
                                            </div>
                                            <div className="humidity">
                                                <h2>Humidity</h2>
                                                <p>{data.current?data.current.humidity:null}%</p>
                                            </div>
                                    </div>
                                    }
                                    
        </div>
        </>
    )
}
export default Container
