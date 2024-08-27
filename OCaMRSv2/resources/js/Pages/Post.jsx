import { Link } from "@inertiajs/react";

function Post ({ posts }) {
    console.log(posts)
    return (
        <div>
            <div className="text-center mt-2">
                <h1>
                    This is the Post
                </h1>
                <a href="/post/create"> 
                        Link to Create 
                </a>
            </div>
            

            <div className="mt-3">
                <table class="ms-5 table table-striped">
                    <thead>
                        <th scope="col"> ID </th>
                        <th scope="col"> Body </th>
                        <th scope="col"> Posted on </th>
                        <th scope="col"> Time Created </th>
                    </thead>
                    <tbody>
                        {posts.data.map(post => (
                            <tr key={post.id}>
                                <th scope="row"> {post.id} </th>
                                <td> {post.body} </td>
                                <td> {new Date(post.created_at).toLocaleDateString() } </td>
                                <td> {new Date(post.created_at).toLocaleTimeString() }</td>
                                <Link href={`/post/${post.id}`}> Edit </Link>
                            </tr>
                        ))}
                       
                    </tbody>
                </table>
                <div className="text-center">
                    {posts.links.map(link => (
                        link.url ?(
                        <Link
                            className={`px-3 ${
                            link.active ? "text-primary font-weight-bold" : "text-dark" }`}
                            key={link.label} 
                            href={link.url} 
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : ( 
                        <span
                            key={link.label} 
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="text-secondary" >
                        </span>
                        )
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Post;