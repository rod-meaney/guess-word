import React from 'react';

class ReadySetGoModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:"Ready"
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({text:"Set"});
      setTimeout(() => {
        this.setState({text:"Go"});
        setTimeout(() => {
          this.props.finished();
        }, 1000)
      },1000);
    }, 1000);
  }

  render(){
    return (
      <>
        <br />
        <h1>{this.state.text}</h1>
        <br /><br />
      </>
    )
  }
}

export default ReadySetGoModal;