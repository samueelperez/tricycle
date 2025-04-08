import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;

export default Layout; 