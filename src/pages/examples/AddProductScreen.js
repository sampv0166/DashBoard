import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import { Col } from "react-bootstrap";
import Select from "../components/Select";
import { addProduct, getProduct, updateProduct } from "./api/products";
import { getCategory } from "./api/category";
import { getshops } from "./api/shop";
const AddNewProductScreen = ({ match, history, heading, buttonLabel }) => {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [shops, setShops] = useState([]);

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
      setProducts(data[0]);
    };

    const fetCategory = async () => {
      const { data } = await getCategory();
      setCategory(data);
    };

    const fetcShops = async () => {
      const { data } = await getshops();
      setShops(data);
    };
    fetcShops();
    fetCategory();

    if (heading === "Update Product") {
      console.log("ok");
      fetchProducts();
    }
  }, [heading]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name_ar: products.name_ar || "",
        name_en: products.name_en || "",
        image: products.image || "",
        shop_id: products.shop_id || "",
        description_ar: products.description_ar || "",
        description_en: products.description_en || "",
        category_id: products.category_id || "",
        subcategory_id: products.subcategory_id || "",
        sort_index: products.sort_index || "",
        bestseller: products.bestseller || "",
        special: products.special || "",
        isactive: products.isactive || "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        if (heading === "Update Product") {
          updateProduct(values);
        } else {
          addProduct(values);
        }
        history.push("/product");
      }}
    >
      {(formik) => (
        <div className="my-4">
          <h3 className="main-heading-global"> {heading}</h3>
      
          <Form>
            <div className="row g-3">
              <div className="col-md-6">
                <TextField label="Arabic Name" name="name_ar" type="text" />
              </div>
              <div className="col-md-6">
                <TextField label="English Name" name="name_en" type="text" />
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
              <div className="col-md-12">
                <input
                  className="my-4 form-control  shadow-none rounded"
                  label="Image"
                  name="image"
                  type="file"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])
                  }
                ></input>
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
              <div className="col-md-6">
                <Select
                  control="select"
                  label="Status"
                  name="isactive"
                  options={[
                    { key: "Select Product Status", value: "" },
                    { key: "Active", value: "1" },
                    { key: "Disabled", value: "0" },
                  ]}
                ></Select>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Best Seller
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Special
                  </label>
                </div>
              </div>
              <Col>
                <TextField label="Sort Index" name="sort_index" type="number" />
              </Col>
            </div>

            <button className="btn btn-success mt-3 my-2" type="submit">
              {buttonLabel}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddNewProductScreen;
