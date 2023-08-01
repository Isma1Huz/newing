import React, { useEffect, useState } from "react";

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    originLocationCode: "LON",
    destinationLocationCode: "SFO",
    departureDate: "2023-08-05",
    adults: 2,
    max: 4
  });

  const [flightData, setFlightData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); 

  useEffect(() => {
    if (formSubmitted) {
      fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          "grant_type": "client_credentials",
          "client_id": "ssf0QQZlk8kAX7DXgMlPGLOGfPVSMWsK",
          "client_secret": "h2BqnBz9BPw2qjmc"
        }).toString()
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access_token;

          // Use the access token to fetch flight data
          const flightSearchURL = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchParams.originLocationCode}&destinationLocationCode=${searchParams.destinationLocationCode}&departureDate=${searchParams.departureDate}&adults=${searchParams.adults}&max=${searchParams.max}`;

          fetch(flightSearchURL, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then((res) => res.json())
            .then((data) => {
                setFlightData(data)
                console.log(data)
            })
            .catch((error) => console.error("Error fetching flight data:", error));
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, [formSubmitted, searchParams]);

  const handleSearchParamChange = (param, value) => {
    setSearchParams({ ...searchParams, [param]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="originLocationCode" placeholder="Origin Location Code" />
        <input type="text" name="destinationLocationCode" placeholder="Destination Location Code" />
        <input type="date" name="departureDate" />
        <input type="number" name="adults" placeholder="Number of Adults" />
        <input type="number" name="max" placeholder="Maximum Results" />
        <button type="submit">Submit</button>
      </form>

      {flightData && (
        <div className="flight-data">
          {flightData.map((flight) => (
            <div key={flight.id} className="flight-item">
              <p>Flight ID: {flight.id}</p>
              {/* <p>Departure: {flight.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode}</p>
              <p>Arrival: {flight.offerItems[0].services[0].segments[0].flightSegment.arrival.iataCode}</p>
              <p>Departure Date: {flight.offerItems[0].services[0].segments[0].flightSegment.departure.at}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
