"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

function Signin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added error state for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false, // Disable automatic redirect to handle errors manually
      });

      if (response?.error) {
        setError(response.error); // Set error message if authentication fails
      } else {
        router.push("/"); // Redirect to home page on successful login
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" }); // Redirect to home page after Google sign-in
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <section className="bg-neutral-950 dark:bg-dark py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex bg-neutral-950 flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] bg-neutral-900 rounded-lg shadow-sm-light shadow-blue-900 hover:shadow-blue-600 py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <a href="#" className="mx-auto inline-block max-w-[160px]">
                    <img
                      src="blog.png"
                      className="h-18 w-20 rounded-2xl"
                      alt="logo"
                    />
                  </a>
                </div>
                {error && ( // Display error message if there's an error
                  <div className="mb-6 text-red-500 text-sm">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-5 py-3 outline-blue-800 hover:bg-slate-950 text-base bg-transparent border rounded-md border-stroke text-white focus:border-primary"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-5 py-3 outline-blue-800 hover:bg-slate-950 text-base bg-transparent border rounded-md border-stroke text-white focus:border-primary"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-10">
                    <button
                      type="submit"
                      className="w-full px-5 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="mb-6 text-base text-secondary-color">
                  Connect With
                </p>
                <ul className="flex justify-between mb-12 -mx-2">
                  <li className="w-full px-2">
                    <a
                      href="#"
                      className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a
                      href="#"
                      className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <button
                      className="flex h-11 w-full items-center justify-center rounded-md bg-[#DB4437] hover:bg-opacity-90 text-white"
                      onClick={handleGoogleSignIn}
                    >
                      Google
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;