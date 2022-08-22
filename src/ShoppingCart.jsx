import React, { Component } from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {
  //Executes when the component is mounted

  constructor(props) {
    super(props); //calling super class's constructor
    //initialization of the state
    this.state = {
      products: [],
    };
  }

  render() {
    return (
      <div>
        <h4>Shopping Cart</h4>

        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }
  //render ends here

  //Executes after constructor and render method (includes life cycle of child components, if any) of current component
  componentDidMount = async () => {
    //send response to server
    var response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });

    //the following code executes after receiving response from server
    //converting the response body into a JS object array
    var prods = await response.json();

    //the following code executes after converting response body into JS object array
    console.log(prods);

    //updating products into component's state
    this.setState({ products: prods });
  };

  componentDidUpdate(prevProps, prevState) {}

  //Executes when the current instance of current component is being deleted from memory
  componentWillUnmount() {}

  componentDidCatch(error, info) {
    localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }

  //executes when the user clicks on + button.
  handleIncrement = (product, maxValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;

      //update the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };

  //executes when the user clicks on - button.
  handleDecrement = (product, minValue) => {
    //get index of selected product
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;

      //update the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };

  //executes when the user clicks on Delete(X) button in the Product component
  handleDelete = (product) => {
    //get index of selected product
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you sure to delete?")) {
      //delete product based on index
      allProducts.splice(index, 1);

      //update the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };
}
