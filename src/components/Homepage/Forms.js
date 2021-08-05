import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";
import UserContext from '../../contexts/UserContext';
import { auth, storage, db } from "../../firebase";
import Loading from "./Loading";

export default function Forms(props) {
    const { render, setRender, setModalNew } = props;
    const [name, setName] = useState('');
    const [discipline, setDiscipline] = useState("");
    const [teacher, setTeacher] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [nameRef, setNameRef] = useState(false);;
    const [nameRefColor, setNameRefColor] = useState(false);
    const [file, setFile] = useState("");
    const [category, setCategory] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const categories = ["P1", "P2", "P3", "2ch", "Outras"];
    let { clientInformations, isLogged, setClientInformations, setIsLogged } = useContext(UserContext);
    if (clientInformations === null) {
        clientInformations = localStorage.getItem("clientInformations");
        clientInformations = JSON.parse(clientInformations);
    }

    const config = {
        headers: {
            Authorization: `Bearer ${clientInformations.token}`,
        },
    };

    useEffect(() => {
        const request = axios.get("https://repoprovas-db.herokuapp.com/disciplines", config);
        request.then((reply) => {
            setDisciplines([...reply.data]);
        })
        request.catch((e) => {
            console.log(e);
        })
    }, []);

    function submmit(e) {
        e.preventDefault();

        const body = { name, discipline, category, teacher, fileName: file.name };
        setIsLoading(true);
        const request = axios.post("https://repoprovas-db.herokuapp.com/upload", body, config);
        request.then(reply => {
            const fileRef = storage.ref().child(file.name);
            fileRef.put(file).then(r => {
                if (render[0] != 2) {
                    setRender([2]);
                } else {
                    setRender([1]);
                }
                setModalNew(false);
                setIsLoading(false);
                alert("ok!");
            }).catch(error => {
                console.log(error);
            })
        })
        request.catch(error => {
            console.log(error);
        })
    }

    function disciplineSelect(e) {
        setDiscipline(e);
        const request = axios.get(`https://repoprovas-db.herokuapp.com/teachers/${e}`, config);
        request.then((reply) => {
            setTeachers([...reply.data]);
        })
        request.catch((e) => {
            console.log(e);
        })
    }

    return (
        <TestPage onClick={() => {
            if (name === '') setNameRef(false)
            setNameRefColor(false)
        }} >
            <Content>
                <Hole></Hole>
                <TestArea >
                    <Form onSubmit={submmit} >
                        <Title>Submmit a Test</Title>
                        <InputHolder nameRefColor={nameRefColor} nameRef={nameRef} >
                            <Label id="name-label" htmlFor="name"  >Name</Label>
                            <Input onClick={e => e.stopPropagation()} onKeyDown={() => {
                                setNameRef(true)
                                setNameRefColor(true)
                            }} onFocus={() => {
                                setNameRef(true)
                                setNameRefColor(true)
                            }} id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </InputHolder>

                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option> SELECT CATEGORY</option>
                            {
                                categories.map((data, index) =>
                                (<option
                                    key={index} > {data} </option>))
                            }
                        </select>

                        <select value={discipline} onChange={(e) => disciplineSelect(e.target.value)}>
                            <option> SELECT DISCIPLINE</option>
                            {
                                disciplines.map((data, index) =>
                                (<option
                                    key={index} > {data.name} </option>))
                            }
                        </select>

                        <select value={teacher} onChange={(e) => setTeacher(e.target.value)}>
                            <option> SELECT TEACHER</option>
                            {
                                teachers.map((data, index) =>
                                (<option
                                    key={index} > {data.name} </option>))
                            }
                        </select>

                        <input
                            type="file"
                            placeholder="CV"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept="application/pdf"
                        ></input>
                        <Button className="button">{isLoading ? <Loading />:"Submmit"}</Button>
                    </Form>
                </TestArea>
            </Content>
        </TestPage>
    );
}

const TestPage = styled.div`
`
const Hole = styled.div`
    background: #f0f0f0;
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    display: flex;
    justify-content: center;
`

const TestArea = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    font-family: 'Poppins' !important;
    select {
        width: 100%;
        height: 60px;
        margin-bottom: 40px;
        border: 1px solid #c2c2c2;
        border-radius: 5px;
        padding: 1rem;
        padding-left: 17px;
        appearance: none;
        overflow: hidden;
        transition: all .3s ease-in-out;
        box-shadow: 1px 2px 5px 5px #c2c2c2 ;
  }
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
    margin-top: 40px;
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
    #name{
        caret-color: ${props => (props.nameRefColor ? 'rgb(113,60,151)' : '#808080')} ;
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
    margin-top: 30px;
    &:hover{
        cursor: pointer;
        filter: brightness(1.10);
    }
`