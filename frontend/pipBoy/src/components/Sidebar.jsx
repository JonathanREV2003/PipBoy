import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa axios
import { AuthContext } from '../context/AuthContext';
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

const Sidebar = () => {
  const { user, hasRole } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const getToken = () => {
    return sessionStorage.getItem('token');
};

  const handleLogout = async () => {
      sessionStorage.clear();
      navigate('/');
  };


  return (
    <>
      <div
        className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src="https://img.freepik.com/vector-gratis/circulo-azul-usuario-blanco_78370-4707.jpg"
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          {/* Mostrar los datos del usuario */}
      {user ? (
        <div>
          <h1 className="text-xl text-white font-bold">{user.name}</h1>
          {/* Otros datos del usuario */}
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
          <p className="bg-primary-100 py-2 px-4 rounded-full text-white">
            Pro Pip
          </p>
        </div>
        {/* Nav */}
        <div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Home
            </button>

                        {hasRole('admin') && (
              <button
                onClick={async () => {
                  const token = sessionStorage.getItem('token');
                  try {
                    const token = getToken();
                    const response = await axios.get('/device-selection', {
                      headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json'
                      }
                    });
                    if (response.status === 200) {
                      navigate("/device-selection");
                    }
                  } catch (error) {
                    console.error('Error:', error);
                    alert('No se pudo autenticar para la selección de dispositivos');
                  }
                }}
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <RiPieChartLine /> Device Manager
              </button>
            )}
            <button
              onClick={() => navigate("/alertas")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Alertas
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Signout
            </button>
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400">Having troubles?</p>
            <a href="#">Contact us PipBoy</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;