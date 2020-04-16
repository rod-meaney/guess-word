import {isTest, testList, testItems} from '../utils';
class ListService {
  constructor(props){
    this.test = isTest();
    this.baseURL = window.location.origin;
  }

  searchList({api, searchString, results}){
    if (!this.test){
      fetch(this.baseURL+`/api/${api}?q=${searchString}`)
      .then(results => {
        return results.json()})
      .then(data => {
        results(data);
      })
    } else {
      console.log("Test mode returning test list");
      results(testList());
    }
  }

  getList({key, result, error}){
    //TO-DO - return when testing, and valid return
    //a valid result could be an error (i.e. a list has been deleted, so I need to handle properly)
    if (!this.test){
      fetch(`${this.baseURL}/api/get?id=${key}`)
      .then(results => {return results.json()})
      .then(data => {
        if (data["error"]){
          error(data["error"]);
        } else {
          result(data);
        }
      })      
    } else {
      console.log("Test mode returning for key:"+key);
      result(testItems()[key]);
    }
  }
}

export default ListService;