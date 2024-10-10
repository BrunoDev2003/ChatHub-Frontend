import ChatApp from "./ChatApp";
import styled from "styled-components";

export const Container = styled.div`
    align-items: center;
    background-color: #f0f0f0;
    display:flex;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-start;

`;

export const MainContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
`;

export const ContentArea = styled.div`
    flex: 1;
    padding: 16px;
    background-color: #fff;
`;