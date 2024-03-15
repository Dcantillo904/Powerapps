// Handles loading the events for <model-viewer>'s slotted progress bar
const modelViewer = document.getElementById("viewer");

async function downloadPosterToBlob() {
    const blob = await modelViewer.toBlob({ idealAspect: false });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelViewer_toBlob.png";
    a.click();
    URL.revokeObjectURL(url);
}

function downloadPosterToDataURL() {
    const url = modelViewer.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelViewer_toDataURL.png";
    a.click();
    URL.revokeObjectURL(url);
}
document.querySelector("#download-button").addEventListener("click", downloadPosterToBlob);


const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);
