import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useParams} from "react-router-dom";

function ProductDetails(){

    const [productDetail, setProductDetail] = useState({});
    const { id } = useParams();
    
    const fetchData = async () => {
        const response = await fetch(`/products/details/${id}`);
        const data = await response.json();
        setProductDetail(data);
    }

    useEffect(() => {
        fetchData()
      }, []);
  
  return (  
    <Container>
        <Row>     
            <Col xs={6} md={4} className="my-2">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80" height={350}/>
                <Card.Body className="text-center">
                    <Card.Title>{productDetail.name}</Card.Title>
                    <Card.Text>
                        $ {productDetail.price}
                        {productDetail.description}
                    </Card.Text>
                    <Button variant="outline-secondary">Add to Cart</Button>                    
                </Card.Body>
                </Card>                
            </Col>       
        </Row>
    </Container>
      
    
  )
}

export default ProductDetails;
