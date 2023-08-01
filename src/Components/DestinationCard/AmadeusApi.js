import React, { useState } from 'react';
import axios from 'axios';

const AmadeusAPI = () => {
  const [data, setData] = useState(null);

  const fetchAmadeusData = () => {
    const apiKey = 'ssf0QQZlk8kAX7DXgMlPGLOGfPVSMWsK';
    const url = 'https://api.amadeus.com/v1/flights';

    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const corsUrl = corsAnywhereUrl + url;

    axios
      .get(corsAnywhereUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from Amadeus API:', error);
      });
  };

  return (
    <div>
      <button onClick={fetchAmadeusData}>Fetch Amadeus Data</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AmadeusAPI;

