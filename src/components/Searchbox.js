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
            .then(json => json.items.reduce((acc, val, i) => {
                    if(i < this.props.maxResults) {
                        acc.push(val);
                    }
                    return acc;
                }, []))
            .then(issues => this.setState({issues: issues}));
            /*.catch(err => this.setState({error: , issues: [], loading: false}))*/
        } else this.setState({issues: []});
        
    }

    changeHash(e) {
        if (e.nativeEvent.submitter.formAction) {
            window.location.hash = e.target.elements[0].value;
        }
        this.setState({issues: []});
    }

    render () {
        return  (
            <form onSubmit={this.changeHash.bind(this)} className="search-input">
                <h3>Enter your search terms</h3>               
                    <input ref={this.ref} onChange={e => this.filterResults(e.target.value)} />
                    <button></button>
                    <div className="preliminary-results" style={{visibility: this.state.issues.length > 0 ? "visible" : null}}>
                        {this.state.issues.map((i) => <button formAction={"#" + escape(i.title)} key={i.number}>{i.title}</button>)}
                    </div>
                    
            </form>
        );
    }
}
