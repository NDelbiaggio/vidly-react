import React from "react";

import Form from "../common/form";
import Joi from "joi-browser";

import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    genres: [],
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <div>
          <form>
            {this.renderInput("title", "Title")}
            {this.renderListBox("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate", "number")}
            {this.renderButton('Save')}
          </form>
        </div>

        {/* <button
          onClick={() => this.doSubmit()}
          className="btn btn-primary btn-sm"
        >
          save
        </button> */}
      </React.Fragment>
    );
  }
}

export default MovieForm;
