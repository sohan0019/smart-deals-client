import React, { useContext, useState } from 'react'; 
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

const Register = () => {

  const navigate = useNavigate();
  const { signInWithGoogle, setUser, setLoading, createUser, updateUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regExp.test(password)) {
      toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const newUser = result.user;

    updateUser(name, photo)
    .then(() => {
      setUser({ ...newUser, displayName: name, photoURL: photo });
      toast.success("Sign Up Successful.");
      e.target.reset();
      setLoading(false);
      navigate("/");
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    });
  })
  .catch(error => {
    toast.error(error.message);
  });
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }

        //create user in the database
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            "content-type": 'application/json'
          },
          body: JSON.stringify(newUser),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Data after user saved', data);
            navigate("/");
          })
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl ">
        <h1 className="text-4xl font-bold pb-2 text-center mt-4">Register now!</h1>

        <form onSubmit={handleSignUp} className="space-y-3 card-body">
          <label className="block mb-1 font-medium">Your Name</label>
          <input type="text" className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Name" name='name' required />

          <label className="block mb-1 font-medium">Photo URL</label>
          <input type="text" className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Photo URL" name='photo' required />

          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" name='email' required />

          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input type={show ? "text" : "password"} className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password" name='password' required />
            <span onClick={() => setShow(!show)} className="absolute right-2 top-[38px] cursor-pointer z-50">
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <button type="submit" className="btn w-full bg-black text-white font-semibold border-none hover:scale-105 transition-transform duration-200">Register</button>

          {/* Google */}
          <button type="button" onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]"> {/* ADDED: type="button" to prevent form submission */}
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            SignIn with Google
          </button>

          <p className="text-center text-sm mt-3">Already have an account?{" "} <Link to="/login" className="text-purple-800 font-medium hover:underline">Login</Link></p>
        </form>
      </div>
    </section>
  )}

  export default Register;