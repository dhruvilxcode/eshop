import { signIn } from "@/controllers/auth.controller";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const btnLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      toast.warning('Provide email!');
      emailRef.current.focus();
      return;
    }

    if (!password) {
      toast.warning('Provide password!');
      passwordRef.current.focus();
      return;
    }
    
    try {
      const res = await signIn(email, password);
      if(res.status === 200) {
        console.log(res.data);
        toast.success("logged in")
        return;
      }
    } catch (error) {
      const data = error?.response?.data;
      toast.error(data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="w-full sm:w-96 mx-auto px-8 sm:px-0" onSubmit={btnLogin}>
        <div>
          <h1 className="font-bold text-4xl text-center">
            Admin
            <br />
            Dashboard
          </h1>
        </div>
        <div className="mt-10">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            ref={emailRef}
            className="block w-full border px-4 py-3 outline-none rounded-xl focus:border-black"
            type="email"
            placeholder="Enter your email here..."
            name="email"
            id="email"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            ref={passwordRef}
            className="block w-full border px-4 py-3 outline-none rounded-xl focus:border-black"
            type="password"
            placeholder="Enter your password here..."
            name="password"
            id="password"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={btnLogin}
            type="submit"
            className="block w-full px-4 py-3 outline-none rounded-xl text-white focus:outline-orange-300 bg-orange-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
