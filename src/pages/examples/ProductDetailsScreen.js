import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { getCategory } from "./api/category";
import { getProduct } from "./api/products";
import { getshops } from "./api/shop";

const ProductDetailsScreen = () => {
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
  }, []);

  return <div></div>;
};

export default ProductDetailsScreen;
