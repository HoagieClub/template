'use client';

import React, { useState, ChangeEvent } from 'react';
import {
  Pane,
  Heading,
  Text,
  Button,
  TextInputField,
  SelectField,
  Alert,
  Spinner,
  majorScale,
} from 'evergreen-ui';
import { toast } from 'sonner';

export default function SimpleEvergreenTemplate() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [formError, setFormError] = useState('');

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return false;
    }
    if (!selectedOption) {
      setFormError('Please select an option.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Form submitted successfully!', {
        description: `Name: ${name}, Option: ${selectedOption}`,
        action: {
          label: 'Undo',
          onClick: () => {
            setName('');
            setSelectedOption('');
            toast.info('Form submission undone.');
          },
        },
      });
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedOption(e.target.value);

  return (
    <Pane
      maxWidth={majorScale(50)}
      marginX='auto'
      padding={majorScale(2)}
      marginTop={majorScale(8)}
    >
      <Heading size={700} marginBottom={majorScale(2)}>
        Simple Component
      </Heading>

      <TextInputField
        label='Name'
        value={name}
        onChange={handleNameChange}
        marginBottom={majorScale(2)}
        isInvalid={!!formError && !name.trim()}
      />

      <SelectField
        label='Choose an option'
        value={selectedOption}
        onChange={handleOptionChange}
        marginBottom={majorScale(2)}
      >
        <option value='' disabled>
          Choose an option...
        </option>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </SelectField>

      {formError && <Alert intent='danger' title={formError} marginBottom={majorScale(2)} />}

      <Button
        appearance='primary'
        onClick={handleSubmit}
        width='100%'
        marginBottom={majorScale(2)}
        disabled={loading}
      >
        {loading ? <Spinner size={16} /> : 'Submit'}
      </Button>

      <Alert intent='info' title='This is an informational alert.' marginBottom={majorScale(2)} />

      <Text>This is a simple template using Evergreen UI components.</Text>
    </Pane>
  );
}
