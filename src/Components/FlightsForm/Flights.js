import React, { useEffect, useState } from "react";
import DisplayFlightData from "./DisplayFLights";



const iataCodes = [
  { code: "JFK", city: "New York", country: "USA" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "LHR", city: "London", country: "UK" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "PEK", city: "Beijing", country: "China" },
  { code: "HND", city: "Tokyo", country: "Japan" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "FRA", city: "Frankfurt", country: "Germany" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands" },
  { code: "IST", city: "Istanbul", country: "Turkey" },
  { code: "SYD", city: "Sydney", country: "Australia" },
  { code: "CAN", city: "Guangzhou", country: "China" },
  { code: "ATL", city: "Atlanta", country: "USA" },
  { code: "ORD", city: "Chicago", country: "USA" },
  { code: "ICN", city: "Seoul", country: "South Korea" },
  { code: "MUC", city: "Munich", country: "Germany" },
  { code: "HKG", city: "Hong Kong", country: "Hong Kong" },
  { code: "DEL", city: "Delhi", country: "India" },
  { code: "DFW", city: "Dallas", country: "USA" },
  { code: "MAD", city: "Madrid", country: "Spain" },
  { code: "BKK", city: "Bangkok", country: "Thailand" },
  { code: "SFO", city: "San Francisco", country: "USA" },
  { code: "MIA", city: "Miami", country: "USA" },
  { code: "EWR", city: "Newark", country: "USA" },
  { code: "BCN", city: "Barcelona", country: "Spain" },
  { code: "PVG", city: "Shanghai", country: "China" },
  { code: "ZRH", city: "Zurich", country: "Switzerland" },
  { code: "CUN", city: "Cancún", country: "Mexico" },
  { code: "DUB", city: "Dublin", country: "Ireland" },
  { code: "NBO", city: "Nairobi", country: "Kenya" }

];

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: "",
    adults: "",
  });
  const [loading, setLoading] = useState(false);
  const [aircrafts, setAircrafts] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dictionaries, setDictionaries] = useState({});



  useEffect(() => {
    if (formSubmitted) {
      setLoading(true); // Show the Loading modal

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
          const flightSearchURL = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${searchParams.originLocationCode}&destinationLocationCode=${searchParams.destinationLocationCode}&departureDate=${searchParams.departureDate}&adults=${searchParams.adults}&max=10`;

          fetch(flightSearchURL, {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then((res) => res.json())
            .then((data) => {
              setFlightData(data.data);
              setDictionaries(data.dictionaries);
              setLoading(false);
              // console.log(data);
            })
            .catch((error) => console.error("Error fetching flight data:", error));
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, [formSubmitted, searchParams]);

  const handleSearchParamChange = (param, value) => {
    setSearchParams((prevState) => ({ ...prevState, [param]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };



  return (
    <>
      <form class="flight-search-form" onSubmit={handleSubmit}>
        <div class="form-row">
          <label for="originLocationCode">Origin:</label>
          <select
            name="originLocationCode"
            value={searchParams.originLocationCode}
            onChange={(e) =>
              handleSearchParamChange("originLocationCode", e.target.value)
            }
          >
            <option value="">Select Origin</option>
            {iataCodes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.city} {item.country} ({item.code})
              </option>
            ))}
          </select>
        </div>

        <div class="form-row">
          <label for="destinationLocationCode">Destination:</label>
          <select
            name="destinationLocationCode"
            value={searchParams.destinationLocationCode}
            onChange={(e) =>
              handleSearchParamChange("destinationLocationCode", e.target.value)
            }
          >
            <option value="">Select Destination</option>
            {iataCodes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.city} {item.country} ({item.code})
              </option>
            ))}
          </select>
        </div>

        <div class="form-row">
          <label for="departureDate">Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={searchParams.departureDate}
            onChange={(e) => handleSearchParamChange("departureDate", e.target.value)}
          />
        </div>

        <div class="form-row">
          <label for="adults">Number of Adults:</label>
          <input
            type="number"
            name="adults"
            placeholder="Number of Adults"
            value={searchParams.adults}
            onChange={(e) => handleSearchParamChange("adults", e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Show the "Loading..." modal if loading state is true */}
      {loading && <div className="loading-modal">Loading...</div>}

      {/* Display flight data after the response is received */}
      {flightData.length > 0 && (
        <div className="flight-data">
          <DisplayFlightData
            flightData={flightData}
            from={searchParams.originLocationCode}
            to={searchParams.destinationLocationCode}
          />
        </div>
      )}
  </>
  );
};

export default FlightSearch;
      


