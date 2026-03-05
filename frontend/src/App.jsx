import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Register from "./pages/Register";


import Login from "./pages/Login";
import CreateTribute from "./pages/CreateTribute";

function App() {
  const [tributes, setTributes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingTribute, setEditingTribute] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
 
  

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const isLoggedIn = !!token;

  const openEditModal = (tribute) => {
  setEditingTribute(tribute);
  setShowModal(true);
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/tributes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTributes(tributes.filter(t => t._id !== id));

    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const fetchTributes = () => {
    axios
      .get("http://localhost:5001/api/tributes")
      .then((res) => {
        setTributes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  

  return (
    <div>

      {/* NAVBAR */}
   <nav className="navbar">

  <h2>Tributary System</h2>

  {token ? (
    <>
      <button
        className="create-btn"
        onClick={() => setShowModal(true)}
      >
        + Create Tribute
      </button>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <button
      className="login-btn"
      onClick={() => setShowLogin(true)}
    >
      Login
    </button>
  )}

</nav>


  <div className="container">
        <h2>Honoring Our Heroes</h2>

        <div className="grid">

          {tributes.map((tribute) => (
            <div className="card" key={tribute._id}>

              <img src={tribute.imageUrl} alt="tribute" />

              <h3>{tribute.title}</h3>

              <p>{tribute.description}</p>

              <small>
                Posted by: {tribute.createdBy?.name}
              </small>

              <br />




              {token && user?.id === tribute.createdBy?._id && (
  <>
  < div className="card_actions">
    <button
      className="edit-btn"
      onClick={() => openEditModal(tribute)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => handleDelete(tribute._id)}
    >
      Delete
    </button>
    </div>
  </>
  
)}


            </div>
          ))}

        </div>

        </div>


      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <CreateTribute
  refreshTributes={fetchTributes}
  closeModal={() => setShowModal(false)}
  tribute={editingTribute}
/>

          </div>
        </div>
      )}


      {
      showLogin && (
  <div className="modal-overlay">
    <div className="modal">

      <button
        className="close-btn"
        onClick={() => setShowLogin(false)}
      >
        ✕
      </button>

      <Login
        openRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

    </div>
  </div>
)}

{showRegister && (
  <div className="modal-overlay">

    <div className="modal">

      <button
        className="close-btn"
        onClick={() => setShowRegister(false)}
      >
        ✕
      </button>

      <Register closeModal={() => setShowRegister(false)} />

    </div>

  </div>
)}


      

    </div>
  );
}

export default App;