'use client'
import { db } from './config'
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

async function addDataToFireStore(name, message) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      name: name,
      message: message,
    });
    console.log("Document written:", docRef.id);
    return true;
  
  } catch (error) {
    console.log("Error Add", error)
    return false;
  }
}

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, message);
    if (added) {
      setName("");
      setMessage("");

      alert("Data sended")
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form 
        onSubmit={handleSubmit}
        className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'
        >
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'>
                Name: 
            </label>
              <input
                type='text'
                id='name'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                value={name}
                onChange={(e) => setName(e.target.value)}>
              </input>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='message'
              className='block text-gray-700 font-bold mb-2'>
                Message: 
            </label>
              <input
                id='message'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                value={message}
                onChange={(e) => setMessage(e.target.value)}>
              </input>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-2'>
                Send
            </button>
          </div>
        </form>
    </main>
  );
}
