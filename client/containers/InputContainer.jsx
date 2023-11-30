import React from 'react';
import UserInput from '../components/UserInput.jsx';
import { useDispatch } from 'react-redux'
import { fetchDataRequest, fetchCompareStateData, fetchDataFailure } from '../actions/stateActions.js';
import axios from 'axios';


const InputContainer = (props) => {
  const { index } = props;
  const dispatch = useDispatch();

  const fetchData = (state) => {
    dispatch(fetchDataRequest())
    axios.post(`/data?state=` + state)
      .then(response => {
        const data = response.data;
        data.index = index;
        dispatch(fetchCompareStateData(data))
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchDataFailure(errorMsg))
      })
  }
  
  return(
    <div>
      <UserInput dispatch={dispatch} fetchData={fetchData} index={index}/>
    </div>
  )
}

export default InputContainer;