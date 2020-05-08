import React from 'react';
import './Searchbox.css';


export default class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {issues: []};
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.focus();
    }
    componentDidUpdate() {
        this.focus();
    }

    focus() {
        let {issues, selectedIssue} = this.state;
        if(issues.length === 0 && !selectedIssue) {
            this.ref.current.focus();
        }
    }

    filterResults(value) {
        if (value.length >= 4){
            this.props.fetchByTitle(value)
            .then(response => {
                this.setState({loading: true});
                return response;
            })
            .then(response => response.json())
            .then(json => json.items.reduce((acc, val, i) => {
                    if(i < this.props.maxResults) {
                        acc.push(val);
                    }
                    return acc;
                }, []))
            .then(issues => this.setState({issues: issues, error: null, loading: false}))
            .catch(err => this.setState({error: "We have trouble contacting GitHub (we may have run out of our allowed API calls/minute)", issues: [], loading: false}))
        } else this.setState({issues: []});
        
    }
    render () {
        return  (
            <div className="search-input">
                <h3>Enter your search terms</h3>               
                    <input ref={this.ref} onChange={e => this.filterResults(e.target.value)} />
                    <div className="preliminary-results" style={{visibility: this.state.issues.length > 0 ? "visible" : null}}>
                        {this.state.issues.map((i) => <a href={"#" + escape(i.title)} onClick={() => this.setState({issues: []})} key={i.number}>{i.title}</a>)}
                    </div>
                    {this.state.error ? <div className="error">{this.state.error}</div> : null}
                    {this.state.loading ? <div className="loading">
                <img src="http://www.ajaxload.info/cache/FF/FF/FF/7B/6F/E8/1-1.gif"/> Loading...</div> : null}
            </div>
        );
    }
}
