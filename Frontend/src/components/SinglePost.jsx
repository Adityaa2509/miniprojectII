import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa'; // Importing the ThumbsUp icon from react-icons/fa
import Comments from './Comments';

function SinglePost() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/myposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/post/like/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message); // Handle error
        return;
      }
      setPost({ ...post, likes: [...post.likes, data.userId] });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  if (error)
    return <div className='text-red-500'>Error occurred while fetching post</div>;

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-6xl font-bold underline mt-10 p-3 text-center font-serif max-w-2xl mx-auto '>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='lg'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-1 max-h-[600px] w-full object-cover '
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-sm'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
               <div className='flex items-center justify-center'>
        <Button onClick={handleLike} color='blue' pill>
          <FaThumbsUp size={15} />
        </Button>
        <span className='ml-2'>{post.likes.length} Likes</span>
      </div>

        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content '
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      

      <Comments postId={post._id} />
    </main>
  );
}

export default SinglePost;
