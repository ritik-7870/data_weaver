// AddBookForm.js
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AddBook = ({ onSubmit }) => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    country: "",
    language: "",
    year: "",
    link:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Reset the form after submission
    setFormData({
      title: "",
      author: "",
      country: "",
      language: "",
      year: "",
      link:""
    });
    axios.post("http://68.178.162.203:8080/application-test-v1.1/books", {formData})
    .then((res) => {
        console.log(res)
        if(res.status === 200) {
            navigate("/")
        }
    })
  };


 

  return (
    <div className="container mt-5">
    <form >
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          className="form-control"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          className="form-control"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Language</label>
        <input
          type="text"
          className="form-control"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Year</label>
        <input
          type="text"
          className="form-control"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Link</label>
        <input
          type="text"
          className="form-control"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        Add Book
      </button>
    </form> </div>
  );
};

export default AddBook;

