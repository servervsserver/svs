export function firestoreTimestampToDate(timestamp) {
  if (!timestamp) return null
  return new Date(timestamp.seconds * 1000)
}
