import extrinsics from '@polkadot/api-metadata/extrinsics/static';
import React from 'react';
import { Button, Grid, Header, Menu } from 'semantic-ui-react';

export function Methods (props) {
  const { section, zoomMethod } = props;

  return (
    <Grid.Column width='5'>
      <Header>Methods for: </Header><p>{section[0]}</p>
      <Menu vertical>
        {
          Object.keys(section[1]).map((v, i) => {

            return (
              <Menu.Item key={i}><Button onClick={() => zoomMethod(section[1][v.toString()])}>{v}</Button></Menu.Item>
            )
          })
        }
      </Menu>
    </Grid.Column>
  )
}