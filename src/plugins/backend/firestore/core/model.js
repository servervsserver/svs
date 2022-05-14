import { fromFirestore, toFirestore } from "./utils"

export class Model {
  toFirestore() {
    return toFirestore(this)
  }
  
  fromFirestore(firestoreObject) {
    return fromFirestore(this, firestoreObject)
  }
}