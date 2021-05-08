document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Video Loaded!');
});

// When an user likes a video with id id 
function like_video(id) {
    
    fetch('/toggle/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            like: true
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        
        // Get like and unlike buttons
        likeButton = document.querySelector('#like_button');
        unlikeButton = document.querySelector('#unlike_button');
        
        // After user rated the video, like and unlike buttons must be disable
        likeButton.disabled = true;
        unlikeButton.disabled = true;
        
        // Update number of likes in the DOOM without refresh the page
        likeButton.querySelector('span').innerHTML = result.likes;
    });
}

// When an user unlikes a video with id id 
function unlike_video(id) {

    fetch('/toggle/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            like: false
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        
        // Get like and unlike buttons
        likeButton = document.querySelector('#like_button');
        unlikeButton = document.querySelector('#unlike_button');
        
        // After user rated the video, like and unlike buttons must be disable
        likeButton.disabled = true;
        unlikeButton.disabled = true;
        
        // Update number of unlikes in the DOOM without refresh the page
        unlikeButton.querySelector('span').innerHTML = result.unlikes;
    });
}

function load_comments(id) {

    fetch('/comments/' + id)
    .then(response => response.json())
    .then(comments => {
        // Print comments
        console.log(comments);

        // Add comments to the DOM
        comments.forEach(add_comment);
    });
}

function add_comment(comment) {

    const element = document.createElement('div');
    element.className = 'list-group-item';
    element.style = "border: none;" 
    element.innerHTML = `
                        <div class="d-flex w-100 justify-content-between">
                            <small><a class="fw-bold text-decoration-none" href="#">${comment.username}</a></small>
                            <small class="text-muted">${comment.timestamp}</small>
                        </div>
                        <p>${comment.content}</p>`;

    document.querySelector('#comments-container').append(element);
}