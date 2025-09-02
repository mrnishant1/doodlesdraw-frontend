// app/signin/page.tsx (Next.js 13+ App Router)
// or pages/signin.tsx for Pages Router

"use client";

import { signIn } from "next-auth/react";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { loginSchema } from "./loginschema";
import { useSearchParams } from "next/navigation";
import { ZodError } from "zod";

export default function SignInPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [FormErrors, setFormErrors] = useState<string | null>();
  const searchparams = useSearchParams();
  const error = searchparams.get("error");

  const [auth, setauth] = useState<Boolean>(true);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      // @ts-ignore
      const errors: ZodError = parsed.error.flatten().fieldErrors;
      setFormErrors(JSON.stringify(errors));
      return;
    }
    setFormErrors(null);
    console.log(parsed.data);
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      intent: auth ? "signin" : "signup",
      callbackUrl: "/", // put it here
      redirect: true, // optional if you want to handle response manually
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <label className="relative inline-flex items-center cursor-pointer mb-4">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={() => setauth((prev) => !prev)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span>SignUp</span>
        </label>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-pink-200 rounded-full p-3">
            <FaPencilAlt className="h-8 w-8 text-pink-600" />
          </div>
        </div>

        <h1 className="text-5xl font-cursive text-center text-gray-800 mb-2">
          Sign in to <span className="text-pink-600">DoodlesDraw</span>
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create, share & collaborate on doodles
        </p>

        {/* Error buttons */}
        {(error || FormErrors) && (
          <p className="text-red-500">
            ⚠️ {error}
            {FormErrors}
          </p>
        )}

        {/* Social buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1H12v2.9h5.35c-.25 1.35-1.6 3.95-5.35 3.95-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.1.8 3.8 1.5l2.6-2.5C16.7 2.9 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.75 0 9.55-4 9.55-9.6 0-.65-.1-1.1-.2-1.3z" />
            </svg>
            Continue with Google
          </button>
          {/* 
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white font-medium shadow hover:bg-gray-900 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.77.08-.76.08-.76 1.22.08 1.86 1.25 1.86 1.25 1.08 1.86 2.83 1.32 3.52 1 .11-.78.42-1.32.76-1.62-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.56.12-3.25 0 0 1-.32 3.3 1.23a11.52 11.52 0 016 0C17.9 6.73 18.9 7.05 18.9 7.05c.66 1.69.25 2.95.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.63-5.48 5.94.43.38.81 1.1.81 2.22v3.28c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </button> */}
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-pink-600 text-white font-medium shadow hover:bg-pink-700 transition active:scale-90"
          >
            {auth ? "SignIn" : "SignUp"} with Email
          </button>
        </form>
      </div>
    </div>
  );
}
