'use client';

import { useEffect, useState } from 'react';


type Kyc = {
  id: string;
  document: string;
  status: string;
  uploadedAt: string;
  user: {
    name: string | null;
    email: string | null;
  };
};

export default function KycPage() {
  const [kycList, setKycList] = useState<Kyc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKyc = async () => {
      const res = await fetch('/api/admin/uplaoded-kyc', {
        method: 'GET'});
      if (res.ok) {
        const data = await res.json();
        setKycList(data.kyc);
      }
      setLoading(false);
    };

    fetchKyc();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📄 KYC Submissions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : kycList.length === 0 ? (
        <p>No KYC records found.</p>
      ) : (
        <div className="space-y-6">
          {kycList.map((kyc) => (
            <div key={kyc.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <p className="text-lg font-semibold">{kyc.user.name ?? 'Unnamed User'}</p>
              <p className="text-sm text-gray-600">{kyc.user.email}</p>
              <p className="text-sm mt-2">Status: <span className="font-medium text-blue-600">{kyc.status}</span></p>
              <p className="text-sm text-gray-500">Uploaded At: {new Date(kyc.uploadedAt).toLocaleString()}</p>
              <a
                href={kyc.document}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
