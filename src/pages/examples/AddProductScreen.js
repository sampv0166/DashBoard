import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import Select from "../components/Select";
import { getProduct, updateProduct } from "./api/products";
import { getCategory } from "./api/category";
import { getshops } from "./api/shop";

import { Button, Card } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

const AddNewProductScreen = ({ match, history }) => {
  const [productVariations, setProductVariations] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [shops, setShops] = useState([]);
  const [images, setImages] = useState([]);
  const productId = match.params.id;

  const validate = Yup.object({
    name_ar: Yup.string().required("Required"),
    name_en: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    shop_id: Yup.string().required("Required"),
    description_ar: Yup.string().required("Required"),
    description_en: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    subcategory_id: Yup.string().required("Required"),
    sort_index: Yup.string().required("Required"),
    bestseller: Yup.number(),
    special: Yup.number(),
    isactive: Yup.number(),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProduct();
      data.data.map((product) => {
        if (product.id == productId) {
          setCurrentProduct(product);
          setProductVariations(product.variations);

          product.variations.map((variations) => {
            //console.log(variations);
            setImages(variations.images);
            variations.images.map((variationimages) => {
              // console.log(variationimages);
            });
          });

          // console.log(product);
        }
      });
    };

    products.map((product) => {
      //console.log(product);
      if (product.id == productId) {
        setCurrentProduct(product);
      }
    });

    const fetCategory = async () => {
      //const { data } = await getCategory();
      const category2 = [
        {
          active: "false",
          name_ar: "ABC",
          name_en: "CBA",
          created_at: "2021-07-01 18:11:18",
          id: 8,
          fullimageurl:
            "http://127.0.0.1:8000/storage/cdn/dxoU2rRvuky3Pvn4IyakNjT2ijIleNMMtezQzmJf.png",
        },
      ];
      let objects = [category2.length];

      for (var x = 0; x < category2.length; x++) {
        objects[x] = { key: category2[x].name_en, value: category2[x].name_en };
      }
      setCategory(objects);
      setSubCategory(objects);
    };

    const fetcShops = async () => {
      const shops = [
        {
          shop_coverImage: "cdn/VEyynoegoBGuGhVm0zDI1l3iuAPFDRWTEcESoKOG.webp",
          shop_name_ar: "MVP",
          shop_name_en: "MVP",
          shop_email: "abc@kmz.aes",
          last_login: "127.0.0.1",
          open: false,
          booth: 2,
          id: 2,
          owner: {
            email: "abc@kmz.aes",
            name: "faisal",
            typeofuser: "A",
            permissions:
              "shop.update|product.add|product.update|product.delete",
            shop_id: 2,
            id: 16,
            permissionslist: {
              shop: ["update"],
              product: ["add", "update", "delete"],
            },
          },
        },
      ];
      let data = [shops.length];

      for (var x = 0; x < shops.length; x++) {
        data[x] = { key: shops[x].shop_name_en, value: shops[x].shop_name_en };
      }
      //const { data } = await getshops();
      setShops(data);
    };

    fetcShops();

    fetCategory();
    fetchProducts();
  }, [productId]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Formik
          enableReinitialize
          initialValues={{
            name_ar: currentProduct.name_ar || "",
            name_en: currentProduct.name_en || "",
            image: currentProduct.image || "",
            shop_id: currentProduct.shop_id || "",
            description_ar: currentProduct.description_ar || "",
            description_en: currentProduct.description_en || "",
            category_id: "",
            subcategory_id: "",
            sort_index: currentProduct.sort_index || "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            updateProduct(values);
            history.push("/product");
          }}
        >
          {(formik) => (
            <div className="my-4">
              <div className="row">
                <div className="col-5">
                  <Card
                    className="my-2 p-1 rounded"
                    style={{ height: "280px", objectFit: "cover" }}
                  >
                    <Card.Img
                      style={{ height: "270px", objectFit: "contain" }}
                      src={currentProduct.coverimage}
                      variant="top"
                    />
                  </Card>
                </div>

                <div className="col-7">
                  <Row>
                    <Form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <TextField
                            label="Arabic Name"
                            name="name_ar"
                            type="text"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            label="English Name"
                            name="name_en"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <TextField
                            label="Arabic Description"
                            name="description_ar"
                            type="text"
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            label="English Description"
                            name="description_en"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <Select
                            control="select"
                            label="Category"
                            name="category_id"
                            options={category}
                          ></Select>
                        </div>
                        <div className="col-md-6">
                          <Select
                            control="select"
                            label="Sub Category"
                            name="subcategory_id"
                            options={category}
                          ></Select>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <Select
                            control="select"
                            label="Shop Name"
                            name="shop_id"
                            options={shops}
                          ></Select>
                        </div>
                      </div>

                      <div className="row g-3">
                        <Col>
                          <TextField
                            label="Sort Index"
                            name="sort_index"
                            type="number"
                          />
                        </Col>
                      </div>   
                                     
                      {images.map((variationimages) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                          <Card
                            className="my-2 p-1 rounded"
                            style={{ height: "120px", objectFit: "contain" }}
                          >
                            <Card.Img
                              style={{ height: "100px", objectFit: "contain" }}
                              src={variationimages}
                              variant="top"
                            />
                          </Card>
                        </Col>
                      ))}
                      <div className="mt-3">
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </div>
                    </Form>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default AddNewProductScreen;
