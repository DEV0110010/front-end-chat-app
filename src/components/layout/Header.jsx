import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gradient } from "../../constants/color";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

 

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong as Something is not True"
      );
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ background: gradient }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Talkaire
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onclick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onclick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onclick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onclick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onclick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ title, icon, onclick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton size="large" color="inherit" onClick={onclick}>
      {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
