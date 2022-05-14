/**
 * Utility functions for the custom types that are so they can be mangled by firestore
 * @param {*} customObject 
 */
export function toFirestore(customObject) {
    let res = {}
    for (let key of Object.keys(customObject)) {
        res[key] = customObject[key]
    }
    return res
}

/**
 * utility functions that refills a custom object from the properties of a plain object
 * @param {*} customObject 
 * @param {*} firestoreObject 
 */
export function fromFirestore(customObject,firestoreObject)  {
    for (let key of Object.keys(firestoreObject)) {
        customObject[key] = firestoreObject[key]
    }
    return customObject
}