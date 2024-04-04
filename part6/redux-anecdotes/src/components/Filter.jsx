import { useDispatch } from "react-redux" 
import { setFilter } from "../reducers/filterReducers"


const Filter = () => {
  const dispatch = useDispatch()
    const handleChange = (e) => {
      // input-field value is in variable event.target.value
      dispatch(setFilter(`${e.target.value} was created`))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter