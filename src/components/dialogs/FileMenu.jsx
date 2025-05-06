import { ListItemText, Menu, MenuItem, MenuList, Tooltip, Box } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
   
    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);

      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });

      // Fetching Here
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorE1}
      open={isFileMenu}
      onClose={closeFileMenu}
      PaperProps={{
        sx: {
          width: 220,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          bgcolor: "#ffffff",
          p: 1,
        },
      }}
    >
      <Box>
        <MenuList disablePadding>
          <StyledMenuItem
            onClick={selectImage}
            icon={<ImageIcon sx={{ color: "#4caf50" }} />}
            text="Send Image"
            inputRef={imageRef}
            onChange={(e) => fileChangeHandler(e, "Images")}
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <StyledMenuItem
            onClick={selectAudio}
            icon={<AudioFileIcon sx={{ color: "#2196f3" }} />} 
            text="Send Audio"
            inputRef={audioRef}
            onChange={(e) => fileChangeHandler(e, "Audios")}
            accept="audio/mpeg, audio/wav"
          />
          <StyledMenuItem
            onClick={selectVideo}
            icon={<VideoFileIcon sx={{ color: "#f44336" }} />} 
            text="Send Video"
            inputRef={videoRef}
            onChange={(e) => fileChangeHandler(e, "Videos")}
            accept="video/mp4, video/webm, video/ogg"
          />
          <StyledMenuItem
            onClick={selectFile}
            icon={<UploadFileIcon sx={{ color: "#9c27b0" }} />} 
            text="Send File"
            inputRef={fileRef}
            onChange={(e) => fileChangeHandler(e, "Files")}
            accept="*"
          />
        </MenuList>
      </Box>
    </Menu>
  );
};

const StyledMenuItem = ({ onClick, icon, text, inputRef, onChange, accept }) => (
  <MenuItem
    onClick={onClick}
    sx={{
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      mb: "0.5rem",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        transform: "scale(1.02)",
      },
    }}
  >
    <Tooltip title={text}>
      <Box component="span" display="flex" alignItems="center">
        {icon}
      </Box>
    </Tooltip>
    <ListItemText
      primaryTypographyProps={{
        fontWeight: 600,
        fontSize: "1rem",
        color: "#333",
      }}
      style={{ marginLeft: "0.5rem" }}
    >
      {text}
    </ListItemText>
    <input
      type="file"
      multiple
      accept={accept}
      style={{ display: "none" }}
      ref={inputRef}
      onChange={onChange}
    />
  </MenuItem>
);

export default FileMenu;
