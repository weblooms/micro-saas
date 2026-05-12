"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email || "");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful!");
      getUser();
    }
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      getUser();
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserEmail("");
    alert("Logged out!");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Auth Demo
        </h1>

        {userEmail && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-100 text-black">
            <p className="font-semibold">Logged in as:</p>
            <p>{userEmail}</p>
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg text-black placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 w-full mb-6 rounded-lg text-black placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={signUp}
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Sign Up
          </button>

          <button
            onClick={signIn}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Login
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
