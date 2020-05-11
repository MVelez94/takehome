import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import Searchbox from '../components/Searchbox';

describe('Searchbox component tests', () => {
  let searchbox;
  const MAX_RESULTS = 10, issues = [];
  for(let i=0; i<2*MAX_RESULTS; i++){
    issues.push({number: i, title: String.fromCharCode(32+i)});
}
  const fetchByTitle = jest.fn((t) => new Promise(r => r({items: issues})));
        
  beforeEach(() => {
        
        searchbox = shallow(<Searchbox fetchByTitle={fetchByTitle} maxResults={MAX_RESULTS} />)
    });

    it('Make sure the initial state is correct', () => {
        expect(searchbox.state().issues.length).toEqual(0);
        expect(searchbox.state().focus).toEqual(0);
    });
  
    it('Should render issues in the state when available', () => {
        searchbox.setState({issues: issues.slice(0, MAX_RESULTS)});
        expect(searchbox.find("button")).toHaveLength(MAX_RESULTS + 1);
    });

    it('Should render less than MAX_RESULTS', () => {
        searchbox.find("input").simulate("change", {target: {value: 'test123'}});
        Promise.resolve().then(() => true).then(() => true).finally(() => expect(searchbox.find("button")).toHaveLength(MAX_RESULTS + 1)) // Quick event loop workaround
    });

    it('Should blur when ARROW_DOWN/ARROW_UP keys are pressed', () => {
        let focus = searchbox.state().focus;
        searchbox.find("input").simulate("change", {target: {value: 'test123'}});
        Promise.resolve().then(() => true).then(() => true)
        .then(() => searchbox.find("input").simulate("keydown", {keyCode: Searchbox.ARROW_DOWN, preventDefault: Function()}))
        .then(() => expect(searchbox.state().focus).toEqual(focus+1))
        .then(() => searchbox.find("input").simulate("keydown", {keyCode: Searchbox.ARROW_UP, preventDefault: Function()}))
        .then(() => expect(searchbox.state().focus).toEqual(focus))
    })
});