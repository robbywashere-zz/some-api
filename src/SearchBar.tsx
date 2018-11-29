import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
export const SearchBar = styled.div`
  height: 5rem;
  line-height: 5rem;
  position: relative;
  top: 0;
  background: #353535;
  vertical-align: middle;
  padding-left: 3rem;
  * {
    margin-right: 1rem;
  }
`;
export interface SearchInputProps {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
export const SearchInput = styled<React.SFC<SearchInputProps>>(props => (
  <input placeholder="some search term" type="text" {...props} />
))`
  width: 24rem;
  max-width: 50%;
  background: #252525;
  font-size: 1.25rem;
  color: #fff;
  border: 0;
  padding: 0.75rem;
  @media (max-width: 700px) {
    width: 8rem;
  }
  @media (min-width: 900px) {
    width: 36rem;
  }
`;
export const SearchSubmit = styled(Button)`
  &:after {
    content: "Search";
  }
  @media (max-width: 1000px) {
    width: 4rem;
    &:after {
      content: "🔎";
    }
  }
`;
export const SearchSelect = styled<React.SFC<SearchSelectProps>>(
  ({ options, ...props }) => (
    <select {...props}>
      {options.map(({ value, label }: { value: string; label: string }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
)`
  -moz-appearance: none;
  background: #252525;
  width: 12rem;
  font-size: 1.25rem;
  color: #fff;
  border: 0;
  height: 3rem;
  border: 0;

  @media (max-width: 500px) {
    width: 8rem;
  }
`;
export interface SearchSelectProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any;
}
export const Main = styled(props => <div {...props} />)`
  background: #e8e7e7;
  padding: 3rem;
  padding-top: 0;
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
`;
