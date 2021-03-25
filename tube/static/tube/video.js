document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Hello my friend');
});

function upload_video() {

    var uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    
    uploadModal.show();
}