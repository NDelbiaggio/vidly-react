import React, { Component } from "react";

class ListBox extends Component {
  render() {
    const { name, label, options, error, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}> {label} </label>
        {
          <select {...rest} id={name} name={name} className="form-control">
            <option value="" />
            {options.map(item => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        }
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default ListBox;
