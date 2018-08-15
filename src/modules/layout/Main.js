import React from 'react';
import {withLoading,withCopy} from './hoc'
 class Main extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
    return(
      <div>
        Main
      </div>
    )
  }
};

export  default withCopy('tttttttttt')(Main);