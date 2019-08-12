
import '@polkadot/types/injector';

import { Call, GenericCall, TypeRegistry } from '@polkadot/types';
import storageFromMeta from '@polkadot/api-metadata/storage/fromMetadata';
import extrinsicsFromMeta from '@polkadot/api-metadata/extrinsics/fromMetadata';
import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Grid } from 'semantic-ui-react/dist/commonjs';

import { CallDetails } from './CallDetails.jsx';
import { Constants } from './Constants.jsx';
import { Methods } from './Methods.jsx';
import { Sections } from './Sections.jsx';

import json from '@polkadot/types/Metadata/static';
import { ClassOf, Metadata } from '@polkadot/types'
const metadata = new Metadata(json);
const extrinsics = extrinsicsFromMeta(metadata);
const storage = storageFromMeta(metadata);

function App() {
  const [method, setMethod] = useState();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [section, setSection] = useState(['balances', extrinsics['balances']]);
    
  useEffect(() => {
    GenericCall.injectMethods(extrinsics);
  }, []);

  const zoomSection = (sectionIndex, sectionName) => {
    console.log('zoom section => ', extrinsics[sectionName])
    setActiveSectionIndex(sectionIndex);
    setSection([sectionName, extrinsics[sectionName]]);
  }

  const zoomMethod = (extrinsicFn) => {
    console.log('zoom method meta => ', extrinsicFn.meta);
    setMethod(() => extrinsicFn);
  }

  return (
    <Container>
      <Grid width='15'>
        <Divider />
        <Grid.Row><Header>How To SCALE</Header></Grid.Row>
        <Divider />
        <Grid.Row><Header>Extrinsics</Header></Grid.Row>
        <Divider />
        <Grid.Row>
          <Sections activeSectionIndex={activeSectionIndex} zoomSection={zoomSection} />
          <Methods section={section} zoomMethod={zoomMethod} />
          <CallDetails method={method} />
        </Grid.Row>
        <Divider />
        <Grid.Row><Header> Chain Constants </Header></Grid.Row>
        <Divider />
        <Grid.Row><Constants /></Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
