import { Call, ClassOf, createType, GenericCall, getTypeDef } from '@polkadot/types';
import React, { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';

export function CallDetails (props) {
  const { method } = props;
  const [params, setParams] = useState();
  const [typeDefs, setTypeDefs] = useState({})

  useEffect(() => {
    method && setParams(getParams(method))
    console.log('method => ', method);
  }, [method]);

  useEffect(() => {
    if (params) {      
      params.map(param => {
        console.log('type def  => ', getTypeDef(param.type.type, param.type.name));

        setTypeDefs({
          ...typeDefs,
          [param.type.type]: getTypeDef(param.type.type, param.type.name)
        })
      });
    }
  }, [])

  const getParams = (methodfn) => {
    return GenericCall.filterOrigin(methodfn.meta).map((arg) => ({
      name: arg.name.toString(),
      type: getTypeDef(arg.type.toString())
    }));
  };

  return (
    <Grid.Column width='5'>
      <Header>Call Definitions for: </Header> { method && method.meta.name }
      <Header>Documentation: </Header> { method && method.meta.docs }
      <Header>Params: </Header> 
      {
        params && params.map(param => {
          return (
            <ul>
              <li>Name: {param.name}</li>
              <li>Type: {param.type.type}</li>
              
            </ul>
          )
        })
      }
    </Grid.Column>
  );
} {/* <li>Type Def: {typeDefs[param.type.type].info.toU8a()} </li> */ }