import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function UserFavorites({client}){


    const [data, setData] = useState([]);
    const [dataError, setDataError] = useState([]);

    const id = client.clientId;
    
    const fetchData = async () => {
        try{
            const response = await fetch(`/favorites/find/${id}`);
            const responseData = await response.json();

            if (response.status === 200) { 
                setData(responseData);
            }  else {            
                setDataError(responseData.message);  
            } 
        }catch (err) {
            console.log(err);
          }       
    }

    useEffect(() => {
        fetchData()
      }, [])

     
  return (
     
    <div>
      {data.length > 0 ? 
        <Container>
        <Row>           
        {data.map((data) => (
            <Col xs={6} md={4} className="my-2">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80" height={350}/>
                <Card.Body className="text-center">
                    <Card.Title>{data.favoritesProducts.name}</Card.Title>
                    <Card.Text>
                      <p>Size: {data.favoritesProducts.size}</p>
                      <p>${data.favoritesProducts.price}</p>
                      </Card.Text>
                    <Button variant="outline-secondary" href={`/products/details/${data.favoritesProducts.id}`}> View details</Button>                             
                </Card.Body>
                </Card>                
            </Col>))}       
        </Row>
    </Container>
       : <p>{dataError}</p>}
    </div>
  )
}

export default UserFavorites;
