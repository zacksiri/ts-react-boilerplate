import {shallow} from "enzyme";
import * as React from "react";
import {IFormData, RegisterReduxForm} from "../components/RegisterForm";
import {RegisterPage} from "./RegisterPage";
describe("<RegisterPage />", () => {
  it("matches snapshot", () => {
    const component = shallow(<RegisterPage />);
    expect(component).toMatchSnapshot();
  });

  it("calls showResults func when RegisterReduxForm is submitted", () => {
    const spy = jest.spyOn(RegisterPage.prototype, "showResults");
    const component = shallow(<RegisterPage />);
    expect(component.find(RegisterReduxForm)).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    component.find(RegisterReduxForm).simulate("submit");
    expect(spy).toHaveBeenCalled();
  });

  it("showResults alert correct values", () => {
    const component = shallow(<RegisterPage />);
    const formData: IFormData = {
      age: 25,
      confirmPassword: "topsecret",
      email: "email@example.com",
      password: "topsecret",
      username: "user"
    };
    const spy = jest.spyOn(window, "alert");
    expect.assertions(1);
    return (component as any).instance().showResults(formData).then(() => {
      expect(spy).toHaveBeenCalledWith(`You submitted:\n\n${JSON.stringify(formData, null, 2)}`);
    });
  });
});
