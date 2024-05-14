import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/product")
      .then(res => res.json())
      .then(res => {
        document.getElementById("product").innerHTML = "name : " + res[0].name;
      });
  }

 render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p id="product">
           
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
