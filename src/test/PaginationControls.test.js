import React from 'react'
import { shallow } from 'enzyme' // For DOM tests
import '@testing-library/jest-dom/extend-expect'
import PaginationControls from '../components/PaginationControls';

describe('PaginationControls component tests', () => {
  let paginationControls;
  const MAX_RESULTS = 3, options = [3,7,11], move = jest.fn(), page = jest.fn();

  beforeEach(() => {
        
    paginationControls = shallow(<PaginationControls move={move} options={options} page={page} resultsPerPage={3} />)
    });

	it('Make sure the rendered options are the props\' options', () => {
        expect(paginationControls.find("select > option")).toHaveLength(3);
        expect(paginationControls.find("select > option:last-child").text()).toMatch("" + options[options.length-1]);;
    });
  
    it('Should call move on button click', () => {
        paginationControls.find('button:first-child').simulate('click');
        expect(move).toHaveBeenCalled();

        move.mockClear();

        paginationControls.find('button:last-child').simulate('click');
        expect(move).toHaveBeenCalled();
    });
  
    it('Should call page on select change', () => {
        paginationControls.find("select").simulate("change", {target: {value: 7}});
        expect(page).toHaveBeenCalled();
    });

});