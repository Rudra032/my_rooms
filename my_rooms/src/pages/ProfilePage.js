import React, {  useEffect } from "react";
import { Tabs, Tag } from "antd";
import MyBookingPage from "./MyBookingPage";
import "./ProfilePage.css"

const { TabPane } = Tabs;

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const callback = (key) => {
    console.log(key);
  };

  return (
    <div className="ProfileContainer">
    <div className="profileBox">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.Item tab="Profile" key="1">
          <div className="detailsBox">
              <div className="detailsDiv">
                <p>My Profile</p>
                <p>Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>
                  IsAdmin :
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p>
              </div>
         
          </div>
        </Tabs.Item>
        <Tabs.Item tab="Booking" key="2">
          <MyBookingPage></MyBookingPage>
        </Tabs.Item>
      </Tabs>
    </div>
    </div>
  );
}

export default ProfilePage;
