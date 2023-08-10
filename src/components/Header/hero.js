import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Hero() {
  const defaultTheme = createTheme({
    palette: {
      white: {
        main: "#FFF",
        contrastText: "#FFF",
      },
    },
  });

  return (
    <div
      className="p-5 text-center bg-image heroImage"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3036405/pexels-photo-3036405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        height: 480,
      }}
    >
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-white">
          <h1 className="mb-3">Kid's thrift store</h1>
          <h4 className="mb-3">
            Your online store to find great deals for your little ones.
          </h4>
          <ThemeProvider theme={defaultTheme}>
            <Button
              variant="outlined"
              color="white"
              className="mt-4"
              href="/products"
            >
              View all products
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Hero;
