import { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailRef, setEmailRef] = useState(false);
    const [passwordRef, setPasswordRef] = useState(false);
    const [nameRef, setNameRef] = useState(false);
    const [confirmPasswordRef, setConfirmPasswordRef] = useState(false);
    const [emailRefColor, setEmailRefColor] = useState(false);
    const [passwordRefColor, setPasswordRefColor] = useState(false);
    const [nameRefColor, setNameRefColor] = useState(false);
    const [confirmPasswordRefColor, setConfirmPasswordRefColor] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [shakeOnPasswordError, setShakeOnPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [shakeOnEmailError, setShakeOnEmailError] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        setShakeOnEmailError(false);
        setShakeOnPasswordError(false);

        if (password !== confirmPassword) {
            setShakeOnPasswordError(true);
            setPasswordError(true);
            setEmailError(false);
            return;
        }

        const body = { name, email, password, confirmPassword };
        const request = axios.post("https://repoprovas-db.herokuapp.com/sign-up", body);
        request.then(reply => {
            history.push('/');

        })
        request.catch((error) => {
            setEmailError(true);
            setShakeOnEmailError(true);
            setPasswordError(false);
            console.log(error);
        })
    }

    return (
        <SignUpPage onClick={() => {
            if (name === '') setNameRef(false)
            setNameRefColor(false)
            if (email === '') setEmailRef(false)
            setEmailRefColor(false)
            if (password === '') setPasswordRef(false)
            setPasswordRefColor(false)
            if (confirmPassword === '') setConfirmPasswordRef(false)
            setConfirmPasswordRefColor(false)
        }} >
            <Content>
                <Hole></Hole>
                <SignUpArea >
                    <Form onSubmit={signUp} emailError={emailError} passwordError={passwordError} >
                        <Title>Create an account</Title>
                        <InputHolder nameRefColor={nameRefColor} nameRef={nameRef} >
                            <Label id="name-label" htmlFor="name"  >Name</Label>
                            <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                setNameRef(true)
                                setNameRefColor(true)
                            }} onFocus={() => {
                                setNameRef(true)
                                setNameRefColor(true)
                                if (password === '') setPasswordRef(false)
                                setPasswordRefColor(false)
                                if (email === '') setEmailRef(false)
                                setEmailRefColor(false)
                                if (confirmPassword === '') setConfirmPasswordRef(false)
                                setConfirmPasswordRefColor(false)
                            }} id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </InputHolder>

                        <InputHolder id="email-holder" emailError={emailError} emailRefColor={emailRefColor} emailRef={emailRef} shakeOnEmailError={shakeOnEmailError} >
                            <Label id="email-label" htmlFor="email" >Email</Label>
                            <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                setEmailRef(true)
                                setEmailRefColor(true)
                            }} onFocus={() => {
                                setEmailRef(true)
                                setEmailRefColor(true)
                                if (password === '') setPasswordRef(false)
                                setPasswordRefColor(false)
                                if (name === '') setNameRef(false)
                                setNameRefColor(false)
                                if (confirmPassword === '') setConfirmPasswordRef(false)
                                setConfirmPasswordRefColor(false)
                            }} id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                            <ErrorMessage emailError={emailError}>this email is already on use</ErrorMessage>
                        </InputHolder>

                        <InputHolder id="password-holder" passwordError={passwordError} passwordRefColor={passwordRefColor} passwordRef={passwordRef} shakeOnPasswordError={shakeOnPasswordError} visibility={visibility} >
                            <Label id="password-label" htmlFor="password" >Password</Label>
                            <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                setPasswordRef(true)
                                setPasswordRefColor(true)
                            }} onFocus={() => {
                                setPasswordRef(true)
                                setPasswordRefColor(true)
                                if (email === '') setEmailRef(false)
                                setEmailRefColor(false)
                                if (name === '') setNameRef(false)
                                setNameRefColor(false)
                                if (confirmPassword === '') setConfirmPasswordRef(false)
                                setConfirmPasswordRefColor(false)
                            }} id="password" type={visibility ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />

                            <IconContext.Provider value={{ className: "visibility-icon" }} >
                                <IoEye onClick={() => setVisibility(true)} ></IoEye>
                            </IconContext.Provider>

                            <IconContext.Provider value={{ className: "invisibility-icon" }} >
                                <IoEyeOff onClick={() => setVisibility(false)} ></IoEyeOff>
                            </IconContext.Provider>
                        </InputHolder>

                        <InputHolder id="confirm-password-holder" passwordError={passwordError} confirmPasswordRefColor={confirmPasswordRefColor} confirmPasswordRef={confirmPasswordRef} shakeOnPasswordError={shakeOnPasswordError} >
                            <Label id="confirm-password-label" htmlFor="confirm-password" >Confirm Password</Label>
                            <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                setConfirmPasswordRef(true)
                                setConfirmPasswordRefColor(true)
                            }} onFocus={() => {
                                setConfirmPasswordRef(true)
                                setConfirmPasswordRefColor(true)
                                if (email === '') setEmailRef(false)
                                setEmailRefColor(false)
                                if (name === '') setNameRef(false)
                                setNameRefColor(false)
                                if (password === '') setPasswordRef(false)
                                setPasswordRefColor(false)
                            }} id="confirm-password" type={visibility ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            <PasswordsMatch passwordError={passwordError}>passwords don't match</PasswordsMatch>
                        </InputHolder>
                        <Button>Sign Up</Button>
                        <LoginLink to="/" >Already a client? Login into your account!</LoginLink>
                    </Form>
                </SignUpArea>
            </Content>
        </SignUpPage>
    )

}

