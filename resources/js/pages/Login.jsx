import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(event){this.setState({email: event.target.value});}
    handlePasswordChange(event){this.setState({password: event.target.value});}
    handleSubmit(){
        const baseURL=`${import.meta.env.VITE_API_URL}login`
        const param={
            email:this.state.email,
            password:this.state.password
        }
        axios.post(baseURL,param).then((res) => {
            if(res.statusText==='OK'){
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('access_token', res.data.access_token);
                console.log(res.data)
                this.setState({isAuthenticated:true})
            }
        });
    }
    render() {
        const { isAuthenticated } = this.state;
        return (<>
            {isAuthenticated &&
                (<Navigate to="/dashboard/?refresh=true" replace={true} />
            )}
            <br/><br/><br/><br/><br/><br/>
            <div className="card" style={{width: "500px",margin: "auto"}}>
                <div className="card-body">

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="your-email@example.com"
                                value={this.state.email} onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password"
                                value={this.state.password} onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary"
                                onClick={this.handleSubmit}
                            >Submit</button>
                        </div>
                        <hr/>
                        <div className="mb-3">
                            <NavLink className="btn btn-link" to="/dashboard/register">Register</NavLink>
                        </div>

                </div>
            </div>
        </>);
    }
}
export default Login;
