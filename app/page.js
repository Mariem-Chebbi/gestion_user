'use client'

import { signIn } from "next-auth/react";

const HomePage = () => {

    const handleGoogleSignIn = () => {
      signIn("google", { callbackUrl: "/profile" });
    };
  
    const handleGitHubSignIn = () => {
      signIn("github", { callbackUrl: "/profile" });
    };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome! Please sign in</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#DB4437", color: "white", border: "none", borderRadius: "5px" }}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </button>
      </div>
      <div>
        <button
          style={{ padding: "10px 20px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px" }}
          onClick={handleGitHubSignIn}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default HomePage;
