import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    const { items, selectedItem, textProperty, valueProperty, onItemSelect } = this.props;

    return (
      <ul className="list-group">
        {items.map(item => {
          return (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={selectedItem === item? "list-group-item active": "list-group-item"}
            >
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;
