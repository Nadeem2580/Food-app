import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
export default function HomePageCards({restaurants}) {
 
    return (
   <Card sx={{ 
  maxWidth: 345, 
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
  backgroundColor: '#f8f5f2',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}}>
  <CardMedia
    sx={{ 
      height: 180,
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
      }
    }}
    image={restaurants.imageUrl}
    title={restaurants.restaurantName}
  />
  <CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ 
        fontWeight: 'bold',
        color: '#333',
        margin: 0
      }}>
        {restaurants.restaurantName}
      </Typography>
      <Chip 
        label={restaurants.isOpen ? 'OPEN' : 'CLOSED'} 
        sx={{ 
          backgroundColor: restaurants.isOpen ? '#95ca4d' : '#ff6b6b',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.75rem'
        }} 
      />
    </Box>
    
    <Typography variant="body2" sx={{ 
      color: 'text.secondary',
      mb: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      <PlaceIcon fontSize="small" /> {restaurants.address.slice(0 , 50)}
    </Typography>
    
    <Typography variant="body2" sx={{ 
      color: '#555',
      lineHeight: 1.5
    }}>
      {restaurants.details.slice(0 , 150)}
    </Typography>
  </CardContent>
  <CardActions sx={{ 
    justifyContent: 'space-between',
    padding: '0 16px 16px'
  }}>
    <Button 
      size="small" 
      sx={{ 
        color: '#95ca4d',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'rgba(149, 202, 77, 0.1)'
        }
      }}
    >
      View Menu
    </Button>
    <Button 
      size="small" 
      sx={{ 
        backgroundColor: '#95ca4d',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#7fb33d'
        }
      }}
    >
      Order Now
    </Button>
  </CardActions>
</Card>
  );
}
