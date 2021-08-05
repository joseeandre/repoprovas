import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";
import UserContext from '../../contexts/UserContext';
import Loading from "../Homepage/Loading";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailRef, setEmailRef] = useState(false);
    const [passwordRef, setPasswordRef] = useState(false);
    const [emailRefColor, setEmailRefColor] = useState(false);
    const [passwordRefColor, setPasswordRefColor] = useState(false);
    const [error, setError] = useState(false);
    const [shakeOnError, setShakeOnError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const history = useHistory();
    const { isLogged, clientInformations, setIsLogged, setClientInformations } = useContext(UserContext);

    function signIn(e) {
        e.preventDefault();
        setShakeOnError(false);
        setIsLoading(true);
        const body = { email, password };
        const request = axios.post("https://repoprovas-db.herokuapp.com/sign-in", body);
        request.then(reply => {
            localStorage.setItem("clientInformations", JSON.stringify(reply.data));
            setClientInformations(reply.data)
            setIsLogged(true)
            setIsLoading(false);
            history.push('/home')
        })
        request.catch(() => {
            setError(true);
            setShakeOnError(true);
        })
    }

    return (
        <LoginPage onClick={() => {
            if (email === '') setEmailRef(false)
            setEmailRefColor(false)
            if (password === '') setPasswordRef(false)
            setPasswordRefColor(false)
        }} >

            <Hole></Hole>
            {isLogged ? <ClientInformations>name: {clientInformations.name}<br></br> email: {clientInformations.email}</ClientInformations> :

                <Content>
                    <LoginArea >
                        <Form onSubmit={signIn}>
                            <Title>Login</Title>
                            <InputHolder error={error} emailRefColor={emailRefColor} emailRef={emailRef} >
                                <Label id="email-label" htmlFor="email" shakeOnError={shakeOnError} >Email</Label>
                                <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                    setEmailRef(true)
                                    setEmailRefColor(true)
                                }} onFocus={() => {
                                    setEmailRef(true)
                                    setEmailRefColor(true)
                                    if (password === '') setPasswordRef(false)
                                    setPasswordRefColor(false)
                                }} id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                                <ErrorMessage error={error}>incorrect email/password</ErrorMessage>
                            </InputHolder>

                            <InputHolder error={error} passwordRefColor={passwordRefColor} passwordRef={passwordRef} visibility={visibility} >
                                <Label id="password-label" htmlFor="password" shakeOnError={shakeOnError} >Password</Label>
                                <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                    setPasswordRef(true)
                                    setPasswordRefColor(true)
                                }} onFocus={() => {
                                    setPasswordRef(true)
                                    setPasswordRefColor(true)
                                    if (email === '') setEmailRef(false)
                                    setEmailRefColor(false)
                                }} id="password" type={visibility ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />

                                <IconContext.Provider value={{ className: "visibility-icon" }} >
                                    <IoEye onClick={() => setVisibility(true)} ></IoEye>
                                </IconContext.Provider>
                                <IconContext.Provider value={{ className: "invisibility-icon" }} >
                                    <IoEyeOff onClick={() => setVisibility(false)} ></IoEyeOff>
                                </IconContext.Provider>
                            </InputHolder>
                            <Button>{isLoading ? <Loading />:"Sign In"}</Button>
                            <SignUpLink to="/sign-up" >First time? Create an account!</SignUpLink>
                        </Form>
                    </LoginArea>
                </Content>

            }

        </LoginPage>
    )

}

const LoginPage = styled.div`
`
const Hole = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://img.freepik.com/free-photo/assortment-with-warm-clothes-brick-wall_23-2148312009.jpg?size=626&ext=jpg');
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    .image-gallery{
        width: 50%;
        margin-top: 40px;
    }
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://www.clickguarulhos.com.br/wp-content/uploads/2016/11/saresp.jpg');
    display: flex;
    justify-content: center;
   
    
`

const ClientInformations = styled.div`
    font-family: 'Poppins' !important;
    color: #fff;
    position: fixed;
    top:26vh;
    left: 10px;
