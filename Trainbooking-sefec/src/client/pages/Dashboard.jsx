import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import {
  getBooking,
  getTrain,
  getRoute,
  getUserProfile,
  getLoyaltyPoints,
  createBooking,
  cancelBooking,
  rescheduleBooking,
  updateUserProfile,
  redeemLoyaltyPoints
} from '@wasp/queries';


export function DashboardPage() {
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery(getBooking);
  const { data: trains, isLoading: trainsLoading, error: trainsError } = useQuery(getTrain);
  const { data: routes, isLoading: routesLoading, error: routesError } = useQuery(getRoute);
  const { data: userProfile, isLoading: userProfileLoading, error: userProfileError } = useQuery(getUserProfile);
  const { data: loyaltyPoints, isLoading: loyaltyPointsLoading, error: loyaltyPointsError } = useQuery(getLoyaltyPoints);
  const createBookingAction = useAction(createBooking);
  const cancelBookingAction = useAction(cancelBooking);
  const rescheduleBookingAction = useAction(rescheduleBooking);
  const updateUserProfileAction = useAction(updateUserProfile);
  const redeemLoyaltyPointsAction = useAction(redeemLoyaltyPoints);

  if (bookingsLoading || trainsLoading || routesLoading || userProfileLoading || loyaltyPointsLoading) {
    return 'Loading...';
  }

  if (bookingsError || trainsError || routesError || userProfileError || loyaltyPointsError) {
    return 'Error: ' + (bookingsError || trainsError || routesError || userProfileError || loyaltyPointsError);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Upcoming Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.details}</li>
        ))}
      </ul>
      <h2>Recent Trips</h2>
      <ul>
        {userProfile.recentTrips.map((trip) => (
          <li key={trip.id}>{trip.details}</li>
        ))}
      </ul>
      <h2>Recommendations</h2>
      <ul>
        {userProfile.recommendations.map((recommendation) => (
          <li key={recommendation.id}>{recommendation.details}</li>
        ))}
      </ul>
      <h2>Booking</h2>
      <button onClick={() => createBookingAction()}>
        Create Booking
      </button>
      <h2>Reschedule Booking</h2>
      <button onClick={() => rescheduleBookingAction()}>
        Reschedule Booking
      </button>
      <h2>Cancel Booking</h2>
      <button onClick={() => cancelBookingAction()}>
        Cancel Booking
      </button>
      <h2>User Profile</h2>
      <button onClick={() => updateUserProfileAction()}>
        Update User Profile
      </button>
      <h2>Redeem Loyalty Points</h2>
      <button onClick={() => redeemLoyaltyPointsAction()}>
        Redeem Loyalty Points
      </button>
    </div>
  );
}