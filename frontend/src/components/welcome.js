import React, { Component } from 'react'

import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import './Homepage.css'; // Assuming you'll add some custom styling

// Import images
import airplaneImage from '../assets/images/airplane.jpg';
import buildingsImage from '../assets/images/buildings.jpg';
import sunsetImage from '../assets/images/sunset.jpg';

const Welcome = () => {
  return (
    <Container fluid className="p-0">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={airplaneImage}
            alt="Airplane"
          />
          <Carousel.Caption>
            <h3>Explore the Skies</h3>
            <p>Discover your next great adventure with us.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={buildingsImage}
            alt="High Rise Buildings"
          />
          <Carousel.Caption>
            <h3>City Breaks</h3>
            <p>Jet off to the biggest cities and tallest skyscrapers.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sunsetImage}
            alt="Sunset"
          />
          <Carousel.Caption>
            <h3>Sunset Flights</h3>
            <p>End your day with a beautiful sunset from above the clouds.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row className="text-center mt-4">
        <Col>
          <Button variant="warning" size="lg">Book Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
