import React from 'react';
import {withLoading,withMousePosition} from '../hoc/hoc'
 class Main extends React.Component{
  constructor(props) {
    super(props);

  }
  render(){
    const {mousePops}=this.props;

    return(
      <div>
        Main{mousePops.x}
      </div>
    )
  }
}

export  default withMousePosition('tttttttttt')(Main);