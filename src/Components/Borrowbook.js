import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Borrowbook() {
    const[library,setLibrary]=useState({
        bookName:"",
        authorName:"",
        rating:"",
    });
    const [books, setBooks] = useState([]);
    const[bbooks,setBbooks]=useState([]);
    const{id}=useParams();
    const navigate = useNavigate();

      //const blibrary = { bookName, authorName, rating };
      // console.log(library);

      const getAllBooks=()=>{
        axios.get("http://localhost:8080/api/v1/library/borrow")
        .then((response) =>{
          setBooks(response.data);
        }).catch(error=>{console.log(error);
        })
      }

      const deleteBook=(id,book)=>{
        console.log(id);
        axios.post("http://localhost:8080/api/v1/library",book)
          .then((response) => {
            console.log(response.data);
           setBooks(response.data);
            navigate("/DisplayBook");
          })
          .catch((error) => {
            console.log(error);
          });
        axios.delete("http://localhost:8080/api/v1/library/borrow"+'/'+id)
        .then((response)=>{
          getAllBooks();
          console.log(response.data);
        }).catch(error=>{console.log(error);
        })
    };

    useEffect(() => {
      axios.get("http://localhost:8080/api/v1/library/borrow")
      .then((response) =>{
        setBooks(response.data);
      }).catch(error=>{console.log(error);
      })
    }, [])
    
  return (
    <div className="container">
      <h2 className="text-centre">Borrowed Book List</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) => (
              <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{book.bookName} </td>
                <td>{book.authorName}</td>
                <td>{book.rating}</td>
                <td>
                <button
                  className="btn btn-success"
                  onClick={() => deleteBook(book.id,book)}
                style={{marginRight:'10px'}}>
                  Return
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Borrowbook;