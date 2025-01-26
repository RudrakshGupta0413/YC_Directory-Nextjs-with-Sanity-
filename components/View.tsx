'use client';  // This tells Next.js that this is a client component

import React, { useEffect, useState } from 'react';
import Ping from './Ping';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      const { views } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });
      setTotalViews(views);

      // Call the API route to update the views
      await fetch('/api/updateViews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, views })
      });
    };

    fetchViews();
  }, [id]);

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>Views: {totalViews}</span>
      </p>
    </div>
  );
};
