import React, { Component } from "react";

import Client from "shopify-buy";

const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: "cncsit.myshopify.com",
  storefrontAccessToken: "81c1007ee2a6c9c68443ba162a8f25c0",
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
    test: "test",
  };

  componentDidMount() {
    this.createCheckout();
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    console.log(checkout);
    this.setState({ checkout: checkout });
  };

  addItemsToCheckout = async (varientId, quantity) => {
    const lineItemsToAdd = [{ varientId, quantity: parseInt(quantity, 10) }];

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this, this.setState({ checkout: checkout });
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithID = async (id) => {
    const product = await client.product.fetch(id);
    this.setState({ product: product });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };
  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithID: this.fetchProductWithID,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemsToCheckout: this.addItemsToCheckout,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
export default ShopProvider;
