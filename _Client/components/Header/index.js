import React, { useState, useEffect } from "react";

import Image from "next/image";
import { Box, Card, Container } from "@mui/material";
import { useRouter } from "next/router";
import ProfileMenu from "../ProfileMenu";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Link from "next/link";
import "../../../styles/Header.module.css";
import { loadUser } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const user = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();

    if (location.trim()) {
      router.push(`/rooms?location=${location}`);
    } else {
      router.push("/rooms");
    }
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="header">
      <Box ml={1}>
        <Link href="/rooms" passHref>
          <Image
            className="header_icon"
            src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
            width="100px"
            height="100px"
            alt=""
          />
        </Link>
      </Box>
      <div className="header_center">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search hotels by location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <SearchTwoToneIcon sx={{marginTop:'6px'}} onClick={submitHandler} cursor={"pointer"} />
        </form>
      </div>
      <Box mr={4}>
        <div className="header_right">
          <ProfileMenu user={user} />
        </div>
      </Box>
    </div>
  );
};

export default Header;
