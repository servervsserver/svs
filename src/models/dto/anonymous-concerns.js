import { firestoreTimestampToDate } from "./timestamp"

export class AnonymousConcernsTicket {

  constructor(message, answer, id, date) {

    this.message = message
    this.answer = answer || null
    this.id = id
    this.date = date || new Date()

  }

  static fromFirestoreDoc(doc) {
    if (!doc) return null
    let data = doc.data()
    return new AnonymousConcernsTicket(
      data.message,
      data.answer,
      doc.id,
      firestoreTimestampToDate(data.date)
    )
  }
}
