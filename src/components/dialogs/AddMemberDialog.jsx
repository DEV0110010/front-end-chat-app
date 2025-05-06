import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = isMobile;

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "1rem" },
          maxWidth: { xs: "100%", sm: "90%", md: "500px" },
          width: "100%",
          position: "relative",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: { xs: "1rem", sm: "2rem" },
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton onClick={closeHandler} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <DialogTitle
            sx={{
              textAlign: "center",
              flex: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              pl: isMobile ? 0 : "1rem",
            }}
          >
            Add Member
          </DialogTitle>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            maxHeight: isMobile ? "calc(100vh - 200px)" : "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={100} />
          ) : data?.friends?.length > 0 ? (
            data.friends.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign="center">No friends</Typography>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{
            width: "100%", 
          }}
        >
          <Button
            onClick={closeHandler}
            color="error"
            fullWidth={isMobile}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
            fullWidth={isMobile}
          >
            Submit Changes
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
