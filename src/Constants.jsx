import '@polkadot/types/injector';

import { ClassOf, Metadata } from '@polkadot/types'
import constantsFromMeta from '@polkadot/api-metadata/consts/fromMetadata';
import json from '@polkadot/types/Metadata/static';

import React, { useEffect, useState } from 'react';
import { Grid, Header, Menu } from 'semantic-ui-react';
// Use the pre-generated metadata
const metadata = new Metadata(json);
const consts = constantsFromMeta(metadata);

export function Constants () {
  const [myConst, setMyConst] = useState();
  const [section, setSection] = useState('balances');

  useEffect(() => {
    section && myConst && console.log(consts[section][myConst]);
  }, [myConst]);

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
            Object.keys(consts).map((v, i) => {
              return <Menu.Item key={i} onClick={setConstSection}>{v}</Menu.Item>
            })
          }
        </Menu>
      </Grid.Column>
      <Grid.Column width='5'>
          <Menu vertical>
            {
              Object.keys(consts[section]).map((v, i) => {
                return <Menu.Item key={i} onClick={setConst}>{v}</Menu.Item>
              })
            }
          </Menu>
      </Grid.Column>
      {
          section && myConst && consts[section][myConst] &&
          <Grid.Column width='5'>
            <Header>Selected Constant: </Header>{consts[section][myConst].meta.name}
            <Header>Documentation: </Header>{consts[section][myConst].meta.documentation}
            <Header>Type: </Header>{consts[section][myConst].meta.type}
          <Header>Value: </Header>{consts[section][myConst].meta.value}
          </Grid.Column>
      }
    </React.Fragment>
  )
}