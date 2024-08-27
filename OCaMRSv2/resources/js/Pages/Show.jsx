import { useForm } from "@inertiajs/react"

export default function Show({post}) {

    const { delete: del } = useForm();

    function submit(e) {
        e.preventDefault();
        del(`/post/${post.id}`);
    }

    return (
        <>
            <div className="text-center mt-5"> 
                <h1 className="title"> {post.id} </h1>
                <h2> {post.body} </h2>
                <a href="/post"> Back to Post </a>
                <form onSubmit={submit}>
                    <button className="btn btn-danger mt-3"> Delete </button>
                </form>
            </div>
        </>
    )
};