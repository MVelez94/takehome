import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import Searchbox from '../components/Searchbox';

describe('Searchbox component tests', () => {
  let searchbox;
  let MAX_RESULTS = 10;
  beforeEach(() => {
        let issues = [];
        for(let i=0; i<2*MAX_RESULTS; i++){
            issues.push({title: 'a'+i});
        }
        searchbox = shallow(<Searchbox issues={issues} maxResults={MAX_RESULTS} selectedIssue={null} />)
    });

    it('Make sure the initial state is correct', () => {
        expect(searchbox.state().issues.length).toEqual(0);
        expect(searchbox.state().selectedIssue).toEqual(null);
    });
  
    it('Should render less than MAX_RESULTS', () => {
        searchbox.find("input").simulate("change", {value: 'a'});
        expect(searchbox.find("a").length).toBeLessThanOrEqual(MAX_RESULTS);
    });

});