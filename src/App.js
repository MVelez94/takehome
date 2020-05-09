import React from 'react';
import './App.css';
import Searchbox from './components/Searchbox';
import FilteredResults from './components/FilteredResults';
import Fetch from './util/fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues: []};
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.findIssuesByTitle(window.location.hash)
      .then(response => response.json())
      .then(body => body.items || body)
      .then(issues => this.setState({issues}));
    };
    window.onhashchange();
  }

  findIssuesByTitle(title) {
    title = title.replace("#", "");
    return title.length > 0 ? Fetch.fetchIssuesByTitle(unescape(title)) : Fetch.fetchIssueByNumber();
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
