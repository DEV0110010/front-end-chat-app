/** @jsxImportSource @emotion/react */
import { useInputValidation } from '6pp';
import { css, keyframes } from '@emotion/react';
import {
  Button,
  Dialog,
  DialogTitle,
  Fade,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../shared/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

// Animation for smooth item entry
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NewGroup = () => {

  const {isNewGroup} = useSelector((state)=> state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery()

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [{
    isError,
    error
  }]
  useErrors(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers(prev =>prev.includes(id)?prev.filter((currentElement) => currentElement !== id): [...prev, id])
  };

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required");
    if(selectedMembers.length < 2) return toast.error("Please select atleast 2 members");

    newGroup("Creating New Group...",{name: groupName.value, members: selectedMembers});


    closeHandler();
  };

  const groupName = useInputValidation('')
  const closeHandler = ()=>{
    dispatch(setIsNewGroup(false))
  }
  return (
    <Dialog
      open= {isNewGroup}
      onClose={closeHandler}
      TransitionComponent={Fade}
      transitionDuration={400}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : '20px',
          padding: 0,
          maxWidth: isMobile ? '100%' : isMedium ? '30rem' : '25rem',
          width: '100%',
          backgroundColor: theme.palette.background.default,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Stack p={{ xs: '1rem', sm: '2rem' }} spacing={'2rem'} height={isMobile ? '100vh' : 'auto'}>
        {isMobile && (
          <IconButton onClick={closeHandler} sx={{ alignSelf: 'flex-start', mb: -2 }}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1.5rem',
            padding: 0,
          }}
          variant='h4'
        >
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          variant="outlined"
          size="small"
          fullWidth
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mt: 1 }}
        >
          Members
        </Typography>

        <Stack
          spacing={1.5}
          sx={{
            maxHeight: isMobile ? '45vh' : '300px',
            overflowY: 'auto',
            pr: '0.3rem',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[400],
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme.palette.grey[500],
            },
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={40} />
          ) : (
            data?.friends?.map((i, index) => (
              <div
                key={i._id}
                css={css`
                  animation: ${fadeInUp} 0.4s ease;
                  animation-delay: ${index * 80}ms;
                  animation-fill-mode: both;
                `}
              >
                <UserItem
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              </div>
            ))
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Button variant="text" color="error" size='large' onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
