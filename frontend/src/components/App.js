import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import TicketForm from "./Form";
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'))

class App extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return(
    <div id='root'>
      <section className="container">
        <h2 className="title">Tickets</h2>
      </section>
      <button className="button is-link" style={{float: 'right',marginTop: '-40px'}} onClick={this.openModal}>
        Create ticket
      </button>
      <DataProvider endpoint="api/tickets/" 
                  render={data => <Table data={data} />}/>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
      >
      <button style={{float: 'right'}} onClick={this.closeModal}>x</button>
        <TicketForm />
      </Modal>
      </div>
    )
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;