import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
/*
Note, this is not used, but for a non dynamic fetch component is an excellent example
*/
const testData = [
  {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, 
  {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"},
  {"key": "test", "private": false, "name": "Fun Test", "description": "Testing"} 
];

const ListService = ({api, searchString, renderDataList, localTest}) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const displayError = () => (<div>Issue the search service, please try again later.</div>);
  const displayLoading = () => (
    <div><br /><center><span>Loading</span> <Spinner style={{verticalAlign:"middle"}} animation="grow"/></center></div>
  );
  
  !(data || error) && fetch(process.env.REACT_APP_URL+`/api/${api}?q=${searchString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "Accept-Charset": "utf-8"
    }
  }).then(result => result.json()
  ).then(setData
  ).catch(localTest ? setData(testData) : setError);
  return data ? renderDataList(data) : (error ? displayError() : displayLoading());
}
export default ListService;