import React, { Component } from "react";

import Table from "../common/table";
import Like from "../common/like";
import auth from "../services/authService";

import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          onToggle={() => this.props.onToggle(movie._id)}
        />
      )
    }
  ];

  addDeleteColumn() {
    return {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )
    };
  }

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.addDeleteColumn());
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
