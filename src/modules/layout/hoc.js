import React, {Component} from 'react';
export  function withLoading(title) {
return function(test) {
  return function(WrappedComponent) {
    return class HOCLoading extends Component{
      static displayName = `HOCLoading(${getDisplayName(WrappedComponent)})`
      render(){
        return <div>
          <h3 className="demo-header">
            {title?title:'我是标题'+test}
          </h3>
          <WrappedComponent {...this.props}/>
        </div>
      }
    }
  }
}
}
export  function withCopy(title) {
  return function(WrappedComponent) {
    return class HOCCopy extends Component{
      static displayName = `HOCCopy(${getDisplayName(WrappedComponent)})`
      render(){
        return <div>
          <h3 className="demo-header">
            {'我是复制'+title}
          </h3>
          <WrappedComponent {...this.props}/>
        </div>
      }
    }
  }
}

function getDisplayName(component){
  return component.displayName||component.name||'component'
}