import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

function UserFavorites({ client }) {
  const [favorites, setFavorites] = useState([]);
  const [dataError, setDataError] = useState("");
  const id = client.clientId;
  const name = client.firstName;
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
    try {
      const response = await fetch(`/favorites/find/${id}`);
      const responseData = await response.json();
      setFavorites(responseData);
      if(favorites.length === 0){
        setDataError("You don't have any favorites yet.");
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [favorites]);

  const deleteFavorite = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(
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
    <div>
      {favorites.length > 0 ? (
        <Container className="text-center mt-5 themeColor">
          <h1 className="my-5">{`${name}'s favorites`}</h1>
          <ImageList
            sx={{ width: 1000, height: 850 }}
            cols={4}
            rowHeight={250}
            gap={25}
          >
            {favorites.map((data) => (
              <div>
                <Link to={`/products/details/${data.id}`}>
                  <ImageListItem key={data.name}>
                    <img
                      src={`${src}?w=650&h=650&fit=crop&auto=format`}
                      srcSet={`${src}?w=550&h=550&fit=crop&auto=format&dpr=2 2x`}
                      alt={data.name}
                      loading="lazy"
                    />
                  </ImageListItem>
                </Link>
                <p>
                  {data.name} <br /> Size: {data.size} <br /> Price: CAD{" "}
                  {data.price}
                </p>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="outlined"
                    startIcon={<FavoriteIcon />}
                    value={data.id}
                    onClick={deleteFavorite}
                    color="green"
                  >
                    Remove
                  </Button>
                </ThemeProvider>
              </div>
            ))}
          </ImageList>
        </Container>
      ) : (
        <Container className="my-5 themeColor text-center">
          <p>{dataError}</p>
        </Container>
      )}
    </div>
  );
}

export default UserFavorites;
