import HttpError from '@wasp/core/HttpError.js'

function calculateCancellationFee(tripDate) {
  // Calculate cancellation fee based on how close the cancellation is to the tripDate.
  // Implement your logic here.
  return 0;
}

export const createBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { train, seatNumber, tripDate } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { bookings: true }
  });

  const trainExists = await context.entities.Train.findUnique({
    where: { id: train.id }
  });
  if (!trainExists) { throw new HttpError(404, 'Train not found') };

  const bookingDate = new Date();
  const status = 'BOOKED';

  const newBooking = await context.entities.Booking.create({
    data: {
      train: { connect: { id: train.id } },
      user: { connect: { id: user.id } },
      seatNumber,
      bookingDate,
      tripDate,
      status
    }
  });

  return newBooking;
}

export const cancelBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const booking = await context.entities.Booking.findUnique({
    where: { id: args.bookingId }
  });

  if (!booking) { throw new HttpError(404, 'Booking not found') }

  if (booking.userId !== context.user.id) { throw new HttpError(403) }

  const cancellationFee = calculateCancellationFee(booking.tripDate);

  await context.entities.Booking.update({
    where: { id: args.bookingId },
    data: { status: 'CANCELLED', cancellationFee }
  });

  return { success: true };
}

export const rescheduleBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const booking = await context.entities.Booking.findUnique({
    where: { id: args.bookingId },
  });
  if (booking.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Booking.update({
    where: { id: args.bookingId },
    data: { tripDate: args.tripDate, status: "RESCHEDULED" },
  });
}

export const updateUserProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id, ...data } = args;

  return context.entities.User.update({
    where: { id },
    data
  });
}

export const redeemLoyaltyPoints = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const redeemedPoints = args.points;

  if (user.loyaltyPoints < redeemedPoints) {
    throw new HttpError(400, "Insufficient loyalty points");
  }

  const updatedUser = await context.entities.User.update({
    where: { id: context.user.id },
    data: {
      loyaltyPoints: user.loyaltyPoints - redeemedPoints
    }
  });

  return updatedUser;
}