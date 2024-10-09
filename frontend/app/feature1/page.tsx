'use client';

import { useState } from 'react';
import { RadioGroup, Text, Heading, Pane, majorScale, Spinner, Button, Alert } from 'evergreen-ui';
import Link from 'next/link';
import { useMockableUser, withMockablePageAuthRequired } from '@/mock/User';
import View from '@/components/View';

export default withMockablePageAuthRequired(() => {
  const { user, isLoading } = useMockableUser();
  if (isLoading) {
    return <Spinner />;
  }

  const option1 = (
    <Pane>
      <Text size={500}>
        <b>Documentation</b>
        <br />
      </Text>
      <Text size={400}>
        Exceptional software engineers <b>devour</b> documentation. Read the Hoagie docs!
      </Text>
    </Pane>
  );
  const option2 = (
    <Pane>
      <Text size={500}>
        <b>UI Library</b>
        <br />
      </Text>
      <Text size={400}>
        Our UI Design is mainly powered by the <b>Evergreen</b> library.
      </Text>
    </Pane>
  );
  const option3 = (
    <Pane>
      <Text size={500}>
        <b>Components Library</b>
        <br />
      </Text>
      <Text size={400}>
        Complementary to Evergreen, we use the <b>ShadCN</b> library to compose beautiful components.
      </Text>
    </Pane>
  );

  const [options] = useState([
    { label: option1, value: 'docs' },
    { label: option2, value: 'ui' },
    { label: option3, value: 'components' },
  ]);
  const [optionValue, setOptionValue] = useState('docs');

  const getNextUrl = () => {
    switch (optionValue) {
      case 'docs':
        return 'https://princetonuniversity-41.mintlify.app/';
      case 'ui':
        return 'https://evergreen.segment.com/foundations';
      case 'components':
        return 'https://ui.shadcn.com/';
      default:
        return '/';
    }
  };

  const bottomButtons = (
    <Pane>
      <Link href={getNextUrl()} target="_blank">
        <Button size='large' appearance='primary' float='right'>
          Learn More
        </Button>
      </Link>
      <Link href='/'>
        <Button size='large' float='left'>
          Back
        </Button>
      </Link>
    </Pane>
  );

  const SelectForm = (
    <Pane marginBottom={majorScale(4)}>
      <Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
        Hi, {user.name}
      </Heading>
      <Text size={500}>Welcome to the template app! Here are some resources to get started:</Text>
      <RadioGroup
        size={16}
        value={optionValue}
        options={options}
        isRequired
        marginTop={majorScale(3)}
        onChange={(event) => setOptionValue(event.target.value)}
      />
    </Pane>
  );

  return (
    <View>
      {SelectForm}
      <Pane marginBottom={32}>
        <Alert intent='warning' title='NOTE!' marginTop={24}>
          This is a template app. You are encouraged to change things and play around with it!
        </Alert>
      </Pane>
      {bottomButtons}
    </View>
  );
});