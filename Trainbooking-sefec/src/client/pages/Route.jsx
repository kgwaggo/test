import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getRoute from '@wasp/queries/getRoute';
import getTrain from '@wasp/queries/getTrain';

export function Route() {
  const { routeId } = useParams();

  const { data: route, isLoading: isRouteLoading, error: routeError } = useQuery(getRoute, { id: routeId });
  const { data: trains, isLoading: isTrainsLoading, error: trainsError } = useQuery(getTrain, { id: routeId });

  if (isRouteLoading || isTrainsLoading) return 'Loading...';
  if (routeError || trainsError) return 'Error: ' + (routeError || trainsError);

  return (
    <div>
      <h1>Route Details</h1>
      <p>Start Station: {route.startStation}</p>
      <p>End Station: {route.endStation}</p>

      <h2>Trains on this Route</h2>
      {trains.map((train) => (
        <div key={train.id}>
          <p>Train Number: {train.trainNumber}</p>
          <p>Seats: {train.seats}</p>
          <p>Class: {train.class}</p>
        </div>
      ))}
    </div>
  );
}