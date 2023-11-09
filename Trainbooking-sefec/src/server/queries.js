import HttpError from '@wasp/core/HttpError.js'

export const getBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const booking = await context.entities.Booking.findUnique({
    where: { id: args.bookingId },
    select: { userId: true }
  })

  if (!booking) { throw new HttpError(400, `Booking with id ${args.bookingId} not found`) }

  if (booking.userId !== context.user.id) { throw new HttpError(400, `Booking with id ${args.bookingId} does not belong to the user`) }

  return booking
}

export const getTrain = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const train = await context.entities.Train.findUnique({
    where: { id }
  });

  if (!train) throw new HttpError(404, `No train with id ${id}`);

  return train;
}

export const getRoute = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const route = await context.entities.Route.findUnique({
    where: { id },
    include: { Train: true }
  });

  if (!route) { throw new HttpError(404, `No route with id ${id}`) }

  return route;
}

export const getUserProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.User.findUnique({
    where: { id: context.user.id },
    include: {
      bookings: true
    }
  })
}

export const getLoyaltyPoints = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    select: { loyaltyPoints: true }
  });
  return user.loyaltyPoints;
}