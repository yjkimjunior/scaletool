

import extrinsics from '@polkadot/api-metadata/extrinsics/static';
import React from 'react';
import { Button, Grid, Header, Menu } from 'semantic-ui-react';

export function Sections (props) {
  const { activeSectionIndex, zoomSection } = props;

  return (
    <Grid.Column width='5'>
      <Header>Extrinsic Section</Header>
      <Menu activeIndex={activeSectionIndex} vertical>
        {
          Object.keys(extrinsics).map((v, i) => {
            return (
              <Menu.Item> {i}. <Button onClick={() => zoomSection(i, v)}>{v}</Button></Menu.Item>
            )
          })
        }
      </Menu>
    </Grid.Column>
  );
}