import React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

function Category() {
  const category = [
    {
      src: "https://img.freepik.com/free-photo/shot-cute-baby-girl-looking-camera_329181-19580.jpg?w=1380&t=st=1691416275~exp=1691416875~hmac=546ac59ec6e7af6ab2d48d0f88507ec76051fffee4d8159c1a23a8a11a2d63b6",
      name: "BABY",
      description: "Baby 0-12m",
    },
    {
      src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
      name: "TODDLER",
      description: "Toddler 12-24m",
    },
    {
      src: "https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg?w=1380&t=st=1691416720~exp=1691417320~hmac=68abf554c47296be12ac939a617d26130e5a733a827b92bac93efb4224e0d348",
      name: "LITTLEKID",
      description: "Little kid 2-4years",
    },
    {
      src: "https://t3.ftcdn.net/jpg/01/69/11/30/360_F_169113047_gdUJ6QCqNZAeLwiUnOsu6RCcL2xd2B2Z.jpg",
      name: "BIGKID",
      description: "Big kid 5-16years",
    },
  ];
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Container className="text-center mt-5">
      <h1 className="themeColor">Shop by Category</h1>
      <Grid container className="grid" height={300}>
        <ImageList
          sx={{ width: 1000, height: 850, mt: 6 }}
          cols={matches ? 4 : 2}
          rowHeight={250}
          gap={25}
        >
          {category.map((category) => (
            <a href={`/products/${category.name}`}>
              <ImageListItem key={category.name}>
                <img
                  src={`${category.src}?w=650&h=650&fit=crop&auto=format`}
                  srcSet={`${category.src}?w=550&h=550&fit=crop&auto=format&dpr=2 2x`}
                  alt={category.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={category.name}
                  subtitle={category.description}
                />
              </ImageListItem>
            </a>
          ))}
        </ImageList>
      </Grid>
    </Container>
  );
}

export default Category;
