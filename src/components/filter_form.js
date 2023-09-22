function FilterForm(){
    return(
        <div className="FilterForm">
      <button type="button" className="btn btn-outline-success col-3">
        All
      </button>
      <button type="button" className="btn btn-outline-success col-3">
        Done
      </button>
      <button type="button" className="btn btn-outline-success col-3">
        In-progress
      </button>
    </div>

    );
}
export default FilterForm;