import React from "react";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import sampleFishes from '../sample-fishes'
import Fish from './Fish.js';
import base from "../base.js";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }
    
    componentDidMount(){
      const { params } = this.props.match;

      const localStorageRef = localStorage.getItem(params.storeId);
      if(localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)})
      }
      this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: "fishes"
      });
    }

    componentDidUpdate(){
      localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
      console.log()
    }
    componentWillUnmount() {
      base.removeBinding(this.ref)
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish
        this.setState({
            fishes
    })
    };

    updateFish = (key, updatedFish) => {
      console.log(key)
      const fishes = {...this.state.fishes}
      fishes[key] = updatedFish;
      this.setState({fishes})
    }

    deleteFish = (key) => {
      const fishes ={...this.state.fishes}
      fishes[key] = null;
      this.setState({fishes})
    }

    deleteOrder = (key) => {
      const order = {...this.state.order}
      delete order[key]
      this.setState({order})
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
        console.log("loading")
    }

    addToOrder = (key) => {
      const order = {...this.state.order};
      order[key] = order[key] + 1 || 1;
      this.setState({
        order
      })
    }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
              {Object.keys(this.state.fishes).map(key => <Fish 
                          key={key} 
                          details={this.state.fishes[key]}
                          addToOrder={this.addToOrder}
                          index = {key} 
                          />)}
              
          </ul>
        </div>
        <Order order={this.state.order} fishes = {this.state.fishes}
            deleteOrder = {this.deleteOrder}
        />
        <Inventory addFish = {this.addFish} 
            updateFish = {this.updateFish}
            loadSampleFishes = {this.loadSampleFishes}
            fishes = {this.state.fishes}
            deleteFish = {this.deleteFish}
              />
      </div>
    );
  }
}

export default App;
