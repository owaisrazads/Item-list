// // src/App.js
// import React, { useState } from 'react';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import ItemForm from './components/ItemForm';
// import Search from './components/Search';

// function App() {
//   const [user, setUser] = useState(null);
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <div>
//       {!user ? (
//         isSignUp ? (
//           <SignUp setUser={setUser} />
//         ) : (
//           <Login setUser={setUser} />
//         )
//       ) : (
//         <>
//           <button
//             className="absolute top-4 right-4 bg-secondary text-white p-2 rounded"
//             onClick={() => setUser(null)}
//           >
//             Logout
//           </button>
//           <ItemForm user={user} />
//           <Search user={user} />
//         </>
//       )}
//       {!user && (
//         <div className="text-center mt-4">
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="text-primary underline"
//           >
//             {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




// Assuming you have the user object in your App.js or any parent component
// src/App.js
import React, { useState } from 'react';
import RouterConfig from './config/RouterConfig';

const App = () => {
  const [user, setUser] = useState(null);

  return <RouterConfig user={user} setUser={setUser} />;
};

export default App;




