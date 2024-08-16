import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const ItemForm = ({ user }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/item-form');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(db, 'items'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const itemsList = [];
        querySnapshot.forEach((doc) => {
          itemsList.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsList);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAddItem = async () => {
    if (itemName && quantity && image && user?.uid) {
      setAdding(true);
      try {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, 'items'), {
          uid: user.uid,
          itemName,
          quantity,
          image: imageUrl,
        });

        setItemName('');
        setQuantity('');
        setImage(null);
      } catch (error) {
        console.error('Error adding item:', error);
      } finally {
        setAdding(false);
      }
    } else {
      console.error('Required fields are missing or user is not authenticated.');
    }
  };

  const handleUpdateItem = async (id) => {
    if (itemName && quantity) {
      setUpdating(true);
      try {
        const itemRef = doc(db, 'items', id);
        const updatedData = {};
        if (itemName) updatedData.itemName = itemName;
        if (quantity) updatedData.quantity = quantity;
        if (image) {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          updatedData.image = imageUrl;
        }

        await updateDoc(itemRef, updatedData);

        setItemName('');
        setQuantity('');
        setImage(null);
        setUpdatingItemId(null);
      } catch (error) {
        console.error('Error updating item:', error);
      } finally {
        setUpdating(false);
      }
    } else {
      console.error('Required fields are missing.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#edf6f9] flex flex-col items-center p-4">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center bg-[#006d77] p-4 rounded-lg">
        <div className="text-[#fff] text-lg font-semibold">
          {user?.displayName || 'User Name'}
        </div>
        <div className="relative">
          <img
            src={user?.photoURL || 'default-avatar.png'}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#fff] rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black hover:bg-[#83c5be] rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading Screen */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Search and Form */}
          <div className="mt-8 w-full max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="mb-4 md:mb-0 p-3 w-full md:w-1/3 border border-gray-300 rounded-lg focus:outline-none"
              />
              <div className="flex justify-end w-full md:w-auto">
                <button className="bg-[#83c5be] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#006d77]">
                  Search
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex justify-end w-full">
              <button
                onClick={updatingItemId ? () => handleUpdateItem(updatingItemId) : handleAddItem}
                className="bg-[#006d77] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#83c5be]"
                disabled={adding || updating}
              >
                {updating ? 'Updating...' : adding ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 w-full max-w-4xl overflow-x-auto">
            <table className="w-full bg-[#fff] rounded-lg shadow-lg">
              <thead className="bg-[#006d77] text-[#fff]">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{item.itemName}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">
                      <img src={item.image} alt="Item" className="w-10 h-10 mx-auto" />
                    </td>
                    <td className="p-4 ">
               
                  <button
                        onClick={() => {
                          setItemName(item.itemName);
                          setQuantity(item.quantity);
                          setImage(null); // You might want to set the image URL if you need to show it
                          setUpdatingItemId(item.id);
                        }}
                        className="bg-[#83c5be] text-[#fff] px-4 py-2 rounded-lg mr-2 hover:bg-[#006d77]" 
                      >
                        <BiEdit />
                        
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-[#ff4d4d] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#cc0000]"
                      >
                        <MdDeleteForever className='text-lg text-[#fff]' />

                      </button>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemForm;
