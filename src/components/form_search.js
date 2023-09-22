import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormSearch() {
  // Khai báo các state sử dụng trong component
  const [show, setShow] = useState(false); // Hiển thị hoặc ẩn modal
  const [todoName, setTodoName] = useState(""); // Tên công việc mới
  const [inputError, setInputError] = useState(""); // Lỗi nhập liệu
  const [todos, setTodos] = useState([]); // Danh sách công việc
  const [deleteIndex, setDeleteIndex] = useState(null); // Chỉ mục của todo cần xóa
  const [updateIndex, setUpdateIndex] = useState(null); // Chỉ mục của todo cần cập nhật
  const [filterStatus, setFilterStatus] = useState("All"); // Trạng thái lọc: All, Done, In-progress
  const [searchTerm, setSearchTerm] = useState(""); // Ký tự tìm kiếm

  // Xử lý hiển thị modal
  const handleShow = () => {
    setShow(true);
    setInputError("");
  };

  // Xử lý đóng modal
  const handleClose = () => {
    setShow(false);
    setTodoName("");
    setInputError("");
    setUpdateIndex(null); // Đóng dialog cập nhật và xóa chỉ mục cập nhật
  };

  // Xử lý thay đổi nội dung công việc mới
  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  // Xử lý tạo công việc mới
  const handleCreateTodo = () => {
    if (todoName.trim() === "") {
      setInputError("Please enter a todo name.");
    } else {
      // Tạo công việc mới và thêm vào danh sách công việc
      const newTodo = { name: todoName, status: "In-progress", completed: false }; // Mặc định status là In-progress và completed là false
      setTodos([...todos, newTodo]);
      console.log("Created todo:", todoName);
      handleClose();
    }
  };

  // Xử lý hiển thị hộp thoại xác nhận xóa công việc
  const handleDeleteTodo = (index) => {
    setDeleteIndex(index);
    setShow(true);
  };

  // Xác nhận xóa công việc
  const confirmDeleteTodo = () => {
    if (deleteIndex !== null) {
      // Nếu người dùng đồng ý xóa, thực hiện xóa công việc
      const updatedTodos = [...todos];
      updatedTodos.splice(deleteIndex, 1);
      setTodos(updatedTodos);
    }
    setDeleteIndex(null);
    setShow(false);
  };

  // Xử lý hiển thị dialog cập nhật công việc
  const handleEditTodo = (index) => {
    setUpdateIndex(index);
    setTodoName(todos[index].name);
    setShow(true);
  };

  // Xác nhận cập nhật công việc
  const confirmEditTodo = () => {
    if (updateIndex !== null) {
      // Nếu người dùng đồng ý cập nhật, thực hiện cập nhật công việc
      const updatedTodos = [...todos];
      updatedTodos[updateIndex].name = todoName;
      setTodos(updatedTodos);
    }
    handleClose();
  };

  // Đảo ngược trạng thái hoàn thành của công việc khi người dùng nhấn vào
  const handleToggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Xử lý lọc công việc theo trạng thái
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  // Lọc danh sách công việc dựa trên trạng thái và tìm kiếm
  const filterTodos = () => {
    let filteredTodos = todos;
    if (filterStatus !== "All") {
      filteredTodos = filteredTodos.filter((todo) => todo.status === filterStatus);
    }
    if (searchTerm.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredTodos;
  };

  return (
    <div>
      <form className="row">
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button onClick={handleShow} type="button" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
      <div className="FilterForm">
        <button
          type="button"
          className={`btn btn-outline-success col-3 ${
            filterStatus === "All" ? "active" : ""
          }`}
          onClick={() => handleFilter("All")}
        >
          All
        </button>
        <button
          type="button"
          className={`btn btn-outline-success col-3 ${
            filterStatus === "Done" ? "active" : ""
          }`}
          onClick={() => handleFilter("Done")}
        >
          Done
        </button>
        <button
          type="button"
          className={`btn btn-outline-success col-3 ${
            filterStatus === "In-progress" ? "active" : ""
          }`}
          onClick={() => handleFilter("In-progress")}
        >
          In-progress
        </button>
      </div>
      <table className="table">
        <tbody>
          {filterTodos().length > 0 ? (
            filterTodos().map((todo, index) => (
              <tr key={index}>
                <div
                  className={`row item ${todo.completed ? "completed" : ""}`}
                  onClick={() => handleToggleCompleted(index)}
                >
                  <div className="col-10 item-title">{todo.name}</div>
                  <div className="col-2 item-group-button">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleEditTodo(index)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  </div>
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No search found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteIndex !== null
              ? "Confirm Delete"
              : updateIndex !== null
              ? "Edit Todo"
              : "Create Todo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteIndex !== null ? (
            <p>Are you sure you want to delete this todo?</p>
          ) : (
            <input
              type="text"
              className={`form-control ${inputError && "is-invalid"}`}
              placeholder="Todo name"
              value={todoName}
              onChange={handleInputChange}
              autoFocus // Con trỏ chuột tự động focus vào input
            />
          )}
          {inputError && <div className="invalid-feedback">{inputError}</div>}
        </Modal.Body>
        <Modal.Footer>
          {deleteIndex !== null || updateIndex !== null ? (
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          )}
          <Button
            variant={deleteIndex !== null ? "danger" : "primary"}
            onClick={
              deleteIndex !== null
                ? confirmDeleteTodo
                : updateIndex !== null
                ? confirmEditTodo
                : handleCreateTodo
            }
          >
            {deleteIndex !== null
              ? "Delete"
              : updateIndex !== null
              ? "Save"
              : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormSearch;
