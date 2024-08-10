import { useFirebase } from '@/contexts/FirebaseContext';
import { useToast } from '@/contexts/ToastContext';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';

enum Direction {
  forward = 'forward',
  backward = 'backward',
  nochange = 'nochange'
}

export const AttendeesPage = () => {
  const { auth, firestore, recordEvent } = useFirebase();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [firstOnPage, setFirstOnPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [noOfAttendees, setNoOfAttendees] = useState<number | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [snapshot, setSnapshot] = useState<QuerySnapshot | null>(null);
  const headings = [
    'timestamp',
    'ticket',
    'payment',
    'category',
    'amount',
    'name',
    'email',
    'phone',
    'school'
  ];

  const capitalize = (s: string) => s[0].toUpperCase() + s.substring(1);

  const fetchAttendees = async (dir: Direction) => {
    try {
      setLoading(true);
      if (noOfAttendees === null) await setAttendeesCount();

      const forward = dir == Direction.forward;
      const refQuery: QueryDocumentSnapshot | null =
        dir != Direction.nochange && snapshot && !snapshot.empty
          ? snapshot.docs[forward ? snapshot.docs.length - 1 : 0]
          : null;
      setSnapshot(
        await getDocs(
          query(
            collection(firestore, 'attendees'),
            orderBy('timestamp', 'desc'),
            ...(forward && refQuery ? [startAfter(refQuery)] : []),
            ...(!forward && refQuery ? [endBefore(refQuery)] : []),
            ...(forward ? [limit(rowsPerPage)] : [limitToLast(rowsPerPage)])
          )
        )
      );
      setShouldRetry(false);
      recordEvent('admin_fetched_attendees');
    } catch (e: any) {
      toast({ detail: e.message ?? e ?? 'Error occurred', success: false });
      setShouldRetry(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Africa/Lagos'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(timestamp.toDate());
  };

  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    setFirstOnPage(event.first);
    setRowsPerPage(event.rows);
    const direction =
      event.page == currentPage
        ? Direction.nochange
        : event.page > currentPage
        ? Direction.forward
        : Direction.backward;
    recordEvent('admin_paginated_attendees_table', {
      rows: rowsPerPage,
      direction
    });
    await fetchAttendees(direction);
    if (currentPage !== event.page) setCurrentPage(event.page);
  };

  const setAttendeesCount = async () => {
    try {
      const count = (
        await getCountFromServer(collection(firestore, 'attendees'))
      ).data().count;
      setNoOfAttendees(count);
    } catch (e: any) {
      toast({ detail: e.message ?? e ?? 'Error occurred', success: false });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await user.getIdTokenResult();
        if (!result.claims.admin) navigate('/auth');
        else fetchAttendees(Direction.forward);
      } else {
        navigate('/auth');
      }
    });
  }, []);

  return (
    <>
      <div className="flex justify-between mb-6 w-full max-w-screen-2xl mx-auto">
        <h2 className="text-xl">Attendees</h2>

        {/* // TODO: Add Upgrade User Button */}
        <button
          className="p-ripple px-3 pb-1 rounded-md border border-neutral-600"
          onClick={() => navigate('/add')}
        >
          Add <Ripple />
        </button>
      </div>

      {loading || shouldRetry ? (
        <div className="self-center flex flex-col grow justify-center">
          {loading && <BounceLoader color="white" />}
          {shouldRetry && (
            <button
              onClick={() => fetchAttendees(Direction.forward)}
              className="p-ripple px-4 pb-1 text-lg rounded-md bg-blue-500"
            >
              Retry <Ripple />
            </button>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-screen-2xl">
          <Paginator
            first={firstOnPage}
            rows={rowsPerPage}
            totalRecords={noOfAttendees!}
            rowsPerPageOptions={[10, 25, 40, 50, 100]}
            onPageChange={onPageChange}
            className="mb-4"
          />
          <div className="grid overflow-x-auto">
            <table className="overflow-hidden border border-neutral-600">
              <thead>
                <tr className="attendee">
                  {headings.map((heading) => (
                    <th key={heading} className="py-2 px-4">
                      {capitalize(heading)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {snapshot!.docs.map((doc: any) => (
                  <tr key={doc.id} className="attendee">
                    <td className="py-2 px-4">
                      {formatDate(doc.data().timestamp as Timestamp)}
                    </td>
                    {headings.slice(1).map((heading) => (
                      <td key={heading} className="py-2 px-4">
                        {doc.data()[heading]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
