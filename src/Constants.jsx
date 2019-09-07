import '@polkadot/types/injector';

import React, { useEffect, useState } from 'react';
import { Grid, Header, Menu } from 'semantic-ui-react';

export function Constants (props) {
  const [constants, setConstants] = useState();
  const [myConst, setMyConst] = useState();
  const [section, setSection] = useState('balances');

  useEffect(() => {
    const { constants } = props;

    setConstants(constants)
  }, [props]);

  const setConstSection = ({ target: { text } }) => {
    setSection(text);
  }

  const setConst = ({ target: { text } }) => {
    setMyConst(text);
  }

  return (
    <React.Fragment>
      <Grid.Column width='5'>
        <Menu vertical>
          <Menu.Header><Header>Sections</Header></Menu.Header>
          {
            constants && Object.keys(constants).map((v, i) => {
              return <Menu.Item key={i} onClick={setConstSection}>{v}</Menu.Item>
            })
          }
        </Menu>
      </Grid.Column>
      <Grid.Column width='5'>
          <Menu vertical>
            {
              constants && Object.keys(constants[section]).map((v, i) => {
                return <Menu.Item key={i} onClick={setConst}>{v}</Menu.Item>
              })
            }
          </Menu>
      </Grid.Column>
      {
          constants && section && myConst && constants[section][myConst] &&
          <Grid.Column width='5'>
            <Header>Selected Constant: </Header>{constants[section][myConst].meta.name}
            <Header>Documentation: </Header>{constants[section][myConst].meta.documentation}
            <Header>Type: </Header>{constants[section][myConst].meta.type}
          <Header>Value: </Header>{constants[section][myConst].meta.value}
          </Grid.Column>
      }
    </React.Fragment>
  )
}