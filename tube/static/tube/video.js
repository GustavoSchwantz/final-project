document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Hello my friend');
});

function upload_video() {

    var uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    
    uploadModal.show();

    // Listen for submission of form
    document.querySelector('#upload-form').onsubmit = () => {

        console.log('Form submitted!');
        
        const video = document.querySelector('#videoFile').files[0];
        const formData = new FormData();

        formData.append('video', video);
        
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
        
        // Stop form from submitting
        return false;
    }
}