import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import App from '../App';

describe('Main component (App) tests', () => {
  let app;
	beforeEach(() => {
		app = shallow(<App issues={[]} />)
	})

	it('Make sure the initial state is correct', () => {
		expect(app.state().issues.length).toEqual(0);
  });
  
  it('Should render padding elements', () => {
    expect(app.find(".col-lg-4").length).toEqual(3);
  });

});