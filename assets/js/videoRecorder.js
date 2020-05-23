const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    // console.log(event);
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};
const stopRecording = () => {
    videoRecorder.stop();
    streamObject.getAudioTracks()[0].stop();    // 녹화 이후 오디오 종료.
    streamObject.getVideoTracks()[0].stop();    // 녹화 이후 카메라 종료.
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    // setTimeout(() => videoRecorder.stop(), 5000);
    recordBtn.addEventListener("click", stopRecording);
};


const getVideo = async() => {
    try{ // user가 media 접근권한을 결정할때까지 기다리기 위해서 await 사용.
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{ width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML = " ☹️ Cant record ";
    }finally{
        recordBtn.removeEventListener("click", getVideo);
    }
};

function init(){
    recordBtn.addEventListener("click", getVideo);
};

if(recorderContainer){
    init();
};