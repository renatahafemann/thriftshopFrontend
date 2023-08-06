import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useParams} from "react-router-dom";

function ProductByCategory({client}){

    const [products, setProducts] = useState([]);
    const { category } = useParams();
    const [disabled, setDisabled] = useState(false);
    
    const fetchData = async () => {
        const response = await fetch(`/products/${category}`);
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchData()
      });

      let handleFavorite = async (e) => {
        e.preventDefault();
        
        try {
          let res = await fetch(`/favorites/add?clientId=${client.clientId}&productId=${e.target.value}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },            
          });
          const data = await res.json();
          if(res.status === 200){
            setDisabled(true);          
          }           
        } catch (err) {
          console.log(err);
        }
      };
  
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
                    <Card.Text>
                      <p>Size: {product.size}</p>
                      <p>${product.price}</p>
                      </Card.Text>
                    <Button variant="outline-secondary" href={`/products/details/${product.id}`}> View details</Button>    
                    {client ? <Button variant="outline-secondary" value={product.id} onClick={handleFavorite} disabled={disabled}> Add as favorite</Button>  : <Button variant="outline-secondary" href="/login"> Add as favorite</Button>}                                       
                </Card.Body>
                </Card>                
            </Col>))}       
        </Row>
    </Container>
      )}
    </div>
  )
}

export default ProductByCategory;
