import React from 'react';
import { Layout,Icon } from "antd/lib/index";

const { Header } = Layout;
export  default class HeaderBar extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const {collapsed,handleClick}=this.props;
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={handleClick}
        />
      </Header>
    )
  }
};