`

const LoginArea = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    font-family: 'Poppins' !important;
    margin-bottom: calc(100vh - 13vh - 480px - 40px);
    @media(max-width: 600px){
        width: 100%;
    }
    
`
const Form = styled.form`
    height: 480px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(255,255,255,0.6) ;
    margin-top: 40px;
    box-shadow: 0 1px 5px 1px #c2c2c2;
    padding: 25px;
    border-radius: 5px;
    animation: drop-down .5s linear forwards;
    @keyframes drop-down{
        0%{
            transform: scale(0,0);
        }
        100%{
            transform: scale(1,1);
        }
    }
    @media(max-width: 600px){
        width: 100%;
    }
`
const Title = styled.div`
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
`

const InputHolder = styled.div`
    width: 100%;
    height: 60px;
    margin-bottom: 40px;
    border:${props => props.error ? '2px solid #ff5252 ' : '1px solid #c2c2c2'};
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
    box-shadow: ${props => props.error ? 'none' : '1px 2px 5px 5px #c2c2c2'} ;
    &:focus-within{
        border: ${props => props.error ? '2px solid #ff5252 ' : '2px solid rgb(113,60,151)'};
        box-shadow: none;
    }
    #email-label{
        margin-top:${props => props.emailRef ? '-60px' : ''} ;
        background:${props => props.emailRef ? '#ffffff' : ''};
        font-size: ${props => props.emailRef ? '15px' : '25px'};
        color: ${props => props.error ? '#ff5252' : (props.emailRefColor ? 'rgb(113,60,151)' : '#808080')}
    }
    #password-label{
        margin-top:${props => props.passwordRef ? '-60px' : ''} ;
        background:${props => props.passwordRef ? '#ffffff' : ''};
        font-size: ${props => props.passwordRef ? '15px' : '25px'};
        color: ${props => props.error ? '#ff5252' : (props.passwordRefColor ? 'rgb(113,60,151)' : '#808080')}
        
    }
    #email{
        caret-color: ${props => props.error ? '#ff5252' : (props.passwordRefColor ? 'rgb(113,60,151)' : '#808080')} ;
    }
    #password{
        caret-color: ${props => props.error ? '#ff5252' : (props.passwordRefColor ? 'rgb(113,60,151)' : '#808080')} ;
    }
    .visibility-icon{
        font-size: 25px;
        position: absolute;
        right: 10px;
        display: ${props => props.visibility ? 'none' : ''};
    }
    .invisibility-icon{
        font-size: 25px;
        position: absolute;
        right: 10px;
        display: ${props => props.visibility ? '' : 'none'};
    }
`


const Input = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-size: 25px;
    padding: 0 10px;
    border: none;
    &:focus{
        outline: none;
    }
    
`

const Label = styled.label`
    position: absolute;
    left: 10px;
    transition: all .3s ease-in-out;
    animation: ${props => props.shakeOnError ? 'shake .5s' : ''} ;
    
    @keyframes shake {
        0% { transform: translate(1px, 1px) }
        10% { transform: translate(-1px, -2px) }
        20% { transform: translate(-3px, 0px) }
        30% { transform: translate(3px, 2px) }
        40% { transform: translate(1px, -1px) }
        50% { transform: translate(-1px, 2px) }
        60% { transform: translate(-3px, 1px) }
        70% { transform: translate(3px, 1px) }
        80% { transform: translate(-1px, -1px) }
        90% { transform: translate(1px, 2px) }
        100% { transform: translate(1px, -2px) }
    }
`

const Button = styled.button`
    width: 60%;
    height: 40px;
    border: none;
    background: linear-gradient(90deg, #00BFFF, 30% , rgb(113,60,151) );
    border-radius: 20px;
    font-size: 20px;
    color: #fff;
    box-shadow: 1px 2px 5px 5px #c2c2c2;
    font-family: 'Poppins';
    transition: all .3s ease-in-out;
    margin-bottom: 30px;
    &:hover{
        cursor: pointer;
        filter: brightness(1.10);
    }
`
const ErrorMessage = styled.div`
    color: #ff5252;
    display: ${props => props.error ? '' : 'none'};
    position: absolute;
    bottom: 0;
    right: 3px;
    font-size: 15px;
    margin-bottom: -7.5px;
    background-color: #fff;
`

const SignUpLink = styled(Link)`
    color: #00008B;
    text-decoration: underline;
`