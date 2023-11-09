import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchInput from './FilterByName/FilterByName';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  isContactNameExist(name) {
    const { contacts } = this.state;
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  }

  handleAddContact = (name, number) => {
    if (this.isContactNameExist(name)) {
      alert(`${name} is already in contact`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <h1 className="phonebookHeager">Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <SearchInput
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
