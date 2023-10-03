import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
  Paper,
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

function BasePage() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Admin</Typography>
            <Box sx={{ display: "flex", m: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/admin/restaurantes">
                  <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/admin/restaurantes/novo">
                  <Button sx={{ my: 2, color: "white" }}>
                    Novo Restaurantes
                  </Button>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/admin/pratos">
                  <Button sx={{ my: 2, color: "white" }}>
                    Pratos
                  </Button>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/admin/pratos/novo">
                  <Button sx={{ my: 2, color: "white" }}>
                    Novo Prato
                  </Button>
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="xl">
          <Paper sx={{ p: 2, mt: 4 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default BasePage;
