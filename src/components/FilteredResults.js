import './FilteredResults.css';
import React from 'react';

export default class FilteredResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {issues: [], seeMore: false};
    }
    
    render () {
        let rendered = 0;
        let DOMissues = [];
        for(const i of this.props.issues) {
            DOMissues.push(<div key={i.number} className="issue">
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
                                            i.labels.map((l, n) => <div className="label" key={i.number + "-" + n}>{l.name}</div>) 
                                        : <div>This issue has no labels</div>}
                                    </div>
                                    <a rel="noopener noreferrer" target="_blank" href={i.html_url}>Go to issue</a>
                                </div>
                            </div>);
            if(++rendered >= this.props.maxResults) {
                if(!this.state.seeMore)
                    break;
            }
        }
        DOMissues.push(<div key={rendered} className="see-more">
                        <button onClick={() => this.setState({seeMore: !this.state.seeMore})}>
                            {this.state.seeMore ? "See less" : "See more"}
                        </button>
                    </div>)
        return (
            <div className="filtered-results">
                {DOMissues}
            </div>
        );
    }
}