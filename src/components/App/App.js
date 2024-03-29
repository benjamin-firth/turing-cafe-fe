import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer';
import Form from '../Form/Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ogReservations: []
    }
  }

  deleteReservation = (id) => {
    return fetch(`http://localhost:3001/api/v1/reservations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => this.setState({ogReservations: data}))
  }

  addNewReservation = (name, date, time, number) => {
    fetch('http://localhost:3001/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        date: date,
        time: time,
        number: number
      })
    }).then(response => response.json())
      .then(data => {
        return this.setState({ogReservations: [...this.state.ogReservations, data]})
      })
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reservations')
      .then(res => res.json())
      .then(data => this.setState({ ogReservations: data}));
  }

  render() {
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <div className='resy-form'>

        </div>
        <div className='enter-form'>
          <Form addNewReservation={this.addNewReservation} />
        </div>
        <div className='resy-container'>
          <CardContainer deleteReservation={this.deleteReservation} ogReservations={this.state.ogReservations} />
        </div>
      </div>
    )
  }
}

export default App;
