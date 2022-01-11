import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { signOut } from "next-auth/client";
import { Avatar } from "@mui/material";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { useRouter } from "next/router";

const ProfileMenu = ({ user }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push("/bookings/me");
        }}
      >
        My Bookings
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/account");
        }}
      >
        {user?.user?.name}
      </MenuItem>
      {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
    </Menu>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
            ml: 1
          }}
          src="/static/images/avatars/avatar_1.png"
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </IconButton>
      {renderMenu}
    </>
  );
};

export default ProfileMenu;
