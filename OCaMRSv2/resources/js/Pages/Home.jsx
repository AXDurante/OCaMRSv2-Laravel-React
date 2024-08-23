import Navbar from "../Layouts/Navbar";

function Home() {
    return (
        <div className="d-flex">
            <div id="content" className="flex-fill p-3">
                <p>asdasdasdasdasdasdasdadsadasddadsadaaaaaaaaaaaaaaa</p>
            </div>
        </div>
    );
}

Home.layout = (page) => <Navbar>{page}</Navbar>;

export default Home;
