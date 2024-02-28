import { AppBar,Container, Toolbar, Box, Typography, IconButton, Menu, MenuItem, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


const Header = () => {
    const navigate = useNavigate()

    return(
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={()=>{navigate('/')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"HomePage"}
              </Button>
              <Button
                onClick={()=>{navigate('/create')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Create Post"}
              </Button>
              <Button
                onClick={()=>{navigate('/myPost')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"My Post"}
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    )
}

export default Header