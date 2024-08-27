import { useForm } from "@inertiajs/react"

export default function Create() {

    const { data, setData, post, errors, processing } = useForm({
        body: "",
    })

    function submit(e) {
        e.preventDefault()
        post("/post");
    }

    
    return (
        <>
            <h1 className="text-center mt-3"> 
                Create a new post! 
            </h1>
            
            <div className="d-flex justify-content-center container">
                <form onSubmit={submit}>
                    <div className="col">
                        <div className="row"> 
                            <textarea value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                            className={errors.body && 'border border-danger'}>
                            
                            </textarea>
                        </div>

                        {errors.body && <p className="text-danger"> {errors.body} </p>}
                        <div className="row">
                            <button 
                                className="btn btn-primary mt-4" 
                                disabled={processing}> 
                            Create Post </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}