import Dexie from 'dexie'
import { Album } from "./album"
import { Track } from "./track"

export const db = new Dexie('catalogDb')

function toDexieVersion(str) {
  let ss = str.split('.')
  let v = 0
  let f = 1
  for (let s of ss) {
    let n = +s
    if (n >= 100) {
      console.warn("Dexie version doesn't support numbers beyond 100")
      n = 99
    }
    v += n * f
    f /= 100
  }
  return v
}

db.version(toDexieVersion('1.0.0')).stores({
  albums: 'id, title, author, coverArtUrl, additionalDatas, trackIds',
  tracks: 'id, title, trackUrl, albumId, credits, genres, lyrics'
})

function defaultDexieStoreAdapter(obj) {
  return obj
}

function defaultDexieRestoreAdapter(obj, dexieObject) {
  if (!dexieObject) return obj

  for( let prop in obj) {
    if (dexieObject[prop] === undefined) continue

    obj[prop] = dexieObject[prop]
  }
  return obj
}

export function storeAlbum(album) {
  db.albums.put(defaultDexieStoreAdapter(album))
}

export async function restoreAlbum(id) {
  let dAlbum = await db.albums.where('id').equals(id).first();
  if (!dAlbum) return null
  return defaultDexieRestoreAdapter(new Album(), dAlbum)
}

export function storeTrack(track) {
  db.tracks.put(defaultDexieStoreAdapter(track))
}

export async function restoreTrack(id) {
  let dTrack = await db.tracks.where('id').equals(id).first();
  if (!dTrack) return null
  return defaultDexieRestoreAdapter(new Track(), dTrack)
}