import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getFriendsPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/friend`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getUserPosts();
      getFriendsPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (posts.length > 0) {
    return (
      <>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    );
  } else {
    if (isProfile) {
      return <p>No posts available.</p>;
    } else {
      return (
        <>
          <p>No posts available from friends.</p>
          <p>Retrieving user posts...</p>
        </>
      );
    }
  }
};

export default PostsWidget;
