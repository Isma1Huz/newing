import Navigation from "../../Components/Navigation/Navigation";
import FlightSearch from "../../Components/FlightsForm/Flights";
import './Landing.css'
function Landing(){
    return(
        <>
        <Navigation/>
        <h1 className="home-text">DISCOVER THE WORLD WITH OUR FLIGHTS</h1> 
        <FlightSearch/>
        <div className="home-image">Image here</div>
        </>
    )

}
export default Landing;