import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawerMenu from "rc-drawer";
import "rc-drawer/assets/index.css";
import { Layout, Menu, Icon } from "antd";
import withRouter from "react-router-dom";

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

const menuData = [
  {
    key: "sub1",
    icon: "mail",
    name: "导航一",
    children: [
      {
        key: '/',
        name: "二级菜单1",
        path: "/",

      }, {
        key: 3,
        name: "二级菜单2",
        path: "",

      }
    ]
  }, {
    key: "sub2",
    icon: "appstore",
    name: "导航二",
    children:[
      {
        key:4,
        name:"二级菜单3",
        path: "/test",
      }
    ]
  }, {
    key: "sub3",
    icon: "setting",
    name: "导航三",
    path: "/"
  }
  , {
    key: "sub4",
    icon: "setting",
    name: "导航三",
    path: "/test"
  }
];

class SiderMenu extends Component {

  constructor(props) {
    super(props);
    // menuData.map((menu, index) => {
    //   this.rootSubmenuKeys.push(menu.key);
    // })
    this.state = {
      openKeys: ["sub1"]
    };
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  MenuItem(dataSource) {
    return (
      dataSource.map((menu, index) => {
        if (menu.children) {
          return (
            <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
              {this.MenuItem(menu.children)}
            </SubMenu>
          );
        } else {
          return (<Menu.Item key={menu.key}><Icon type={menu.icon} /><span>{menu.name}</span><Link to={menu.path}/></Menu.Item>);
        }
      })
    );
  }




  render() {
    const { collapsed, isMobile, onCollapse, history } = this.props;
    const { openKeys } = this.state;
    const menuProps = collapsed
      ? {}
      : {
        openKeys
      };
    return isMobile ?
      (<DrawerMenu
        onHandleClick={() => {
          onCollapse(!collapsed);
        }}
        open={!collapsed}
        onMaskClick={() => {
          onCollapse(true);
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={isMobile ? false : collapsed}
          breakpoint="lg"
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline"
                defaultSelectedKeys={['/']}
                {...menuProps}
                onOpenChange={this.onOpenChange}
          >

            {
              this.MenuItem(menuData)
            }
          </Menu>
        </Sider>
      </DrawerMenu>) :

      (<Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
        >
          <div className="logo"/>


          <Menu theme="dark" mode="inline"
                defaultSelectedKeys={['/']}
                {...menuProps}

                onOpenChange={this.onOpenChange}
          >

            {
              this.MenuItem(menuData)
            }
          </Menu>
        </Sider>
      );
  }
}

export default SiderMenu;