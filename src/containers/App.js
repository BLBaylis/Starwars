import React, { Component } from "react";
import "./App.css";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      searchfield: ""
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://swapi.co/api/people/");
      const characters = await response.json();
      const homeworldUrls = await characters.results.map(
        char => char.homeworld
      );
      const homeworlds = await Promise.all(
        homeworldUrls.map(url => fetch(url).then(res => res.json()))
      );
      const updatedCharacters = characters.results.reduce(
        (total, char, index) => {
          char.homeworld = homeworlds[index].name;
          return total.concat(char);
        },
        []
      );
      this.setState({ characters: updatedCharacters });
    } catch (err) {
      return "opps, error", err;
    }
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { characters, searchfield } = this.state;
    const filteredCharacters = characters.filter(character => {
      return character.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !characters.length ? (
      <h1>Loading</h1>
    ) : (
      <div>
        <h1 className="f1">Star Wars</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <ErrorBoundry>
          <CardList characters={filteredCharacters} />
        </ErrorBoundry>
      </div>
    );
  }
}

export default App;
