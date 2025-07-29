// File: src/app/api/admin/kyc-submissions/route.ts
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('Session:', session);
  console.log('Request URL:', req.url);

  if (!session || session.user.role !== 'admin') {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
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

    return new Response(JSON.stringify({ kyc: kycs }), {
      status: 200,
    });
  } catch (err) {
    console.error('KYC Fetch Error:', err);
    return new Response(JSON.stringify({ message: 'Failed to fetch KYC submissions.' }), {
      status: 500,
    });
  }
}
