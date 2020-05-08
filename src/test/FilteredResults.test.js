import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import FilteredResults from '../components/FilteredResults';

describe('FilteredResults component tests', () => {
  let filteredResults;
  let MAX_RESULTS = 10;
  beforeEach(() => {
        let issues = [];
        for(let i=0; i<2*MAX_RESULTS; i++){
            issues.push({title: 'a'+i, html_url: '', user: {
                html_url: '',
                login: '',
                avatar_url: ''
            }, labels: []});
        }
        filteredResults = shallow(<FilteredResults issues={issues} maxResults={MAX_RESULTS} />)
    });

	it('Make sure the initial state is correct', () => {
        expect(filteredResults.state().issues.length).toEqual(0);
        expect(filteredResults.state().seeMore).toEqual(false);
  });
  
  it('Should render less than MAX_RESULTS', () => {
    expect(filteredResults.find("div.issue").length).toBeLessThanOrEqual(MAX_RESULTS);
});

});