import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

export const ProductSliderCard = ({ product }) => {
    return (
        <Link
              to={`/product/${product?._id}`}
              style={{ textDecoration: 'none' }}
        >
            <Card sx={{ width: 'auto', height: '100%' }}>
                <CardMedia
                    component='img'
                    sx={{height: '75%', width: 'auto'}}
                    image={ product?.image }
                    alt='Product Image'
                    style={{padding: '5%', margin: 'auto', display: 'block'}}
                />
            
                <Typography
                    variant="h4"
                    color='text.secondary'
                    style={{textAlign: 'center'}}
                >
                    { product?.name } | ${ product?.price }
                </Typography>
            </Card>
        </Link>
    )
}