import React, { Component } from "react";

export function withLoading(title) {
  return function(test) {
    return function(WrappedComponent) {
      return class HOCLoading extends Component {
        static displayName = `HOCLoading(${getDisplayName(WrappedComponent)})`;

        render() {
          return <div>
            <h3 className="demo-header">
              {title ? title : "我是标题" + test}
            </h3>
            <WrappedComponent {...this.props}/>
          </div>;
        }
      };
    };
  };
}

export function withMousePosition(title) {
  return function(WrappedComponent) {
    return class HOCCopy extends Component {
      constructor(props) {
        super(props);
        this.state = {
          mousePops: { x: 0, y: 0 }
        };
      }

      static displayName = `HOCwithMousePosition(${getDisplayName(WrappedComponent)})`;

      mouseposition(ev) {
        ev = ev || window.event;
        if (ev.pageX && ev.pageY) {
          this.setState({
            mousePops: { x: ev.pageX, y: ev.pageY }
          });
        }
      }

      render() {
        const { mousePops } = this.state;
        return <div>
          <h3 className="demo-header">
            {"我是复制" + title}
            <p id={"demo-hoc-mouse"}>当前鼠标坐标：{mousePops.x},{mousePops.y}</p>
          </h3>
          <WrappedComponent {...this.props} {...this.state}/>
        </div>;
      }

      componentDidMount() {
        //获取鼠标当前位置
        document.onmousemove = ev => this.mouseposition(ev);
      }

      componentWillUnmount() {
        //清除
        document.onmousemove = ev => {
        };
      }
    };
  };
}

function getDisplayName(component) {
  return component.displayName || component.name || "component";
}