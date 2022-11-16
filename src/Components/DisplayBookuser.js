
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import LibraryServices from "./services/LibraryServices";
import { Button } from "bootstrap";
const DisplayBookuser = () => {
  const [books, setBooks] = useState([]);

//   useEffect(()=>{
//     axios
//     .get("http://localhost:8080/api/v1/library")
//     .then((response) => {
//       setBooks(
// response.data
//       );
//       console.log(response.data);
//     });
//    },[])

useEffect(() => {
  axios.get("http://localhost:8080/api/v1/library")
  .then((response) =>{
    setBooks(response.data);
  }).catch(error=>{console.log(error);
  })
}, [])

const getAllBooks=()=>{
  axios.get("http://localhost:8080/api/v1/library")
  .then((response) =>{
    setBooks(response.data);
  }).catch(error=>{console.log(error);
  })
}

const deleteBook=(bookid)=>{
    console.log(bookid);
    axios.delete("http://localhost:8080/api/v1/library"+'/'+bookid)
    .then((response)=>{
      getAllBooks();
    }).catch(error=>{console.log(error);
    })
}



  return (
    <div className="container">
      <h2 className="text-centre">Book List</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Rating</th>
              <th>Actions</th>
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
                  <Link className='btn btn-primary mx-2' to={`/view-book/${book.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DisplayBookuser;