import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../services';

function Login({setIsLoggedIn, setProfileEmail}) {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var navigate = useNavigate();
    return (
      <div>
        <div className="container" style={{height: '80vh', paddingTop: '10vh'}}>
        <div className="row g-0 h-100 d-flex justify-content-center align-items-center">
            <div className="col-6 bg-white shadow-sm rounded p-3">
                <div className="text-center fs-3">
                    Login
                </div>
                <div>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <input type="text" className="form-control" id="email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>
                <div>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-success" onClick={async() => {
                        await fetchData('user/login', {email, password}, 'POST').then(res => {
                            console.log(res, 'inlogin')
                            if (res.success) {
                                setIsLoggedIn(true);
                                setProfileEmail(res.user.email);
                                navigate('home');
                            } else {
                                alert(res.error_message);
                            }
                        }).catch(err => {
                            console.log(err, 'err');
                        })
                    }}>Login</button>
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Login;