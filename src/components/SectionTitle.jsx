import React from 'react';
import styled from 'styled-components';

const SectionTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const StyledTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export default SectionTitle; 