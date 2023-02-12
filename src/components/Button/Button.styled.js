import styled from 'styled-components';

export const LoadMoreBtn = styled.button`
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 8%,
    rgba(238, 198, 206, 1) 98%
  );
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 20px;
  margin: 20px auto;
  padding: 15px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;
