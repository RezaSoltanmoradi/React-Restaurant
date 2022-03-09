import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./adminPage.module.scss";
import {
    Layout,
    Menu,
    Breadcrumb,
    // Space,
    // Button,
    // Upload,
    // Popconfirm,
    // Tooltip,
    // Card,
    Switch,
} from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    // NotificationOutlined,
    // UploadOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const AdminPage = () => {
    const [theme, setTheme] = useState("dark");

    const chengeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <div
            className={`${styles.Layout} container admin rounded mt-5  text-start`}
        >
            <div
                className={
                    theme === "dark"
                        ? " bg-dark text-light px-5"
                        : "bg-light text-dark px-5"
                }
            >
                <div className="pt-2 mx-5 mb-5">
                    <Switch
                        checked={theme === "dark"}
                        onChange={chengeTheme}
                        checkedChildren="شب"
                        unCheckedChildren="روز"
                        className={
                            theme === "dark"
                                ? "bg-danger text-light "
                                : " bg-success"
                        }
                    />
                </div>
                <Header className="header px-0 px-0">
                    <div className="nav-item" />
                    <Menu
                        theme={theme}
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout className="mt-2">
                    <Layout
                        style={{ padding: "0 24px 24px" }}
                        className={
                            theme === "dark"
                                ? "bg-dark text-light"
                                : "bg-white text-dark"
                        }
                    >
                        <Sider
                            width={200}
                            className="site-layout-background mt-5"
                        >
                            <Menu
                                theme={theme}
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                                style={{ height: "100%", borderRight: 0 }}
                            >
                                <SubMenu
                                    key="sub1"
                                    icon={<UserOutlined />}
                                    title="پنل ادمین"
                                >
                                    <Menu.Item key="1">بخش نظرات</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    icon={<LaptopOutlined />}
                                    title="غذاها"
                                >
                                    <Menu.Item key="5">آبگوشت</Menu.Item>
                                    <Menu.Item key="6">پلو</Menu.Item>
                                    <Menu.Item key="7">کباب</Menu.Item>
                                    <Menu.Item key="8">آش</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                width: "100%",
                            }}
                        >
                            <Breadcrumb className="text-end w-100">
                                <Breadcrumb.Item className="text-danger">
                                    <NavLink
                                        to="#"
                                        className={
                                            theme === "dark"
                                                ? "text-light my-4"
                                                : " text-dark  my-4"
                                        }
                                    >
                                        خانه
                                    </NavLink>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <NavLink
                                        to="#"
                                        className={
                                            theme === "dark"
                                                ? "text-light my-4"
                                                : " text-dark  my-4"
                                        }
                                    >
                                        محصولات
                                    </NavLink>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <NavLink
                                        to="#"
                                        className={
                                            theme === "dark"
                                                ? "text-light my-4"
                                                : " text-dark  my-4"
                                        }
                                    >
                                        درباره ما
                                    </NavLink>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="w-100">
                                <table>
                                    <thead>
                                        <th>نام غذا</th>
                                        <th>حذف</th>
                                        <th> ویرایش</th>
                                        <th> تصویر</th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            قرمه سبزی
                                            <td>حذف</td>
                                            <td>ویرایش</td>
                                            <td>تصویر</td>
                                        </tr>

                                        <tr>
                                            جوجه کباب
                                            <td>حذف</td>
                                            <td>ویرایش</td>
                                            <td>تصویر</td>
                                        </tr>
                                        <tr>
                                            ابگوشت
                                            <td>حذف</td>
                                            <td>ویرایش</td>
                                            <td>تصویر</td>
                                        </tr>
                                        <tr>
                                            باقاله پلو
                                            <td>حذف</td>
                                            <td>ویرایش</td>
                                            <td>تصویر</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr></tr>
                                    </tfoot>
                                </table>
                                {/* <Popconfirm
                                    title="are you sure delete this text?"
                                    okText="yes"
                                    cancelText="no"
                                    className={
                                        theme == "light"
                                            ? "text-dark"
                                            : " text-light"
                                    }
                                >
                                    <Tooltip
                                        title="click to change"
                                        color="green"
                                    >
                                        <Button type="link" danger>
                                            Confirm
                                        </Button>
                                    </Tooltip>
                                </Popconfirm> */}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};

export default AdminPage;
