import 'dotenv/config';
import { Request, Response } from 'express';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import fetch from 'node-fetch';
import { completeRegistration } from './complete-registration';
import { firestore } from './firebase-admin';

export const checkPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.query;

    if (!reference || typeof reference !== 'string') {
      res.status(400).json({ status: false, message: 'Invalid reference' });
      return;
    }

    const paymentSnapshot = await firestore.doc(`/payments/${reference}`).get();
    if (!paymentSnapshot.exists) {
      res.status(400).json({ status: false, message: 'Invalid reference' });
      return;
    }

    let { callerHref, paidTime } = paymentSnapshot.data()!;
    if (!callerHref) {
      res.status(500).json({
        status: false,
        message: "Couldn't fetch saved callerHref link"
      });
      return;
    }

    if (!paidTime) {
      const paystackApiKey = process.env.FUNCTIONS_EMULATOR
        ? process.env.PAYSTACK_API_KEY_DEV
        : process.env.PAYSTACK_API_KEY_PROD;
      const result = (await (
        await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: { Authorization: `Bearer ${paystackApiKey}` }
        })
      ).json()) as any;

      if ('data' in result && result.data.status === 'success') {
        paidTime = Timestamp.fromDate(new Date(result.data.paid_at));
      } else {
        console.error('Error in Paystack call');
        console.error(result);
        res.status(500).json({ status: false, message: result.message });
        return;
      }

      const { form } = paymentSnapshot.data()!;
      await completeRegistration(form, `paystack - ${reference}`);
      await paymentSnapshot.ref.update({ paidTime, url: FieldValue.delete() });
    }

    const callerHrefParts = callerHref.split('#');
    if (callerHrefParts.length > 1) {
      const anchor = callerHrefParts.pop();
      res.redirect(
        `${callerHrefParts.join('')}?reference=${reference}#${anchor}`
      );
    } else {
      res.redirect(`${callerHref}?reference=${reference}`);
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: e['message'] ?? 'Error Occured'
    });
  }
};
