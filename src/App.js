
import { createType, interfaceRegistry, FunctionMetadata } from '@polkadot/api';
import extrinsics from '@polkadot/api-metadata/extrinsics/static';
import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Grid, Button, Menu } from 'semantic-ui-react/dist/commonjs';

function App() {
  const [method, setMethod] = useState();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [section, setSection] = useState(['system', extrinsics['system']]);
  
  // useEffect(() => {

  // }, [section])

  const zoomSection = (sectionIndex, sectionName) => {
    console.log('zoom section => ', extrinsics[sectionName])
    setActiveSectionIndex(sectionIndex);
    setSection([sectionName, extrinsics[sectionName]]);
  }

  const zoomMethod = (extrinsicFn) => {
    console.log('zoom method => ', extrinsicFn);
    setMethod(extrinsicFn);
  }

  const renderSections = () => {
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
    )
  }

  const renderMethods = () => {
    const sectionMethods = section[1];
    console.log('section methods => ', sectionMethods);
    return (
      <Grid.Column width='5'>
        <Header>Methods for: </Header><p>{section[0]}</p>
        <Menu vertical>
        {
          Object.keys(sectionMethods).map((v, i) => {
            
            return (
              <Menu.Item key={i}><Button onClick={() => zoomMethod(sectionMethods[v])}>{v}</Button></Menu.Item>
            )
          })
        }
        </Menu>
      </Grid.Column>
    )
  }

  const renderCallDetails = () => {
    return (
      <Grid.Column width='5'>
        <Header>Call Definitions for:</Header>
      </Grid.Column>
    )
  }

  return (
    <Container>
      <Grid width='15'>
        <Divider />
        <Grid.Row><Header>How To SCALE</Header></Grid.Row>
        <Divider />
        <Grid.Row>
          {renderSections()}
          {renderMethods()}
          {renderCallDetails()}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
