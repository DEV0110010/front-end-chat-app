import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
    const navigate = useNavigate();

    const { isDeleteMenu, selectedDeleteChat } = useSelector(
      (state) => state.misc
    );
  
    const [deleteChat, _, deleteChatData] = useAsyncMutation(
      useDeleteChatMutation
    );
  
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
      useLeaveGroupMutation
    );
  
    const isGroup = selectedDeleteChat.groupChat;
  
    const closeHandler = () => {
      dispatch(setIsDeleteMenu(false));
      deleteMenuAnchor.current = null;
    };
  
    const leaveGroupHandler = () => {
      closeHandler();
      leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    };
  
    const deleteChatHandler = () => {
      closeHandler();
      deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    };
  
    useEffect(() => {
      if (deleteChatData || leaveGroupData) navigate("/");
    }, [deleteChatData, leaveGroupData]);
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "12rem",
          padding: "0.5rem",
          cursor: "pointer",
          color: isGroup ? "#FFA000" : "error.main",
          "&:hover": {
            backgroundColor: isGroup ? "rgba(255,160,0,0.15)" : "rgba(255,0,0,0.1)",
          },
        }}
        direction="row"
        alignItems="center"
        spacing={1}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon sx={{ color: "#FFA000" }} />
            <Typography fontWeight={600}>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon sx={{ color: "error.main" }} />
            <Typography fontWeight={600}>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
