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

        add_video();
    });
}

function add_video() {

    const element = document.createElement('div');
    element.className = 'col-3';
    element.append(create_thumbnail('/media/images/museu-6.jpg', 'museu'));
    element.append(create_title('Museu de Cera Brasil'));
    element.addEventListener('click', function() {
        console.log('This div element has been clicked!')
    });
    document.querySelector('#video-container').append(element);
}

function create_thumbnail(src, alt) {

    const element = document.createElement('img');
    element.src = src;
    element.className = 'img-thumbnail';
    element.alt = alt;
    element.addEventListener('click', function() {
        console.log('This img element has been clicked!')
    });
    return element;
}

function create_title(title) {

    const element = document.createElement('h6');
    element.innerHTML = title;
    element.addEventListener('click', function() {
        console.log('The element of title has been clicked!')
    });
    return element;
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