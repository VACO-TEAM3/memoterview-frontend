import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Search from "../pages/Search";
import { setUser } from "../redux/reducers/user";

export default function SearchContainer() {
  const dispatch = useDispatch();

  return (
    <>
      <Search />
    </>
  );
}
