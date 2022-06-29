let video=document.querySelector("#video");
document.querySelector("#grabar").addEventListener("click", function(ev){
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
.then(record).catch(err =>console.log(err));

})



let chunks=[];


function record (stream){
    video.srcObject= stream;

    let options={
        mimeType:'video/webm;codecs=h264'
    };

    if (!MediaRecorder.isTypeSupported('video/webm;codecs=h264')){
        options={
            mimeType:'video/webm;codecs=vp8'
        }

    }

    let mediaRecorder= new MediaRecorder(stream,);

    mediaRecorder.start();
    mediaRecorder.ondataavailable=function(e){
    console.log(e.data);
    chunks.push(e.data);

    }

    mediaRecorder.onstop=function(){
        alert("Finalizo la grabación");
        let blob= new Blob(chunks,{type:"video/webm"});
        chunks=[];
        download(blob);

    }

    setTimeout(()=>mediaRecorder.stop,5000);
}

function download(blob){
    let link= document.createElement("a");
    link.href=window.URL.createObjectURL(blob);
    link.setAttribute("download","video_recorded.webm");
    link.style.display="none";
    document.body.appendChild(link);

    link.click();
    link.remove();
}

