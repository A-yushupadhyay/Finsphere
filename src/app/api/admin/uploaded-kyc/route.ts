// ✅ Route: /pages/api/admin/kyc-submissions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const kycs = await db.kyc.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    });

    res.status(200).json({ kyc: kycs }); // ✅ Make sure it's wrapped in a key if frontend expects { kyc: [...] }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch KYC submissions.' });
  }
}
