import {isTest} from '../utils';
class UserService {
  constructor(props){
    this.test = isTest();
    this.baseURL = window.location.origin;
  }
  getUser({defaultUser, gotUser}){
    if (!this.test){
      fetch(this.baseURL+'/api/user')
      .then(results => {
        return results.json()})
      .then(data => {
        let returned_user = data.response;
        if (returned_user !== "anonymous"){
          gotUser(returned_user);
        }
      }).catch(function(error) {
        console.log('Should porobably not handle this here!');
        gotUser(defaultUser);
     });
    } else {
      gotUser(defaultUser);
    }
  }
}
export default UserService;