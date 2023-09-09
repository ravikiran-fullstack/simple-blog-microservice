// eslint-disable-next-line react/prop-types
const CommentList = ({ comments }) => {
  console.log(comments);

  return (
    // eslint-disable-next-line react/prop-types
    comments.length !== 0 && (
      <div>
        <h6>CommentList</h6>
        <ul>
          {/* eslint-disable-next-line react/prop-types */}
          {comments.map((comment) => (
            <li key={comment.commentId}>
              {comment.status === 'Approved'
                ? comment.content
                : comment.status === 'Pending'
                ? 'Comment under moderation'
                : 'Comment Rejected'}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default CommentList;
