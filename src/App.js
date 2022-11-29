import React from 'react';
import './App.css';
import Guessing from './component/Guessing';
import Login from './component/Login';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            pages: "login"
        }
        this.setToken = this.setToken.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    setPage(pages) {
        this.setState({ pages: pages })
    }

    setToken(data) {
        this.setState({ token: data })
    }

    render() {
        if (this.state.pages === "login") {
            return (
                <div className='App'>
                    <Login setToken={this.setToken} setPage={this.setPage} />
                </div>);
        }
        else if (this.state.pages === "guessing") {
            return (
                <div>
                    <Guessing state={this.state} setPage={this.setPage} setToken={this.setToken} />
                </div>
            )
        }
    }
}


export default App;
