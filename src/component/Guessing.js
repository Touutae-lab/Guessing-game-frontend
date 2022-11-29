import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React from 'react';

class Guessing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            current: "",
            status: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearToken = this.clearToken.bind(this)
    }

    handleInput = (event) => {
        this.setState({ input: event.target.value })
    }

    clearToken = () => {
        this.props.setToken("")
    }

    handleSubmit = () => {
        let formdata = new FormData()
        formdata.append("token", this.props.state.token)
        formdata.append("number", this.state.input)
        axios.post("http://localhost:8000/guessing", formdata)
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        status: response.data.message
                    })
                    this.componentDidMount()
                }
                if (response.status === 202 && response.data.message === "Number is incorrect") {
                    console.log(response.data.message)
                    this.setState({
                        status: response.data.message
                    })
                }
                else {
                    if (response.data.message === "Not Authorized") {
                        alert("Not Authorized")
                        wait(50)
                        this.props.setPage("login")
                    }
                }


            })
    }
    componentDidMount() {
        let formdata = new FormData()
        formdata.append("token", this.props.state.token)
        axios.post("http://localhost:8000/getGuessing", formdata)
            .then(response => {
                if (response.status === 200) {
                    this.setState(
                        { current: response.data.number }
                    )
                }
            })
    }

    render() {
        return (
            <div className='App' >
                <h2>Gussing Number Game !</h2>
                <div>current number is: {this.state.current}</div>
                <div>Status: {this.state.status}</div>
                <input type="text" onChange={this.handleInput} value={this.state.input}></input>
                <button onClick={this.handleSubmit}>Submit number</button>
                <button onClick={this.clearToken}>Clear Token</button>
            </div>
        )
    }
}

export default Guessing;
