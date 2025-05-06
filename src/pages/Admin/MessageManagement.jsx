import { useFetchData } from '6pp';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import RenderAttachment from '../../components/shared/RenderAttachment';
import Table from '../../components/shared/Table';
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hook';
import { fileFormat, transformImage } from '../../lib/features';

const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
          const { attachments } = params.row;
      
          return (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
              gap={1}
            >
              {attachments?.length > 0 ? (
                attachments.map((i, idx) => {
                  const url = i.url;
                  const file = fileFormat(url);
      
                  return (
                    <Box key={idx}>
                      <a
                        href={url}
                        download
                        target="_blank"
                        style={{
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {RenderAttachment(file, url)}
                      </a>
                    </Box>
                  );
                })
              ) : (
                <Box>No Attachments</Box>
              )}
            </Box>
          );
        },
      },
  
    {
      field: "content",
      headerName: "Content",
      headerClassName: "table-header",
      width: 400,
    },
    {
      field: "sender",
      headerName: "Sent By",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => (
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
          <span>{params.row.sender.name}</span>
        </Stack>
      ),
    },
    {
      field: "chat",
      headerName: "Chat",
      headerClassName: "table-header",
      width: 220,
    },
    {
      field: "groupChat",
      headerName: "Group Chat",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Time",
      headerClassName: "table-header",
      width: 250,
    },
  ];
const MessageManagement = () => {
  const {
    loading,
    data,
    error, 
  } = useFetchData({
    url: `${server}/api/v1/admin/messages`,
    key: "dashboard-messages",
    credentials: "include",
    successCallback: (res) => {
      console.log("Messages fetched successfully", res);
    },
    errorCallback: (err) => {
      console.error("Error fetching messages", err);
    },
  });


  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);


    const [rows, setRows] = useState([])
    useEffect(() => {
        if(data){
          setRows(
            data.messages.map((i) => ({
              ...i,
              id: i._id,
              sender: {
                name: i.sender.name,
                avatar: transformImage(i.sender.avatar, 50),
              },
              createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
            }))
          )
        }
    }, [data])
    
  return (
    <AdminLayout>
        {loading ? (<Skeleton height={"100vh"}/>) : (<Table heading={'All Messages'} columns={columns} rows={rows} rowHeight={200}/>)}
    </AdminLayout>
  )
}

export default MessageManagement
