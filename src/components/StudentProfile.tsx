import { Card, CardContent, Typography, Button } from "@mui/material";
import { User } from "@/types/User";

interface StudentProfileProps {
  student: User;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5">{student.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {student.email}
        </Typography>
        <Button variant="contained" href="/dashboard/student/edit">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}