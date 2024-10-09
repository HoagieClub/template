'use client';

import { useState } from 'react';
import { Text, Heading, Pane, majorScale, Spinner, Button, Alert } from 'evergreen-ui';
import { toast } from 'sonner';
import View from '@/components/View';

const updateCountAPI = async (value: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.5) throw new Error('Update failed');
  return value;
};

export default function SimpleCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateCount = async (delta: number) => {
    setLoading(true);
    try {
      const newCount = count + delta;
      const result = await updateCountAPI(newCount);
      setCount(result);
      toast.success('Counter updated', {
        description: `New count is ${result}`,
      });
    } catch (error) {
      toast.error('Update failed', {
        description: 'Could not update the counter. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Pane marginBottom={majorScale(4)}>
        <Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
          Counter
        </Heading>
        <Text size={500}>Count:</Text>
        <Heading size={800} marginTop={majorScale(2)} display='flex' alignItems='center'>
          {count}
          {loading && <Spinner size={24} marginLeft={majorScale(2)} />}
        </Heading>
      </Pane>

      <Pane>
        <Button
          size='large'
          appearance='primary'
          onClick={() => updateCount(1)}
          marginRight={majorScale(2)}
          disabled={loading}
        >
          Increment
        </Button>
        <Button size='large' intent='danger' onClick={() => updateCount(-1)} disabled={loading}>
          Decrement
        </Button>
      </Pane>

      <Pane marginTop={majorScale(4)}>
        <Alert intent='info' title='Info'>
          The counter has a <strong>50% chance of failure</strong> to demonstrate error handling.
          Please try again if the update fails.
        </Alert>
      </Pane>
    </View>
  );
}
