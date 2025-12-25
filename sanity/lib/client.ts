import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: 'published',
})

export const draftClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  perspective: 'raw',
  // Token is only available server-side, so this client won't work in browser
  // Use API route instead for client components
  token: typeof window === 'undefined' ? process.env.SANITY_API_READ_TOKEN : undefined,
  ignoreBrowserTokenWarning: true,
})