import React from 'react';
import './Searchbox.css';


export default class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {issues: [], selectedIssue: this.props.selectedIssue};
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
        if (value.length !== 0){
            let filteredIssues = this.props.issues;
            for(const word of value.split(" ")) {
                if(word.length > 0) {
                    filteredIssues = filteredIssues.filter(i => i.title.toUpperCase().indexOf(word.toUpperCase()) >=0)
                }
            }
            this.setState({issues: filteredIssues});
        } else this.setState({issues: []});
        
    }
    resetIssue() {
        this.setState({selectedIssue: null, issues: []});
        window.location.hash = "";
    }
    render () {
        return  (
            <div className="search-input">
                <h3>Enter your search terms</h3>
                {
                    this.state.selectedIssue ? 
                    (<span>{this.state.selectedIssue} <button onClick={() => this.resetIssue()}>&times;</button></span>) : 
                    (<div>
                        <input ref={this.ref} onChange={e => this.filterResults(e.target.value)} />
                        <div className="preliminary-results" style={{visibility: this.state.issues.length > 0 ? "visible" : null}}>
                            {this.state.issues.map((i, n) => n < this.props.maxResults ? <a href={"#" + i.number} onClick={() => this.setState({selectedIssue: i.title})} key={i.number}>{i.title}</a> : null)}
                        </div>
                    </div>)
                }
            </div>
        );
    }
}
