import {
    Card, CardContent, CardActions,
    Typography, Button, Stack, TextField, Chip
  } from "@mui/material";
  import HardwareList from "./HardwareList";
  
  export default function ProjectCard({
    id, name, users, hw, joined, onToggleJoin, onCheckIn, onCheckOut
  }) {
    return (
      <Card sx={{ borderLeft: joined ? "6px solid #9ae6b4" : "6px solid #e2e8f0" }}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
  
          <Stack direction="row" spacing={1} sx={{ my: 1, flexWrap: "wrap" }}>
            <Typography variant="body2" sx={{ mr: 1, color: "text.secondary" }}>
              authorized:
            </Typography>
            {users.length
              ? users.map(u => <Chip key={u} label={u} size="small" />)
              : <Chip label="(none)" size="small" variant="outlined" />}
          </Stack>
  
          <HardwareList hw={hw} />
  
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <TextField size="small" type="number" inputProps={{ min: 0 }} defaultValue={1}
                       sx={{ width: 90 }} id={`qty-${id}`} label="Qty" />
            <Button variant="outlined" onClick={() => {
              const q = document.getElementById(`qty-${id}`).value || 0;
              onCheckIn("HWSet1", q);
            }}>Check In HWSet1</Button>
            <Button variant="outlined" onClick={() => {
              const q = document.getElementById(`qty-${id}`).value || 0;
              onCheckOut("HWSet1", q);
            }}>Check Out HWSet1</Button>
            <Button variant="outlined" onClick={() => {
              const q = document.getElementById(`qty-${id}`).value || 0;
              onCheckIn("HWSet2", q);
            }}>Check In HWSet2</Button>
            <Button variant="outlined" onClick={() => {
              const q = document.getElementById(`qty-${id}`).value || 0;
              onCheckOut("HWSet2", q);
            }}>Check Out HWSet2</Button>
          </Stack>
        </CardContent>
  
        <CardActions>
          <Button variant="contained" onClick={onToggleJoin}>
            {joined ? "Leave" : "Join"}
          </Button>
        </CardActions>
      </Card>
    );
  }
  