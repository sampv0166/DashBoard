
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

import Product from "../components/Product";
import { deleteProduct, getProduct } from "./api/products";


const ProductScreen = ({match , history , location}) => {
  const [products, setProducts] = useState([]);

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      deleteProduct(id);
      console.log(id + " product deleted");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProduct();

      setProducts(data.data);
      //console.log(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} productId={product.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductScreen;
