import React, { useEffect, useState } from "react";
import CheckboxGroup from "../components/CheckboxGroup";
import * as Yup from "yup";

import { getUsers } from "./api/users";
import { Form } from "react-bootstrap";
import { Formik } from "formik";

const PermissionsScreen = ({ user, match }) => {
  const [permissions, setPermissions] = useState([]);

  const [usersdata, setUsersData] = useState([]);
  const [productPermissions, setProductPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);
  const [permissionPermissions, setPermissionPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);
  const [categoryPermissions, setCategoryPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);
  const [shopPermissions, setShopPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);


  

  const userid = match.params.id;


  const populateProductpermissions = (permissions) => {
    const product = permissions.product;
    const arr = new Array(3);
    if (product) {
      console.log(product);
      for (let i = 0; i < product.length; i++) {
        console.log(product[0]);
        arr[i] = { key: product[i], value: product[i] };
      }
    }

   // setProductPermissions(arr)
   console.log(permissions.product);
   return(arr)


  };

  const populateshoppermissions = (permissions) => {
    const shop = permissions.shop;
    const arr1 = new Array(3);
    if (shop) {
      console.log(shop);
      for (let i = 0; i < shop.length; i++) {
        console.log(shop[0]);
        arr1[i] = { key: shop[i], value: shop[i] };
      }
    }

   // setShopPermissions(arr1)
    console.log(arr1 );
    return(arr1)
  };

  const populatecategorypermissions = (permissions) => {
    const category = permissions.category;
    const arr1 = new Array(3);
    if (category) {
      console.log(category);
      for (let i = 0; i < category.length; i++) {
        console.log(category[0]);
        arr1[i] = { key: category[i], value: category[i] };
      }
    }

   // setShopPermissions(arr1)
    console.log(arr1 );
    return(arr1)
  };

  const populatepermissionpermissions = (permissions) => {
    const permission = permissions.permission;
    const arr1 = new Array(3);
    if (permission) {
      console.log(permission);
      for (let i = 0; i < permission.length; i++) {
        console.log(permission[0]);
        arr1[i] = { key: permission[i], value: permission[i] };
      }
    }

   // setShopPermissions(arr1)
    console.log(arr1 );
    return(arr1)
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(user.success.token);
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id == userid) {
          setPermissions(data.data[i].permissionslist);
          console.log(data.data[i].permissionslist);
        }
      }
    }; 
    
    console.log(userid)

    fetchUsers();
  }, [user.success.token, userid,]);

  

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

  

  return (
    <Formik
      initialValues={{
        product: permissions.product||  "" ,
        permission: "",
        shop: "",
        category: "",
      }}
      //validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        console.log(permissions);
       
        //handleSubmit(values);
      }}
    >
      {(formik) => (
        <Form>
          {permissions.hasOwnProperty("product") ? (
            <CheckboxGroup
              control="checkbox"
              label="Product Permissions"
              name="product"
              options={populateProductpermissions(permissions)}
            />
          ) : (
            ""
          )}

          {permissions.hasOwnProperty("permission") ? (
            <CheckboxGroup
              control="checkbox"
              label="Permission Permissions"
              name="permission"
              options={populatepermissionpermissions(permissions)}
            />
          ) : (
            ""
          )}

          {permissions.hasOwnProperty("shop") ? (
            <CheckboxGroup
              control="checkbox"
              label="Shop Permissions"
              name="shop"
              options={populateshoppermissions(permissions)}
            />
          ) : (
            ""
          )}

          {permissions.hasOwnProperty("category") ? (
            <CheckboxGroup
              control="checkbox"
              label="Category Permissions"
              name="category"
              options={populatecategorypermissions(permissions)}
            />
          ) : (
            ""
          )}
          <button className="btn btn-success mt-3 my-2" type="submit">
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PermissionsScreen;
