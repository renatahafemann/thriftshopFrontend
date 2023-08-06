import React from "react";
import './CategoryList.css';
import Container from '@mui/material/Container';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";


function Category() {
    const source = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80";
    const category = [{
        src: source,
        name: "BABY",
        description: "Baby 0-12m"
    },{
        src: source,
        name: "TODDLER",
        description: "Toddler 12-24m"
    },{
        src: source,
        name: "LITTLEKID",
        description: "Little kid 2-4years"
    },{
        src: source,
        name: "BIGKID",
        description: "Big kid 5-16years"
    }
    ]
        return (
            <Container>
            <h1>Shop by Category</h1>
            <ImageList sx={{ width: 1000, height: 850 }} cols={4} rowHeight={250} gap={25}>
                {category.map((category) => (
                    <Link to={`/products/${category.name}`}>
                    <ImageListItem key={category.name}>
                    <img
                        src={`${category.src}?w=650&h=650&fit=crop&auto=format`}
                        srcSet={`${category.src}?w=550&h=550&fit=crop&auto=format&dpr=2 2x`}
                        alt={category.name}
                        loading="lazy"
                    />
                    <ImageListItemBar title={category.name}
                    subtitle={category.description} />
                    </ImageListItem>
                    </Link>
                ))}
            </ImageList>
            </Container>
        )
    }
        

export default Category;

