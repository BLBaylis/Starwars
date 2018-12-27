import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
  constructor() {
    super()
    this.state = {
        characters: [],
        searchfield: ''
    }
}

async componentDidMount() {
  try {
    const response = await fetch('https://swapi.co/api/people/');
    const data = await response.json();
    this.setState( {characters: data.results} )
  } catch (err) {
    return ('opps, error', err)
  }
}

onSearchChange = (event) => {
  this.setState({ searchfield: event.target.value })
}

  render() {
    const { characters, searchfield } = this.state;
    const filteredCharacters = characters.filter(character => {
      return character.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !characters.length ?
			<h1>Loading</h1> :
		(
      <div>
        <h1 className='f1'>
            Star Wars
        </h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <ErrorBoundry>
          <CardList characters={filteredCharacters}/>
        </ErrorBoundry>
      </div>
    );
  }
}

export default App;
