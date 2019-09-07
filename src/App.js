
import '@polkadot/types/injector';

import { WsProvider, ApiPromise } from '@polkadot/api';
import constsFromMeta from '@polkadot/api-metadata/consts/fromMetadata';
import extrinsicsFromMeta from '@polkadot/api-metadata/extrinsics/fromMetadata';
import storageFromMeta from '@polkadot/api-metadata/storage/fromMetadata';
import uiSettings from '@polkadot/ui-settings';
import { GenericCall, Metadata } from '@polkadot/types';
import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Grid, Loader } from 'semantic-ui-react';

import { CallDetails } from './CallDetails.jsx';
import { Connect } from './Connect.jsx';
import { Constants } from './Constants.jsx';
import { Methods } from './Methods.jsx';
import { Sections } from './Sections.jsx';

function App() {
  const [constants, setConstants] = useState();
  const [extrinsics, setExtrinsics] = useState();
  const [metadata, setMetadata] = useState();
  const [method, setMethod] = useState();
  const [storage, setStorage] = useState();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [section, setSection] = useState();
    
  useEffect(() => {
    handleSetMetadata();
  }, []);

  const handleSetMetadata = async () => {
    const provider = new WsProvider(uiSettings.get().apiUrl);
    const api = await ApiPromise.create({ provider });
    const metaJson = await api.rpc.state.getMetadata();

    const metadata = new Metadata(metaJson);
    const consts = constsFromMeta(metadata);
    const extrinsics = extrinsicsFromMeta(metadata);
    const storage = storageFromMeta(metadata);

    GenericCall.injectMethods(extrinsics);

    setMetadata(metadata);
    setConstants(consts);
    setExtrinsics(extrinsics);
    setSection('balances', extrinsics['balances']);
    setStorage(storage);
  }

  const zoomSection = (sectionIndex, sectionName) => {
    setActiveSectionIndex(sectionIndex);
    setSection([sectionName, extrinsics[sectionName]]);
  }

  const zoomMethod = (extrinsicFn) => {
    setMethod(() => extrinsicFn);
  }

  return (
    <Container>
      <Grid width='15'>
        <Divider />
        <Grid.Row><Header>How To SCALE</Header></Grid.Row>
        <Grid.Row>
          By default this will use the latest metadata from Substrate.
          To explore some other chain's metadata, enter the the hosted node url below:
        </Grid.Row>
        <Connect />
        <Divider />
        {
          metadata
            ? (
              <React.Fragment>
                  <Grid.Row>
                    <Header>Extrinsics</Header>
                  </Grid.Row>
                  <Divider />
                  <Grid.Row>
                    <Grid.Column width='5'>
                      <Sections
                        activeSectionIndex={activeSectionIndex}
                        zoomSection={zoomSection} />
                    </Grid.Column>
                    <Grid.Column width='5'>
                      { section
                          ? <Methods section={section} zoomMethod={zoomMethod} />
                          : <Header>Select a module section to view its available methods. </Header>
                      }
                    </Grid.Column>
                    <Grid.Column width='5'><CallDetails method={method} /></Grid.Column>
                  </Grid.Row>
                  <Divider />
                  <Grid.Row>
                    <Header> Chain Constants </Header>
                  </Grid.Row>
                  <Divider />
                  <Grid.Row> <Constants constants={constants} /> </Grid.Row>
                  
              </React.Fragment>
            )
            : <Grid.Row>
              <Loader active inline />
              <Header> Fetching metadata from node ...{uiSettings.get().apiUrl} </Header>
            </Grid.Row>
        }
      </Grid>
    </Container>
  );
}

export default App;
