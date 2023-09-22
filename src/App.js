import './App.css';
import FormSearch from "./components/form_search"
import ListTodo from "./components/list_todo"
import FilterForm from "./components/filter_form"
function App() {
  return (
    <div classname='container'>
      <h1 className='title'>TODO LIST</h1>
      <FormSearch/>
      {/* <FilterForm/> */}
      {/* <ListTodo/> */}
    </div>
  );
}

export default App;
