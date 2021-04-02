document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Hello my friend');
});

function upload_video() {

    var uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    
    uploadModal.show();

    handle_details(); /*

    // Show drop area and upload button and hide details form
    document.querySelector('#drop-area').style.display = 'block';
    document.querySelector('#details').style.display = 'none';
    
    // Select the drop area
    const dropArea = document.querySelector('#drop-area');
    
    // Add handlers to the events to prevent default behaviors
    dropArea.addEventListener('dragenter', preventDefaults, false);
    dropArea.addEventListener('dragleave', preventDefaults, false);
    dropArea.addEventListener('dragover', preventDefaults, false);
    dropArea.addEventListener('drop', preventDefaults, false);
    
    // Highlight the upload icon when dragged item is over it
    dropArea.addEventListener('dragenter', highlight, false);
    dropArea.addEventListener('dragover', highlight, false);
    
    // Upload icon goes back to normal if you remove the item or drop it
    dropArea.addEventListener('dragleave', unhighlight, false);
    dropArea.addEventListener('drop', unhighlight, false);
    
    // Get the data for the video file that was dropped and pass this data to handle_video
    dropArea.addEventListener('drop', function (e) { 

        const dt = e.dataTransfer;
        const files = dt.files;
        
        // We pass to handleFile just one (the only one) video file from files FileList
        handle_video(files[0]);

    }, false);*/
}

// Send a video file to the server
function handle_video(file) {

    const formData = new FormData();

    formData.append('file', file);

    // Send a POST request to the '/upload' route carrying the video file
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });

    handle_details();
}

function handle_details() {

    // Hide drop area and upload button and shows details form
    document.querySelector('#drop-area').style.display = 'none';
    document.querySelector('#details').style.display = 'block';

    console.log('This is handle_detail.');
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    document.querySelector('#upload-icon').classList.add('text-primary');
}
  
function unhighlight() {
    document.querySelector('#upload-icon').classList.remove('text-primary');
}