import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { CreateUser } from './create-user';
import { Side } from './side';
import { selectUser } from '../slice/user-slice';

const MainContent = styled.div``;

const Content = styled.div`
  display: flex;
  min-height: 100%;

  ${MainContent} {
    flex: 1;
  }
`;

const AppRouterContent = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export const App = () => {
  const selfUser = useSelector(selectUser);
  if (selfUser === null) {
    return <CreateUser />;
  }
  return (
    <Router>
      <Content>
        <MainContent>
          <AppRouterContent />
        </MainContent>
        <Side />
      </Content>
    </Router>
  );
};
