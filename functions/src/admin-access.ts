import { Request, Response } from 'express';
import { auth } from './firebase-admin';

export const adminGrantAccess = async (req: Request, res: Response) => {
  const { uid, nickname } = req.query;

  if (!uid || typeof uid != 'string') {
    res.json({ status: false, message: 'Invalid uid' });
    return;
  }

  if (
    !nickname ||
    typeof nickname != 'string' ||
    nickname.trim().length < 3 ||
    nickname.split(' ').length > 1
  ) {
    res.json({ status: false, message: 'Invalid nickname' });
    return;
  }

  try {
    await auth.setCustomUserClaims(uid, { admin: true, nickname });

    res.json({
      status: true,
      message: `Successfully set admin and nickname for ${uid}`
    });
  } catch (e: any) {
    res.json({
      status: false,
      message: e['message'] ?? 'Error Occured'
    });
  }
};

export const adminPendingAccess = async (_: Request, res: Response) => {
  res.json({
    status: true,
    data: (await auth.listUsers()).users
      .filter((user) => !user.customClaims?.admin)
      .map(({ displayName, email, uid }) => ({ displayName, email, uid }))
  });
};
