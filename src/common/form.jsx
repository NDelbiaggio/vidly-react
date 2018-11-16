import React, { Component } from "react";

import Input from "./input";
import ListBox from "./listBox";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty(input);
    const errors = { ...this.state.errors };
    //update the state errors
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    this.setState({ errors });

    //binding view/model
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderButton = label => {
    return (
      <button onClick={this.handleSubmit} disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderListBox = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <ListBox
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
