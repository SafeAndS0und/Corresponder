import webRTC from './index'


export default {


  call(whom){
    navigator.mediaDevices.getUserMedia({
      audio: true, video: true
    })
      .then(mediaStream =>{
        console.log('I got the mediaDevice object, calling ', whom)
        const call = webRTC.clientPeer.call(whom, mediaStream)

        call.on('stream', stream =>{
          console.log('We are connected, starting to streaming')

          const video = document.querySelector('video');
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })

      })
      .catch(err => console.log(err))
  },

  answer(){

    webRTC.clientPeer.on('call', call =>{
      console.log('I got a call, asking for mediaStream')
      navigator.mediaDevices.getUserMedia({
        audio: true, video: true
      })
        .then(mediaStream =>{
          console.log('Got mediaStream, answering')
          call.answer(mediaStream)

          call.on('stream', stream =>{
            console.log('We are connected, starting to streaming')

            const video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
              video.play();
            };
          })

        })
        .catch(err => console.log(err))
    })
  }
}
