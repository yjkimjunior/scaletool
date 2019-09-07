import React, { useEffect, useState } from 'react';
import { Grid, Header, Menu } from 'semantic-ui-react';

export function Storage (props) {
  const [storage, setStorage] = useState();
  const [section, setSection] = useState('balances');
  const [method, setMethod] = useState();

  useEffect(() => {
    const { storage } = props;
    
    if (storage && section && method) {
      console.log(storage[section][method].meta);
    }

    setStorage(storage)
  }, [props]);

  const setStorageSection = ({ target: { text } }) => {
    setSection(text);
  }

  const setStorageValue = ({ target: { text } }) => {
    setMethod(text);
  }

  return (
    <React.Fragment>
      <Grid.Column width='5'>
        <Menu vertical>
          <Menu.Header><Header>Sections</Header></Menu.Header>
          {
            storage && Object.keys(storage).map((v, i) => {
              return <Menu.Item key={i} onClick={setStorageSection}>{v}</Menu.Item>
            })
          }
        </Menu>
      </Grid.Column>
      <Grid.Column width='5'>
          <Menu vertical>
            {
              storage && Object.keys(storage[section]).map((v, i) => {
                return <Menu.Item key={i} onClick={setStorageValue}>{v}</Menu.Item>
              })
            }
          </Menu>
      </Grid.Column>
      {
        storage && section && method && storage[section][method] && storage[section][method].meta &&
          <Grid.Column width='5'>
            <Header>Selected Storage Item: </Header>{storage[section][method].meta.name.toString()}
            <Header>Documentation: </Header>{storage[section][method].meta.documentation.toString()}
            <Header>Type: </Header>{storage[section][method].meta.type.toString()}
          </Grid.Column>
        }
    </React.Fragment>
  )
}

