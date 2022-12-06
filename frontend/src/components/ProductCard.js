import { React } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, CardMedia } from '@mui/material'
import { Col } from 'react-bootstrap'

export const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
        >
            <Card sx={{
                display: 'flex',
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingBottom: '1.5%',
                paddingTop: '1.5%',
                margin: '2%',
                height: 300
            }}>
                <Col sx={{flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        {!product.isAuction ? (
                            <Typography variant="h6">
                                { 
                                    product.name.length > 30 ? (
                                        product.name.slice(0, 30) + '...'
                                    ) : (
                                        product.name
                                    )
                                }
                            </Typography>
                        ) : (
                            <Typography variant="h6">
                                { 
                                    product.name.length > 20 ? (
                                        '(Auction) ' + product.name.slice(0, 20) + '...'
                                    ) : (
                                        '(Auction) ' + product.name
                                    )
                                }
                            </Typography>
                        )}
                        
                        <Typography variant='body1'>
                            { 
                                product.description.length > 50 ? (
                                    product.description.slice(0, 50) + '...'
                                ) : (
                                    product.description
                                )
                            }
                            <br></br>
                            <br></br>
                        </Typography>
                        {
                            !product.isAuction ?
                            (
                                <Typography variant="h4" color="text.secondary">
                                    ${product.price}
                                </Typography>
                            ) :
                            (
                                <Typography variant="h4" color="text.secondary">
                                    ${product.bid}
                                </Typography>
                            )
                        }
                        
                    </CardContent>
                </Col>
                <Col>
                    <CardMedia
                        component='img'
                        sx={{height: '75%', width: 'auto'}}
                        image={ product.image }
                        alt='Product Image'
                        style={{float: 'right', padding: '2%'}}
                    />
                </Col>
            </Card>
        </Link>
    )
}