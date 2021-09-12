import { Component, h, State } from '@stencil/core';
import Product from '../../interface/Product';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @State() searchResult: Product[] = [];
  @State() hasData: boolean = true;

  componentDidLoad() {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.searchResult = parsedRes;
      })
      .catch(err => {
        this.hasData = false;
        console.log('There was an error fetching data ', err);
      });
  }

  render() {
    let productsList = (
      <div class="main-search-div">
        <table id="api-table">
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          {this.searchResult.map(r => (
            <tr>
              <td>{r.title}</td>
              <td>£{r.price}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </table>
      </div>
    );
    let errorMessage = (
      <div class="main-search-div">
        <h3>Sorry there was an error fetching the products listing</h3>
      </div>
    );
    let outputData;
    this.hasData ? (outputData = productsList) : (outputData = errorMessage);
    return outputData;
  }
}
