import React from 'react'

class Guessing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {token: ""}
    }
    render() {
        return (
            <div className='Container'>
                <div>{this.state.number}</div>
                <button onClick={getData(this.props.token)}></button>
            </div>
        )
    }
}

const getData = (token) => {
    if 
    return ;
}