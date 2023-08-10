import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ProductList({ client }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const matches = useMediaQuery("(min-width:1000px)");
  const src =
    "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80";
  const theme = createTheme({
    palette: {
      green: {
        main: "#008b8b",
      },
    },
  });

  const fetchData = async () => {
    const response = await fetch("/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchFavoritesData = async () => {
    try {
      const id = client.clientId;
      const response = await fetch(`/favorites/find/${id}`);
      const responseData = await response.json();
      if (response.status === 200) {
        setFavorites(responseData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (client) {
      fetchData();
      fetchFavoritesData();
    } else {
      fetchData();
    }
  }, [favorites]);

  const handleFavorite = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(
        `/favorites/add?clientId=${client.clientId}&productId=${e.target.value}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFavorite = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/favorites/delete?clientId=${client.clientId}&productId=${e.target.value}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="text-center themeColor">
      <h1>All products</h1>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        <ImageList
          sx={{ width: 1000, height: 850 }}
          cols={matches ? 4 : 2}
          rowHeight={250}
          gap={25}
        >
          {products.map((product) => (
            <div>
              <Link to={`/products/details/${product.id}`}>
                <ImageListItem key={product.name}>
                  <img
                    src={`${src}?w=650&h=650&fit=crop&auto=format`}
                    srcSet={`${src}?w=550&h=550&fit=crop&auto=format&dpr=2 2x`}
                    alt={product.name}
                    loading="lazy"
                  />
                </ImageListItem>
              </Link>
              <p>
                {product.name} <br /> Size: {product.size} <br /> Price: CAD{" "}
                {product.price}
              </p>

              <ThemeProvider theme={theme}>
                {client ? (
                  favorites.some((e) => e.id === product.id) ? (
                    <Button
                      variant="outlined"
                      startIcon={<FavoriteIcon />}
                      value={product.id}
                      onClick={deleteFavorite}
                      color="green"
                    >
                      {" "}
                      Favorite
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<FavoriteBorderIcon />}
                      value={product.id}
                      onClick={handleFavorite}
                      color="green"
                    >
                      {" "}
                      Add as favorite
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<FavoriteBorderIcon />}
                    href="/login"
                    color="green"
                  >
                    {" "}
                    Add as favorite
                  </Button>
                )}
              </ThemeProvider>
            </div>
          ))}
        </ImageList>
      </Grid>
      <div></div>
    </Container>
  );
}

export default ProductList;
