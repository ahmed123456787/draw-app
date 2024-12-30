import { React, useState } from "react";
import { IoTerminal } from "react-icons/io5";

export const filterData = (filter_by, params, data) => {
  if (filter_by === "name") {
    //code filter by name
    if (params.trim() === "") {
      return data;
    } else {
      // Assuming you want to match based on the valueNameFilter (using regex)
      const regex = new RegExp(params.toLowerCase(), "i"); // Case-insensitive match
      return data.filter((child) => regex.test(child.name.toLowerCase())); // Return true if the regex matches
    }
  } else if (filter_by === "date") {
    // code fulter by date
    if (params.trim() === "") {
      return data;
    } else {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(params)) {
        console.error("Invalid date format. Please use YYYY-MM-DD.");
        return data;
      } else {
        const filterDate = new Date(params);
        return data.filter((child) => {
          const childDate = child.lastEdit.slice(0, 10);
          return childDate.getTime() === filterDate.getTime();
        });
      }
    }
  } else if (filter_by === "owner") {
    //item.child.name.
    if (params.trim() === "") {
      return data;
    } else {
      // Assuming you want to match based on the valueNameFilter (using regex)
      const regex = new RegExp(params.toLowerCase(), "i"); // Case-insensitive match
      return data.filter((item) => regex.test(item.child.name.toLowerCase())); // Return true if the regex matches
    }
  }
};