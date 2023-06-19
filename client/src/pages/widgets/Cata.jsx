import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";

const Cata = () => {
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Box my={2}>
        <Typography variant="h4">Categories</Typography>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Mathematics
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Science
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          History
        </Typography>

        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Language Arts
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Social Studies
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Geography
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Computer Science
        </Typography>
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Arts and Music
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default Cata;
