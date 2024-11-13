import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Button, Layout } from "antd";
import "./styles/mainPage.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderContent from '../components/HeaderContent';
import Bienes from '../components/Bienes';
import Servicios from '../components/Servicios';
import Inicio from '../components/Inicio';

const { Sider, Header, Content } = Layout;

const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState("Inicio");

    return (
        <Layout>
            <>
                <Sider
                    theme="light"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="sider"
                >
                    <Sidebar />
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="triger-btn"
                    />
                </Sider>

                <Layout>
                    <Header className="header">
                        <HeaderContent title={title} />
                    </Header>
                    <Content className="content">
                        <Routes>
                            <Route path="/" element={<Navigate to="pagina/inicio" />} />
                            <Route
                                path="pagina"
                                element={
                                    <Inicio setTitle={setTitle} />
                                }
                            />
                            <Route
                                path="pagina/inicio"
                                element={
                                    <Inicio setTitle={setTitle} />
                                }
                            />
                            <Route
                                path="pagina/servicios"
                                element={
                                    <Servicios setTitle={setTitle} />
                                }
                            />
                            <Route
                                path="pagina/bienes"
                                element={
                                    <Bienes setTitle={setTitle} />
                                }
                            />
                        </Routes>
                    </Content>
                </Layout>
            </>
        </Layout>
    )
}

export default MainPage