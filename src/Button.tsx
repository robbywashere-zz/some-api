import styled, { StyledComponent } from "styled-components";

export const Button = styled.button`
  width: 12rem;
  text-align: center;
  padding: 0.75rem;
  color: #fff;
  background: ${p => p.color};
  border: 0;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
`;
export const Link = styled(Button).attrs({ as: "a" })`
  text-decoration: none;
` as StyledComponent<"a", any, {}, never>;
