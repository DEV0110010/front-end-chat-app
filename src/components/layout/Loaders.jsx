import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponent";
const LayoutLoader = () => {
  return (
    <>
      <Grid container height="calc(100vh - 4rem)" spacing={"1rem"}>
        <Grid
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          size={{ sm: 4, md: 3 }}
          height="100%"
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height="100%">
          <Stack spacing={"1rem"}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={"5rem"} />
            ))}
          </Stack>
        </Grid>

        <Grid
          sx={{
            display: { xs: "none", md: "block" },
          }}
          size={{ md: 4, lg: 3 }}
          height="100%"
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};


export { LayoutLoader, TypingLoader };
