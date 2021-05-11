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

// Write a new comment for users who are signed in 
function new_comment(id) {

    // Select the submit button and textarea to be used later
    const submit    = document.querySelector('#comment-submit');
    const newComment   = document.querySelector('#comment');
    
    // Disable submit button by default:
    submit.disabled = true;
    
    // Listen for input to be typed into the textarea
    newComment.onkeyup = () => {
        if (newComment.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }
    
    // Listen for submission of form
    document.querySelector('#comment-form').onsubmit = () => {
        
        // Find the comment the user just submitted
        const comment = newComment.value;
        
        // Send a POST request to the '/comment' route carrying the comment content
        fetch('/comment/' + id, {
            method: 'POST',
            body: JSON.stringify({comment: comment})
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
        });
        
        // Clear out textarea and disable submit button:
        newComment.value = '';
        submit.disabled = true;
        
        // Stop form from submitting
        return false;
    }
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