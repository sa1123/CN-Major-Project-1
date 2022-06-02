{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.prevenDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-continer>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create a post in DOM

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delte-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
                        <br>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" cols="15" rows="1" placeholder="Add a comment" required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="add comment">
                            </form>
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                            </ul>
                        </div>
                    </div>
                </li>`
    )}

    createPost();
}