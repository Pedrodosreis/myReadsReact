import React from 'react';
import ListOfBooks from './ListOfBooks.js'

class UserBookStatus extends React.Component {
	
	render() {
		const allBooks = this.props.books;
		const current = allBooks.filter(book => book.shelf === "currentlyReading");
		const wantsTo = allBooks.filter(book => book.shelf === "wantToRead");
		const bought = allBooks.filter(book => book.shelf === "read");
		return (
			<div className="list-books-content">
			<div>

			<ListOfBooks title="Currently Reading" books={current} changeType={this.props.changeType}/>
			<ListOfBooks title="Want to Read" books={wantsTo} changeType={this.props.changeType}/>
			<ListOfBooks title="Read" books={bought} changeType={this.props.changeType}/>

			</div>
			</div>

			)
		}

	}

	export default UserBookStatus;