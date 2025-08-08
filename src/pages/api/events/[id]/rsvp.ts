import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    // In a real app, you would record the user's RSVP in the database
    console.log(`User is RSVPing to event ${id}`);
    return res.status(200).json({ message: 'Successfully RSVPed to event' });
  }

  if (req.method === 'DELETE') {
    // In a real app, you would remove the user's RSVP from the database
    console.log(`User is canceling RSVP to event ${id}`);
    return res.status(200).json({ message: 'Successfully canceled RSVP' });
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
