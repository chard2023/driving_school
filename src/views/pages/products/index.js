import React from "react";
import { useParams } from "react-router-dom";

import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import ProductDetails from "./product";
function Products() {
  const { productId } = useParams();
  console.log(productId);
  return (
    <>
      <ProfilePageHeader />
      <ProductDetails productId={productId}/>
    </>
  );
}

export default Products;