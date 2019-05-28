import React from 'react';
import './App.css';
import UserBookStatus from './components/UserBookStatus.js';
import SearchComponent from './components/SearchComponent.js';
import FindABook from './components/FindABook.js';
import {Switch, Route} from 'react-router-dom';

import {getAll, update} from './BooksAPI.js';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
    this.changeTypeOfABook = this.changeTypeOfABook.bind(this);
  }

  getAllBooks = getAllBookFromAPI => {
    getAll().then(allBooks => this.setState({ allBooks }));
  };

  componentDidMount() {
    getAll().then(allBooks => this.setState({ allBooks }));
  };

  changeTypeOfABook(book, shelf) {
    let bk = this.state.allBooks.filter(b => b.id === book.id);
    if (bk.length === 0) {
      book["shelf"] = shelf;
      this.setState(state => ({
        allBooks: state.allBooks.concat([book])
      }));
    } else {
      this.setState(state => ({
        allBooks: state.allBooks.map(b => {
          if(b.id === book.id) {
            b.shelf = shelf;
          } else {
            return b;
          }
          return b;
        })
      }));
    }
    update(book, shelf);
  }

  render() {
    return (
      <div className="app">

      <Switch>
      <Route path="/search"
        render={() => <SearchComponent changeBookShelf={this.updateBookShelf} books={this.state.allBooks}
        changeType={this.changeTypeOfABook}/>}
      />

      <Route exact path="/"
      render={() => ( 
        <div className="list-books">
        <div className="list-books-title"> 
        <h1>MyReads</h1>
        </div>

        <UserBookStatus books={this.state.allBooks} changeType={this.changeTypeOfABook}/>
        <FindABook showSearchPage={this.updateSearchPageState} />
        </div>
        )}
        />
        
        </Switch>
        </div>
        )
    }
  }

  export default BooksApp
