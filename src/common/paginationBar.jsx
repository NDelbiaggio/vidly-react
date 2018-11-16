import React, { Component } from "react";
import PropTypes from 'prop-types';
import _ from "lodash";

class PaginationBar extends Component {
  state = {};

  render() {
    const { currentPage, itemsCount, pageSize, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => {
            return (
              <li key={page} className={page === currentPage? 'page-item active': 'page-item'}>
                <a onClick={ ()=> onPageChange(page)} className="page-link">{page}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

PaginationBar.propTypes = { 
    currentPage: PropTypes.number.isRequired, 
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default PaginationBar;
