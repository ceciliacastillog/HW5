import { Stack, Typography } from "@mui/material";

export default function HardwareList({ hw }) {
  return (
    <Stack spacing={0.5} sx={{ mt: 1 }}>
      {Object.entries(hw).map(([name, info]) => (
        <Typography key={name} variant="body2">
          {name}: {info.checked}/{info.total}
        </Typography>
      ))}
    </Stack>
  );
}
