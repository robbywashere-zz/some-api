import React from "react";
import styled from "styled-components";
import { Link } from "./Button";
export const Card = styled<React.SFC<CardProps>>(
  ({ img, body, url, title, ...props }) => (
    <div {...props}>
      <CardImage img={img} />
      <CardBody>
        <CardContent title={title} body={body} />
        <Link color="#252525" href={url}>
          Read More
        </Link>
      </CardBody>
    </div>
  )
)`
  background: #fff;
  display: flex;
  flex-direction: column;
`;
export const CardList = styled(({ children, ...props }) => (
  <div {...props}>{children}</div>
))`
  text-align: center;
  display: grid;
  padding-top: 3rem;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const CardImage = styled(({ img, ...props }) => <div {...props} />)`
  background-image: url("${p => p.img}");
  background-size: cover;
  height: 300px;
`;
export const CardTitle = styled(props => <h2 {...props} />)`
  padding: 0;
  margin: 0;
`;
export const CardContent = styled(({ title, body, ...props }) => (
  <div {...props}>
    <CardTitle>{title}</CardTitle>
    <p>{body}</p>
  </div>
))``;
export const CardBody = styled.div`
  text-align: left;
  padding: 3rem 3rem 3rem 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export interface CardProps {
  title: string;
  img: string;
  body: string;
  url: string;
}