const SignUpPage = styled.div`
`
const Hole = styled.div`
    background: #f0f0f0;
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://www.clickguarulhos.com.br/wp-content/uploads/2016/11/saresp.jpg');
    display: flex;
    justify-content: center;
   
    
`
const SignUpArea = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    font-family: 'Poppins' !important;
    margin-bottom: calc(100vh - 13vh - 650px - 40px);
    @media(max-width: 600px){
        width: 100%;
    }
    
`
const Form = styled.form`
    height: 650px;
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
    #email-holder{
        border:${props => props.emailError ? '2px solid #ff5252 ' : '1px solid #c2c2c2'};
        box-shadow: ${props => props.emailError ? 'none' : '1px 2px 5px 5px #c2c2c2'} ;
        &:focus-within{
            border: ${props => props.emailError ? '2px solid #ff5252 ' : '2px solid rgb(113,60,151)'};
            box-shadow: none;
        }
    }
    #password-holder{
        border:${props => props.passwordError ? '2px solid #ff5252 ' : '1px solid #c2c2c2'};
        box-shadow: ${props => props.passwordError ? 'none' : '1px 2px 5px 5px #c2c2c2'} ;
        &:focus-within{
            border: ${props => props.passwordError ? '2px solid #ff5252 ' : '2px solid rgb(113,60,151)'};
            box-shadow: none;
        }
    }
    #confirm-password-holder{
        border:${props => props.passwordError ? '2px solid #ff5252 ' : '1px solid #c2c2c2'};
        box-shadow: ${props => props.passwordError ? 'none' : '1px 2px 5px 5px #c2c2c2'} ;
        &:focus-within{
            border: ${props => props.passwordError ? '2px solid #ff5252 ' : '2px solid rgb(113,60,151)'};
            box-shadow: none;
        }
    }
`
const Title = styled.div`
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
`

const InputHolder = styled.div`
    width: 100%;
    height: 60px;
    margin-bottom: 40px;
    border: 1px solid #c2c2c2;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
    box-shadow: 1px 2px 5px 5px #c2c2c2 ;
    &:focus-within{
        border: 2px solid rgb(113,60,151);
        box-shadow: none;
    }
    #name-label{
        margin-top:${props => props.nameRef ? '-60px' : ''} ;
        background:${props => props.nameRef ? '#ffffff' : ''};
        font-size: ${props => props.nameRef ? '15px' : '25px'};
        color: ${props => props.nameRefColor ? 'rgb(113,60,151)' : '#808080'}
        
    }
    #email-label{
        margin-top:${props => props.emailRef ? '-60px' : ''} ;
        background:${props => props.emailRef ? '#ffffff' : ''};
        font-size: ${props => props.emailRef ? '15px' : '25px'};
        color: ${props => props.emailError ? '#ff5252' : (props.emailRefColor ? 'rgb(113,60,151)' : '#808080')};
        animation: ${props => props.shakeOnEmailError ? 'shake .5s' : ''} ;
    
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
    }
    #password-label{
        margin-top:${props => props.passwordRef ? '-60px' : ''} ;
        background:${props => props.passwordRef ? '#ffffff' : ''};
        font-size: ${props => props.passwordRef ? '15px' : '25px'};
        color: ${props => props.passwordError ? '#ff5252' : (props.passwordRefColor ? 'rgb(113,60,151)' : '#808080')};
        animation: ${props => props.shakeOnPasswordError ? 'shake .5s' : ''} ;
    
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
    }
    #confirm-password-label{
        margin-top:${props => props.confirmPasswordRef ? '-60px' : ''} ;
        background:${props => props.confirmPasswordRef ? '#ffffff' : ''};
        font-size: ${props => props.confirmPasswordRef ? '15px' : '25px'};
        color: ${props => props.passwordError ? '#ff5252' : (props.confirmPasswordRefColor ? 'rgb(113,60,151)' : '#808080')};
        animation: ${props => props.shakeOnPasswordError ? 'shake .5s' : ''} ;
    
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
    }
    #email{
        caret-color: ${props => props.emailError ? '#ff5252' : (props.emailRefColor ? 'rgb(113,60,151)' : '#808080')} ;
    }
    #name{
        caret-color: ${props => (props.nameRefColor ? 'rgb(113,60,151)' : '#808080')} ;
    }
    #password{
        caret-color: ${props => props.passwordError ? '#ff5252' : (props.passwordRefColor ? 'rgb(113,60,151)' : '#808080')} ;
    }
    #confirm-password{
        caret-color: ${props => props.passwordError ? '#ff5252' : (props.confirmPasswordRefColor ? 'rgb(113,60,151)' : '#808080')} ;
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
`

const Button = styled.button`
    width: 80%;
    height: 50px;
    border: none;
    background: linear-gradient(90deg, #00BFFF, 30% , rgb(113,60,151) );
    border-radius: 30px;
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
    display: ${props => props.emailError ? '' : 'none'};
    position: absolute;
    bottom: 0;
    right: 5px;
    font-size: 15px;
    margin-bottom: -7.5px;
    background-color: #fff;
`
const PasswordsMatch = styled.div`
    color: #ff5252;
    display: ${props => props.passwordError ? '' : 'none'};
    position: absolute;
    bottom: 0;
    right: 5px;
    font-size: 15px;
    margin-bottom: -7.5px;
    background-color: #fff;
`


const LoginLink = styled(Link)`
    color: #00008B;
    text-decoration: underline;
`