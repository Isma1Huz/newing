
import Navigation from "../../Components/Navigation/Navigation";
import FlightSearch from "../../Components/FlightsForm/Flights";
import './Landing.css'
function Landing(){

    return(
        <>
                <div className="home-boxes">
                    <div className="box a">
                        <h5>Punta Cana </h5>
                        <p>Carrebean Island</p>

                    </div>
                    <div className="box b">
                    <h5>Nigara Falls</h5>
                        <p>Canada</p>
                    </div>
                    <div className="box c">
                        <h5>Paris</h5>
                        <p>France</p>
                    </div>
                    <div className="box d">
                        <h5>Marina Bay</h5>
                        <p>Singapore</p>
                    </div>
                </div>
            <div className="lft">
                <Navigation/>
                <h1 className="home-text">DISCOVER THE WORLD WITH OUR FLIGHTS</h1>
                <FlightSearch/>
            </div>
            
       
        
        </>
    )

}
export default Landing;