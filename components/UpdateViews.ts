// pages/api/updateViews.ts
import { writeClient } from '@/sanity/lib/write-client';

export default async function handler(req, res) {
  const { id, views } = req.body;
  try {
    await writeClient
      .patch(id)
      .set({ views: views + 1 })
      .commit();
    res.status(200).json({ message: 'View updated successfully' });
  } catch {
    // No need to use the error, just handle the error silently
    res.status(500).json({ error: 'Failed to update views' });
  }
}
