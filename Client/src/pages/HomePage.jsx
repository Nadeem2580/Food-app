import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import hero from "../assets/hero.png"
import CallMadeIcon from '@mui/icons-material/CallMade';
import AutoScrollSlider from '../Component/AutoScrollSlider/AutoScrollSlider';
const HomePage = () => {
  return (

    <Navbar >
      <Box sx={{ background: "#f8f5f2" }}>

        <Container minHeight="xl">

          <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "start" }}>
            <Grid spacing={2} container>
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "20px" }}>
                <Typography
                  sx={{
                    textAlign: "left",
                    fontSize: {
                      xs: '1.25rem',
                      md: '1.5rem',
                      lg: '3rem'

                    },
                    display: "flex",
                    justifyContent: "start",
                    fontWeight: 700,
                    color: '#3b82f6',
                    fontFamily: 'Roboto',
                    marginBottom: "20px"
                  }}
                >
                  Saylani Papa Food App
                </Typography>

                <Typography sx={{ color: "#95ca4d" }}>
                  Saylani Papa delivers more than food — we deliver care. Our mission is to serve the community with warm, healthy, and affordable meals for all, especially those in need. Join us in spreading kindness, one meal at a time.
                </Typography>
                <Button variant='contained'
                  sx={{ marginTop: "20px", background: "#95ca4d", color: "#fff", fontWeight: "700", fontSize: "18px", padding: "10px 0" }}>Order Now
                  <CallMadeIcon /></Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>


                <img src={hero} alt="" style={{ width: "100%", height: "auto" }} />
              </Grid>
            </Grid>
          </Box>
        </Container>

      </Box>
<AutoScrollSlider />
    </Navbar>
  )
}

export default HomePage