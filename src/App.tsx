import React from "react";

import { Layout } from "antd";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import Head from "./ui/Head";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className={styles.container}>
      <Header className={styles.header} style={{ backgroundColor: "white" }}>
        <Head />
      </Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>main content</Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default App;
