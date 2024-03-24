import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import AdminBookingPage from "./AdminBookingPage";

import AdminRoomPage from "./AdminRoomPage";
import AdminAddRoom from "./AdminAddRoom";
import AdminUserPage from "./AdminUserPage";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="ml-3 mt-3 mr-3 ">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          <AdminBookingPage />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <AdminRoomPage />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AdminAddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <AdminUserPage />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminPage;
