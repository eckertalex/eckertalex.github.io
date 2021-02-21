import {getTopTracks} from '@/lib/spotify'

export default async function fetchTopTracks(_, res) {
  const {parsedBody} = await getTopTracks()
  const tracks = parsedBody.slice(0, 10).map((track) => ({
    artist: track.artists.map((artist) => artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json(tracks)
}
