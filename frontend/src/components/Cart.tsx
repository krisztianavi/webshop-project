import { useContext } from 'react';
import { CartContext } from '../context/CartCon';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Cart() {
  const context = useContext(CartContext);

  if (!context) {
    return <p>Hiba az oldalon - A CartContext nem elérhető.</p>;
  }

  const { cart, removeFromCart, clearCart } = context;

  const handleRemove = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/cart/${id}`, { method: 'DELETE' });
      removeFromCart(id);
    } catch (error) {
      console.error('Hiba a termék törlésekor:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await fetch('/api/cart', { method: 'DELETE' });
      clearCart();
    } catch (error) {
      console.error('Hiba a termék törlésekor:', error);
    }
  };

  return (
    <div>
      <Row>
        {cart.length === 0 ? (
          <p>Üres a kosárad.</p>
        ) : (
          cart.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={`http://localhost:3000/${item.image}`} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{Math.round(item.price).toLocaleString()} Ft</Card.Text>
                  <Button onClick={() => handleRemove(item.id)} variant="danger">
                    Törlés
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {cart.length > 0 && (
        <Button onClick={handleClearCart} variant="warning" className="mt-3">
          Kosár kiürítése
        </Button>
      )}
    </div>
  );
}

export default Cart;
