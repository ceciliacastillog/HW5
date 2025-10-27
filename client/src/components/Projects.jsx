import { useState } from "react";
import { Container, Typography, Stack, Divider } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { api } from "../api"; 

const START = [
  { id: 1, name: "Project One", users: ["ana","cecilia"],
    hw:{HWSet1:{checked:50,total:100}, HWSet2:{checked:0,total:100}}, joined:false },
  { id: 2, name: "Project Two", users: ["ana"],
    hw:{HWSet1:{checked:50,total:100}, HWSet2:{checked:1,total:100}}, joined:true },
  { id: 3, name: "Project Three", users: [],
    hw:{HWSet1:{checked:0,total:100}, HWSet2:{checked:0,total:100}}, joined:false },
];

export default function Projects() {
  const [projects, setProjects] = useState(START);

  const toggleJoin = async (id, joined) => {
    try {
      const data = joined ? await api.leave(id) : await api.join(id);
      alert(data.message); 
      setProjects(ps => ps.map(p => p.id === id ? { ...p, joined: !p.joined } : p));
    } catch (e) {
      console.error(e);
      alert("Network error calling join/leave");
    }
  };

  const adjustHardware = async (id, setName, delta, qty) => {
    try {
      const data = delta > 0
        ? await api.checkIn(id, qty)
        : await api.checkOut(id, Math.abs(qty));
      alert(data.message); 

      setProjects(ps => ps.map(p => {
        if (p.id !== id) return p;
        const cur = p.hw[setName].checked + delta;
        const clamped = Math.max(0, Math.min(cur, p.hw[setName].total));
        return { ...p, hw: { ...p.hw, [setName]: { ...p.hw[setName], checked: clamped } } };
      }));
    } catch (e) {
      console.error(e);
      alert("Network error calling check in/out");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Join/leave projects and simulate hardware check in/out.
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        {projects.map(p => (
          <ProjectCard
            key={p.id}
            id={p.id}
            name={p.name}
            users={p.users}
            hw={p.hw}
            joined={p.joined}
            onToggleJoin={() => toggleJoin(p.id, p.joined)}
            onCheckIn={(setName, qty) => adjustHardware(p.id, setName, +qty, +qty)}
            onCheckOut={(setName, qty) => adjustHardware(p.id, setName, -qty, +qty)}
          />
        ))}
      </Stack>
    </Container>
  );
}
