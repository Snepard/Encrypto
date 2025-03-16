import React, { useEffect, useState, useRef } from "react";
import name from "../assets/name.png";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordInputRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (passwordInputRef.current.type === "password") {
      passwordInputRef.current.type = "text";
      ref.current.src = "icons/eye.png";
    } else {
      passwordInputRef.current.type = "password";
      ref.current.src = "icons/hidden.png";
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast.success("Password Saved Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log([...passwordArray, form]);
    } else{
      toast.error("All fields should have atleast 3 characters !!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you want to delete this Password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
      toast.error("Password Deleted Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="fit fixed inset-0 -z-10 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex flex-col md:mycontainer max-w-3xl bg-indigo-50 bg-opacity-50 rounded-2xl px-6 sm:px-10 py-5 my-5 mb-10 mx-auto">
        <div className="mx-auto font-bold text-3xl rounded-2xl">
          <span className="text-indigo-900">&lt;</span>
          ENCRYPTO
          <span className="text-indigo-900">/&gt;</span>
        </div>
        <p className="text-indigo-900 mx-auto mb-2">
          Stay Encrypted, Stay Safe.
        </p>

        <div className="text-white flex flex-col p4 my-3 gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="bg-white rounded-2xl border-2 border-indigo-400 w-full sm:w-3/4 text-black px-4 py-1 "
            type="text"
            name="site"
          ></input>
          <div className="flex w-full sm:w-3/4 gap-3 justify-center">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-2xl border-2 border-indigo-400 w-1/2 text-black px-4 py-1"
              type="text"
              name="username"
            ></input>

            <div className="relative w-1/2">
              <input
                ref={passwordInputRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-white rounded-2xl border-2 border-indigo-400 w-full text-black px-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="h-6"
                  src="icons/hidden.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="gap-1 rounded-4xl bg-violet-800 py-1 font-bold flex justify-center items-center w-fit px-5 hover:bg-indigo-800 border border-indigo-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sqmqtgjh.json"
              trigger="hover"
              colors="primary:#7166ee,secondary:#ebe6ef"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-3">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div> Start Saving You Passwords Now...</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="bg-violet-400">
                <tr>
                  <th className="text-center w-32 py-1 px-3">Site</th>
                  <th className="text-center w-32 py-1 px-3">Username</th>
                  <th className="text-center w-32 py-1 px-3">Password</th>
                  <th className="text-center w-32 py-1 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-violet-300">
                {passwordArray.map((item) => {
                  return (
                    <tr>
                       <td className="flex justify-left text-center px-3 py-1 min-w-[130px] max-w-[260px] break-words">
                        <img className="w-6 mx-4" src={
                            item.site.startsWith("http")
                              ? `${item.site}/favicon.ico`
                              : `https://${item.site}/favicon.ico`
                          }/>
                        <a
                          className="hover:text-blue-900"
                          href={
                            item.site.startsWith("http")
                              ? item.site
                              : `https://${item.site}`
                          }
                          target="_blank"
                        >
                          {item.site}
                        </a>
                      </td>
                      <td className="text-center px-3 py-1 min-w-[120px] max-w-[250px] break-words">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <img
                            className="h-4 mx-2 hover:h-4.5 hover:cursor-pointer"
                            src="icons/copy.png"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          ></img>
                        </div>
                      </td>
                      <td className="text-center px-3 py-1 min-w-[120px] max-w-[250px] break-words">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <img
                            className="h-4 mx-2 hover:h-4.5 hover:cursor-pointer"
                            src="icons/copy.png"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          ></img>
                        </div>
                      </td>
                      <td className="text-center px-3 py-1 min-w-[120px] max-w-[250px] break-words flex items-center justify-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/vwzukuhn.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/nhqwlgwt.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
