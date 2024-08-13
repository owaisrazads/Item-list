// // src/components/Search.js
// import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const Search = ({ user }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [items, setItems] = useState([]);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, 'items'),
//       where('userId', '==', user.uid),
//       where('name', '==', searchTerm)
//     );
//     const querySnapshot = await getDocs(q);
//     setItems(querySnapshot.docs.map((doc) => doc.data()));
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm]);

//   return (
//     <div className="bg-background min-h-screen p-8">
//       <input
//         type="text"
//         placeholder="Search Item"
//         className="mb-6 p-3 w-full max-w-md border border-secondary rounded-lg"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <table className="min-w-full bg-white rounded-lg shadow-lg">
//         <thead className="bg-primary text-white">
//           <tr>
//             <th className="py-3 px-4">#</th>
//             <th className="py-3 px-4">Item Name</th>
//             <th className="py-3 px-4">Quantity</th>
//             <th className="py-3 px-4">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index} className="border-b">
//               <td className="py-3 px-4">{index + 1}</td>
//               <td className="py-3 px-4">{item.name}</td>
//               <td className="py-3 px-4">{item.quantity}</td>
//               <td className="py-3 px-4">
//                 <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Search;
