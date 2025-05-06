import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
    initial={{ opacity: 0, x: "-100%" }}
    whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#DCF8C6" : "#FFFFFF",
        color: "black",
        borderRadius: "16px",
        borderTopRightRadius: sameSender ? "0px" : "16px",
        borderTopLeftRadius: sameSender ? "16px" : "0px",
        padding: "0.75rem 1rem",
        margin: "0.5rem 0",
        width: "fit-content",
        maxWidth: "75%",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!sameSender && (
        <Typography
          color={lightBlue}
          fontWeight="600"
          variant="caption"
          style={{ marginBottom: "4px" }}
        >
          {sender.name}
        </Typography>
      )}
      {content && (
        <Typography style={{ marginBottom: attachments.length > 0 ? "8px" : "4px" }}>
          {content}
        </Typography>
      )}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index} style={{ marginTop: "4px" }}>
              <a
                href={url}
                target="_blank"
                download
                style={{ color: "black", textDecoration: "none" }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Typography
        variant="caption"
        color="text.secondary"
        style={{
          alignSelf: "flex-end",
          fontSize: "0.7rem",
          marginTop: "4px",
        }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
