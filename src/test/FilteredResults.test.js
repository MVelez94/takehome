import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import FilteredResults from '../components/FilteredResults';

describe('FilteredResults component tests', () => {
  let filteredResults;
  let MAX_RESULTS = 3;
  beforeEach(() => {
        let issues = [];
        for(let i=0; i<2*MAX_RESULTS; i++){
            issues.push({title: 'a'+i, html_url: '', number: i, user: {
                html_url: '',
                login: '',
                avatar_url: ''
            }, labels: []});
        }
        filteredResults = shallow(<FilteredResults issues={issues} />)
    });

    it('Make sure the initial state is correct', () => {
        expect(filteredResults.state().page).toEqual(0);
        expect(filteredResults.state().resultsPerPage).toEqual(3);
    });
  
    it('Should render less than MAX_RESULTS', () => {
        expect(filteredResults.find("div.issue")).toHaveLength(MAX_RESULTS);
    });

    it('Should contain no labels', () => {
        filteredResults.find('div.labels').forEach(l => expect(l.text()).toMatch(FilteredResults.NO_LABELS));
    });

    it('Should have MAX_RESULTS img elements', () => {
        expect(filteredResults.find('img')).toHaveLength(MAX_RESULTS);
    });

    it('Should render more issues when resultsPerPage is changed', () => {
        filteredResults.setState({resultsPerPage: MAX_RESULTS + 1});
        expect(filteredResults.find("div.issue")).toHaveLength(MAX_RESULTS + 1);
    });

});