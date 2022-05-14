import { fromFirestore, toFirestore } from "./utils"

export class Model {
  toFirestore() {
    return toFirestore(this)
  }
  
  fromFirestore(firestoreObject) {
    return fromFirestore(this, firestoreObject)
  }
}

export function dateFromFirestoreTimestamp(firestoreTimestamp) {
  
  if (!firestoreTimestamp) 
    return null

  if (firestoreTimestamp === 'number') 
    return new Date(firestoreTimestamp)

  if (firestoreTimestamp.seconds)
    return new Date(firestoreTimestamp.seconds * 1000)

  return null
}