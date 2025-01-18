import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="405080598434-go6bo0850qf7ebno0lstqad1f8mi37ff.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Login success");
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
