import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../slice/index';
import { colors } from './atom/color';

const LogItemNameStyle = styled.p`
  margin: 0;
  font-size: 1.2rem;
  overflow: hidden;
`;

const LogItemTextStyle = styled.p`
  margin: 0;
  font-size: 1.7rem;
  color: ${colors.item};
`;

const LogItemDateStyle = styled.p`
  margin: 0;
  text-align: end;
`;
const LogItemStyle = styled.div`
  margin: 1.5rem;
  font-weight: bold;

  & > div {
    padding: 0.5rem;
    border-radius: 1.5rem;
    border: 0.2rem solid ${colors.side};
  }
`;

const LogItem: React.FC<{
  name: string;
  text: string;
  date: string;
}> = ({ name, text, date }) => (
  <LogItemStyle>
    <div>
      <LogItemNameStyle>{name}</LogItemNameStyle>
      <LogItemTextStyle>{text}</LogItemTextStyle>
    </div>
    <LogItemDateStyle>{date}</LogItemDateStyle>
  </LogItemStyle>
);

const LogHistoryStyle = styled.div<{ hasLog: boolean }>`
  height: 100%;
  display: block;
  overflow-y: scroll;
  flex: 1;
  background-color: ${({ hasLog }) =>
    hasLog ? colors.white : `${colors.backItem}`};
`;

const NoLog = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '3rem',
      fontWeight: 'bold',
      height: '100%',
    }}
  >
    <p>
      Log <br /> Empty
    </p>
  </div>
);

export const LogHistory: React.SFC = () => {
  const logs = useSelector((state: RootState) => state.logHistory).logs;
  const users = useSelector((state: RootState) => state.user).users;
  return (
    <LogHistoryStyle hasLog={logs.length > 0}>
      {logs.length > 0 ? (
        logs.map((log, i) => (
          <LogItem
            key={i}
            name={users[log.user]}
            text={log.text}
            date={log.date}
          />
        ))
      ) : (
        <NoLog />
      )}
    </LogHistoryStyle>
  );
};
