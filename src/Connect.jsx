
import uiSettings from '@polkadot/ui-settings';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

let nodeOptions = [];
let prefixOptions = [];

uiSettings.availableNodes.forEach(availNode => {
  nodeOptions.push({
    key: availNode.value,
    value: availNode.value,
    text: availNode.text
  });
});

uiSettings.availablePrefixes.forEach(prefix => {
  prefixOptions.push({
    key: prefix.value,
    value: prefix.value,
    text: prefix.text
  });
});

export function Connect(props) {
  const onChangeChain = (event, data) => {
    const wsUrl = data.value;
    uiSettings.set({ apiUrl: wsUrl });

    window.location.reload();
  }

  return (
    <Dropdown
      defaultValue={nodeOptions[0]}
      floating
      help={'Connect to some chain you want explore the metadata for.'}
      label={'Fetch Metadata'}
      onChange={onChangeChain}
      options={nodeOptions}
      text={uiSettings.get().apiUrl}
    />
  )
}