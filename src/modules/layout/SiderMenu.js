import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawerMenu from "rc-drawer";
import "rc-drawer/assets/index.css";
import { Layout, Menu, Icon } from "antd";
import {urlToList} from '../../units/pathTools'
import pathToRegexp from 'path-to-regexp';
const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const rootSubmenuKeys = ["/nav1","/nav1/item1","/nav1/item2" ,"/nav2", "/nav3","/nav4"];

const menuData = [
  {
    path:'/nav1',
    name: "导航一",
    icon: "mail",
    children: [
      {
        name: "二级菜单1",
        path: "/nav1/item1"
      }, {
        name: "二级菜单2",
        path: "/nav1/item2"

      }
    ]
  }, {
    name: "导航二",
    path:'/nav2',
    icon: "appstore",
    children: [
      {
        name: "二级菜单3",
        path: "/nav2/item1"
      }
    ]
  }, {

    icon: "setting",
    name: "导航三",
    path: "/nav3"
  }
  , {

    icon: "setting",
    name: "导航三",
    path: "/nav4"
  }
];
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );
class SiderMenu extends Component {

  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      defaultSelectedKeysVal: [props.history.location.pathname]
    };
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } =
    props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  onOpenChange = (openKeys) => {
    this.setState({
      defaultSelectedKeysVal: []
    });
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
            <SubMenu key={menu.path} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
              {this.MenuItem(menu.children)}
            </SubMenu>
          );
        } else {
          return (<Menu.Item key={menu.path}><Icon type={menu.icon}/><span>{menu.name}</span><Link
            to={menu.path}/></Menu.Item>);
        }
      })
    );
  }


  render() {
    const { collapsed, isMobile, onCollapse } = this.props;
    const { openKeys, defaultSelectedKeysVal } = this.state;
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
                defaultSelectedKeys={defaultSelectedKeysVal}
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

                {...menuProps}
                defaultSelectedKeys={defaultSelectedKeysVal}
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