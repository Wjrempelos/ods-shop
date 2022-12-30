import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase/firebase";


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    };

    return (
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    );
};

export default SignIn;