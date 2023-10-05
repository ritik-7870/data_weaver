import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    country: "",
    language: "",
    year: "",
  });
  useEffect(() => {
    axios
      .get("http://68.178.162.203:8080/application-test-v1.1/books")
      .then((res) => {
        console.log(res);
        setBookList(res.data.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (id, book) => {
    // Set the initial values in the formData state when editing
    setFormData({
      title: book.title,
      author: book.author,
      country: book.country,
      language: book.language,
      year: book.year,
    });

    setSelectedBook(id);
    setIsModalOpen(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = (id) => {};

  // Sort the bookList based on the selected field and direction
  const sortedBookList = [...bookList].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    // Handle cases where the values are undefined or null
    if (aValue == null) return 1; // Move undefined/null values to the end
    if (bValue == null) return -1; // Move undefined/null values to the end

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const closeModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {


    axios
      .put(
        `http://68.178.162.203:8080/application-test-v1.1/books/${selectedBook}`,
        { formData }
      )
      .then((res) => {
        console.log(res);
      });

    // Close the modal after submission
    closeModal();
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Link to="/add">
            <button type="button" className="btn btn-dark">
              Add Book
            </button>
          </Link>
        </div>
        <section>
          <table className="table table-hover table-fixed table-responsive text-nowrap">
            <thead className="thead-dark">
              <tr>
                <th scope="col" onClick={() => handleSort("title")}>
                  Title{" "}
                  <span>
                    {" "}
                    (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-sort-alpha-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                      />
                      <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                    )
                  </span>{" "}
                </th>
                <th scope="col" onClick={() => handleSort("author")}>
                  Author{" "}
                  <span>
                    (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-sort-alpha-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                      />
                      <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                    )
                  </span>
                </th>
                <th scope="col">Country</th>
                <th scope="col">Language</th>
                <th scope="col" onClick={() => handleSort("year")}>
                  Year{" "}
                  <span>
                    {" "}
                    (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-sort-numeric-down-alt"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
                      />
                      <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>{" "}
                    )
                  </span>
                </th>
                <th scope="col">Action</th>
                <th scope="col" style={{ width: "10%" }}>
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBookList.map((data, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{data.title}</td>
                      <td>{data.author}</td>
                      <td>{data.country}</td>
                      <td>{data.language}</td>
                      <td>{data.year}</td>
                      <td>
                        <button
                          className="btn btn-success mr-3"
                          onClick={() => handleEdit(data.id, data)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td
                        className="text-nowrap table-fixed"
                        style={{ width: "10%" }}
                      >
                        {data.link}
                      </td>
                    </tr>
                  </>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </section>{" "}
      </div>

    

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        // onRequestClose={closeModal}
        contentLabel="Edit Book"
        style={{ right: "50%", left: "31%", width: "544px" }}
      >
        {selectedBook && (
          <div>
            <h2>Edit Book</h2>
            <form>
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
            </form>
            <div className="d-flex">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-danger ml-3" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookList;
