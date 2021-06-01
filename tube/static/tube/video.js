function search() {

    // Select the submit button and input to be used later
    const submit = document.querySelector('#search-submit');
    const newSearch = document.querySelector('#search-input');

    var getSelectedValue = document.querySelector('input[name="uploadDate"]:checked');
    console.log(getSelectedValue.value);

    // Disable submit button by default:
    submit.disabled = true;

    // Listen for input to be typed into the input field
    newSearch.onkeyup = () => {
        if (newSearch.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }

    // Listen for submission of form
    document.querySelector('#search-form').onsubmit = () => {

        // Find the search query the user just submitted
        const search = newSearch.value;

        // Send a POST request to the '/search' route carrying the search query
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({search: search})
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
        });
        
        // Clear out search input and disable submit button:
        newSearch.value = '';
        submit.disabled = true;
        
        // Stop form from submitting
        return false;
    }
}

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
        
        // Hide drop area and upload button and shows details form
        document.querySelector('#drop-area').style.display = 'none';
        document.querySelector('#details').style.display = 'block';
    });
}

// Load a set of videos 
function load_videos() {

    // Get all videos available and add them to the DOM
    fetch('/videos')
    .then(response => response.json())
    .then(videos => { 

        // Print result
        console.log(videos);
        
        videos.videos.forEach(add_video);
    });
}

function add_video(video) {
    
    // Create a div element for the video
    const element = document.createElement('div');
    element.className = 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3';

    // The video content is going to be in a card
    const videoDiv = document.createElement('div');
    videoDiv.className = 'card border-light';
    
    // Create an element for the video image
    const videoImage = document.createElement('img');
    videoImage.className = 'card-img-top';
    videoImage.src = video.image;
    videoImage.alt = video.image;
    
    videoDiv.append(videoImage);
    
    // Create a body for the video information
    const videoInfo = document.createElement('body');
    videoInfo.className = 'card-body';
    
    // Title of the video
    const title = document.createElement('h6');
    title.className = 'card-title';
    title.innerHTML = video.title;

    // The remaining info
    const info = document.createElement('small');
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
