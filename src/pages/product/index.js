import React, { Component } from 'react';
import PropTypes from 'prop-types'
import api from '../../services/api';
import Header from '../../components/Header';

import './styles.css';

export default class Product extends Component {
    state = {
        title: '',
        name: '',
        price: 0
    }

    static context = {
        router: PropTypes.object
    }

    async componentDidMount(){
        const { id } = this.props.match.params;

        if(id === 'new'){
            this.setState({ name: '' });
            this.setState({ price: '' });
            this.setState({ title: 'New product' });
        }else{
            const response = await api.get(`/products/${id}`);
            this.setState({ name: response.data[0].name });
            this.setState({ price: response.data[0].price });
            this.setState({ title: 'Edit product' });
        }
        
    }

    handleChangeName(event){
        this.setState({name: event.target.value})
    }

    handleChangePrice(event){
        this.setState({price: event.target.value})
    }

    async saveProduct(){
        const { title, name, price } = this.state;
        if(title === 'New product'){
            const response = await api.post('/products', {name, price});
            console.log(response)
            if(response.status === 201){
                this.props.history.push("/products");
            }
        }else{
            const { id } = this.props.match.params;
            const response = await api.put(`/products/${id}`, {name, price});
            if(response.status === 201){
                this.props.history.push("/products");
            }
        }
    }

    async deleteProduct(){
        const { name, price } = this.state;
        const { id } = this.props.match.params;
        const response = await api.delete(`/products/${id}`, {name, price});
        if(response.status === 200){
            this.props.history.push("/products");
        }
    }

    render(){
        const { title, name, price } = this.state;
        return (
            <div>
                <Header/>
                <div className='product-info'>
                    <h2>{title}</h2>
                    <hr/>
                    <strong>Name:</strong>
                    <input type="text" value={name} onChange={(event) => this.handleChangeName(event)}/>
                    <strong>Price:</strong>
                    <input type="number" value={price} onChange={(event) => this.handleChangePrice(event)}/>
                    <button className="btn-success" onClick={() => this.saveProduct()}>Save</button>
                    { title === 'New product' ? null : <button className="btn-danger" onClick={() => this.deleteProduct()}>Delete</button> }
                </div>
            </div>
        );
    }
}