/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormButtons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  justify-content: flex-end;
  margin-top: 2rem;
`;

function FormButtons({ children }) {
  return <StyledFormButtons>{children}</StyledFormButtons>;
}

export default FormButtons;
