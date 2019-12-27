import React from 'react';
import { getFunName } from '../helpers.js'

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        const storeName = this.myInput.current.value;
        this.props.history.push(`/store/${storeName}`)
    }

    render(){
        return (
        <form action="" className= "store-selector" onSubmit={this.goToStore}>
            <h2> Please enter a store</h2>
            <input 
                type="text" 
                required placeholder="Store Name" 
                value={getFunName()}
                ref= {this.myInput}>

                </input>
            <button type="submit">Visit Store -> </button>
        </form>
        )
    }
}

export default StorePicker;