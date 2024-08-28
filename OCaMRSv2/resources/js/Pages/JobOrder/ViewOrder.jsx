function ViewOrder({jobOrder}) {
    return (
        <>
        <div className="ms-5 mt-2"> 
            <h1> View Order </h1>
            <h3> ID: {jobOrder.job_id} </h3>
            <h3> Service Type: {jobOrder.service_type} </h3>
            <h3> {jobOrder.trans_type} </h3>
            <h3> {jobOrder.dept_name} </h3>
            <h3> {jobOrder.lab} </h3>
            <h3> {jobOrder.lab_loc} </h3>
            <h3> {jobOrder.pos} </h3>
            <h3> {jobOrder.date_request} </h3>

            <button className="btn btn-primary">
                <a href="/jobOrder" className="text-white"> Return </a>
            </button>
        </div>
        
        
        </>
    )
}

export default ViewOrder;