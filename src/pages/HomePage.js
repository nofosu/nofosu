// import { test } from "picomatch";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";

export default function HomePage() {
  const { test } = useContext(ShopContext);
  return (
    <div>
      Home
      {test}
    </div>
  );
}
