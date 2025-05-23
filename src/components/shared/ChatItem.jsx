import React, { memo } from 'react'
import { StyledLink } from "../styles/StyledComponent";
import { Box, Stack, Typography } from '@mui/material';
import AvatarCard from './AvatarCard';
import {motion} from "framer-motion"

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
  }) => {
  return (
    <StyledLink style={{
        padding:'0'
    }} to={`/chat/${_id}`} onContextMenu={(e) => {
      handleDeleteChat(e, _id, groupChat)
    }
    }>
    <motion.div 
    initial={{ opacity: 0, y: "-100%" }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    style={{
        display:'flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: sameSender? 'black' : 'unset',
        color: sameSender? 'white' : 'unset',
        position:'relative',
    }}>
       <AvatarCard avatar={avatar}/>
        <Stack>
            <Typography>
                {name}
            </Typography>
            {newMessageAlert && (
                <Typography>{newMessageAlert.count} New Message</Typography>
            )}
        </Stack>

        {isOnline && <Box sx={{
            width:'10px',
            height:'10px',
            borderRadius: '50%',
            backgroundColor: 'green',
            position: 'absolute',
            top: '50%',
            right: '1rem',
            transform: 'translateY(-50%)'
        }}/>}
    </motion.div>
    </StyledLink>
  )
}

export default memo(ChatItem);