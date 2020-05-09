import React from 'react';
import './App.css';
import Searchbox from './components/Searchbox';
import FilteredResults from './components/FilteredResults';
import Fetch from './util/fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues: [], loading: false, error: null};
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.findIssuesByTitle(window.location.hash)
      .then(body => body.items || body)
      .then(issues => this.setState({issues}));
    };
    window.onhashchange();
  }

  findIssuesByTitle(title) {
    title = title.replace("#", "");
    this.setState({loading: true});
    return (title.length > 0 ? Fetch.fetchIssuesByTitle(unescape(title)) : Fetch.fetchIssueByNumber())
            .then(v => {this.setState({loading: false, error: null}); return v})
            .catch(v => Promise.reject(this.setState({loading: false,
              error: "We have trouble contacting GitHub (we may have run out of our allowed API calls per minute)"})));
  }

  render() {
    return (
      <div className="App">
        <div className="col-lg-4">&nbsp;</div>
        <div className="col-lg-4">
        {this.state.error ? <div className="error">{this.state.error}</div> : null}
        {this.state.loading ? <div className="loading">
              <img src="/spinner.gif"/> Loading...</div> : null}
          <Searchbox fetchByTitle={t => this.findIssuesByTitle(t)} maxResults={8}  />
          <FilteredResults issues={this.state.issues} maxResults={10} />
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
    );
  }
}

export default App;
