import Sidebar from "../components/Sidebar";
import PostsTable from "../components/Table";
import { Box } from "@mui/material";

const drawerWidth = 200;

interface DashboardProps {
  posts: { id: number; title: string; body: string }[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts }) => {
  return (
    <>
      <Box sx={{ display: "flex", mt: 4 }}>
        <Box sx={{ width: drawerWidth, flexShrink: 0, position: "fixed", height: "100vh", bgcolor: "background.paper" }}>
          <Sidebar />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
          <PostsTable posts={posts} />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

