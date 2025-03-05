import React from 'react';
import styled from 'styled-components';

const SectionTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const StyledTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, 
      ${({ theme }) => theme.colors.secondary || '#555'}, 
      ${({ theme }) => theme.colors.primary}40);
    border-radius: 4px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 12px;
    
    &:after {
      width: 60px;
      height: 3px;
    }
  }
`;

export default SectionTitle; 