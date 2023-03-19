import React from "react";
import { useParams } from "react-router-dom";

import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import ProductDetails from "./product";
function Products() {
  const { productId } = useParams();
  const page = {
    title: "Courses",
    short_desc: "Choose from a variety of training vehicles and schedules that fits your needs."
  }
  return (
    <>
      <ProfilePageHeader data={page} />
      <ProductDetails productId={productId}/>
    </>
  );
}

export default Products;