function Items() {
  return (
    <div className="row item">
      <div className="col-10 item-title">HVN</div>
      <div className="col-2 item-group-button">
        <button className="btn btn-outline-danger">
          <i className="fa fa-trash"></i>
        </button>
        <button className="btn btn-outline-success">
          <i className="fa fa-edit"></i>
        </button>
      </div>
    </div>
  );
}

export default Items;
