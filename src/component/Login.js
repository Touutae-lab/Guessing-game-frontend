import axios from "axios";
import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.state = {
            password: "",
            input: "",
            status: ""
        }
    }

    handleLogin() {
        let formdata = new FormData()
        formdata.append("password", this.state.input)
        axios.post("http://localhost:8000/login", formdata)
            .then(response => {
                if (response.status === 200) {
                    this.props.setToken(response.data.token)
                    this.props.setPage("guessing")
                }
                else if (response.status === 202) {
                    this.setState({ status: response.data.message })
                }
            })
    }

    handleChange() {
        axios.put("http://localhost:8000/updatePassword", {
            password: this.state.input
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.message)
                }
            })
    }

    handleInput = (event) => {
        this.setState({ input: event.target.value })
    }

    handleDelete = () => {
        axios.delete("http://localhost:8000/deletePassword")
    }

    async componentDidMount() {
        let data = await axios({
            url: "http://localhost:8000/getPassword",
            method: "GET"
        })
        this.setState({ password: data.data.password })
    }

    render() {
        return (
            <div className="App">
                <div className="Login">
                    <h2>Login</h2>
                    <h3>Your Password is: {this.state.password}</h3>
                    <div className="App">
                        <div>{this.state.status}</div>
                        <input type="password" value={this.state.input} onChange={this.handleInput} />
                        <button onClick={this.handleLogin}>Login</button>
                        <button onClick={this.handleChange}>Change</button>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>
                    <article>
                        Change mean you change password (CORS flight do not accept Implement later maybe *browser blocked)
                    </article>
                    <article>
                        Delete mean you delete password (set it to empty string) (CORS flight do not accept Implement later *browser blocked)
                    </article>
                </div>
            </div>);
    }
}

export default Login;