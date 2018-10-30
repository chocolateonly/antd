import React from "react";
import { LocaleProvider } from "antd";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";

import zh from "react-intl/locale-data/zh";
import en from "react-intl/locale-data/en";
import zhCN from "./locale/zh-CN";
import enUS from "./locale/en-US";
import SiderDemo from "./modules/demo/layout/BasicLayout";

addLocaleData([...zh, ...en]);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      langFlag: "zh",
      lang: "English"
    };
  }

  handleLangFlag = () => {
    this.setState({
      langFlag: this.state.langFlag === "zh" ? "en" : "zh",
      lang: this.state.lang === "中文" ? "English" : "中文"
    });
  };

  render() {
    let messages = {};
    messages["en"] = enUS;
    messages["zh"] = zhCN;
    const { lang, langFlag } = this.state;
    return (
          <SiderDemo handleLangFlag={this.handleLangFlag} lang={lang}/>
    );
  }
};
export default App;