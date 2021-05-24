import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from '../../redux/actions/login'
import {Button, TextField} from "@material-ui/core";
import styles from './Login.module.css'

const Login = () => {
    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const onChangeLogin = e => {
        setLoginValue(e.target.value)
    }
    const onChangePassword = e => {
        setPassword(e.target.value)
    }
    const handleLogin = e => {
        e.preventDefault()
        dispatch(login(loginValue, password))
    }

    return (
        <div className={styles.login}>
            <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={onChangeLogin}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangePassword}
                />
            </form>
            <Button onClick={handleLogin}>Подтвердить</Button>
        </div>
    )
}

export default Login
