import { React } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material'
import { Col } from 'react-bootstrap'

export const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
        >
            <Box sx={{paddingLeft: '5%', paddingRight: '5%', paddingBottom: '1.5%', paddingTop: '1.5%'}}>
                <Card sx={{display: 'flex'}}>
                    <Col sx={{flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h6">
                                {product.name}
                            </Typography>
                            <Typography variant='body1'>
                                {product.description}
                                <br></br>
                                <br></br>
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                ${product.price}
                            </Typography>
                        </CardContent>
                    </Col>
                    <Col>
                        <CardMedia
                            component='img'
                            sx={{width: 200}}
                            image={ product.image }
                            alt='Product Image'
                            style={{float: 'right', padding: '2%'}}
                        />
                    </Col>
                </Card>
            </Box>
        </Link>
    )
}