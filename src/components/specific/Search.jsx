/** @jsxImportSource @emotion/react */
import { useInputValidation } from "6pp";
import { css, keyframes } from "@emotion/react";
import {
  ArrowBack,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Fade,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const search = useInputValidation("");
 
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog
      fullScreen={isMobile}
      open={isSearch}
      onClose={searchCloseHandler}
      TransitionComponent={Fade}
      transitionDuration={400}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "20px",
          p: 0,
          overflow: "hidden",
          background: theme.palette.background.default,
          boxShadow: isMobile ? "none" : "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      <Stack
        px={{ xs: "1rem", sm: "2rem" }}
        py={{ xs: "1.5rem", sm: "2rem" }}
        direction="column"
        spacing={2}
        width={{ xs: "100%", sm: "25rem" }}
        css={css`
          animation: ${fadeInUp} 0.5s ease;
        `}
      >
        {isMobile ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={searchCloseHandler}>
              <ArrowBack />
            </IconButton>
            <DialogTitle
              sx={{ fontWeight: 600, flex: 1, textAlign: "left", m: 0 }}
            >
              Find People
            </DialogTitle>
          </Stack>
        ) : (
          <DialogTitle textAlign="center" sx={{ fontWeight: 600 }}>
            Find People
          </DialogTitle>
        )}

        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
            transition: "all 0.3s ease",
            "& .MuiOutlinedInput-root": {
              transition: "all 0.3s ease",
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <List
          sx={{
            maxHeight: isMobile ? "calc(100vh - 200px)" : "300px",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
            p: 0.5,
          }}
        >
          {users.map((user, i) => (
            <div
              key={user._id}
              css={css`
                animation: ${fadeInUp} 0.4s ease;
                animation-delay: ${i * 80}ms;
                animation-fill-mode: both;
              `}
            >
              <UserItem
                user={user}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            </div>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
