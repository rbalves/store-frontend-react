import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import './styles.css'

export default class Main extends Component {
    state = {
        products: [],
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get(`/products`);
        this.setState({products: response.data});
    };

    render(){
        
        const { products } = this.state;

        return (
            <div>
                <Header/>
                <div className="product-list">
                    {
                        products.map(product => (
                            <article key={product.id}>
                                <h1>{product.name}</h1>
                                <p>{product.price}</p>
                                <Link to={`/products/${product.id}`}>Edit</Link>
                            </article>
                        ))
                    }
                </div>
            </div>
        );
    }
}