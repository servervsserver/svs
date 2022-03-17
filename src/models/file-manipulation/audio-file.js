export function getAudioFileDuration(file) {

  let promise = new Promise((resolve, reject) => {
    if (!file) {
      reject()
      return
    }

    let reader = new FileReader()

    reader.onload = function(event) {
      let audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target.result, function(buffer) {
        var duration = buffer.duration;

        resolve(duration)
      })
    }
    reader.onerror = function(event) {
      console.error("An error ocurred reading the file: ", event)
      reject()
    }

    reader.readAsArrayBuffer(file)
  })

  return promise
}
