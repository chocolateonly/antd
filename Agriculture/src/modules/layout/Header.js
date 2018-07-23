import React from 'react';
import '../../App.css'
import { Layout,Icon } from "antd/lib/index";

const { Header } = Layout;
export  default class HeaderBar extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const {collapsed}=this.props;
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={()=>this.props.toggle}
        />
        {/*<a style={{ margin: "0 20px", float: "right" }} onClick={()=>this.props.handleLangFlag}>{this.props.lang}</a>*/}
      </Header>
    )
  }
};