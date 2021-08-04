import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IconContext } from "react-icons";
import { HiOutlineLogout, HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import UserContext from '../../contexts/UserContext';
import Modal from "react-modal";
import Forms from "./Forms";
import { storage } from "../../firebase";
import Links from "./Links";

export default function Homepage() {
    const history = useHistory();
    const [modalNew, setModalNew] = useState(false);
    const [tests, setTests] = useState([]);
    const [allTests, setAllTests] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [render, setRender] = useState([1]);
    const [group, setGroup] = useState("teachers");
    let { clientInformations, isLogged, setClientInformations, setIsLogged } = useContext(UserContext);
    if (clientInformations === null) {
        clientInformations = localStorage.getItem("clientInformations");
        clientInformations = JSON.parse(clientInformations);
    }

    if (clientInformations === null) {
        alert("Faca login!");
        history.push("/");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${clientInformations.token}`,
        },
    };

    useEffect(() => {
        const request = axios.get("https://repoprovas-db.herokuapp.com/tests", config);
        request.then(reply => {
            console.log(reply.data);
            setTests([...reply.data])
            setAllTests([...reply.data])
        });
        request.catch(error => {
            alert("Was not possible to logout, try refreshing the page");
        })
        const teacherRequest = axios.get("https://repoprovas-db.herokuapp.com/teacher", config);
        teacherRequest.then(reply => {
            console.log(reply.data);
            setTeachers([...reply.data])
        });
        teacherRequest.catch(error => {
            alert("Was not possible to logout, try refreshing the page");
        })
        const categoryRequest = axios.get("https://repoprovas-db.herokuapp.com/categories", config);
        categoryRequest.then(reply => {
            console.log(reply.data);
            setCategories([...reply.data])
        });
        categoryRequest.catch(error => {
            alert("Was not possible to logout, try refreshing the page");
        })
    }, render);

    function showModalNew() {
        setModalNew(true);
    }
    function hideModalNew() {
        setModalNew(false);
    }

    function logout() {
        const request = axios.post("https://repoprovas-db.herokuapp.com/logout", {}, config);
        request.then(reply => {
            setClientInformations(null);
            localStorage.removeItem('clientInformations');
            setIsLogged(false);
            history.push('/');
        })
        request.catch(error => {
            console.log(error);
        })
    }
    return (
        <IconContext.Provider value={{ className: "react-icons" }}>
            <Content>
                <div className="space-between">
                    <h1>{`Ola ${clientInformations.name}`}</h1>
                    <div>
                        <HiOutlineDocumentAdd className="logout" onClick={showModalNew} />
                        <HiOutlineLogout className="logout" onClick={logout} />
                    </div>
                </div>
                <LinkContainer>
                    <GroupContainer>
                        <button onClick={() => setGroup("teachers")}>teachers</button>
                        <button onClick={() => setGroup("disciplines")}>disciplines</button>
                    </GroupContainer>
                    <ItemsContainer>
                        <a href="#" onClick={() => setTests([...allTests])}>All</a>
                        {group === "teachers" && teachers.map((item) => <a href="#" onClick={() => setTests([...allTests.filter((test) => (test.teacherId === item.teacher))])}>{`Teacher ${item.teacher}: ${item.disciplines} `}</a>)}
                        {group === "disciplines" && categories.map((item) => (<><strong>{item.category}</strong>{item.disciplines.map((discipline) =><a href="#" onClick={() => setTests([...allTests.filter((test) => (test.categoryId === item.category && test.disciplineId === discipline.name))])}>{`discipline ${discipline.discipline}: ${discipline.files} `}</a>)}</>))}
                    </ItemsContainer>
                    {tests.map((item) => (<Links content={item} />))}
                </LinkContainer>
                <Modal style={modalNewStyle} isOpen={modalNew} contentLabel='New Modal'>
                    <NewModal>
                        <NewHeader>
                            <AiOutlineClose className="white" onClick={hideModalNew}></AiOutlineClose>
                        </NewHeader>
                        <Forms setModalNew={setModalNew} setRender={setRender} render={render} />
                    </NewModal>
                </Modal>
            </Content>
        </IconContext.Provider>
    );
}

const modalNewStyle = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        top: '10%',
        left: '10%',
        bottom: '10%',
        right: '10%',
        background: "#333333",
        borderRadius: "50px",
        color: "white",
    },
};

const GroupContainer = styled.div`
    display: flex;
    justify-content: center;
    button {
        margin-left: 15px;
    }
`

const ItemsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  a {
      margin-top: 10px;
  }
  strong {
      margin-top: 10px;
  }
`

const NewModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333333;
  border-radius: 20px;
`

const NewHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  .white {
      color: white;
      font-size: 20px;
  }
`

const LinkContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

`

const Content = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  color: black;
  border-bottom: gray;
  padding: 5%;
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: black;
  }
  .logout {
    font-size: 25px;
    color: black;
    margin-left: 25px;
  }
`