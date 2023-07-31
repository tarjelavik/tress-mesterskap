import { createClient, type SanityClient } from 'next-sanity'
import { cache } from 'react'

export function getClient(preview?: { token?: string }): SanityClient {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2023-06-20',
    useCdn: true,
    perspective: 'published',
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getCachedClient = (preview?: { token?: string }) => {
  const client = getClient(preview);

  return cache(client.fetch.bind(client));
};