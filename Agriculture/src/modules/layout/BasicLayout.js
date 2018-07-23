import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Route } from "react-router-dom";
import Test from "../layout/Test";
import Main from "../layout/Main";

import SiderMenu from "./SiderMenu";
import { enquireScreen, unenquireScreen } from "enquire-js";
import { withRouter } from "react-router-dom";

const { Header, Content } = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});
 class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    isMobile,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
   handleMenuCollapse = collapsed => {
     this.setState({
       collapsed: collapsed
     });

   };
  render() {

    const {collapsed,isMobile}=this.state;
    return (

      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />
          <a style={{ margin: "0 20px", float: "right" }} onClick={()=>this.props.handleLangFlag}>{this.props.lang}</a>
        </Header>
        <Layout>

          <SiderMenu {...this.props} collapsed={collapsed} isMobile={isMobile} onCollapse={this.handleMenuCollapse} />
          <Layout>
            <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", height: 500 }}>

              <Route path='/' exact component={Main}/>

              <Route path='/test' component={Test}/>

            </Content>
          </Layout>
        </Layout>
      </div>


    );
  }
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }
  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }
}
export default withRouter(SiderDemo)