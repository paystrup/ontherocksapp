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
    const [user] = useAuthState(auth);
    
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
        toast(t("signin.successToastMsg"), { type: "success", toastId: "succesToast", });
      } else {
        console.log("login");
      }
    }, [user, navigate, t]);

    return (
        <div>
            <button className="bg-primaryYellow text-primaryBlack font-medium w-full py-3 rounded-2xl"
                onClick={GoogleLogin}
            >
                {t("signin.signInButtonGoogle")}

            </button>

        </div>
    )
}
