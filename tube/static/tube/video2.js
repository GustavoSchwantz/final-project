document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Video Loaded!');
});

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
    });  
}

function unlike_video() {
    console.log('unlike');
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