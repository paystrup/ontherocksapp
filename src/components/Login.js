import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

export default function Login() {
    const navigate = useNavigate();

    // import copy translations from i18n
    const { t } = useTranslation();

    // get user states from authentication
    const [user, loading] = useAuthState(auth);
    
    // Sign in and auth with Google
    const googleProvider = new GoogleAuthProvider();
  
    // sign in with popup from the firebase authenticator api
    // then navigate user to login
    const GoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };

    // check if user is signed in, if user signs in navigate to our homepage path /
    // dependency array listens for user and rerenders when a new user is logged in
    useEffect(() => {
      if (user) {
        navigate("/profile");
        toast(t("signin.successToastMsg"), { type: "success" });
      } else {
        console.log("login");
      }
    }, [user, navigate]);

    return (
        <div className="px-5">
            <button className="flex items-center justify-center gap-3 w-full border-2 rounded-xl py-2"
                onClick={GoogleLogin}
            >
                <FcGoogle className="" />
                {t("signin.signInButtonGoogle")}

            </button>

        </div>
    )
}
