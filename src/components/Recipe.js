import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADD_SHIPPING,SUB_SHIPPING } from '../components/actions/action-types/cart-actions';

class Recipe extends Component {
    componentWillUnmount(){
        if (this.refs.shipping.checked){
            this.props.subtractShipping();
        }
    }

   handleChecked(e) {
        if (e.target.checked){
            this.props.addShipping();
        } else {
            this.props.subtractShipping();
        }
    }


    render(){
        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleChecked.bind(this)}/>
                            <span>Shipping +6$</span>
                        </label>
                    </li>
                    <li className="collection-item">
                        Total:  <b>{this.props.total}$</b>
                    </li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn">Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addShipping: ()=>{dispatch({type: ADD_SHIPPING})},
        subtractShipping: ()=>{dispatch({type: SUB_SHIPPING})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe);