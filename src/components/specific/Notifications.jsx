/** @jsxImportSource @emotion/react */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Fade,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  useErrors([{ error, isError }]);

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };

  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      TransitionComponent={Fade}
      transitionDuration={400}
      fullScreen={isMobile}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "100%",
          height: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? "100%" : "25rem",
          maxHeight: isMobile ? "100%" : "80vh",
          borderRadius: isMobile ? 0 : "20px",
          backgroundColor: theme.palette.background.default,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
        },
      }}
    >
      <Stack p={{ xs: "1rem", sm: "2rem" }} spacing={2} height="100%">
        {/* Back button on mobile */}
        {isMobile && (
          <IconButton onClick={closeHandler} sx={{ alignSelf: "flex-start" }}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.5rem",
            padding: 0,
          }}
        >
          Notifications
        </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"} color="text.secondary" sx={{ mt: 2 }}>
                0 Notifications
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      sx={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: "12px",
        mb: 1.5,
        transition: "transform 0.25s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.015)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        },
        padding: "1rem",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        width="100%"
        flexWrap="wrap"
      >
        <Avatar
          src={avatar?.url}
          alt={name}
          sx={{
            border: "2px solid #e0e0e0",
            width: 45,
            height: 45,
            flexShrink: 0,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            flex: 1,
            mx: 1,
            minWidth: 0,
            fontWeight: 500,
            color: "text.primary",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            mt: { xs: 1, sm: 0 },
            flexShrink: 0,
          }}
        >
          <Button variant="contained" size="small" onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
