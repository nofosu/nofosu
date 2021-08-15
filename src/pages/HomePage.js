// import { test } from "picomatch";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { Container, Form, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (!products) return <div>loading..</div>;
  return (
    <Container>
      <Row>
        {products.map((product) => {
          <Col key={product.id}>{product.title}</Col>;
        })}
      </Row>
    </Container>
  );
}
