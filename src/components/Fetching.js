import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

class Fetching extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    if (this.props.loading){
      return (
        <div><br /><center><span>{this.props.message}</span> <Spinner style={{verticalAlign:"middle"}} animation="grow"/></center></div>
      )
    } else {
      return ("");
    }    
  }
}

export default Fetching;