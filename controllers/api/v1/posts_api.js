const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    try{
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        return res.json(200, {
            message: "List of posts",
            posts: posts
        });
    }catch(err){
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}