import {shallow} from "enzyme";
import * as React from "react";
import {IAction, IState} from "../redux/modules/baseModule";
import {IStars, LOAD_STARS} from "../redux/modules/starsModule";
import {mapStateToProps, UnconnectedStars} from "./StarsPage";

describe("<Stars />", () => {
  it("matches snapshot when rendering stars", () => {
    const component = shallow(<UnconnectedStars isFetching={false} stargazers_count={61} dispatch={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when rendering fetching text", () => {
    const component = shallow(<UnconnectedStars isFetching={true} stargazers_count={-1} dispatch={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });

  it("maps state to props correctly", () => {
    const stars: IState<IStars> = {
      isFetching: false,
      payload: {
        stargazers_count: 100
      }
    };
    const props = mapStateToProps({stars});
    expect(props).toEqual({isFetching: false, stargazers_count: 100});
  });

  it("dispatches LOAD_STARS action before rendering if stargazers_count === -1", () => {
    const dispatch = jest.fn();
    const expectedValue: IAction<IStars> = {
      type: LOAD_STARS
    };
    expect(dispatch).not.toHaveBeenCalled();
    shallow(<UnconnectedStars dispatch={dispatch} isFetching={false} stargazers_count={-1}/>);
    expect(dispatch).toHaveBeenCalledWith(expectedValue);
  });

  it("does not dispatch LOAD_STARS action before rendering if stargazers_count !== -1", () => {
    const dispatch = jest.fn();
    shallow(<UnconnectedStars dispatch={dispatch} isFetching={false} stargazers_count={10}/>);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
