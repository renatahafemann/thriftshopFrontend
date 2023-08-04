import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductList(){

    const [products, setProducts] = useState([]);
    
    const fetchData = async () => {
        const response = await fetch('/products');
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchData()
      }, [])
  
  return (
    <div>
      {products.length > 0 && (
        <Container>
        <Row>           
        {products.map((product) => (
            <Col xs={6} md={4} className="my-2">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80" height={350}/>
                <Card.Body className="text-center">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>$ {product.price}</Card.Text>
                                      
                </Card.Body>
                </Card>                
            </Col>))}       
        </Row>
    </Container>
      )}
    </div>
  )
}

export default ProductList;

