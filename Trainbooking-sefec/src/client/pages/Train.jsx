import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getTrain from '@wasp/queries/getTrain';
import getRoute from '@wasp/queries/getRoute';

export function Train() {
  const { trainId } = useParams();
  const { data: train, isLoading: trainLoading, error: trainError } = useQuery(getTrain, { id: trainId });
  const { data: route, isLoading: routeLoading, error: routeError } = useQuery(getRoute, { id: train?.routeId });

  if (trainLoading || routeLoading) return 'Loading...';
  if (trainError || routeError) return 'Error: ' + (trainError || routeError);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold'>Train Details</h2>
      <div className='mt-4'>
        <p className='text-lg'>Train Number: {train.trainNumber}</p>
        <p className='text-lg'>Seats: {train.seats}</p>
        <p className='text-lg'>Class: {train.class}</p>
      </div>
      <h2 className='text-2xl font-semibold mt-8'>Route Details</h2>
      <div className='mt-4'>
        <p className='text-lg'>Start Station: {route.startStation}</p>
        <p className='text-lg'>End Station: {route.endStation}</p>
        <p className='text-lg'>Departure Time: {route.departureTime}</p>
        <p className='text-lg'>Arrival Time: {route.arrivalTime}</p>
      </div>
      <h2 className='text-2xl font-semibold mt-8'>Amenities</h2>
      <div className='mt-4'>
        {train.amenities.map((amenity) => (
          <p key={amenity.id} className='text-lg'>{amenity.name}</p>
        ))}
      </div>
      <Link to={`/booking/${trainId}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Book Now</Link>
    </div>
  );
}