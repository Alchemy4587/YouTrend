import React, { useState } from 'react'

// import Thumbnail1 from '../images/blog1.jpg'
// import Thumbnail2 from '../images/blog2.jpg'
// import Thumbnail3 from '../images/blog3.jpg'
// import Thumbnail4 from '../images/blog4.jpg'
import PostItem from './PostItem'
import { DUMMY_POST } from '../data'


const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POST)
  return (

    <section className="posts">
        {posts.length > 0 ? <div className="container posts__container">
        {
            posts.map(({id, thumbnail, category, title, desc, authorID}) => 
            <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
            description={desc} authorID={authorID}/>)
        }
        </div> : <h2 className='center'>No Post Found</h2>}
    </section>
  )
}

export default Posts