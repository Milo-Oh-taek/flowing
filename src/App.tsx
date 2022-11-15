import React from "react";

import { Layout } from "antd";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import Head from "./ui/Head";
import Leftside from "./ui/Leftside";
import Rightside from "./ui/Rightside";
import Main from "./ui/Main";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className={styles.container}>
      <Header className={styles.header} style={{ backgroundColor: "white" }}>
        <Head />
      </Header>
      <Layout>
        <Sider>
          <Leftside />
        </Sider>
        <Content>
          <Main />
        </Content>
        <Sider>
          <Rightside />
        </Sider>
      </Layout>
      <Footer>
        <Footer />
      </Footer>
    </Layout>
  );
}

export default App;
