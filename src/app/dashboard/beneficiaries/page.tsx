'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Beneficiary {
  id: string;
  recipient: {
    name: string;
    email: string;
  } | null;
}

export default function BeneficiariesPage() {
  const { data: session } = useSession();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (session?.user) {
      fetchBeneficiaries();
    }
  }, [session]);

 const fetchBeneficiaries = async () => {
  try {
    const res = await fetch('/api/beneficiaries/list');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setBeneficiaries(data);
  } catch (err) {
    console.error(err);
  }
};

const handleAdd = async () => {
  setError('');
  setSuccess('');

  if (!email || !email.includes('@')) {
    setError('Enter a valid email.');
    return;
  }

  try {
    const res = await fetch('/api/beneficiaries/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Beneficiary added.');
      setEmail('');
      fetchBeneficiaries();
    } else {
      setError(data.error || 'Something went wrong.');
    }
  } catch  {
    setError('Something went wrong.');
  }
};

const handleDelete = async (id: string) => {
  try {
    const res = await fetch('/api/beneficiaries/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchBeneficiaries();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to delete.');
    }
  } catch  {
    setError('Failed to delete.');
  }
};

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-xl rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Your Beneficiaries</h1>

      {/* Add Beneficiary */}
      <div className="flex gap-2 items-center">
        <input
          type="email"
          placeholder="Enter recipient's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      {/* List Beneficiaries */}
      <div className="divide-y">
        {beneficiaries.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No beneficiaries yet.</p>
        ) : (
          beneficiaries.map((b) => (
            <div key={b.id} className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">{b.recipient?.name || 'Unknown'}</p>
                <p className="text-sm text-gray-500">{b.recipient?.email}</p>
              </div>
              <button
                onClick={() => handleDelete(b.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
