import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


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
            <Row>           
            {category.map((category) => (
                <Col xs={6} md={4} className="my-2">
                    <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={category.src} height={350}/>
                    <Card.Body className="text-center">
                        <Card.Title>{category.description}</Card.Title>
                        <Button variant="outline-secondary" href={`/products/${category.name}`}>Shop category</Button>
                    </Card.Body>
                    </Card>
                    
                </Col>))}       
            </Row>
        </Container>
        
    )
}        

export default Category;

