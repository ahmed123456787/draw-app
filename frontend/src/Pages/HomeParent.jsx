import React, { useState, useEffect } from "react";
import Sidebar from "../components/home/Sidebar";
import ChildrenWorks from "../components/home/ChildrenWorks";
import assets from "../assets/assets";
import { useUserChildrenQuery } from "./../services/userApi";
import { useGetDrawsQuery } from "./../services/drawApi";
import { useDispatch, useSelector } from "react-redux";
import { setDraws } from "../redux/slicers/drawSlice";

const HomeParent = () => {
  const [userProfile, setUserProfile] = useState(assets.boy_1);
  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();

  const { data: children, error: userError, isLoading } = useUserChildrenQuery();
  const { data: draws, error: drawError, isLoading: drawIsLoading } = useGetDrawsQuery();

  // Move useDispatch logic into useEffect
  useEffect(() => {
    dispatch(setDraws(draws));
  }, [dispatch, draws]);

  if (isLoading || drawIsLoading) return <p>Loading...</p>;
  if (userError || drawError) return <p>Failed to load data.</p>;

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <div className="w-14 lg:w-52 h-screen fixed top-0 left-0 bg-bgColor rounded-br-3xl rounded-tr-3xl">
        <Sidebar children={children} />
      </div>

      {/* Right container */}
      <div className="flex-1 ml-14 lg:ml-52 p-4">
        <div className="flex justify-end space-x-3 mb-12">
          <h2 className="text-bgColor">{username}</h2>
          <img
            src={userProfile}
            className="w-6 h-6 rounded-full"
            onError={(e) => (e.target.src = "path/to/fallback/avatar.jpg")}
          />
        </div>
        <ChildrenWorks className="" />
      </div>
    </div>
  );
};

export default HomeParent;
