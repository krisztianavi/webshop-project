import { useEffect, useContext, useState } from 'react';
import { CartContext } from '../context/CartCon';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../Products.css';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

function Products() {
  const context = useContext(CartContext);

  if (!context) {
    return <p>Hiba az oldalon - A CartContext nem elérhető.</p>;
  }

  const { isLoggedIn, addToCart } = context;
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data: Product[] = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortProducts();
  };

  return (
    <div>
      <Button onClick={toggleSortOrder} variant="secondary" className="mb-3">
        {sortOrder === 'asc' ? 'Ár: Csökkenő' : 'Ár: Növekvő'}
      </Button>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`http://localhost:3000/${product.image}`} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{Math.round(product.price).toLocaleString()} Ft</Card.Text>
                {isLoggedIn && (
                  <Button onClick={() => addToCart(product)} variant="primary">
                    Kosárba
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Products;
