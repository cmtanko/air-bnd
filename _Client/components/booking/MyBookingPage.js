import React, { useEffect } from "react";
import Link from "next/link";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { myBookings } from "../../redux/actions/bookingAction";
import easyinvoice from "easyinvoice";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const MyBookingPage = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state) => state.myBooking);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(myBookings(user));
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc"
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc"
        },
        {
          label: "Amount Paid",
          field: "amount",
          sort: "asc"
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc"
        }
      ],
      rows: []
    };

    bookings &&
      bookings.map((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
            </>
          )
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    const data = {
      documentTitle: "Booking INVOICE", //Defaults to INVOICE
      currency: "USD",
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
      sender: {
        company: "Air-BnD",
        address: "Craigieburn",
        zip: "3168",
        city: "Melbourne",
        country: "Australia"
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.pricePerNight
        }
      ],
      bottomNotice: "This is auto generated Invoice of your booking on Air BnD."
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookingPage;