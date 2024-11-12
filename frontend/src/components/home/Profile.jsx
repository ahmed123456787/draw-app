import React from "react";

// related to the sidebar .
const Profile = ({ profileImg, childName, lastEdit }) => {
  return (
    <div className="grid col-span-2 lg:col-span-3 gap-2 lg:gap-4 h-44">
      <div className="bg-[#D9D9D9] w-full h-full flex">
        <img src={profileImg} className="rounded-full w-4 h-4 pt-3 pl-3" />
      </div>
      <p>{childName}</p>
      <p>{lastEdit}</p>
    </div>
  );
};

export default Profile;
