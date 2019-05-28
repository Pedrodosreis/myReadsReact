import React from 'react';
import { Link } from "react-router-dom";
import ListOfBooks from './ListOfBooks.js';
import { search, get } from '../BooksAPI.js';

class SearchComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			query: "",
			searchBooks: []
		};
		this.handleChange = this.handleChange.bind(this);
	}  	

	handleSearch(query) {
		this.setState({
			query: query
		});

		if (query !== "") {
			search(query).then(bks => {
				if (!bks.error) {

          Promise.all(this.updateShelfsForSearchRecords(bks))
          .then(updatedBks => {
          	this.setState({
                searchBooks: updatedBks.filter(b => b.imageLinks !== undefined)
            });
          });
      } else {
      	this.setState({
      		searchBooks: []
      	});
      }
  });
		} else {

      this.setState({
      	searchBooks: []
      });
  }
}

updateShelfsForSearchRecords(bks) {
	return bks.map(book => get(book.id));
}

handleChange(book, shelf) {
	this.setState(state => ({
		searchBooks: state.searchBooks.map(b => {
			if(b.id === book.id) {
				b.shelf = shelf
			} else {
				return b;
			}
			return b;
		})
	}));

    this.props.changeType(book, shelf);
}

render() {
	return (
		<div className="search-books">
		<div className="search-books-bar">
		<Link to="/" className="close-search">
		Close
		</Link>
		<div className="search-books-input-wrapper">
		<input type="text" placeholder="Search by title or author"
		value={this.state.query} onChange={e => {
			this.handleSearch(e.target.value);
		}}/>
		</div>
		</div>
		<div className="search-books-results">
		<ListOfBooks title="Books" books={this.state.searchBooks} changeType={this.handleChange} />
		</div>
		</div>

		)
	}
}

export default SearchComponent;