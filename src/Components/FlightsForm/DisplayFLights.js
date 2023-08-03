import React, { useState } from "react";
import "./Flights.css";
import { Accordion, Card, Button } from "react-bootstrap";
import plane from "../../Assets/plane.png" 
import Modal from 'react-bootstrap/Modal';

const DisplayFlightData = ({ flightData, from, to }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(flightData);

  return (
    <div id="ResultContainer"> 
      <h4 className="result-header">Available Flights</h4>
      <ul>
        {flightData ? flightData.map((flight) => {
          const grandTotalPrice = flight.price.grandTotal;
          const id = flight.id;
          const numberOfBookableSeats = flight.numberOfBookableSeats;
          const oneWay = flight.oneWay;
          const lastTicketingDate = flight.lastTicketingDate

          return flight.itineraries.map((itinerary, index) => {
            const { duration } = itinerary;
            const firstDepartureTime = itinerary.segments[0].departure.at;
            const lastArrivalTime =
              itinerary.segments[itinerary.segments.length - 1].arrival.at;
            const stops = itinerary.segments.length

            // Define state to track if accordion is open or closed

            const [datePart, timePart] = lastArrivalTime.split("T");
            const [datePartes, timePartes] = firstDepartureTime.split("T");
            const [dateParte, timeParte] = duration.split("T");
            const [hours, minutes] = timeParte.split("H");
            let time = hours + "h" + " " + minutes 
             time.toLocaleLowerCase()




            return (
              <li key={id} className="ListItem">
                <div className="leftResult">
                  <table>
                    <tr>
                      {/* <td>{timePartes}</td> */}
                      {/* <td><img src={plane} className="plane"/></td> */}
                      {/* <td>{timePart} </td> */}
                    </tr>
                    <tr>
                      {/* <td>{from}</td> */}
                      {/* <td>{" "}</td> */}
                      <td>{to}</td>
                    </tr>
                    <tr>
                      <td>{" "}</td>
                      {/* <td>{stops}stops{" "}{ time}</td> */}
                      {/* <td>{" "}</td> */}
                    </tr>
                  </table>

                </div>
                <div className="rightResult">
                  
                    <Accordion className="cabin">
                      <Accordion.Item eventKey="0" >
                        <Accordion.Header className="button" >
                          <small>Cabin Class</small>
                          <h2>ECONOMY</h2>
                          <span>USD {Math.round((grandTotalPrice  * 1.09) * 10) / 10 } </span>        
                        </Accordion.Header>
                          <Accordion.Body id={`details-${index}`} className="accordion-body">

                            <p>Last Booking Date: {lastTicketingDate}</p>
                            <p>Available seats: {numberOfBookableSeats}</p>
                            <p>Type of trip: {oneWay ? "OneWay" : "Multi-Way"}</p>
                            <Button variant="primary" onClick={handleShow}>
                              BOOK NOW
                            </Button>

                            <Modal show={show}  onHide={handleClose} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                              <Modal.Footer>
                                <Button  onClick={handleClose}>
                                Cancel Booking
                                </Button>
                                <Button onClick={handleClose}>
                                Confirm Booking
                                </Button>
                              </Modal.Footer>
                            </Modal>
                           
                          </Accordion.Body>
                        
                      </Accordion.Item>
                    </Accordion>
                    <Accordion className="cabin">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="button">
                        <small>Cabin Class</small>
                        <h2>BUSSINESS</h2>
                        <span> USD {(Math.round((grandTotalPrice  * 1.09) * 10) / 10) * 2 }</span>
                       

                        </Accordion.Header>
                          <Accordion.Body id={`details-${index}`} className="accordion-body">
                            <p>Last Booking Date: {lastTicketingDate}</p>
                            <p>Available seats: {numberOfBookableSeats}</p>
                            <p>Type of trip: {oneWay ? "OneWay" : "Multi-Way"}</p>
                            <Button variant="primary" onClick={handleShow}>
                              Book Now
                            </Button>

                            <Modal show={show}  onHide={handleClose} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                  Cancel booking
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                  Confirm Booking
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </Accordion.Body>
                        
                      </Accordion.Item>
                    </Accordion>
                  


                </div>
               
              </li>
            );
          });
        }) : <p>No result found</p>}

      </ul>
    </div>
  );
};

export default DisplayFlightData;
