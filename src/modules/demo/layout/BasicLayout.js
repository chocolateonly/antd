import React from "react";
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter as Router,Route, Switch, Redirect } from "react-router-dom";
import Test from "../components/Test";
import Main from "../components/Main";
import HeaderBar from "./Header";
import SiderMenu from "./containers/SiderMenu";
import { enquireScreen, unenquireScreen } from "enquire-js"; //媒体查询屏幕大小返回true，false


const { Content } = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    isMobile
  };
  //Header menu button toggle
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
    const { collapsed, isMobile } = this.state;
    return (
      <Router>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <HeaderBar
          type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
          handleClick={this.toggle}
        />
        <Layout>

          <SiderMenu {...this.props} collapsed={collapsed} isMobile={isMobile} onCollapse={this.handleMenuCollapse}/>
          <Layout>
            <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", height: 500 }}>
              <Switch>
                <Route path='/nav1/item1' exact component={Main}/>
                <Route path='/nav2/item1' component={Test}/>
                <Redirect exact from="/" to={"nav1/item1"}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
      </Router>

    );
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }
}

export default SiderDemo;