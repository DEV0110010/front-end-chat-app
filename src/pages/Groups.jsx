import {
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import { StyledLink } from "../components/styles/StyledComponent";
import { matBlack } from "../constants/color";
import { sampleChats, sampleUsers } from "../constants/SampleData";
import UserItem from "../components/shared/UserItem";
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoader } from "../components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const { isAddMember } = useSelector((state) => state.misc)
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery({chatId, populate: true},{skip: !chatId})

const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const [isEdit, setIsEdit] = useState(false);
  const UpdateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...",{chatId, name:groupNameUpdatedValue})
  };

  const [groupName, setGroupName] = useState("");

  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);

  const errors = [{
    isError: myGroups.isError,
    error: myGroups.error,
  },
  {
    isError: groupDetails.isError,
    error: groupDetails.error,
  },]
  useErrors(errors)

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);
  


  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  };
  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId)
    closeConfirmDeleteHandler();
    navigate("/groups")
  };
  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...",{
      chatId, userId
    })
  };

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);


  
  useEffect(() => {
    if (chatId && !groupDetails.data) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
  
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId, groupDetails.data]);
  

  const ButtonGroup = (
  <Stack
    direction={{
      xs: "column-reverse",
      sm: "row",
    }}
    spacing={"1rem"}
    p={{
      xs: "1rem",
      sm: "1rem 3rem",
    }}
    justifyContent="center"
    alignItems="center"
  >
    <Button
      size="large"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={openConfirmDeleteHandler}
      sx={{
        width: {
          xs: "100%",
          sm: "auto",
        },
        padding: {
          xs: "0.8rem 1.5rem",
          sm: "0.8rem 2rem",
        },
        fontSize: {
          xs: "1rem",
          sm: "1.1rem",
        },
      }}
    >
      Delete Group
    </Button>
    <Button
      size="large"
      variant="contained"
      startIcon={<AddIcon />}
      onClick={openAddMemberHandler}
      sx={{
        width: {
          xs: "100%",
          sm: "auto",
        },
        padding: {
          xs: "0.8rem 1.5rem",
          sm: "0.8rem 2rem",
        },
        fontSize: {
          xs: "1rem",
          sm: "1.1rem",
        },
      }}
    >
      Add Member
    </Button>
  </Stack>
);


  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
              variant="outlined"
              sx={{
                width: "300px",
                backgroundColor: "#fafafa",
                border: "1px solid #ddd",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#bbb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#777",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "0.8rem",
                  fontSize: "1.1rem",
                },
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <IconButton onClick={UpdateGroupName} disabled={isLoadingGroupName}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  return myGroups.isLoading ? <LayoutLoader/> : (
    <Grid container height={"100vh"}>
      <Grid
        size={{ sm: 4 }}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          position: "relative",
          padding: "1rem 3rem",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography
  margin={"2rem 0"}
  alignSelf={"flex-start"}
  variant="h5"
  sx={{
    fontWeight: 500,
    fontSize: "1.4rem",
    color: "#444",
    letterSpacing: "0.5px",
  }}
>
  Members
</Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}
              { isLoadingRemoveMember? (<CircularProgress/>) : members.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    padding: "1.2rem 1.8rem",
                    borderRadius: "1.2rem",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 0.1rem rgba(0, 0, 0, 0.02)",
                    cursor: "pointer",
                    ":hover": {
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
                      transform: "translateY(-2px)",
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <>
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        </>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList  myGroups={myGroups?.data?.groups} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}
  sx={{
    background:
    "linear-gradient(to right, #F9F2FF, #D4D1F7, #A8D8FF, #FDE9D7)",
  backgroundSize: "cover",
  transition: "background 0.5s ease-in-out, box-shadow 0.3s ease",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    background:
      "linear-gradient(to right, #F9F2FF, #D0A8F7, #A0C6FF, #FDE0C8)", 
    boxShadow: "0 6px 30px rgba(0, 0, 0, 0.12)", 
  },
  height:'100vh',
  overflow: 'auto',  
  }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <StyledLink
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </StyledLink>
  );
});

export default Groups;
