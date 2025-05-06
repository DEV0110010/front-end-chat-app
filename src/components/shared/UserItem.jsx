import { Avatar, IconButton, ListItem, Stack, Typography, Fade } from '@mui/material';
import React, { memo } from 'react';
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { transformImage } from '../../lib/features';

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false, styling={} }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "16px",
        mb: 2,
        px: 2,
        py: 1.5,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease, box-shadow 0.4s ease",
        "&:hover": {
          transform: "scale(1.015)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing="1rem" width="100%" {...styling}>
        <Avatar
          src={transformImage(avatar)}
          sx={{
            border: "2px solid rgba(255, 255, 255, 0.6)",
            width: 48,
            height: 48,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: "text.primary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            '&:hover': {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
              transform: "scale(1.1)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          <Fade in timeout={250}>
            <span>{isAdded ? <RemoveIcon /> : <AddIcon />}</span>
          </Fade>
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
