document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Hello my friend');

    load_videos();
});

function upload_video() {

    var uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    
    uploadModal.show();

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

    }, false);
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
        
        handle_details();
    });
}

function handle_details() {

    // Hide drop area and upload button and shows details form
    document.querySelector('#drop-area').style.display = 'none';
    document.querySelector('#details').style.display = 'block';

    // Select the details elements to be used later
    const title          = document.querySelector('#title-input');
    const description    = document.querySelector('#description-input');
    const category       = document.querySelector('#category-select');
    const visibilityPub  = document.querySelector('#visibility-public');
    const visibilityPri  = document.querySelector('#visibility-private');

    // Listen for submission of form
    document.querySelector('#details-form').onsubmit = () => {

        console.log(title.value);
        console.log(description.value);
        console.log(category.value);
        console.log(visibilityPub.checked);
        console.log(visibilityPri.checked);
        
        // Stop form from submitting
        //return false;
    }
}

// Load a set of videos 
function load_videos() {

    // Get all videos available and add them to the DOM
    fetch('/videos')
    .then(response => response.json())
    .then(videos => { 

        // Print result
        console.log(videos);
        
        var i;
        for (i = 0; i < 20; i++) {
            add_video(videos.videos[0]);
        }
    });
}

function add_video(video) {
    
    // Create a div element for the video
    const element = document.createElement('div');
    element.className = 'col-3';

    // The video content is going to be in a card
    const videoDiv = document.createElement('div');
    videoDiv.className = 'card border-light';
    
    // Create an element for the video image
    const videoImage = document.createElement('img');
    videoImage.className = 'card-img-top';
    videoImage.src = video.thumbnail;
    videoImage.alt = video.thumbnail;
    
    videoDiv.append(videoImage);
    
    // Create a body for the video information
    const videoInfo = document.createElement('body');
    videoInfo.className = 'card-body';
    
    // Title of the video
    const title = document.createElement('h6');
    title.className = 'card-title';
    title.innerHTML = video.title;

    // The remaining info
    const info = document.createElement('p');
    info.className = 'card-text text-muted';
    info.innerHTML = `${video.username} - ${video.views} views - ${video.timestamp}
                        <a href="watch/${video.id}" class="stretched-link" style="font-size:0px;">Go somewhere</a>`;

    videoInfo.append(title);
    videoInfo.append(info);
    videoDiv.append(videoInfo);
    element.append(videoDiv);
    
    // Insert the video div into the DOM
    document.querySelector('#video-container').append(element);
}


/* Some help functions */

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
