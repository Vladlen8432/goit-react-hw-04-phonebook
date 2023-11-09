import React, { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '' || this.state.number.trim() === '') {
      return;
    }

    this.props.onAddContact(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={css.inputItem}
          type="text"
          name="name"
          required
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br />
        <input
          className={css.inputItem}
          type="text"
          name="number"
          required
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
        <br />
        <button className={css.formButton} type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
