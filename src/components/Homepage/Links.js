import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { IconContext } from "react-icons";
export default function Links(props) {
  const { content } = props;
  console.log(content)
  const { file, name, discipline, teacherId, categoryId, id, fileName, index } = content;
  const history = useHistory();

  return (
    <Container href={file} target="_blank">
            <div>
            <div className="link-title">{`${categoryId} ${name}`}</div>
            <div className="link-description">{fileName}</div>
            </div>
            <div>
                <div className="link-title">{discipline}</div>
                <div className="link-description">{`${teacherId} ${index}`}</div>
            </div>
    </Container>
  );
}

const Container = styled.a`
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 90%;
    border: 1px solid black;
    border-radius: 8px;
    padding: 20px;
    text-decoration: none;
    color: black;
    margin-top: 40px;

  .link-title {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    margin-top: 10px;
  }
  .link-description {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    margin-top: 10px;
    flex-wrap: wrap;
    word-wrap: break-word;
  }
`