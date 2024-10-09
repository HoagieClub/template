'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pane,
  majorScale,
  minorScale,
  Heading,
  Spinner,
  CodeIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  Button,
} from 'evergreen-ui';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import AuthButton from '@/lib/hoagie-ui/AuthButton';

export default function Index() {
  const { user, error, isLoading } = useUser();
  let Profile;
  if (isLoading) Profile = <Spinner />;
  else if (error) Profile = <div>{error.message}</div>;
  else if (user) {
    Profile = (
      <Pane>
        <Link href='/feature1'>
          <Button
            height={56}
            width={majorScale(35)}
            appearance='primary'
            marginBottom={20}
            iconBefore={ArrowRightIcon}
          >
            Call to Action
          </Button>
        </Link>
        <br />
        <AuthButton variant='logout' />
      </Pane>
    );
  } else Profile = <AuthButton />;

  return (
    <Pane
      display='flex'
      justifyContent='center'
      alignItems='center'
      marginX={majorScale(1)}
      paddingBottom={majorScale(4)}
      paddingTop={majorScale(8)}
    >
      <Pane
        borderRadius={8}
        textAlign='center'
        elevation={1}
        background='white'
        marginX={20}
        maxWidth='600px'
        width='100%'
        paddingX='10px'
        paddingTop={majorScale(5)}
        paddingBottom={majorScale(7)}
      >
        <CodeIcon size={48} color='gray800' />
        <Heading size={900} className='hoagie'>
          Hoagie Template App
          <br />
          The next <b>big</b> thing.
        </Heading>
        <p>Build something people want.</p>
        <div>
          <Pane display='flex' flexDirection='column' alignItems='center' marginTop='30px'>
            {Profile}
            <Link href='https://hoagie.io'>
              <Button
                height={56}
                width={majorScale(35)}
                appearance='default'
                marginTop={20}
                iconBefore={ArrowLeftIcon}
              >
                <Pane display='flex'>
                  Back to
                  <Pane marginLeft={minorScale(1)} className='hoagie'>
                    hoagie<b>platform</b>
                  </Pane>
                </Pane>
              </Button>
            </Link>
            <br />
          </Pane>
        </div>
      </Pane>
    </Pane>
  );
}
