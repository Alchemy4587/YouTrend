import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <div className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, voluptates? Consectetur quisquam qui eius neque placeat omnis nulla error, unde debitis. Facilis quasi itaque nesciunt iure quisquam, architecto sapiente! Incidunt repellat, sint sequi nostrum quo molestiae! Odio sed repellat eos?
        </p><br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quisquam mollitia quis inventore nam quaerat dolore unde fuga voluptatibus recusandae in voluptate consequuntur ad exercitationem laborum dolores ducimus suscipit praesentium, quod minus molestias iusto adipisci? Ex omnis tempore quas possimus eveniet quae ad dolore nostrum nulla mollitia quo expedita blanditiis, quaerat unde exercitationem esse. Magnam.
        </p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laudantium, laborum voluptatibus unde tempora sunt deleniti cum! Culpa consequatur minima illum error eaque sequi magni repellat iusto saepe ad ipsa adipisci repellendus, ut sunt magnam ea eos omnis quidem corrupti. Enim aut, nostrum laudantium iste quisquam debitis dolor alias numquam laborum earum sequi corporis repudiandae consequatur repellat sunt asperiores veniam quos. Explicabo incidunt atque mollitia voluptatem! Necessitatibus harum earum, laudantium a nulla magnam libero accusamus vitae itaque labore placeat nisi provident ad dolor repellendus. Aliquam at repudiandae veniam itaque modi ducimus distinctio eos vitae molestias, impedit deserunt saepe dolores nam natus sequi, velit, incidunt necessitatibus iure inventore nemo facere maxime deleniti?
        </p><br />
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nihil. Non, facere voluptatem veritatis consequatur totam blanditiis aliquam et odio.
      </p><br />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias tempora at eligendi illum deserunt sequi beatae aliquam? Perspiciatis facere ea odit accusantium quam vitae consequatur repellat libero, fugiat dolorem placeat deserunt delectus quibusdam expedita iste. Quo inventore facilis molestiae a, aliquam unde modi similique cumque minus suscipit sed rerum, maiores sunt. Earum iusto nesciunt pariatur aliquam provident, necessitatibus nam, dicta soluta impedit dolore cumque, fugit doloribus culpa ad libero officiis placeat vel obcaecati tenetur facilis ipsam quae! Quibusdam autem suscipit ipsum incidunt commodi dolorem, beatae veniam perferendis voluptatibus reprehenderit iure officiis repellendus culpa! Accusantium tempore doloremque voluptate sequi ipsam repellendus, autem placeat, ab quidem, laudantium dolore rerum at dolores harum molestiae adipisci explicabo eum sit quis non! Accusamus minima culpa cum quas quos labore voluptates in pariatur error quam tenetur harum, officiis hic maxime corporis deserunt. Soluta, doloribus! Ullam sapiente provident rem ex maiores placeat, laborum dolores eum omnis non eaque pariatur accusantium saepe, alias inventore voluptatem sint distinctio mollitia ab repellat quos voluptate. Asperiores maxime laboriosam culpa reiciendis eos minima similique totam sed, facere cum corporis? Quos consequatur deserunt sapiente, architecto magnam doloremque earum est et inventore maiores, molestiae, dolorum corporis beatae vitae eius quis labore. Sapiente, minima doloremque.
      </p>
      </div>
    </div>
  )
}

export default PostDetail