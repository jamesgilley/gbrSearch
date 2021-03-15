import React from 'react';
//import uuid from 'react-uuid';
import './App.css';
import axios from 'axios';
//import { set } from 'mongoose';


class App extends React.Component {
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
     /*  this.setState({ bookResult: res.data.items }) */
    })
  }
  submitBook = (event) => {
    event.preventDefault();
    //console.log(`You have made a request to submit ${this.state.firstName} ${this.state.lastName}`);
    console.log(this.state);

    // axios.post('http://localhost:5000/addbook', {
    //   title: this.state.title,
    //   saved: this.state.saved,
    //   link: this.state.link,
    //   authors: this.state.authors,
    //   description: this.state.description,
    //   image: this.state.image
    // })

      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}&key=AIzaSyDu817sXHay8Agq9iQCuWlayrHNWGesiNU`).then(res => {
          this.setState({ bookResult: res.data.items })
          console.log(res.data, "single book <====")
        })
      .catch((error) => {
        console.log(error);
        //console.log(`There was an error submitting ${this.state.firstName} ${this.state.lastName} ${this.state.bookEmail}`);
      });
    
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
  const {title} = this.state
 
  return (
    <div className="App">
      <h2>Search Books</h2>
      <form onSubmit={this.submitBook}>
        <h1>book Database</h1>
        <h3>Enter Title :</h3>
        <input
          type='text'
          value={title}
          name='title'
          onChange={this.myChangeHandler}
        />
        <input
          type='submit'
          value="submit" 
                 />
      
      </form>
      <br />
      <div className="listItems">
        {this.state.bookResult.map((book) => (
         <div className="parent" key={book.id}>
          <div className="child1">
            <h3>title: {book.volumeInfo.title}</h3>
            {/* <p>Author: {book.volumeInfo.authors[0]}</p> */}
            <div className="buttons">
              <button>view</button>
              <button onClick={() => {
                      axios.post('http://localhost:5000/addbook', {
                        title: book.volumeInfo.title,
                        saved: "yes",
                        link: book.volumeInfo.infoLink,
                        authors: book.volumeInfo.authors ? book.volumeInfo.authors?.toString() : "Unknown Author",
                        description: book.volumeInfo.description,
                        image: book.volumeInfo.imageLinks.smallThumbnail
                      }).catch(e => console.log(e));
              }}>save</button>
              </div>
          </div>

          <div className="child2">
          <img  src={book.volumeInfo.imageLinks.smallThumbnail} alt="img"/>
          <p>description: {book.volumeInfo.description}</p>
         
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


export default App;

