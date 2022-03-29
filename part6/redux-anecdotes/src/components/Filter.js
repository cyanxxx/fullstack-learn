import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
const Filter = ({filter, setFilter}) => {
  // const filter = useSelector(state => state.filter)
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    // dispatch(setFilter(event.target.value))
    setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

export default connect((state) => ({filter: state.filter}), {setFilter})(Filter)