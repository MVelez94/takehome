import React from 'react';
import './Searchbox.css';


export default class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {issues: [], focus: 0};
        this.ref = React.createRef();
    }
    static ARROW_DOWN = 40;
    static ARROW_UP = 38;
    static ESCAPE = 27;

    filterResults(value) {
        if (value.length >= 4){
            this.props.fetchByTitle(value)
            .then(json => json.items.reduce((acc, val, i) => {
                    if(i < this.props.maxResults) {
                        acc.push(val);
                    }
                    return acc;
                }, []))
            .then(issues => this.setState({issues}));
        } else this.setState({issues: []});
        
    }

    changeHash = (e) => {
        if (e.nativeEvent.submitter.formAction) {
            window.location.hash = e.target.elements[0].value;
        }
        this.setState({issues: [], focus: 0});
    }
    computeNewFocus = (diff) => {
        let focus = (this.state.focus + diff) % (this.state.issues.length + 1);
        this.setState({focus});
    }
    navigate = (e) => {
        switch(e.keyCode) {
            case Searchbox.ARROW_DOWN:
                e.preventDefault();
                this.computeNewFocus(1);
                break;
            case Searchbox.ARROW_UP:
                e.preventDefault();
                this.computeNewFocus(-1);
                break;
            case Searchbox.ESCAPE:
                e.preventDefault();
                this.setState({issues: [], focus: 0});
                break;
            default: break;
        }
    }
    componentDidUpdate() {
        this.ref.current && this.ref.current.focus();
    }
    render () {
        return  (
            <form onSubmit={this.changeHash} className="search-input">
                <h3>Enter your search terms</h3>               
                    <input onChange={e => this.filterResults(e.target.value)} ref={this.state.focus === 0 ? this.ref : null} onKeyDown={this.navigate} />
                    <button></button>
                    <div className="preliminary-results" style={{visibility: this.state.issues.length > 0 ? "visible" : null}}>
                        {this.state.issues.map((i, n) => <button formAction={"#" + escape(i.title)} key={i.number} ref={this.state.focus === n+1 ? this.ref : null} onKeyDown={this.navigate}>{i.title}</button>)}
                    </div>
                    
            </form>
        );
    }
}
