import React from 'react';
//import uuid from 'react-uuid';
import './App.css';
import axios from 'axios';
//import { set } from 'mongoose';


class Saves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: '',
      description: '',
      image: '',
      link: '',
      title: '',
      saved: '',
      books: [],
      currentBook: '',
      bookResult: []
    };
    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books').then(res => {
      this.setState({ books: res.data })
      console.log(res.data)
     /*  this.setState({ bookResult: res.data.items }) */
    })
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  deleteBooks = () => {
    axios.delete("http://localhost:5000/books").then(res => {
      axios.get('/books').then(books => {
        this.setState({ books: books.data })
      })
    })
  }

  

deleteBook(id) {
  axios.delete('/book/' + id)
  .then(res => {
    axios.get('/books').then(books => {
      this.setState({ books: books.data })
      console.log(this.state);
    }).catch(error=>console.log(error))
  }
  )
}




render() {
  const {books} = this.state
 
  return (
    <div className="App">
        <h2>Saved Books</h2>
      <br />
      <div className="listItems">
        {books.map((book, i) => (
         <div className="parent" key={book.id}>
          <div className="child1">
            <h3>title: {book.title}</h3>
            <p>Author: {book.authors}</p>
            <div className="buttons">
              <button onClick={() => window.location.href=book.link}>view</button>
              <button onClick={() => {
                console.log("Book ID to delete", book.id);
                axios.delete("http://localhost:5000/book/"+book.id).then(res => {
                  //Delete book from state
                  axios.get('http://localhost:5000/books').then(updatedBooks => {
                    this.setState({ books: updatedBooks.data })
                  }).catch(error=>console.log(error))
                }).catch(e => console.log(e))
              }}>delete</button>
              </div>
          </div>

          <div className="child2">
          <img src={book.image} alt="img"/>
          <p>description: {book.description}</p>
         
          </div>
           </div>
  
        ))}
      </div>
      <br />
      <button onClick={this.deleteBooks}>Delete All</button>
    </div>
  );
}
}

// key={`input-${book.id+Math.random()} `}


export default Saves;

