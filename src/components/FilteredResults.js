import './FilteredResults.css';
import React from 'react';
import PaginationControls from './PaginationControls';

export default class FilteredResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 0, resultsPerPage: 5};
    }

    move = (diff) => {
        let page = this.state.page + diff;
        console.log(page);
        if(page >= 0 && page < Math.ceil(this.props.issues.length/this.state.resultsPerPage)) {
            this.setState({page});
        }
    }

    render () {
            let startIndex = this.state.page * this.state.resultsPerPage;
            let endIndex = startIndex + this.state.resultsPerPage;
            let DOMissues = this.props.issues.slice(startIndex, endIndex)
            .map(i => <div key={i.number} className="issue">
                                <div className="avatar">
                                    <a href={i.user.html_url}><img alt={i.user.login} title={i.user.login} src={i.user.avatar_url} /></a>
                                </div>
                                <div className="issueInfo">
                                    <h4>{i.title}</h4>
                                    <div className="user"><i>{i.user.login}</i></div>
                                    <div className="number">{"#" + i.number}</div>
                                    <div className="labels">
                                        <strong>Labels</strong>
                                        {i.labels.length > 0 ? 
                                        i.labels.map((l, n) => <div style={{backgroundColor: `#${l.color}`}} className="label" key={i.number + "-" + n}>{l.name}</div>) 
                                        : <div>This issue has no labels</div>}
                                    </div>
                                    <a rel="noopener noreferrer" target="_blank" href={i.html_url}>Go to issue</a>
                                </div>
                            </div>);
            
        return (
            <div className="filtered-results">
                <PaginationControls move={v => this.move(v)} />
                {DOMissues}
                <PaginationControls move={v => this.move(v)} />
            </div>
        );
    }
}