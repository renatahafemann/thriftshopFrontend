import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';


function ProductDetails(){

    const [productDetail, setProductDetail] = useState({});
    const { id } = useParams();
    const theme = createTheme({
        palette: {
          green: {
            main: '#008b8b'            
          },
        },
      });
    
    const fetchData = async () => {
        const response = await fetch(`/products/details/${id}`);
        const data = await response.json();
        setProductDetail(data);
    }

    useEffect(() => {
        fetchData()
      }, []);


    return(
        <Container className="themeColor">
            <Grid container marginTop={15} >
                <Grid columns={{ xs: 4, sm: 8, md: 12 }} marginRight={3}>
                    <img src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80" height={450} alt="details"/>
                </Grid>
                <Grid marginLeft={3}>
                    <h2>{productDetail.name}</h2>
                    <p>Price: CAD {productDetail.price}</p>
                    <p>Description:<br />{productDetail.description}</p>
                    <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="green" startIcon={<ShoppingCartIcon />}> Add to cart</Button>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetails;
