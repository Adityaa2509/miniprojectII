import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser.userdata);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/myPosts?limit=3');
            const data = await res.json();
            let filteredPosts = data.posts;

            const isAdmin = currentUser && currentUser.isAdmin;


            if (!isAdmin) {
                filteredPosts = filteredPosts.filter(post => post.isPublic);
            }

            setPosts(filteredPosts);
        };
        fetchPosts();
    }, [currentUser]);

    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-7xl font-bold '>Welcome to Tech Bytes!</h1>

                <p className='text-gray-400 text-lg '>
                    Explore a world of innovation and creativity in technology. From web development to machine learning, Tech Bytes is your go-to destination for insightful articles, tutorials, and updates in the world of tech and coding.
                </p>
                <Link
                    to='/search'
                    className='text-md  text-green-500 font-bold hover:underline'
                >
                    View all posts...
                </Link>
            </div>

            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                        <div className='flex flex-wrap gap-4'>
                            {posts.map((post) => (
                                <Posts key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={'/search'}
                            className='text-xl font-bold text-green-500 hover:underline text-center'
                        >
                            View all posts...
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
