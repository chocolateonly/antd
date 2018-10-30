import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DrawerMenu from "rc-drawer";
import "rc-drawer/assets/index.css";
import { Layout, Menu, Icon } from "antd";
import { urlToList } from "../units/pathTools";
import pathToRegexp from "path-to-regexp";

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const menuData = [
  {
    path: "/nav1",
    name: "导航一",
    icon: "mail",
    children: [
      {
        name: "二级菜单1",
        path: "/nav1/item1"
      }, {
        name: "二级菜单2",
        path: "/nav1/item2",
        children: [
          {
            name: "二级菜单3",
            path: "/nav1/item2/test"

          }
        ]
      }
    ]
  }, {
    name: "导航二",
    path: "/nav2",
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
      openKeys: this.getDefaultCollapsedSubMenus(props)
    };
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname }
    } = props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  isMainMenu = key => {
    return this.flatMenuKeys.some(item => key && (item.key === key || item.path === key));
  };
  onOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    });
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

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname }
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };

  render() {
    const { collapsed, isMobile, onCollapse } = this.props;
    const { openKeys, defaultSelectedKeysVal } = this.state;
    const menuProps = collapsed
      ? {}
      : {
        openKeys
      };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
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
                {...menuProps}
                onOpenChange={this.onOpenChange}
                selectedKeys={selectedKeys}
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
                onOpenChange={this.onOpenChange}
                selectedKeys={selectedKeys}
          >

            {
              this.MenuItem(menuData)
            }
          </Menu>
        </Sider>
      );
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.location.pathname !== location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps)
      });
    }
  }
}

export default SiderMenu;