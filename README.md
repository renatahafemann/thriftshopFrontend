# Thrift shop 
This project was developed as part of my Software Development program.
It is a kid's thrift store that allow users to view all available products by category, login, create a new account and add products as favorite.
It contains two main parts, the front end developed in JavaScript using React and the back end developed in Java using Spring Boot.
This repository contains the front end code.

## Main features
* Database backend in H2 to store products, favorites and users.
* Frontend written on React to accept users input and display content.
* Backend running Spring Boot handles user requests and communicates with database.
* Authentication of user whenever he/she logs into the website.
* If user tries to access the Favorites page but it’s not logged in, he/she is directed to the login page.
* Products are displayed by category.
* Users can click in a category and view all products on that selection.
* Users can add a product to their shopping cart.
* New users can register a new account.
* Users can login to their account.
* Users can mark a product as favorite.
* Users can view all their selected favorite products.
* Users can remove a product from their favorites.

## Challenges
### Login verification
When trying to develop a login verification page, I was not able to implement a JWT using Spring Boot.
As an alternative, I used cookies. When the user provides the login information (email and password), it is validated by the back end and a cookie is created with the user information. That way, when the cookie is there, the user is logged, when the user clicks on “log out” the cookie is deleted.

## Future work
* Implement an admin page, protected by password, for CRUD operations on products.
* Implement JSON Web Token so the authentication process is secure.

