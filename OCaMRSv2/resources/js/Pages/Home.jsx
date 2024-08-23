import Navbar from '../Layouts/Navbar'

function Home() {
    return (
        <>
            <div className="container">
            <h1 className="title">Hello, Bootstrap with React!</h1>
            <button className="btn btn-primary">Click Me!</button>
            </div>
        </>
    );
}

Home.layout = page => <Navbar> {page} </Navbar>

export default Home;