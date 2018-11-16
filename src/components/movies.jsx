import React, { Component } from "react";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";

import SearchBox from "../common/searchBox";

import PaginationBar from "../common/paginationBar";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async id => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter(movie => movie._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movies has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleToggle = id => {
    let movies = [...this.state.movies];
    let ind = movies.findIndex(movie => movie._id === id);
    movies[ind] = { ...movies[ind] };
    movies[ind].liked = !movies[ind].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearchChange = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    let {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    if (searchQuery) {
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter(m => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    let { length: moviesCount } = this.state.movies;
    let { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    let { user } = this.props;

    // if (moviesCount === 0) return <h5>There are no movies in the database</h5>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              selectedItem={this.state.selectedGenre}
              items={this.state.genres}
              onItemSelect={genre => this.handleGenreSelect(genre)}
            />
          </div>

          <div className="col">
            {user && (
              <Link
                to={"/movies/new"}
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}

            <SearchBox value={searchQuery} onChange={this.handleSearchChange} />

            <h5>Showing {totalCount} movies in the database</h5>
            <h1>Movies</h1>

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onToggle={this.handleToggle}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <PaginationBar
              currentPage={currentPage}
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={page => this.handlePageChange(page)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
