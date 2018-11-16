import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { onChange, ...rest } = this.props;

    return (
      <input
        {...rest}
        style={{ marginBottom: 20 }}
        type="text"
        className="form-control"
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
      />
    );
  }
}

SearchBox.defaultProps = {
  placeholder: "Search ..."
};

export default SearchBox;
