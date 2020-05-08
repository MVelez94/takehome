import React from 'react';
import './App.css';
import Searchbox from './components/Searchbox';
import FilteredResults from './components/FilteredResults';
import Fetch from './util/fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues: this.findIssueByNumber(window.location.hash)};
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({issues: this.findIssueByNumber(window.location.hash)});
    }
  }

  findIssueByNumber(n) {
    let number = parseInt(n.replace("#", ""));
    return this.props.issues.filter(i => i.number === number || n.length === 0);
  }
  render() {
    return (
      <div className="App">
        <div className="col-lg-4">&nbsp;</div>
        <div className="col-lg-4">
          <Searchbox fetchByTitle={Fetch.fetchIssuesByTitle} maxResults={8}  />
          <FilteredResults issues={this.state.issues} maxResults={10} />
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
    );
  }
}

export default App;
